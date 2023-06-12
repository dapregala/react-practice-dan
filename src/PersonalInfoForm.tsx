import * as React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().strict(),
  lastName: yup.string().required('Last name is required'),
  birthday: yup.date().required('Birthday is required'),
  maritalStatus: yup
    .string()
    .oneOf(['single', 'married', 'widowed'])
    .required('Marital status is required'),
  citizenship: yup
    .string()
    .oneOf(['earthborn', 'martian', 'venux'])
    .required('Citizenship is required'),
  employeeId: yup
    .number()
    .required('Employee ID is required')
    .typeError('Employee ID must be a number')
    .test('unique', 'Employee ID must be unique', async function (value) {
      const { checkEmployeeIdUniqueness } = this.options.context; // Access the validation function from the context

      if (!value) return true; // Skip the test if the field is empty

      return checkEmployeeIdUniqueness(value); // Call the validation function and return the result
    })
    .test(
      'len',
      'Employee ID must be exactly 7 characters',
      (val) => val && val.toString().length === 7
    ),
});

const Form = ({
  values,
  onSubmitFinal,
  onSubmitDraft,
  checkEmployeeIdUniqueness,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    values: values,
    context: { checkEmployeeIdUniqueness },
  });

  const onSaveAsDraft = async (e) => {
    e.preventDefault();
    clearErrors();
    const fieldsToValidate = [
      // submitting drafts only require these fields
      'employeeId',
      'firstName',
      'lastName',
    ];

    // Trigger validation for the specific fields
    const validationResults = await Promise.all(
      fieldsToValidate.map((fieldName) => trigger(fieldName))
    );

    const hasErrors = validationResults.some((result) => result === false);

    if (!hasErrors) {
      onSubmitDraft(getValues());
    } else {
      console.log('Form is not valid. Cannot save as draft.');
    }
  };

  return (
    <form>
      <div>
        <label>First Name</label>
        <input type="text" {...register('firstName')} />
        {errors.firstName && (
          <p className="form-errors">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input type="text" {...register('lastName')} />
        {errors.lastName && (
          <p className="form-errors">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label>Birthday</label>
        <input type="date" {...register('birthday')} />
        {errors.birthday && (
          <p className="form-errors">{errors.birthday.message}</p>
        )}
      </div>

      <div>
        <label>Marital Status</label>
        <select {...register('maritalStatus')}>
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="widowed">Widowed</option>
        </select>
        {errors.maritalStatus && (
          <p className="form-errors">{errors.maritalStatus.message}</p>
        )}
      </div>

      <div>
        <label>Citizenship</label>
        <select {...register('citizenship')}>
          <option value="">Select</option>
          <option value="earthborn">Earthborn</option>
          <option value="martian">Martian</option>
          <option value="venux">Venux</option>
        </select>
        {errors.citizenship && (
          <p className="form-errors">{errors.citizenship.message}</p>
        )}
      </div>

      <div>
        <label>Employee ID</label>
        <input type="number" {...register('employeeId')} />
        {errors.employeeId && (
          <p className="form-errors">{errors.employeeId.message}</p>
        )}
      </div>

      {/* onSubmit={handleSubmit(onSubmit)} */}

      <button type="submit" onClick={handleSubmit(onSubmitFinal)}>
        Submit
      </button>
      {(values?.status == 'draft' || values?.status == 'new') && (
        <button type="submit" onClick={onSaveAsDraft}>
          Save as Draft
        </button>
      )}
    </form>
  );
};

export default Form;

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string(),
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
    .test(
      'len',
      'Employee ID must be exactly 7 characters',
      (val) => val && val.toString().length === 7
    ),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input type="text" {...register('firstName')} />
        {errors.firstName && (
          <p className="form-errors">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Middle Name</label>
        <input type="text" {...register('middleName')} />
        {errors.middleName && (
          <p className="form-errors">{errors.middleName.message}</p>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

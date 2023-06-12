import * as React from 'react';
// import { Fragment, h } from 'react';
import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PersonalInfoForm = ({
  values,
  onSubmitFinal,
  onSubmitDraft,
  checkEmployeeIdUniqueness,
}) => {
  const { control } = useFormContext();

  // const onSaveAsDraft = async (e) => {
  //   e.preventDefault();
  //   clearErrors();
  //   const fieldsToValidate = [
  //     // submitting drafts only require these fields
  //     'employeeId',
  //     'firstName',
  //     'lastName',
  //   ];

  //   // Trigger validation for the specific fields only
  //   const validationResults = await Promise.all(
  //     fieldsToValidate.map((fieldName) => trigger(fieldName))
  //   );

  //   const hasErrors = validationResults.some((result) => result === false);

  //   if (!hasErrors) {
  //     onSubmitDraft(getValues());
  //   } else {
  //     console.log('Form is not valid. Cannot save as draft.');
  //   }
  // };

  return (
    <form>
      <div>
        <label>First Name</label>
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <div>
              <input {...field} />
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default PersonalInfoForm;

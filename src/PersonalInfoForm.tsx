import * as React from 'react';
// import { Fragment, h } from 'react';
import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PersonalInfoForm = ({
  formHeader,
  shouldDisableEmployeeId,
  shouldDisableAllFields,
}) => {
  const { control } = useFormContext();

  return (
    <form className="personal-info-form">
      <div>
        <h3>{formHeader}</h3>
      </div>
      <div>
        <label>First Name</label>
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <div>
              <input {...field} disabled={shouldDisableAllFields} />
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Last Name</label>
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState: { error } }) => (
            <div>
              <input {...field} disabled={shouldDisableAllFields} />
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Birthday</label>
        <Controller
          control={control}
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <div>
              <input type="date" {...field} disabled={shouldDisableAllFields} />
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Gender</label>
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState: { error } }) => (
            <div>
              <select {...field} disabled={shouldDisableAllFields}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="na">N/A</option>
              </select>
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Marital Status</label>
        <Controller
          control={control}
          name="maritalStatus"
          render={({ field, fieldState: { error } }) => (
            <div>
              <select {...field} disabled={shouldDisableAllFields}>
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Address</label>
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState: { error } }) => (
            <div>
              <select {...field} disabled={shouldDisableAllFields}>
                <option value="">Select</option>
                <option value="bikiniBottom">Bikini Bottom</option>
                <option value="jellyfishFields">Jellyfish Fields</option>
                <option value="newKelpCity">New Kelp City</option>
                <option value="rockBottom">Rock Bottom</option>
              </select>
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Employee ID</label>
        <Controller
          control={control}
          name="employeeId"
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                {...field}
                disabled={shouldDisableEmployeeId || shouldDisableAllFields}
              />
              {error && <p className="form-errors">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label>Form Status</label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div>
              <select {...field} disabled={true}>
                <option value="new">New</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
              </select>
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default PersonalInfoForm;

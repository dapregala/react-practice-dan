import * as React from 'react';
import { useState } from 'react';
import Tab from './Tab';
import Content from './Content';
import './style.css';
import PersonalInfoForm from './PersonalInfoForm';
import HobbiesAndInterestsForm from './HobbiesAndInterestsForm';
import FavoriteThingsForm from './FavoriteThingsForm';
import Swal from 'sweetalert2';

const emptyEmployeeForm = {
  status: 'new',
  birthday: '',
  citizenship: '',
  employeeId: null,
  firstName: '',
  lastName: '',
  maritalStatus: '',
  middleName: '',
};

const initialEmployeeList = [
  {
    status: 'submitted',
    birthday: '1900-01-09T16:00:00.000Z',
    citizenship: 'martian',
    employeeId: 2345678,
    firstName: 'Squidward',
    lastName: 'Tentacles',
    maritalStatus: 'single',
  },
  {
    status: 'submitted',
    birthday: '1993-06-09T16:00:00.000Z',
    citizenship: 'earthborn',
    employeeId: 5454123,
    firstName: 'Eugene',
    lastName: 'Krabs',
    maritalStatus: 'married',
  },
  {
    status: 'submitted',
    birthday: '1993-06-09T16:00:00.000Z',
    citizenship: 'earthborn',
    employeeId: 1234567,
    firstName: 'Spongebob',
    lastName: 'Squarepants',
    maritalStatus: 'single',
  },
  {
    status: 'draft',
    employeeId: 9876543,
    firstName: 'Walter',
    lastName: 'White',
  },
].reduce((acc, employee) => {
  acc[employee.employeeId] = employee;
  return acc;
}, {});

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [employeeList, setEmployeeList] = useState(initialEmployeeList);
  const submittedList = Object.keys(employeeList)
    .map((id) => employeeList[id])
    .filter((emp) => emp.status == 'submitted');
  const draftList = Object.keys(employeeList)
    .map((id) => employeeList[id])
    .filter((emp) => emp.status == 'draft');

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleClickEmployeeItem = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const getEmployeeFromList = (employeeId, list) => {
    return list[employeeId];
  };

  const handlePersonalInfoSubmitFinal = (employee) => {
    employee.status = 'submitted';
    setEmployeeList({ ...employeeList, [employee.employeeId]: employee });
    setSelectedEmployeeId(employee.employeeId);
    Swal.fire('Employee successfully added!', '', 'success');
  };

  const handlePersonalInfoSubmitDraft = (employee) => {
    employee.status = 'draft';
    setEmployeeList({ ...employeeList, [employee.employeeId]: employee });
    setSelectedEmployeeId(employee.employeeId);
    Swal.fire('Employee successfully saved as draft!', '', 'success');
  };

  const checkEmployeeIdUniqueness = (employeeId) => {
    return !submittedList.some(
      (existingEmployee) => existingEmployee.employeId == employeeId
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h3>Employees</h3>
        <ul>
          {submittedList.map((emp) => {
            return (
              <li
                className={selectedEmployeeId == emp.employeeId ? 'active' : ''}
                onClick={() => {
                  handleClickEmployeeItem(emp.employeeId);
                }}
              >
                {emp.firstName} {emp.middleName} {emp.lastName}
              </li>
            );
          })}
          <li
            className={selectedEmployeeId == 0 ? 'active' : ''}
            onClick={() => {
              handleClickEmployeeItem(0);
            }}
          >
            Add New Employee
          </li>
        </ul>

        <h3>Drafts</h3>
        <ul>
          {draftList.map((draft) => {
            return (
              <li
                className={
                  selectedEmployeeId == draft.employeeId ? 'active' : ''
                }
                onClick={() => {
                  handleClickEmployeeItem(draft.employeeId);
                }}
              >
                {draft.firstName} {draft.middleName} {draft.lastName}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="tabs-and-content-container">
        <div className="tabs-container">
          <div
            className={`tab ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => handleTabClick(0)}
          >
            Tab 1
          </div>
          <div
            className={`tab ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            Tab 2
          </div>
          <div
            className={`tab ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => handleTabClick(2)}
          >
            Tab 3
          </div>
        </div>

        <div className="content">
          {activeTab === 0 && (
            <div>
              <PersonalInfoForm
                values={
                  selectedEmployeeId == 0
                    ? emptyEmployeeForm
                    : getEmployeeFromList(selectedEmployeeId, employeeList)
                }
                onSubmitFinal={handlePersonalInfoSubmitFinal}
                onSubmitDraft={handlePersonalInfoSubmitDraft}
                checkEmployeeIdUniqueness={checkEmployeeIdUniqueness}
              ></PersonalInfoForm>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <HobbiesAndInterestsForm></HobbiesAndInterestsForm>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <FavoriteThingsForm></FavoriteThingsForm>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

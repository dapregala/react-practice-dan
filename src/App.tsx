import * as React from 'react';
import { useState } from 'react';
import Tab from './Tab';
import Content from './Content';
import './style.css';
import PersonalInfoForm from './PersonalInfoForm';
import HobbiesAndInterestsForm from './HobbiesAndInterestsForm';
import FavoriteThingsForm from './FavoriteThingsForm';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const employeeList = [
    {
      birthday: '1900-01-09T16:00:00.000Z',
      citizenship: 'martian',
      employeeId: 2345678,
      firstName: 'Gesuz',
      lastName: 'Chrayst',
      maritalStatus: 'single',
      middleName: 'Facking',
    },
    {
      birthday: '1993-06-09T16:00:00.000Z',
      citizenship: 'earthborn',
      employeeId: 1234567,
      firstName: 'Daniel',
      lastName: 'Regala',
      maritalStatus: 'single',
      middleName: 'Pascual',
    },
  ];

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {employeeList.map((emp) => {
            return (
              <li>
                {emp.firstName} {emp.middleName} {emp.lastName}
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
              <PersonalInfoForm></PersonalInfoForm>
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

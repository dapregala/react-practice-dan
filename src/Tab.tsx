import * as React from 'react';
import { useState } from 'react';

const Tab = ({ title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(title);
  };

  return (
    <button
      className={`tab ${activeTab === title ? 'active' : ''}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Tab;

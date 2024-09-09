import React from 'react';
import logo from '../../assets/logo.jpg';
import './LabTech.css'; // Import the CSS file

const LabTech = () => {
  return (
    <div className="labtech-container">
      <header className="top-bar">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li>Home</li>
          <li>Patient Records</li>
          <li>Test Requests</li>
          <li>Test Results</li>
          <li>Inventories</li>
          <li>Reports</li>
        </ul>
      </aside>
      <main className="main-content">{/* Main content goes here */}</main>
    </div>
  );
};

export default LabTech;

import React, { useState } from 'react';
import logo from '../../assets/logo.jpg';
import './LabTech.css';
import {
  FaVial,
  FaExclamationTriangle,
  FaClipboardList,
  FaFlask,
  FaBars,
} from 'react-icons/fa';
const LabTech = () => {
  const [showHomeCards, setShowHomeCards] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPatientRecords, setShowPatientRecords] = useState(false);

  const handleHomeClick = () => {
    setShowHomeCards(true);
    setShowPatientRecords(false);
  };

  const handlePatientRecordsClick = () => {
    setShowPatientRecords(true);
    setShowHomeCards(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="labtech-container">
      <header className="top-bar">
        <img src={logo} alt="Logo" className="logo" />
        <FaBars className="hamburger-icon" onClick={toggleSidebar} />{' '}
        {/* Hamburger menu */}
      </header>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-list">
          <li onClick={handleHomeClick}>Home</li>
          <li onClick={handlePatientRecordsClick}>Patient Records </li>
          <li>Test Requests</li>
          <li>Test Results</li>
          <li>Inventories</li>
          <li>Reports</li>
        </ul>
      </aside>
      <main className="main-content">
        {showHomeCards && (
          <div className="cards-container">
            <div className="card">
              <FaVial className="card-icon" />
              <p>Today's Tests</p>
              <h3>10</h3>
            </div>
            <div className="card">
              <FaClipboardList className="card-icon" />
              <p>Pending Tests</p>
              <h3>10</h3>
            </div>
            <div className="card">
              <FaExclamationTriangle className="card-icon" />
              <p>Inventory Alerts</p>
              <h3>5</h3>
            </div>
            <div className="card">
              <FaFlask className="card-icon" />
              <p>Emergency Tests</p>
              <h3>10</h3>
            </div>
          </div>
        )}
        {showPatientRecords && (
          <div className="patient-records">
            <form className="form">
              <label htmlFor="patientId">Patient ID:</label>
              <input type="text" id="patientId" />
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" />
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" />
              <label htmlFor="gender">Gender</label>
              <input type="text" id="gender" />
              <label htmlFor="results">test results</label>
              <textarea id="results" rows="4" cols="50"></textarea>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default LabTech;

import React, { useState } from 'react';
import './Receptionist.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.jpg';

const Receptionist = () => {
  const [activeSection, setActiveSection] = useState('patient-registration');

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="receptionist-container">
      <div className="receptionist-topbar">
        <img src={logo} alt="Logo" className="receptionist-logo" />
        <div className="receptionist-profile">
          <FaUserCircle size={40} color="white" />
        </div>
      </div>
      <div className="receptionist-main">
        <div className="receptionist-sidebar">
          <ul className="receptionist-menu-list">
            <li onClick={() => handleMenuClick('patient-registration')}>
              Patient Registration
            </li>
            <li onClick={() => handleMenuClick('queue-management')}>
              Queue Management
            </li>
            <li onClick={() => handleMenuClick('appointments')}>
              Appointments
            </li>
            <li onClick={() => handleMenuClick('notifications')}>
              Notifications
            </li>
            <li onClick={() => handleMenuClick('settings')}>Settings</li>
            <li onClick={() => handleMenuClick('logout')}>Logout</li>
          </ul>
        </div>
        <div className="receptionist-content">
          {activeSection === 'patient-registration' && (
            <form className="patient-registration-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input type="date" id="dob" />
                </div>
                <div className="form-group">
                  <label htmlFor="id">National ID/Passport:</label>
                  <input type="text" id="id" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input type="text" id="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="next-of-keen-name">Next of Keen Name:</label>
                  <input type="text" id="next-of-keen-name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="next-of-keen-number">
                    Next of Keen Number:
                  </label>
                  <input type="text" id="next-of-keen-number" />
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Reason of Visit:</label>
                  <textarea id="reason" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="insurance">Insurance Details:</label>
                  <input type="text" id="insurance" />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department of Visit:</label>
                  <select id="department">
                    <option value="">Select Department</option>
                    <option value="general">General</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="neurology">Neurology</option>
                    <option value="gynecology">Gynecology</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save & Submit
                </button>
                <button type="reset" className="btn-reset">
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receptionist;

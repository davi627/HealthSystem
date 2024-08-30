import React, { useState } from 'react';
import './Admin.css';
import logo from '../../assets/logo.jpg';
import {
  FaMicroscope,
  FaUserNurse,
  FaPills,
  FaUserMd,
  FaCalculator,
  FaUtensils,
  FaBed,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { GiOfficeChair } from 'react-icons/gi';

const Admin = () => {
  const [selectedRole, setSelectedRole] = useState('Receptionist');

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="topbar">
        <div className="logo">
          <img src={logo} alt="Hospital Logo" height="20%" width="20%" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => handleRoleClick('Receptionist')}>
            <GiOfficeChair /> Receptionist
          </li>
          <li onClick={() => handleRoleClick('Laboratory')}>
            <FaMicroscope /> Laboratory
          </li>
          <li onClick={() => handleRoleClick('Nurse')}>
            <FaUserNurse /> Nurse
          </li>
          <li onClick={() => handleRoleClick('Pharmacist')}>
            <FaPills /> Pharmacist
          </li>
          <li onClick={() => handleRoleClick('Doctor')}>
            <FaUserMd /> Doctor
          </li>
          <li onClick={() => handleRoleClick('Accountant')}>
            <FaCalculator /> Accountant
          </li>
          <li onClick={() => handleRoleClick('Kitchen')}>
            <FaUtensils /> Kitchen
          </li>
          <li onClick={() => handleRoleClick('Wards')}>
            <FaBed /> Wards
          </li>
          <li onClick={() => handleRoleClick('Reports')}>
            <FaChartBar /> Reports
          </li>
          <li onClick={() => handleRoleClick('Settings')}>
            <FaCog /> Settings
          </li>
          <li>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {selectedRole && (
          <form className="user-form">
            <h2>Create {selectedRole} Account</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" name="phoneNumber" />
              </div>

              <div className="form-group">
                <label>Employer ID:</label>
                <input type="text" name="employerId" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select name="role">
                  <option value="receptionist">Receptionist</option>
                  <option value="nurse">Nurse</option>
                  <option value="doctor">Doctor</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="accountant">Accountant</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="lab_technician">Lab Technician</option>
                </select>
              </div>
            </div>
            <button type="submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admin;

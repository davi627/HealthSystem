import React, { useState } from 'react';
import './Admin.css';
import logo from '../../assets/logo.jpg';
import axios from 'axios';
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
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    phoneNumber: '',
    email: '',
    employerId: '',
    password: '',
    role: 'Receptionist',
  });

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setFormData({ ...formData, role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/create', formData, {
        withCredentials: true,
      });
      // Reset the form data
      setFormData({
        fullName: '',
        gender: 'Male',
        phoneNumber: '',
        email: '',
        employerId: '',
        password: '',
        role: selectedRole, // Keep the selected role after submission
      });
    } catch (error) {
      // Display more detailed error information
      const errorMessage = error.response?.data?.message || 'An error occurred';
      console.error('Error creating user:', error);
      alert(`Error: ${errorMessage}`);
    }
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
          <li onClick={() => handleRoleClick('Kitchen Staff')}>
            <FaUtensils /> Kitchen
          </li>
          <li>
            <FaBed /> Wards
          </li>
          <li>
            <FaChartBar /> Reports
          </li>
          <li>
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
          <form className="user-form" onSubmit={handleSubmit}>
            <h2>Create {selectedRole} Account</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Employer ID:</label>
                <input
                  type="text"
                  name="employerId"
                  value={formData.employerId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="Receptionist">Receptionist</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Kitchen Staff">Kitchen</option>
                  <option value="Laboratory">Lab Technician</option>
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

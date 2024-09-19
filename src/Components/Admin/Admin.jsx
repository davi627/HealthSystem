import React, { useState, useEffect } from 'react';
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
  axios.defaults.withCredentials = true;
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
  const [users, setUsers] = useState([]);

  // Fetch users based on the selected role
  useEffect(() => {
    const fetchUsersByRole = async () => {
      console.log('selectedRole: ', selectedRole);
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${selectedRole}`
        );
        console.log('usersFound: ', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (selectedRole) {
      fetchUsersByRole();
    }
  }, [selectedRole]);

  // Handle role change in sidebar
  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setFormData({
      fullName: '',
      gender: 'Male',
      phoneNumber: '',
      email: '',
      employerId: '',
      password: '',
      role: role,
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/create', formData, {
        withCredentials: true,
      });
      // Reset the form after submission
      setFormData({
        fullName: '',
        gender: 'Male',
        phoneNumber: '',
        email: '',
        employerId: '',
        password: '',
        role: selectedRole,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      console.error('Error creating user:', error);
      alert(`Error: ${errorMessage}`);
    }
  };

  // Toggle user status
  const handleToggleStatus = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/user/${userId}/toggleStatus`, {
        withCredentials: true,
      });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
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
            <FaUtensils /> Kitchen Staff
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        {selectedRole && (
          <>
            {/* Form */}
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Employer ID:</label>
                  <input
                    type="text"
                    name="employerId"
                    value={formData.employerId}
                    onChange={handleInputChange}
                    required
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
                    required
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
                    <option value="Kitchen Staff">Kitchen Staff</option>
                    <option value="Laboratory">Laboratory</option>
                  </select>
                </div>
              </div>
              <button type="submit">Create Account</button>
            </form>

            {/* Users List */}
            <div className="user-list">
              <h2>{selectedRole} Users</h2>
              {users.length > 0 ? (
                <ul>
                  {users.map((user) => (
                    <li key={user._id}>
                      <span>
                        {user.fullName} - {user.phoneNumber} -{user.employerId}
                      </span>
                      <button
                        className="btn"
                        onClick={() => handleToggleStatus(user._id)}
                      >
                        {user.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found for {selectedRole}.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

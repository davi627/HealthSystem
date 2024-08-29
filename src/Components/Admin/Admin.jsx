import React from 'react';
import './Admin.css';
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
import { GiOfficeChair } from 'react-icons/gi'; // Importing a desk icon

const Admin = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <GiOfficeChair /> Receptionist
        </li>{' '}
        {/* Using the desk icon */}
        <li>
          <FaMicroscope /> Laboratory
        </li>
        <li>
          <FaUserNurse /> Nurse
        </li>
        <li>
          <FaPills /> Pharmacist
        </li>
        <li>
          <FaUserMd /> Doctor
        </li>
        <li>
          <FaCalculator /> Accountant
        </li>
        <li>
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
  );
};

export default Admin;

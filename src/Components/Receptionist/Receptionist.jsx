import React, { useState } from 'react';
import './Receptionist.css';
import { FaUserCircle, FaPlus, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Receptionist = () => {
  const [activeSection, setActiveSection] = useState('patient-registration');
  const [date, setDate] = useState(new Date());
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    department: '',
    practitionerName: '',
    date: '',
    time: '',
    charges: '',
  });

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const toggleAppointmentForm = () => {
    setShowAppointmentForm(!showAppointmentForm);
  };

  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment data:', appointmentForm);
    setShowAppointmentForm(false);
    setAppointmentForm({
      patientName: '',
      department: '',
      practitionerName: '',
      date: '',
      time: '',
      charges: '',
    });
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
          {activeSection === 'appointments' && (
            <div className="appointments-section">
              <div className="appointment-cards">
                <div className="appointment-card">
                  <h3>Total Appointments</h3>
                  <p>25</p>
                </div>
                <div className="appointment-card">
                  <h3>Canceled Appointments</h3>
                  <p>3</p>
                </div>
                <div className="appointment-card">
                  <h3>Successful Appointments</h3>
                  <p>20</p>
                </div>
                <div className="appointment-card">
                  <h3>Pending Appointments</h3>
                  <p>2</p>
                </div>
              </div>
              <div className="calendar-container">
                <Calendar onChange={handleDateChange} value={date} />
              </div>
              <button
                className="add-appointment-button"
                onClick={toggleAppointmentForm}
              >
                <FaPlus />
              </button>
            </div>
          )}
          {activeSection === 'queue-management' && (
            <div className="queue-management-section">
              <div className="queue-cards">
                <div className="queue-card">
                  <h3>Total Patients with Tickets</h3>
                  <p>50</p>
                </div>
                <div className="queue-card">
                  <h3>Patients on Waiting</h3>
                  <p>15</p>
                </div>
                <div className="queue-card">
                  <h3>Patients Being Attended</h3>
                  <p>10</p>
                </div>
                <div className="queue-card">
                  <h3>Completed Tickets</h3>
                  <p>20</p>
                </div>
                <div className="queue-card">
                  <h3>Emergency Tickets</h3>
                  <p>5</p>
                </div>
                <div className="queue-card">
                  <h3>Pending Tickets</h3>
                  <p>7</p>
                </div>
                <div className="queue-card">
                  <h3>Messages</h3>
                  <FaEnvelope size={40} color="blue" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showAppointmentForm && (
        <div className="appointment-form-popup">
          <div className="appointment-form-content">
            <h2>Add New Appointment</h2>
            <form onSubmit={handleAppointmentSubmit}>
              <div className="form-group">
                <label htmlFor="patientName">Patient Name:</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={appointmentForm.patientName}
                  onChange={handleAppointmentFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <select
                  id="department"
                  name="department"
                  value={appointmentForm.department}
                  onChange={handleAppointmentFormChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="general">General</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="practitionerName">Practitioner Name:</label>
                <input
                  type="text"
                  id="practitionerName"
                  name="practitionerName"
                  value={appointmentForm.practitionerName}
                  onChange={handleAppointmentFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={appointmentForm.date}
                  onChange={handleAppointmentFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={appointmentForm.time}
                  onChange={handleAppointmentFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="charges">Charges:</label>
                <input
                  type="number"
                  id="charges"
                  name="charges"
                  value={appointmentForm.charges}
                  onChange={handleAppointmentFormChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={toggleAppointmentForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receptionist;

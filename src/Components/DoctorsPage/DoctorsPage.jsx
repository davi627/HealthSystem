import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DoctorsPage.css';
import logo from '../../assets/logo.jpg';

const DoctorsPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState(new Date());
  const [prescription, setPrescription] = useState('');
  const [autoPrescription, setAutoPrescription] = useState('');

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setSelectedPatient(null);
    setSelectedAppointment(null);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const appointmentForDay = appointments.find(
      (appointment) =>
        new Date(appointment.date).toDateString() === newDate.toDateString()
    );
    if (appointmentForDay) {
      setSelectedAppointment(appointmentForDay);
    } else {
      setSelectedAppointment(null);
    }
  };

  const patients = [
    'John Doe',
    'Jane Smith',
    'Michael Brown',
    'Emily Johnson',
    'Chris Davis',
    'Sophia Wilson',
    'James Miller',
    'Isabella Taylor',
    'Oliver Thomas',
    'Emma Walker',
  ];

  const appointments = [
    {
      id: 1,
      patient: 'John Doe',
      date: '2024-09-20',
      time: '10:00 AM',
      details: 'General check-up',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      date: '2024-09-21',
      time: '1:00 PM',
      details: 'Follow-up on blood test results',
    },
    {
      id: 3,
      patient: 'Emily Johnson',
      date: '2024-09-21',
      time: '3:00 PM',
      details: 'Consultation for headache and dizziness',
    },
  ];

  const patientDetails = {
    history: 'This patient has a history of diabetes and hypertension.',
    labResults: 'Blood Test: Normal, X-ray: Clear.',
    prescription: 'Metformin 500mg, Lisinopril 10mg.',
    diagnosis: 'Recently diagnosed with mild asthma.',
    notes: 'Notes from cardiology: Monitor blood pressure closely.',
  };

  const getTileContent = ({ date }) => {
    const hasAppointment = appointments.some(
      (appointment) =>
        new Date(appointment.date).toDateString() === date.toDateString()
    );
    return hasAppointment ? <div className="appointment-dot"></div> : null;
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      new Date(appointment.date).toDateString() === date.toDateString()
  );

  // Prescription AI logic placeholder
  const handleAutoPrescription = () => {
    setAutoPrescription('AI suggests: Ibuprofen 200mg for pain relief.');
  };

  return (
    <div>
      <div className="topp-bar">
        <img src={logo} alt="Logo" />
      </div>
      <div className="side-bar">
        <ul>
          <li onClick={() => handleSectionClick('dashboard')}>Dashboard</li>
          <li onClick={() => handleSectionClick('patients')}>Patients</li>
          <li onClick={() => handleSectionClick('appointments')}>
            Appointments
          </li>
          <li onClick={() => handleSectionClick('medicalRecords')}>
            Medical Records
          </li>
          <li onClick={() => handleSectionClick('labResults')}>
            Lab Results and Diagnosis
          </li>
          <li onClick={() => handleSectionClick('prescription')}>
            Prescription
          </li>
        </ul>
      </div>

      <div className="content">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="dashboard-cards">
            <div className="card">
              <i className="icon">📅</i>
              <h3>Today's Appointments</h3>
              <p>5 appointments scheduled</p>
            </div>
            <div className="card">
              <i className="icon">🏥</i>
              <h3>Patients in Wards</h3>
              <p>12 patients admitted</p>
            </div>
            <div className="card">
              <i className="icon">⏳</i>
              <h3>Pending Tasks</h3>
              <p>3 pending tasks</p>
            </div>
            <div className="card">
              <i className="icon">🩺</i>
              <h3>Patients Under Care</h3>
              <p>7 patients currently under care</p>
            </div>
          </div>
        )}

        {/* Patients Section */}
        {activeSection === 'patients' && (
          <div className="patients-section">
            <div className="patient-list">
              <h3>All Patients</h3>
              <ul>
                {patients.map((patient, index) => (
                  <li key={index} onClick={() => handlePatientClick(patient)}>
                    {patient}
                  </li>
                ))}
              </ul>
            </div>

            {selectedPatient && (
              <div className="patient-details">
                <h3>Details for {selectedPatient}</h3>
                <div className="details-section">
                  <h4>History</h4>
                  <p>{patientDetails.history}</p>
                </div>
                <div className="details-section">
                  <h4>Lab Test Results</h4>
                  <p>{patientDetails.labResults}</p>
                </div>
                <div className="details-section">
                  <h4>Prescription</h4>
                  <p>{patientDetails.prescription}</p>
                </div>
                <div className="details-section">
                  <h4>Recent Diagnosis</h4>
                  <p>{patientDetails.diagnosis}</p>
                </div>
                <div className="details-section">
                  <h4>Notes from Other Departments</h4>
                  <p>{patientDetails.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Medical Records Section */}
        {activeSection === 'medicalRecords' && (
          <div className="medical-records-section">
            <h3>Medical History for All Patients</h3>
            <p>Patient: {selectedPatient}</p>
            <p>{patientDetails.history}</p>
            <button className="btn update-btn">Update Medical Record</button>
          </div>
        )}

        {/* Lab Results and Diagnosis Section */}
        {activeSection === 'labResults' && (
          <div className="lab-results-section">
            <h3>Lab Results and Diagnosis</h3>
            <p>Patient: {selectedPatient}</p>
            <p>
              <strong>Lab Results:</strong> {patientDetails.labResults}
            </p>
            <p>
              <strong>Diagnosis:</strong> {patientDetails.diagnosis}
            </p>
            <button className="btn update-btn">Update Diagnosis</button>
          </div>
        )}

        {/* Prescription Section */}
        {activeSection === 'prescription' && (
          <div className="prescription-section">
            <h3>Prescription for {selectedPatient}</h3>
            <textarea
              placeholder="Enter prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className="prescription-input"
            ></textarea>

            <button
              className="btn ai-prescribe-btn"
              onClick={handleAutoPrescription}
            >
              AI Prescribe
            </button>
            <button>Send to Pharmacy</button>
            {autoPrescription && (
              <div className="ai-prescription">
                <h4>AI Prescription Suggestion:</h4>
                <p>{autoPrescription}</p>
              </div>
            )}
          </div>
        )}

        {/* Appointments Section */}
        {activeSection === 'appointments' && (
          <div className="appointments-section">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileContent={getTileContent}
              className="calendar"
            />
            <div className="appointments-list">
              <h3>Appointments on {date.toDateString()}</h3>
              <ul>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      {appointment.time} - {appointment.patient}
                    </li>
                  ))
                ) : (
                  <p>No appointments for this date</p>
                )}
              </ul>
            </div>
            {selectedAppointment && (
              <div className="appointment-card">
                <h4>Details for Appointment</h4>
                <p>
                  <strong>Patient:</strong> {selectedAppointment.patient}
                </p>
                <p>
                  <strong>Date:</strong> {selectedAppointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedAppointment.time}
                </p>
                <p>
                  <strong>Details:</strong> {selectedAppointment.details}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;

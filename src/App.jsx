import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';

import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Admin from './Components/Admin/Admin';
import DoctorsPage from './Components/DoctorsPage/DoctorsPage';
import NursePage from './Components/NursePage/NursePage';
import Receptionist from './Components/Receptionist/Receptionist';
import Pharmacy from './Components/Pharmacy/Pharmacy';
import Accountspage from './Components/AccountsPage/Accountspage';
import LabTech from './Components/LabTech/LabTech';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="admin" element={<Admin />} />
        <Route path="/doctorspage" element={<DoctorsPage />} />
        <Route path="/nursepage" element={<NursePage />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/accounts" element={<Accountspage />} />
        <Route path="/labtech" element={<LabTech />} />
      </Routes>
    </Router>
  );
}

export default App;

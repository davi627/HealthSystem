import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';

import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Admin from './Components/Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

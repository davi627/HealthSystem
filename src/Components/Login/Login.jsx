import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isAdmin) {
        response = await axios.post(
          'http://localhost:3000/admin/login',
          { email, password, role: 'admin' },
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          'http://localhost:3000/user/login',
          { email, password, role },
          { withCredentials: true }
        );
      }

      const { role: userRole } = response.data.user || response.data.admin;

      // Navigate based on the role
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'Receptionist':
          navigate('/receptionist');
          break;
        case 'Nurse':
          navigate('/nursepage');
          break;
        case 'Doctor':
          navigate('/doctorspage');
          break;
        case 'Pharmacist':
          navigate('/pharmacy');
          break;
        case 'Accountant':
          navigate('/accounts');
          break;
        case 'Laboratory':
          navigate('/labtech');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="health-container">
        <p>Hospital Processes Automation System</p>
      </div>
      <div className="form-container">
        <img src={logo} alt="Logo" className="logo" height="40%" width="40%" />
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="label">
            <i>
              <b>Email</b>
            </i>
          </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="password" className="label">
            <i>
              <b>Password</b>
            </i>
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {!isAdmin && (
            <>
              <label htmlFor="role" className="label">
                <i>
                  <b>Role</b>
                </i>
              </label>
              <br />
              <select
                id="role"
                name="role"
                className="input"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Nurse">Nurse</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Accountant">Accountant</option>
                <option value="Laboratory">Laboratory</option>
              </select>
              <br />
            </>
          )}

          <div>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={isAdmin ? 'active' : ''}
            >
              select Admin
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={!isAdmin ? 'active' : ''}
            >
              select User
            </button>
          </div>

          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="linkContainer">
          <a href="/forgot-password" className="link">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

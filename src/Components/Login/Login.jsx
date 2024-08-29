import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/admin/login',
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/admin'); // Redirect to admin dashboard after successful login
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

          <input type="submit" value="Login" className="submitButton" />
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

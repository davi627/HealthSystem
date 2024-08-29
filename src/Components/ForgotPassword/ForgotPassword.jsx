import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1 className="forgot-password-heading">Input Email</h1>
        <form>
          <label htmlFor="email" className="forgot-password-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="forgot-password-input"
            required
          />
          <button type="submit" className="forgot-password-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

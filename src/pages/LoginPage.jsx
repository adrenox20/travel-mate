import React, { useState } from 'react';

const LoginPage = ({ onLogin, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your TravelPlanner account</p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Sign In</button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('signup')} className="link-button">
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
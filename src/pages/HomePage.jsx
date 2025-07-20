import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faPerson, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';

const HomePage = ({ user, setCurrentPage, trips }) => {
  const stats = [
    { label: 'Total Trips:', value: trips.length },
    { label: 'Planning:', value: trips.filter((t) => t.status === 'planning').length },
    { label: 'Completed:', value: trips.filter((t) => t.status === 'completed').length },
  ];

  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">Discover Your Perfect Destination</h1>
        <p className="hero-subtitle">Find amazing places to visit based on your interests, plan your trips, and create unforgettable memories</p>
        {!user && (
          <div className="hero-actions">
            <button onClick={() => setCurrentPage('signup')} className="btn btn-primary btn-large">Get Started</button>
            <button onClick={() => setCurrentPage('login')} className="btn btn-outline btn-large">Sign In</button>
          </div>
        )}
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><FontAwesomeIcon icon={faPerson} color="blue" /></div>
          <h3>Personalized Recommendations</h3>
          <p>Get destination suggestions based on your interests and travel preferences.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><FontAwesomeIcon icon={faSuitcaseRolling} color="blue" /></div>
          <h3>Trip Planning</h3>
          <p>Plan and organize your trips with accommodation and activity tracking.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><FontAwesomeIcon icon={faCloud} color="blue" /></div>
          <h3>Real-time Weather</h3>
          <p>Check current weather conditions for all recommended destinations.</p>
        </div>
      </div>
      {user && (
        <div className="welcome-section">
          <h2>Welcome back, {user.name}!</h2>
          <div className="welcome-content">
            <div className="welcome-text">
              <p>Ready to explore new destinations?</p>
              <div className="welcome-actions">
                <button onClick={() => setCurrentPage('destinations')} className="btn btn-primary">View Recommendations</button>
                <button onClick={() => setCurrentPage('trips')} className="btn btn-outline">My Trips ({trips.length})</button>
              </div>
            </div>
            <div className="stats-card">
              <h3>Quick Stats</h3>
              <div className="stats-list">
                {stats.map((stat, i) => (
                  <div className="stat-item" key={i}>
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
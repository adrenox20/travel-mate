import React from 'react';
import { interestOptions } from '../data/interests';

const ProfilePage = ({ user, setCurrentPage, trips, selectedInterests, updateInterests }) => {
  if (!user) {
    return (
      <div className="container">
        <h1>Profile</h1>
        <div className="empty-state">
          <p>Please log in to view your profile.</p>
          <button onClick={() => setCurrentPage('login')} className="btn btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="card">
          <div className="card-header">
            <h2>Personal Information</h2>
          </div>
          <div className="card-content">
            <div className="profile-field">
              <label>Name</label>
              <p className="profile-value">{user.name}</p>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <p className="profile-value">{user.email}</p>
            </div>
            <div className="profile-field">
              <label>Member Since</label>
              <p className="profile-note">Recently joined</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Travel Statistics</h2>
          </div>
          <div className="card-content">
            <div className="stats-grid">
              <div className="stat-box stat-blue">
                <div className="stat-number">{trips.length}</div>
                <div className="stat-label">Total Trips</div>
              </div>
              <div className="stat-box stat-green">
                <div className="stat-number">{trips.filter(t => t.status === 'completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-box stat-yellow">
                <div className="stat-number">{trips.filter(t => t.status === 'planning').length}</div>
                <div className="stat-label">Planning</div>
              </div>
              <div className="stat-box stat-purple">
                <div className="stat-number">{selectedInterests.length}</div>
                <div className="stat-label">Interests</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Travel Interests</h2>
            <p>Update your interests to get better destination recommendations</p>
          </div>
          <div className="card-content">
            <div className="interests-grid">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  className={`interest-tag ${selectedInterests.includes(interest) ? 'active' : ''}`}
                  onClick={() => {
                    const newInterests = selectedInterests.includes(interest)
                      ? selectedInterests.filter(i => i !== interest)
                      : [...selectedInterests, interest];
                    updateInterests(newInterests);
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="interests-summary">Selected: {selectedInterests.length} interests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
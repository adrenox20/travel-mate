import React from 'react';

const TripsPage = ({ user, setCurrentPage, trips, setNewTripDialog, updateTripStatus, deleteTrip }) => {
  if (!user) {
    return (
      <div className="container">
        <h1>My Trips</h1>
        <div className="empty-state">
          <p>Please log in to view your trips.</p>
          <button onClick={() => setCurrentPage('login')} className="btn btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>My Trips</h1>
        <button onClick={() => setNewTripDialog(true)} className="btn btn-primary">➕ Plan New Trip</button>
      </div>
      {trips.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h2>No trips planned yet</h2>
          <p>Start planning your first adventure!</p>
          <button onClick={() => setCurrentPage('destinations')} className="btn btn-primary">Explore Destinations</button>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-header">
                <div className="trip-info">
                  <h3>{trip.name}</h3>
                  <p className="trip-destination">{trip.destination.name}, {trip.destination.country}</p>
                </div>
                <span className={`status-badge status-${trip.status}`}>{trip.status}</span>
              </div>
              <div className="trip-content">
                <div className="trip-detail">
                  <strong>Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
                <div className="trip-stats">
                  <div className="trip-stat"><strong>Accommodations:</strong> {trip.selectedAccommodations.length} selected</div>
                  <div className="trip-stat"><strong>Activities:</strong> {trip.selectedActivities.length} selected</div>
                </div>
                {trip.notes && (
                  <div className="trip-notes"><strong>Notes:</strong> {trip.notes}</div>
                )}
                <div className="trip-actions">
                  <select
                    value={trip.status}
                    onChange={e => updateTripStatus(trip.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="planning">Planning</option>
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this trip?')) {
                        deleteTrip(trip.id);
                      }
                    }}
                  >🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
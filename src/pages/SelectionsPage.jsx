import React, { useState } from 'react';

const SelectionsPage = ({ user, setCurrentPage, savedSelections, removeSavedSelection, createTripFromSelections }) => {
  const [selectedForTrip, setSelectedForTrip] = useState([]);
  const [createTripDialog, setCreateTripDialog] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [tripNotes, setTripNotes] = useState("");

  if (!user) {
    return (
      <div className="container">
        <h1>My Selections</h1>
        <div className="empty-state">
          <p>Please log in to view your saved selections.</p>
          <button onClick={() => setCurrentPage('login')} className="btn btn-primary">Login</button>
        </div>
      </div>
    );
  }

  const destinationSelections = savedSelections.filter(s => s.type === 'destination');
  const accommodationSelections = savedSelections.filter(s => s.type === 'accommodation');
  const activitySelections = savedSelections.filter(s => s.type === 'activity');

  const handleCreateTripFromSelections = e => {
    e.preventDefault();
    if (!tripName || !tripStartDate || !tripEndDate) {
      alert('Please fill in all required fields');
      return;
    }
    if (selectedForTrip.length === 0) {
      alert('Please select at least one item for your trip');
      return;
    }
    createTripFromSelections(selectedForTrip, {
      name: tripName,
      startDate: tripStartDate,
      endDate: tripEndDate,
      notes: tripNotes,
    });
    setSelectedForTrip([]);
    setCreateTripDialog(false);
    setTripName("");
    setTripStartDate("");
    setTripEndDate("");
    setTripNotes("");
    alert('Trip created successfully!');
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>My Selections</h1>
        {savedSelections.length > 0 && (
          <button onClick={() => setCreateTripDialog(true)} className="btn btn-primary">➕ Create Trip from Selections</button>
        )}
      </div>
      {savedSelections.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h2>No selections saved yet</h2>
          <p>Start exploring destinations and save what interests you!</p>
          <button onClick={() => setCurrentPage('destinations')} className="btn btn-primary">Explore Destinations</button>
        </div>
      ) : (
        <div className="selections-content">
          {destinationSelections.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>📍 Saved Destinations ({destinationSelections.length})</h2>
              </div>
              <div className="card-content">
                <div className="selections-grid">
                  {destinationSelections.map(selection => {
                    const destination = selection.item;
                    return (
                      <div key={selection.id} className="selection-item">
                        <div className="selection-header">
                          <h4>{destination.name}</h4>
                          <button className="btn btn-icon btn-danger" onClick={() => removeSavedSelection(selection.id)}>🗑️</button>
                        </div>
                        <p className="selection-location">{destination.country}</p>
                        <p className="selection-description">{destination.description}</p>
                        <div className="selection-interests">
                          {destination.interests.map(interest => (
                            <span key={interest} className="interest-tag small inactive">{interest}</span>
                          ))}
                        </div>
                        <p className="selection-date">Saved: {new Date(selection.savedAt).toLocaleDateString()}</p>
                        {selection.notes && <p className="selection-notes">"{selection.notes}"</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {accommodationSelections.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>🏠 Saved Accommodations ({accommodationSelections.length})</h2>
              </div>
              <div className="card-content">
                <div className="selections-grid-2">
                  {accommodationSelections.map(selection => {
                    const accommodation = selection.item;
                    return (
                      <div key={selection.id} className="selection-item">
                        <div className="selection-header">
                          <div>
                            <h4>{accommodation.name}</h4>
                            <p className="selection-location">{selection.destinationName}</p>
                          </div>
                          <button className="btn btn-icon btn-danger" onClick={() => removeSavedSelection(selection.id)}>🗑️</button>
                        </div>
                        <div className="accommodation-meta">
                          <span className="accommodation-type">{accommodation.type}</span>
                          <div className="rating">⭐ {accommodation.rating}</div>
                        </div>
                        <p className="accommodation-price">{accommodation.price}</p>
                        <p className="selection-description">{accommodation.description}</p>
                        <p className="selection-date">Saved: {new Date(selection.savedAt).toLocaleDateString()}</p>
                        {selection.notes && <p className="selection-notes">"{selection.notes}"</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {activitySelections.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>📅 Saved Activities ({activitySelections.length})</h2>
              </div>
              <div className="card-content">
                <div className="selections-grid-2">
                  {activitySelections.map(selection => {
                    const activity = selection.item;
                    return (
                      <div key={selection.id} className="selection-item">
                        <div className="selection-header">
                          <div>
                            <h4>{activity.name}</h4>
                            <p className="selection-location">{selection.destinationName}</p>
                          </div>
                          <button className="btn btn-icon btn-danger" onClick={() => removeSavedSelection(selection.id)}>🗑️</button>
                        </div>
                        <div className="activity-meta">
                          <span className="activity-type">{activity.type}</span>
                          <div className="rating">⭐ {activity.rating}</div>
                        </div>
                        <p className="selection-description">{activity.description}</p>
                        <p className="selection-date">Saved: {new Date(selection.savedAt).toLocaleDateString()}</p>
                        {selection.notes && <p className="selection-notes">"{selection.notes}"</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {createTripDialog && (
        <div className="modal-overlay" onClick={() => setCreateTripDialog(false)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Trip from Selections</h2>
              <button className="modal-close" onClick={() => setCreateTripDialog(false)}>×</button>
            </div>
            <p className="modal-description">Select items from your saved selections to create a new trip</p>
            <form onSubmit={handleCreateTripFromSelections} className="form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="trip-name">Trip Name *</label>
                  <input
                    id="trip-name"
                    type="text"
                    value={tripName}
                    onChange={e => setTripName(e.target.value)}
                    placeholder="e.g., Summer Vacation 2024"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Selected Items: {selectedForTrip.length}</label>
                  <p className="form-note">Choose items below</p>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="start-date">Start Date *</label>
                  <input
                    id="start-date"
                    type="date"
                    value={tripStartDate}
                    onChange={e => setTripStartDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="end-date">End Date *</label>
                  <input
                    id="end-date"
                    type="date"
                    value={tripEndDate}
                    onChange={e => setTripEndDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="trip-notes">Notes</label>
                <textarea
                  id="trip-notes"
                  value={tripNotes}
                  onChange={e => setTripNotes(e.target.value)}
                  placeholder="Any special notes..."
                  className="form-textarea"
                  rows={2}
                />
              </div>
              <div className="selections-list">
                <h4>Select items for your trip:</h4>
                <div className="checkbox-list">
                  {savedSelections.map(selection => {
                    const isSelected = selectedForTrip.includes(selection);
                    const item = selection.item;
                    return (
                      <div
                        key={selection.id}
                        className={`checkbox-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedForTrip(prev => prev.filter(s => s.id !== selection.id));
                          } else {
                            setSelectedForTrip(prev => [...prev, selection]);
                          }
                        }}
                      >
                        <div className="checkbox-content">
                          <input type="checkbox" checked={isSelected} readOnly />
                          <div className="checkbox-info">
                            <p className="checkbox-name">{item.name}</p>
                            <p className="checkbox-meta">{selection.type} • {selection.destinationName}</p>
                          </div>
                        </div>
                        <span className={`selection-type-badge ${selection.type}`}>{selection.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setCreateTripDialog(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={selectedForTrip.length === 0}>Create Trip ({selectedForTrip.length} items)</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionsPage;
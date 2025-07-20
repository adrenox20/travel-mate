import React, { useState } from 'react';
import { destinations } from '../data/destinations';

const NewTripDialog = ({ isOpen, onClose, onCreateTrip, selectedDestination }) => {
  const [tripName, setTripName] = useState("");
  const [tripDestinationId, setTripDestinationId] = useState(selectedDestination?.id || "");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [tripNotes, setTripNotes] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!tripName || !tripDestinationId || !tripStartDate || !tripEndDate) {
      alert('Please fill in all required fields');
      return;
    }
    onCreateTrip({
      name: tripName,
      destinationId: tripDestinationId,
      startDate: tripStartDate,
      endDate: tripEndDate,
      notes: tripNotes,
    });
    setTripName("");
    setTripDestinationId("");
    setTripStartDate("");
    setTripEndDate("");
    setTripNotes("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Plan New Trip</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <p className="modal-description">Create a new trip to start planning your adventure</p>
        <form onSubmit={handleSubmit} className="form">
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
            <label htmlFor="destination">Destination *</label>
            <select
              id="destination"
              value={tripDestinationId}
              onChange={e => setTripDestinationId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select a destination</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>{dest.name}, {dest.country}</option>
              ))}
            </select>
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
              placeholder="Any special notes or requirements..."
              className="form-textarea"
              rows={3}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTripDialog;
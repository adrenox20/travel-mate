import React, { useState } from 'react';
import { destinations } from '../data/destinations';
import { interestOptions } from '../data/interests';
import WeatherWidget from '../components/WeatherWidget';

const DestinationsPage = ({
  user,
  selectedInterests,
  updateInterests,
  weatherData,
  setWeatherData,
  savedSelections,
  saveDestination,
  saveAccommodation,
  saveActivity,
  setNewTripDialog,
  setSelectedDestination
}) => {
  const [activeTab, setActiveTab] = useState({});

  const getRecommendedDestinations = () => {
    if (selectedInterests.length === 0) return destinations;
    return destinations
      .filter(dest => dest.interests.some(interest => selectedInterests.includes(interest)))
      .sort((a, b) => {
        const aMatches = a.interests.filter(interest => selectedInterests.includes(interest)).length;
        const bMatches = b.interests.filter(interest => selectedInterests.includes(interest)).length;
        return bMatches - aMatches;
      });
  };

  const recommendedDestinations = getRecommendedDestinations();

  const setTabForDestination = (destinationId, tab) => {
    setActiveTab(prev => ({ ...prev, [destinationId]: tab }));
  };

  const getActiveTab = destinationId => activeTab[destinationId] || 'accommodations';

  return (
    <div className="container">
      <div className="page-header">
        <h1>Destinations</h1>
        {user && (
          <button onClick={() => setNewTripDialog(true)} className="btn btn-primary">➕ Plan New Trip</button>
        )}
      </div>
      <div className="card interests-card">
        <div className="card-header">
          <h2>Select Your Interests</h2>
          <p>Choose what you're interested in to get personalized recommendations</p>
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
          {selectedInterests.length > 0 && (
            <p className="interests-summary">
              Selected {selectedInterests.length} interests • Showing {recommendedDestinations.length} destinations
            </p>
          )}
        </div>
      </div>
      <div className="destinations-grid">
        {recommendedDestinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <div className="destination-image-container">
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
              />
              <div className="destination-weather">
                <WeatherWidget
                  destination={destination}
                  weatherData={weatherData}
                  setWeatherData={setWeatherData}
                />
              </div>
              {user && (
                <div className="destination-actions">
                  <button
                    className="btn btn-small btn-white"
                    onClick={() => saveDestination(destination)}
                    disabled={savedSelections.some(s => s.type === 'destination' && s.item.id === destination.id)}
                  >
                    ⭐ {savedSelections.some(s => s.type === 'destination' && s.item.id === destination.id) ? 'Saved' : 'Save'}
                  </button>
                  <button
                    className="btn btn-small btn-primary"
                    onClick={() => {
                      setSelectedDestination(destination);
                      setNewTripDialog(true);
                    }}
                  >
                    ➕ Plan Trip
                  </button>
                </div>
              )}
            </div>
            <div className="destination-content">
              <div className="destination-header">
                <h3>{destination.name}</h3>
                <span className="country-badge">{destination.country}</span>
              </div>
              <p className="destination-description">{destination.description}</p>
              <div className="destination-interests">
                <h4>Interests:</h4>
                <div className="interests-tags">
                  {destination.interests.map(interest => (
                    <span
                      key={interest}
                      className={`interest-tag small ${selectedInterests.includes(interest) ? 'active' : 'inactive'}`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="tabs">
                <div className="tab-buttons">
                  <button
                    className={`tab-button ${getActiveTab(destination.id) === 'accommodations' ? 'active' : ''}`}
                    onClick={() => setTabForDestination(destination.id, 'accommodations')}
                  >
                    Hotels
                  </button>
                  <button
                    className={`tab-button ${getActiveTab(destination.id) === 'activities' ? 'active' : ''}`}
                    onClick={() => setTabForDestination(destination.id, 'activities')}
                  >
                    Activities
                  </button>
                  <button
                    className={`tab-button ${getActiveTab(destination.id) === 'map' ? 'active' : ''}`}
                    onClick={() => setTabForDestination(destination.id, 'map')}
                  >
                    Map
                  </button>
                </div>
                <div className="tab-content">
                  {getActiveTab(destination.id) === 'accommodations' && (
                    <div className="accommodations-list">
                      {destination.accommodations.map(acc => (
                        <div key={acc.id} className="accommodation-item">
                          <div className="accommodation-header">
                            <h5>{acc.name}</h5>
                            <div className="accommodation-meta">
                              <div className="rating">⭐ {acc.rating}</div>
                              {user && (
                                <button
                                  className="btn btn-icon"
                                  onClick={() => saveAccommodation(acc, destination)}
                                  disabled={savedSelections.some(s => s.type === 'accommodation' && s.item.id === acc.id)}
                                >
                                  <span className={savedSelections.some(s => s.type === 'accommodation' && s.item.id === acc.id) ? 'saved' : ''}>⭐</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="accommodation-details">{acc.type} • {acc.price}</p>
                          <p className="accommodation-description">{acc.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {getActiveTab(destination.id) === 'activities' && (
                    <div className="activities-list">
                      {destination.activities.map(activity => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-header">
                            <h5>{activity.name}</h5>
                            <div className="activity-meta">
                              <div className="rating">⭐ {activity.rating}</div>
                              {user && (
                                <button
                                  className="btn btn-icon"
                                  onClick={() => saveActivity(activity, destination)}
                                  disabled={savedSelections.some(s => s.type === 'activity' && s.item.id === activity.id)}
                                >
                                  <span className={savedSelections.some(s => s.type === 'activity' && s.item.id === activity.id) ? 'saved' : ''}>⭐</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="activity-type">{activity.type}</p>
                          <p className="activity-description">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {getActiveTab(destination.id) === 'map' && (
                    <div className="map-container">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${destination.coordinates.lng}!3d${destination.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${destination.coordinates.lat},${destination.coordinates.lng}!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="map-iframe"
                      />
                      <button
                        className="btn btn-outline btn-full"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`,
                            '_blank'
                          )
                        }
                      >
                        🗺️ Open in Google Maps
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {recommendedDestinations.length === 0 && (
        <div className="empty-state">
          <p>No destinations match your selected interests.</p>
          <p className="empty-state-subtitle">Try selecting different interests above.</p>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
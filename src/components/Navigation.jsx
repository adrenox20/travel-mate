import React from 'react';

const Navigation = ({ currentPage, setCurrentPage, user, handleLogout, savedSelections, trips }) => (
  <nav className="navbar">
    <div className="nav-container">
      <h1 className="nav-title">TravelPlanner</h1>
      <div className="nav-links">
        <button
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        > Home</button>
        <button
          className={`nav-button ${currentPage === 'destinations' ? 'active' : ''}`}
          onClick={() => setCurrentPage('destinations')}
        > Destinations</button>
        {user && <>
          <button
            className={`nav-button ${currentPage === 'selections' ? 'active' : ''}`}
            onClick={() => setCurrentPage('selections')}
          > My Selections ({savedSelections.length})</button>
          <button
            className={`nav-button ${currentPage === 'trips' ? 'active' : ''}`}
            onClick={() => setCurrentPage('trips')}
          > My Trips ({trips.length})</button>
        </>}
        <button
          className={`nav-button ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => setCurrentPage('contact')}
        > Contact</button>
        {user ? <>
          <button
            className={`nav-button ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >Profile</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </> : <>
          <button
            className={`nav-button ${currentPage === 'login' ? 'active' : ''}`}
            onClick={() => setCurrentPage('login')}
          >Login</button>
          <button
            className={`nav-button ${currentPage === 'signup' ? 'active' : ''}`}
            onClick={() => setCurrentPage('signup')}
          > Sign Up</button>
        </>}
      </div>
    </div>
  </nav>
);

export default Navigation;
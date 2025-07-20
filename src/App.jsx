import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import NewTripDialog from './components/NewTripDialog';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import TripsPage from './pages/TripsPage';
import SelectionsPage from './pages/SelectionsPage';
import { destinations } from './data/destinations';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [trips, setTrips] = useState([]);
  const [savedSelections, setSavedSelections] = useState([]);
  const [newTripDialog, setNewTripDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("travelPlannerUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setSelectedInterests(userData.interests || []);
    }
    const savedTrips = localStorage.getItem("travelPlannerTrips");
    if (savedTrips) setTrips(JSON.parse(savedTrips));
    const savedSelectionsData = localStorage.getItem("travelPlannerSelections");
    if (savedSelectionsData) setSavedSelections(JSON.parse(savedSelectionsData));
  }, []);

  const saveUserData = (userData) => {
    localStorage.setItem("travelPlannerUser", JSON.stringify(userData));
    setUser(userData);
  };

  const saveTrips = (tripsData) => {
    localStorage.setItem("travelPlannerTrips", JSON.stringify(tripsData));
    setTrips(tripsData);
  };

  const saveSavedSelections = (selectionsData) => {
    localStorage.setItem("travelPlannerSelections", JSON.stringify(selectionsData));
    setSavedSelections(selectionsData);
  };

  const handleLogin = (email, password) => {
    const userData = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email: email,
      interests: selectedInterests,
    };
    saveUserData(userData);
    setCurrentPage("home");
  };

  const handleSignup = (name, email, password) => {
    const userData = {
      id: Date.now().toString(),
      name: name,
      email: email,
      interests: [],
    };
    saveUserData(userData);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("travelPlannerUser");
    setUser(null);
    setSelectedInterests([]);
    setCurrentPage("home");
  };

  const updateInterests = (interests) => {
    setSelectedInterests(interests);
    if (user) {
      const updatedUser = { ...user, interests };
      saveUserData(updatedUser);
    }
  };

  const createTrip = (tripData) => {
    if (!user) return;
    const destination = destinations.find((d) => d.id === tripData.destinationId);
    if (!destination) return;
    const newTrip = {
      id: Date.now().toString(),
      name: tripData.name,
      destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      selectedAccommodations: [],
      selectedActivities: [],
      notes: tripData.notes,
      status: "planning",
      createdAt: new Date().toISOString(),
    };
    const updatedTrips = [...trips, newTrip];
    saveTrips(updatedTrips);
    setNewTripDialog(false);
  };

  const deleteTrip = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    saveTrips(updatedTrips);
  };

  const updateTripStatus = (tripId, status) => {
    const updatedTrips = trips.map((trip) => (trip.id === tripId ? { ...trip, status } : trip));
    saveTrips(updatedTrips);
  };

  const saveDestination = (destination, notes = "") => {
    if (!user) {
      alert("Please login to save selections");
      return;
    }
    const existingSelection = savedSelections.find((s) => s.type === "destination" && s.item.id === destination.id);
    if (existingSelection) {
      alert("Destination already saved!");
      return;
    }
    const newSelection = {
      id: Date.now().toString(),
      type: "destination",
      destinationId: destination.id,
      destinationName: destination.name,
      item: destination,
      savedAt: new Date().toISOString(),
      notes,
    };
    const updatedSelections = [...savedSelections, newSelection];
    saveSavedSelections(updatedSelections);
  };

  const saveAccommodation = (accommodation, destination, notes = "") => {
    if (!user) {
      alert("Please login to save selections");
      return;
    }
    const existingSelection = savedSelections.find((s) => s.type === "accommodation" && s.item.id === accommodation.id);
    if (existingSelection) {
      alert("Accommodation already saved!");
      return;
    }
    const newSelection = {
      id: Date.now().toString(),
      type: "accommodation",
      destinationId: destination.id,
      destinationName: destination.name,
      item: accommodation,
      savedAt: new Date().toISOString(),
      notes,
    };
    const updatedSelections = [...savedSelections, newSelection];
    saveSavedSelections(updatedSelections);
  };

  const saveActivity = (activity, destination, notes = "") => {
    if (!user) {
      alert("Please login to save selections");
      return;
    }
    const existingSelection = savedSelections.find((s) => s.type === "activity" && s.item.id === activity.id);
    if (existingSelection) {
      alert("Activity already saved!");
      return;
    }
    const newSelection = {
      id: Date.now().toString(),
      type: "activity",
      destinationId: destination.id,
      destinationName: destination.name,
      item: activity,
      savedAt: new Date().toISOString(),
      notes,
    };
    const updatedSelections = [...savedSelections, newSelection];
    saveSavedSelections(updatedSelections);
  };

  const removeSavedSelection = (selectionId) => {
    const updatedSelections = savedSelections.filter((s) => s.id !== selectionId);
    saveSavedSelections(updatedSelections);
  };

  const createTripFromSelections = (selectedItems, tripData) => {
    if (!user) return;
    const destinationGroups = selectedItems.reduce((acc, selection) => {
      if (!acc[selection.destinationId]) {
        acc[selection.destinationId] = {
          destination: destinations.find((d) => d.id === selection.destinationId),
          accommodations: [],
          activities: [],
        };
      }
      if (selection.type === "accommodation") {
        acc[selection.destinationId].accommodations.push(selection.item);
      } else if (selection.type === "activity") {
        acc[selection.destinationId].activities.push(selection.item);
      }
      return acc;
    }, {});
    Object.values(destinationGroups).forEach((group) => {
      const newTrip = {
        id: Date.now().toString() + Math.random(),
        name: `${tripData.name} - ${group.destination.name}`,
        destination: group.destination,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        selectedAccommodations: group.accommodations,
        selectedActivities: group.activities,
        notes: tripData.notes,
        status: "planning",
        createdAt: new Date().toISOString(),
      };
      const updatedTrips = [...trips, newTrip];
      saveTrips(updatedTrips);
    });
    const updatedSelections = savedSelections.filter((s) => !selectedItems.includes(s));
    saveSavedSelections(updatedSelections);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage user={user} setCurrentPage={setCurrentPage} trips={trips} />;
      case "destinations":
        return (
          <DestinationsPage
            user={user}
            selectedInterests={selectedInterests}
            updateInterests={updateInterests}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            savedSelections={savedSelections}
            saveDestination={saveDestination}
            saveAccommodation={saveAccommodation}
            saveActivity={saveActivity}
            setNewTripDialog={setNewTripDialog}
            setSelectedDestination={setSelectedDestination}
          />
        );
      case "selections":
        return (
          <SelectionsPage
            user={user}
            setCurrentPage={setCurrentPage}
            savedSelections={savedSelections}
            removeSavedSelection={removeSavedSelection}
            createTripFromSelections={createTripFromSelections}
          />
        );
      case "trips":
        return (
          <TripsPage
            user={user}
            setCurrentPage={setCurrentPage}
            trips={trips}
            setNewTripDialog={setNewTripDialog}
            updateTripStatus={updateTripStatus}
            deleteTrip={deleteTrip}
          />
        );
      case "contact":
        return <ContactPage />;
      case "profile":
        return (
          <ProfilePage
            user={user}
            setCurrentPage={setCurrentPage}
            trips={trips}
            selectedInterests={selectedInterests}
            updateInterests={updateInterests}
          />
        );
      case "login":
        return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />;
      case "signup":
        return <SignupPage onSignup={handleSignup} setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage user={user} setCurrentPage={setCurrentPage} trips={trips} />;
    }
  };

  return (
    <div className="app">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        handleLogout={handleLogout}
        savedSelections={savedSelections}
        trips={trips}
      />
      <main className="main-content">{renderCurrentPage()}</main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 TravelPlanner. All rights reserved.</p>
          <p className="footer-subtitle">Discover amazing destinations around the world</p>
        </div>
      </footer>
      {newTripDialog && (
        <NewTripDialog
          isOpen={newTripDialog}
          onClose={() => setNewTripDialog(false)}
          onCreateTrip={createTrip}
          selectedDestination={selectedDestination}
        />
      )}
    </div>
  );
}

export default App;
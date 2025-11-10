import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  useEffect(() => {
    console.log('OctoFit Tracker App initialized');
    console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
    console.log('Backend API Base URL:', process.env.REACT_APP_CODESPACE_NAME 
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
      : 'http://localhost:8000/api/');
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, var(--primary-color), var(--info-color))'}}>
          <div className="container">
            <Link className="navbar-brand" to="/">🐙 OctoFit Tracker</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-activity me-1"></i>Activities
                </Link>
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy me-1"></i>Leaderboard
                </Link>
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people me-1"></i>Teams
                </Link>
                <Link className="nav-link" to="/users">
                  <i className="bi bi-person me-1"></i>Users
                </Link>
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-lightning me-1"></i>Workouts
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="container-fluid px-4 py-3">
          <Routes>
            <Route path="/" element={
              <div className="jumbotron-custom fade-in-up">
                <h1 className="display-3">🏋️ Welcome to OctoFit Tracker</h1>
                <p className="lead">Your ultimate fitness tracking companion</p>
                <hr className="my-4" style={{borderColor: 'rgba(255, 255, 255, 0.3)'}} />
                <p className="mb-4">Track activities, compete with teams, and achieve your fitness goals!</p>
                <div className="d-flex gap-3 justify-content-center">
                  <Link className="btn btn-custom-primary btn-lg" to="/activities">
                    <i className="bi bi-play-circle me-2"></i>Get Started
                  </Link>
                  <Link className="btn btn-outline-light btn-lg" to="/leaderboard">
                    <i className="bi bi-trophy me-2"></i>View Leaderboard
                  </Link>
                </div>
              </div>
            } />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

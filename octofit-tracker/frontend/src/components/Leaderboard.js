import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard component mounted');
    console.log('API URL:', API_URL);
    
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        console.log('Leaderboard API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        <strong>Error loading leaderboard:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-trophy me-3"></i>Leaderboard
          </h1>
          <p className="page-subtitle">See who's leading the fitness challenge</p>
        </div>
      </div>

      <div className="container">
        {leaderboard.length > 0 ? (
          <div className="custom-table">
            <table className="table table-hover mb-0">
              <thead className="table-header">
                <tr>
                  <th scope="col" className="text-white text-center">
                    <i className="bi bi-award me-2"></i>Rank
                  </th>
                  <th scope="col" className="text-white">
                    <i className="bi bi-person me-2"></i>User
                  </th>
                  <th scope="col" className="text-white text-center">
                    <i className="bi bi-star me-2"></i>Points
                  </th>
                  <th scope="col" className="text-white text-center">
                    <i className="bi bi-activity me-2"></i>Activities
                  </th>
                  <th scope="col" className="text-white text-center">
                    <i className="bi bi-fire me-2"></i>Total Calories
                  </th>
                  <th scope="col" className="text-white text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index} className="table-row">
                    <td className="text-center">
                      <div className={`badge-rank ${
                        index === 0 ? 'bg-warning text-dark' : 
                        index === 1 ? 'bg-secondary text-white' : 
                        index === 2 ? 'bg-danger text-white' : 'bg-primary text-white'
                      }`}>
                        {index === 0 ? '🥇' :
                         index === 1 ? '🥈' :
                         index === 2 ? '🥉' : (index + 1)}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          {(entry.user_name || entry.username || entry.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong className="d-block">
                            {entry.user_name || entry.username || entry.name || 'Unknown User'}
                          </strong>
                          {entry.team_name && (
                            <small className="text-muted">
                              <i className="bi bi-people me-1"></i>Team {entry.team_name}
                            </small>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-custom bg-success fs-6">
                        <i className="bi bi-star me-1"></i>
                        {entry.points || entry.score || 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-custom bg-info">
                        <i className="bi bi-activity me-1"></i>
                        {entry.total_activities || entry.activities_count || 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-custom bg-warning text-dark">
                        <i className="bi bi-fire me-1"></i>
                        {entry.total_calories || entry.calories_burned || 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary" title="View Profile">
                          <i className="bi bi-person"></i>
                        </button>
                        <button type="button" className="btn btn-outline-success" title="Challenge">
                          <i className="bi bi-lightning"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info alert-custom d-inline-block">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No leaderboard data available!</strong>
              <p className="mb-3 mt-2">Start competing with other users to see rankings here.</p>
              <button className="btn btn-custom-primary">
                <i className="bi bi-trophy me-2"></i>Join Competition
              </button>
            </div>
          </div>
        )}

        {/* Top 3 Podium for mobile */}
        {leaderboard.length >= 3 && (
          <div className="d-md-none mt-4">
            <div className="row text-center">
              <div className="col-12 mb-3">
                <h4 className="text-gradient">🏆 Top 3 Champions</h4>
              </div>
              {leaderboard.slice(0, 3).map((entry, index) => (
                <div key={entry.id || index} className="col-4">
                  <div className="card custom-card">
                    <div className="card-body p-3">
                      <div className={`badge-rank mx-auto mb-2 ${
                        index === 0 ? 'bg-warning text-dark' : 
                        index === 1 ? 'bg-secondary text-white' : 'bg-danger text-white'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <h6 className="card-title">
                        {(entry.user_name || entry.username || entry.name || 'Unknown').substring(0, 10)}
                      </h6>
                      <p className="card-text">
                        <span className="badge bg-success">
                          {entry.points || entry.score || 0} pts
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users component mounted');
    console.log('API URL:', API_URL);
    
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        console.log('Users API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
        <strong>Error loading users:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-person me-3"></i>Users
          </h1>
          <p className="page-subtitle">Connect with fellow fitness enthusiasts</p>
        </div>
      </div>

      <div className="container">
        {users.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            <div className="row g-4">
              {users.map((user) => (
                <div key={user.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="card custom-card text-center">
                    <div className="card-body">
                      <div className="avatar mx-auto mb-3">
                        {(user.username || user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      
                      <h5 className="card-title mb-1">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}`
                          : user.username || user.name || 'Unknown User'}
                      </h5>
                      
                      <p className="text-muted mb-3">@{user.username || 'unknown'}</p>

                      {user.bio && (
                        <p className="card-text mb-3 text-muted" style={{fontSize: '0.9rem'}}>
                          {user.bio.length > 80 ? user.bio.substring(0, 80) + '...' : user.bio}
                        </p>
                      )}

                      <div className="row text-center mb-3">
                        {user.total_activities && (
                          <div className="col-4">
                            <span className="badge badge-custom bg-info fs-6">
                              {user.total_activities}
                            </span>
                            <br />
                            <small className="text-muted">Activities</small>
                          </div>
                        )}
                        
                        {user.total_points && (
                          <div className="col-4">
                            <span className="badge badge-custom bg-success fs-6">
                              {user.total_points}
                            </span>
                            <br />
                            <small className="text-muted">Points</small>
                          </div>
                        )}
                        
                        {user.streak && (
                          <div className="col-4">
                            <span className="badge badge-custom bg-warning text-dark fs-6">
                              {user.streak}
                            </span>
                            <br />
                            <small className="text-muted">Day Streak</small>
                          </div>
                        )}
                      </div>

                      {user.team && (
                        <div className="mb-3">
                          <span className="badge bg-primary">
                            <i className="bi bi-people me-1"></i>Team {user.team}
                          </span>
                        </div>
                      )}

                      <div className="mb-3">
                        {user.is_active && (
                          <span className="badge bg-success me-1">
                            <i className="bi bi-check-circle me-1"></i>Active
                          </span>
                        )}
                        {user.is_staff && (
                          <span className="badge bg-warning text-dark me-1">
                            <i className="bi bi-shield me-1"></i>Staff
                          </span>
                        )}
                        {user.is_premium && (
                          <span className="badge bg-gradient-primary me-1">
                            <i className="bi bi-star me-1"></i>Premium
                          </span>
                        )}
                      </div>

                      {user.date_joined && (
                        <p className="card-text mb-3">
                          <small className="text-muted">
                            <i className="bi bi-calendar me-1"></i>
                            Joined: {new Date(user.date_joined).toLocaleDateString()}
                          </small>
                        </p>
                      )}

                      {user.level && (
                        <div className="mb-3">
                          <div className="progress" style={{height: '8px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              role="progressbar" 
                              style={{width: `${(user.level % 1) * 100}%`}}
                            ></div>
                          </div>
                          <small className="text-muted">Level {Math.floor(user.level || 1)}</small>
                        </div>
                      )}
                    </div>
                    
                    <div className="card-footer">
                      <div className="d-flex justify-content-between gap-1">
                        <button className="btn btn-outline-primary btn-sm flex-fill" title="View Profile">
                          <i className="bi bi-person"></i>
                        </button>
                        <button className="btn btn-custom-primary btn-sm flex-fill" title="Send Message">
                          <i className="bi bi-chat"></i>
                        </button>
                        <button className="btn btn-outline-success btn-sm flex-fill" title="Challenge">
                          <i className="bi bi-lightning"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Statistics */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card custom-card border-gradient">
                  <div className="card-body text-center">
                    <h5 className="card-title text-gradient">
                      <i className="bi bi-people me-2"></i>Community Statistics
                    </h5>
                    <div className="row">
                      <div className="col-md-3 col-6">
                        <h3 className="text-primary">{users.length}</h3>
                        <small className="text-muted">Total Users</small>
                      </div>
                      <div className="col-md-3 col-6">
                        <h3 className="text-success">
                          {users.filter(user => user.is_active).length}
                        </h3>
                        <small className="text-muted">Active Users</small>
                      </div>
                      <div className="col-md-3 col-6">
                        <h3 className="text-warning">
                          {Math.round(users.reduce((acc, user) => acc + (user.total_points || 0), 0) / users.length) || 0}
                        </h3>
                        <small className="text-muted">Avg Points</small>
                      </div>
                      <div className="col-md-3 col-6">
                        <h3 className="text-info">
                          {users.reduce((acc, user) => acc + (user.total_activities || 0), 0)}
                        </h3>
                        <small className="text-muted">Total Activities</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info alert-custom d-inline-block">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No users found!</strong>
              <p className="mb-3 mt-2">Be the first to join our fitness community.</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-custom-primary">
                  <i className="bi bi-person-plus me-2"></i>Invite Friends
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>Search Users
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams component mounted');
    console.log('API URL:', API_URL);
    
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        console.log('Teams API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
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
        <strong>Error loading teams:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-people me-3"></i>Teams
          </h1>
          <p className="page-subtitle">Join a team and compete together</p>
        </div>
      </div>

      <div className="container">
        {teams.length > 0 ? (
          <div className="row g-4">
            {teams.map((team) => (
              <div key={team.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card custom-card">
                  <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          <i className="bi bi-people"></i>
                        </div>
                        <h5 className="mb-0">
                          {team.name || team.team_name || 'Team'}
                        </h5>
                      </div>
                      {team.is_public !== false && (
                        <span className="badge bg-success">
                          <i className="bi bi-unlock me-1"></i>Open
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <p className="card-text mb-3">
                      {team.description || 'No description available'}
                    </p>
                    
                    <div className="row text-center mb-3">
                      {team.members_count && (
                        <div className="col-4">
                          <div className="d-flex flex-column align-items-center">
                            <span className="badge badge-custom bg-info fs-6">
                              {team.members_count}
                            </span>
                            <small className="text-muted mt-1">Members</small>
                          </div>
                        </div>
                      )}
                      
                      {team.total_points && (
                        <div className="col-4">
                          <div className="d-flex flex-column align-items-center">
                            <span className="badge badge-custom bg-warning text-dark fs-6">
                              {team.total_points}
                            </span>
                            <small className="text-muted mt-1">Points</small>
                          </div>
                        </div>
                      )}
                      
                      {team.rank && (
                        <div className="col-4">
                          <div className="d-flex flex-column align-items-center">
                            <span className="badge badge-custom bg-success fs-6">
                              #{team.rank}
                            </span>
                            <small className="text-muted mt-1">Rank</small>
                          </div>
                        </div>
                      )}
                    </div>

                    {team.captain && (
                      <div className="mb-3">
                        <strong className="text-muted">
                          <i className="bi bi-person-badge me-1"></i>Captain:
                        </strong>
                        <span className="ms-2">{team.captain}</span>
                      </div>
                    )}

                    {team.created_date && (
                      <div className="mb-3">
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          Created: {new Date(team.created_date).toLocaleDateString()}
                        </small>
                      </div>
                    )}

                    {team.tags && team.tags.length > 0 && (
                      <div className="mb-3">
                        {team.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <div className="d-flex justify-content-between gap-2">
                      <button className="btn btn-outline-primary btn-sm flex-fill">
                        <i className="bi bi-eye me-1"></i>View Details
                      </button>
                      <button className="btn btn-custom-primary btn-sm flex-fill">
                        <i className="bi bi-person-plus me-1"></i>Join Team
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-chat"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info alert-custom d-inline-block">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No teams found!</strong>
              <p className="mb-3 mt-2">Be the first to create a team and start competing!</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-custom-primary">
                  <i className="bi bi-plus-circle me-2"></i>Create New Team
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>Search Teams
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Section */}
        {teams.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="card custom-card border-gradient">
                <div className="card-body text-center">
                  <h5 className="card-title text-gradient">
                    <i className="bi bi-graph-up me-2"></i>Team Statistics
                  </h5>
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <h3 className="text-primary">{teams.length}</h3>
                      <small className="text-muted">Total Teams</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <h3 className="text-success">
                        {teams.reduce((acc, team) => acc + (team.members_count || 0), 0)}
                      </h3>
                      <small className="text-muted">Total Members</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <h3 className="text-warning">
                        {teams.reduce((acc, team) => acc + (team.total_points || 0), 0)}
                      </h3>
                      <small className="text-muted">Total Points</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <h3 className="text-info">
                        {Math.round(teams.reduce((acc, team) => acc + (team.members_count || 0), 0) / teams.length)}
                      </h3>
                      <small className="text-muted">Avg Team Size</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities component mounted');
    console.log('API URL:', API_URL);
    
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        console.log('Activities API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
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
        <strong>Error loading activities:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-activity me-3"></i>Activities
          </h1>
          <p className="page-subtitle">Track and manage your fitness activities</p>
        </div>
      </div>

      <div className="container">
        {activities.length > 0 ? (
          <>
            {/* Table View for larger screens */}
            <div className="d-none d-lg-block">
              <div className="custom-table">
                <table className="table table-hover mb-0">
                  <thead className="table-header">
                    <tr>
                      <th scope="col" className="text-white">
                        <i className="bi bi-hash me-2"></i>Activity
                      </th>
                      <th scope="col" className="text-white">
                        <i className="bi bi-clock me-2"></i>Duration
                      </th>
                      <th scope="col" className="text-white">
                        <i className="bi bi-fire me-2"></i>Calories
                      </th>
                      <th scope="col" className="text-white">
                        <i className="bi bi-calendar me-2"></i>Date
                      </th>
                      <th scope="col" className="text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id} className="table-row">
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm me-3">
                              🏃
                            </div>
                            <div>
                              <strong>{activity.name || activity.title || 'Activity'}</strong>
                              <br />
                              <small className="text-muted">
                                {activity.description ? 
                                  (activity.description.length > 50 ? 
                                    activity.description.substring(0, 50) + '...' : 
                                    activity.description) : 
                                  'No description'}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-custom bg-info">
                            {activity.duration ? `${activity.duration} min` : 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-custom bg-warning text-dark">
                            {activity.calories_burned ? `${activity.calories_burned} cal` : 'N/A'}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}
                          </small>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-outline-primary">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card View for smaller screens */}
            <div className="d-lg-none">
              <div className="row g-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="col-12">
                    <div className="card custom-card">
                      <div className="card-header">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm me-3">🏃</div>
                          <h6 className="mb-0">{activity.name || activity.title || 'Activity'}</h6>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text mb-3">
                          {activity.description || 'No description available'}
                        </p>
                        <div className="row text-center">
                          <div className="col-4">
                            <span className="badge badge-custom bg-info">
                              {activity.duration ? `${activity.duration} min` : 'N/A'}
                            </span>
                            <br />
                            <small className="text-muted">Duration</small>
                          </div>
                          <div className="col-4">
                            <span className="badge badge-custom bg-warning text-dark">
                              {activity.calories_burned ? `${activity.calories_burned} cal` : 'N/A'}
                            </span>
                            <br />
                            <small className="text-muted">Calories</small>
                          </div>
                          <div className="col-4">
                            <small className="d-block fw-bold">
                              {activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}
                            </small>
                            <small className="text-muted">Date</small>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="bi bi-eye me-1"></i>View Details
                          </button>
                          <button className="btn btn-primary btn-sm">
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info alert-custom d-inline-block">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No activities found!</strong>
              <p className="mb-3 mt-2">Start tracking your fitness journey today.</p>
              <button className="btn btn-custom-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Your First Activity
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
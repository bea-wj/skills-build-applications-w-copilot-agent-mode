import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts component mounted');
    console.log('API URL:', API_URL);
    
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        console.log('Workouts API Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API Response Data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [API_URL]);

  const getDifficultyBadge = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'hard':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getWorkoutTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'cardio':
        return '❤️';
      case 'strength':
        return '💪';
      case 'flexibility':
        return '🤸';
      case 'endurance':
        return '🏃';
      default:
        return '🏋️';
    }
  };

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
        <strong>Error loading workouts:</strong> {error}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-lightning me-3"></i>Workouts
          </h1>
          <p className="page-subtitle">Personalized workout plans tailored for you</p>
        </div>
      </div>

      <div className="container">
        {workouts.length > 0 ? (
          <>
            {/* Filter and Sort Bar */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card custom-card">
                  <div className="card-body py-3">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-light text-dark">All Workouts</span>
                        <span className="badge bg-success">Easy</span>
                        <span className="badge bg-warning">Medium</span>
                        <span className="badge bg-danger">Hard</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-funnel me-1"></i>Filter
                        </button>
                        <button className="btn btn-custom-primary btn-sm">
                          <i className="bi bi-plus-circle me-1"></i>Create Workout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workouts Grid */}
            <div className="row g-4">
              {workouts.map((workout) => (
                <div key={workout.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card custom-card">
                    <div className="card-header">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="me-3" style={{fontSize: '1.5rem'}}>
                            {getWorkoutTypeIcon(workout.type)}
                          </span>
                          <h6 className="mb-0">
                            {workout.name || workout.title || 'Workout'}
                          </h6>
                        </div>
                        <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                          {workout.difficulty || 'Medium'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="card-body">
                      <p className="card-text mb-3" style={{fontSize: '0.9rem'}}>
                        {workout.description ? 
                          (workout.description.length > 100 ? 
                            workout.description.substring(0, 100) + '...' : 
                            workout.description) : 
                          'No description available'}
                      </p>
                      
                      {/* Workout Stats */}
                      <div className="row text-center mb-3">
                        <div className="col-4">
                          <span className="badge badge-custom bg-info fs-6">
                            <i className="bi bi-clock me-1"></i>
                            {workout.duration ? `${workout.duration}` : '30'}
                          </span>
                          <br />
                          <small className="text-muted">Minutes</small>
                        </div>
                        <div className="col-4">
                          <span className="badge badge-custom bg-warning text-dark fs-6">
                            <i className="bi bi-fire me-1"></i>
                            {workout.calories_target || '250'}
                          </span>
                          <br />
                          <small className="text-muted">Calories</small>
                        </div>
                        <div className="col-4">
                          <span className="badge badge-custom bg-success fs-6">
                            <i className="bi bi-list-ul me-1"></i>
                            {workout.exercises_count || '8'}
                          </span>
                          <br />
                          <small className="text-muted">Exercises</small>
                        </div>
                      </div>
                      
                      {/* Muscle Groups */}
                      {workout.muscle_groups && workout.muscle_groups.length > 0 && (
                        <div className="mb-3">
                          <strong className="d-block mb-2">
                            <i className="bi bi-person-arms-up me-1"></i>Target Muscles:
                          </strong>
                          <div className="d-flex flex-wrap gap-1">
                            {workout.muscle_groups.slice(0, 3).map((muscle, index) => (
                              <span key={index} className="badge bg-light text-dark">
                                {muscle}
                              </span>
                            ))}
                            {workout.muscle_groups.length > 3 && (
                              <span className="badge bg-secondary">
                                +{workout.muscle_groups.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Equipment */}
                      {workout.equipment && workout.equipment.length > 0 && (
                        <div className="mb-3">
                          <strong className="d-block mb-2">
                            <i className="bi bi-gear me-1"></i>Equipment:
                          </strong>
                          <div className="d-flex flex-wrap gap-1">
                            {workout.equipment.slice(0, 2).map((item, index) => (
                              <span key={index} className="badge bg-info text-white">
                                {item}
                              </span>
                            ))}
                            {workout.equipment.length > 2 && (
                              <span className="badge bg-secondary">
                                +{workout.equipment.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Rating */}
                      {workout.rating && (
                        <div className="mb-3 text-center">
                          <div className="d-flex justify-content-center align-items-center">
                            <span className="me-2">
                              {'⭐'.repeat(Math.floor(workout.rating))}
                              {'☆'.repeat(5 - Math.floor(workout.rating))}
                            </span>
                            <small className="text-muted">({workout.rating}/5)</small>
                          </div>
                        </div>
                      )}
                      
                      {/* Date */}
                      {workout.created_date && (
                        <small className="text-muted d-block text-center">
                          <i className="bi bi-calendar me-1"></i>
                          Created: {new Date(workout.created_date).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                    
                    <div className="card-footer">
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-outline-primary btn-sm flex-fill"
                          data-bs-toggle="modal" 
                          data-bs-target={`#workoutModal${workout.id}`}
                        >
                          <i className="bi bi-eye me-1"></i>Details
                        </button>
                        <button className="btn btn-custom-success btn-sm flex-fill">
                          <i className="bi bi-play-circle me-1"></i>Start
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Workout Detail Modal */}
                  <div className="modal fade" id={`workoutModal${workout.id}`} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">
                            {getWorkoutTypeIcon(workout.type)} {workout.name || workout.title}
                          </h5>
                          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <h6>Workout Details</h6>
                              <p>{workout.description || 'No description available'}</p>
                              <p><strong>Duration:</strong> {workout.duration || '30'} minutes</p>
                              <p><strong>Difficulty:</strong> 
                                <span className={`badge ms-2 ${getDifficultyBadge(workout.difficulty)}`}>
                                  {workout.difficulty || 'Medium'}
                                </span>
                              </p>
                              <p><strong>Target Calories:</strong> {workout.calories_target || '250'}</p>
                            </div>
                            <div className="col-md-6">
                              <h6>Equipment Needed</h6>
                              {workout.equipment && workout.equipment.length > 0 ? (
                                <ul>
                                  {workout.equipment.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No equipment required</p>
                              )}
                            </div>
                          </div>
                          
                          {workout.muscle_groups && workout.muscle_groups.length > 0 && (
                            <div className="mb-4">
                              <h6>Muscle Groups</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {workout.muscle_groups.map((muscle, index) => (
                                  <span key={index} className="badge bg-light text-dark">
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="button" className="btn btn-custom-primary">
                            <i className="bi bi-play-circle me-1"></i>Start Workout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info alert-custom d-inline-block">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No workouts available!</strong>
              <p className="mb-3 mt-2">Our AI is generating personalized workouts based on your fitness profile.</p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-custom-primary">
                  <i className="bi bi-plus-circle me-2"></i>Create Custom Workout
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-robot me-2"></i>Generate AI Workout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
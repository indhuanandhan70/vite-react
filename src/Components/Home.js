import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); // Hook for navigating to a new route

  const handleStartCareerClick = () => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // If already logged in, navigate to the dashboard or another page
      navigate('/videos');
    } else {
      // If not logged in, navigate to the login/signup page
      navigate('/login-signup');
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>
          Hello Students! Welcome to <span className="jumping-text">YouCan</span>.
          <br />
          <span className="subheading">Here you can achieve your dreams.</span>
          <br />
          Best wishes from the <span className="jumping-text">YouCan Team!</span> 😊🎓🚀
        </h1>
        <button className="start-btn" onClick={handleStartCareerClick}>
          Start Your Career
        </button>
      </div>
    </div>
  );
};

export default Home;

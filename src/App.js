import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Assuming Navbar is in Components folder
import Home from './Components/Home'; // Assuming you have a Home component
import CodingPractice from './Components/CodingPractice'; // Your CodingPractice component
import Videos from './Components/Videos'; // Your Videos component
import StudentDashboard from './Components/StudentDashboard'; // Your StudentDashboard component
import Discussion from './Components/Discussion'; // Your Discussion component
import About from './Components/About'; // Your About component
import LoginSignupForm from './Components/LoginSignupForm';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar with the links */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* This is the Home route */}
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/about" element={<About />} />
        <Route path="/login-signup" element={<LoginSignupForm />} />

      </Routes>
    </Router>
  );
};

export default App;

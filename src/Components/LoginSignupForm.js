import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignupForm.css';
import axios from 'axios';

const LoginSignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    study: '',
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const res = await axios.post(`http://localhost:5000/api/auth${endpoint}`, formData);
      console.log(res.data);
      alert(res.data.message);

      if (isLogin) {
        // Redirect to Videos page after registration
        navigate('/videos');
      } else {
        // Redirect to Home page after login
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      console.error(err);
      alert(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: formData.email,
      });
      console.log(res.data);
      alert(res.data.message || 'OTP sent successfully');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again later.';
      console.error(err);
      alert(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="study"
                placeholder="Field of Study"
                value={formData.study}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <p onClick={() => {
          setIsLogin(!isLogin);
          setFormData({ name: '', email: '', password: '', age: '', study: '' });
        }} className="toggle-form">
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </p>

        {isLogin && (
          <p onClick={handleForgotPassword} className="forgot-password-btn">
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignupForm;

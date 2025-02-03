import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import "./About.css";
import image1 from "./image1.webp";
import image2 from "./image2.webp";
import image3 from "./image3.webp";

const About = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <nav>
          
        </nav>
      </header>

      {/* Carousel Section */}
      <section className="carousel-section">
        <h2>Why Choose YouCan?</h2>
        <Carousel 
          autoPlay={true} // Enables auto play
          interval={1000} // Sets the interval to 2 seconds (2000 milliseconds)
          infiniteLoop={true} // Allows the carousel to loop back to the first slide after the last
          showThumbs={false} // Hides the thumbnail indicators for a cleaner look
          transitionTime={500} // Smooth transition between slides (in milliseconds)
        >
          <div>
            <img src={image1} alt="Feature 1" />
            <p className="legend">Study at your own pace with YouCan</p>
          </div>
          <div>
            <img src={image2} alt="Feature 2" />
            <p className="legend">Interactive study tools for better learning</p>
          </div>
          <div>
            <img src={image3} alt="Feature 3" />
            <p className="legend">Join a community of learners and educators</p>
          </div>
        </Carousel>
      </section>

      {/* About Information Section */}
      <section className="about-info">
        <h2>About YouCan</h2>
        <p>
          YouCan is an online educational platform designed to enhance the way students learn. We
          provide easy access to high-quality educational resources, including videos, articles,
          and interactive study tools. Our platform enables learners to study at their own pace,
          engage with like-minded individuals, and stay motivated throughout their learning journey.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to empower students and educators by creating a user-friendly environment
          that promotes learning, collaboration, and growth. With YouCan, learning is not just a
          task; it's an exciting journey.
        </p>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-content">
          <p>&copy; 2024 YouCan. All Rights Reserved.</p>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default About;

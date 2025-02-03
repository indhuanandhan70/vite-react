import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import profileImage from "./Images/profile.jpeg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StudentDashboard = ({ timeSpentPercent = 65 }) => {
  const [userInfo, setUserInfo] = useState({
    username: "User",
    email: "",
    role: "",
    profilePicture: profileImage,
  });

  const [timeSpent, setTimeSpent] = useState({
    totalTimePercent: timeSpentPercent, // Initial percentage
    readingPercent: 40,
    codingPercent: 75,
    practicePercent: 50,
  });

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserInfo = async () => {
      try {
        const user = {
          username: "GOPAL INDHU",
          email: "indhuanandhan70@gmail.com",
          role: "Student",
          profilePicture: profileImage,
        };
        setUserInfo(user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="user-info">
        <img
          src={userInfo.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h1>Hello, {userInfo.username}!</h1>
        <p>Email: {userInfo.email}</p>
        <p>Role: {userInfo.role}</p>
      </div>

      <div className="charts-section">
        <h2>Your Time Spent</h2>
        <div className="charts-container">
          {/* Total Time Spent */}
          <div className="chart">
            <CircularProgressbar
              value={timeSpent.totalTimePercent}
              text={`${timeSpent.totalTimePercent}%`}
              styles={buildStyles({
                pathColor: "#4caf50",
                textColor: "#4caf50",
                trailColor: "#d6d6d6",
              })}
            />
            <p>Total Time</p>
          </div>

          {/* Reading Time */}
          <div className="chart">
            <CircularProgressbar
              value={timeSpent.readingPercent}
              text={`${timeSpent.readingPercent}%`}
              styles={buildStyles({
                pathColor: "#3f51b5",
                textColor: "#3f51b5",
                trailColor: "#d6d6d6",
              })}
            />
            <p>Reading</p>
          </div>

          {/* Coding Time */}
          <div className="chart">
            <CircularProgressbar
              value={timeSpent.codingPercent}
              text={`${timeSpent.codingPercent}%`}
              styles={buildStyles({
                pathColor: "#ff9800",
                textColor: "#ff9800",
                trailColor: "#d6d6d6",
              })}
            />
            <p>Coding</p>
          </div>

          {/* Practice Time */}
          <div className="chart">
            <CircularProgressbar
              value={timeSpent.practicePercent}
              text={`${timeSpent.practicePercent}%`}
              styles={buildStyles({
                pathColor: "#f44336",
                textColor: "#f44336",
                trailColor: "#d6d6d6",
              })}
            />
            <p>Practice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

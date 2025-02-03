import React, { useState, useEffect } from "react";
import "./Videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [ratings, setRatings] = useState({});  // Store ratings for videos
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [query, setQuery] = useState("programming languages tutorials"); // Default query
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchVideos = async (searchQuery) => {
    setLoading(true);
    setError(null);

    const API_KEY = "AIzaSyCzEIzZ7iPcWYdsL8cJM8PEem_VMVKIja4"; // Replace with your actual API key
    
    const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      searchQuery
    )}&key=${API_KEY}&maxResults=20`;
  


    const programmingKeywords = [
      "programming languages","python","java", "cse", "computer science", "software development", "developer", "coding tutorials", "programming tutorials", "IT", "algorithm", "data structures"
    ];

    try {
      // If the search query doesn't match one of the programming-related keywords, return no videos
      if (!programmingKeywords.some((keyword) => searchQuery.toLowerCase().includes(keyword))) {
        setError("No relevant videos found for your search.");
        setVideos([]);
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch videos.");
      const data = await response.json();

      // Filter videos based on title or description containing the relevant keywords
      const filteredVideos = data.items.filter((video) => {
        const title = video.snippet.title.toLowerCase();
        const description = video.snippet.description.toLowerCase();

        // Check if the video contains any programming-related keyword in title or description
        return programmingKeywords.some(
          (keyword) => title.includes(keyword.toLowerCase()) || description.includes(keyword.toLowerCase())
        );
      });

      // If no relevant videos are found, show an error message
      if (filteredVideos.length === 0) {
        setError("No relevant videos found for your search.");
        setVideos([]);
      } else {
        setVideos(filteredVideos);
      }
    } catch (err) {
      setError(err.message || "Error fetching videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(query);
  }, [query]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Please enter a valid search term.");
      return;
    }
    fetchVideos(query);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleRating = (rating) => {
    if (selectedVideo) {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [selectedVideo.id.videoId]: rating,
      }));
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  return (
    <div className="videos-container">
      {showIntro ? (
        <div className="welcome-animation">
          <h1>Welcome to YouCan</h1>
        </div>
      ) : (
        <>
          <h2>Programming Languages & CSE Videos</h2>
          <div className="filter-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for videos..."
              className="search-bar"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
            <button
              className={`subscribe-button ${isSubscribed ? "subscribed" : ""}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Subscribed!" : "Subscribe"}
            </button>
            {showAnimation && <div className="star-animation">★</div>}
          </div>

          {loading && <p>Loading videos...</p>}
          {error && <p className="error-message">{error}</p>}

          {selectedVideo ? (
            <div className="video-player">
              <iframe
                width="100%"
                height="500px"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title={selectedVideo.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Rating Section */}
              <div className="rating-section">
                <h3>Rate this video:</h3>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${ratings[selectedVideo.id.videoId] >= star ? "filled" : ""}`}
                      onClick={() => handleRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {ratings[selectedVideo.id.videoId] && (
                  <p>Rating: {ratings[selectedVideo.id.videoId]} out of 5</p>
                )}
              </div>
            </div>
          ) : (
            <div className="videos-list">
              {videos.map((video) => (
                <div key={video.id.videoId} className="video-card">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                  />
                  <h3>{video.snippet.title}</h3>
                  <p>{video.snippet.description}</p>
                  <button
                    onClick={() => handleVideoSelect(video)}
                    className="watch-now-button"
                  >
                    Watch Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Videos; 
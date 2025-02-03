import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discussion.css";

const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", description: "" });
  const [newReply, setNewReply] = useState({}); // Track new replies for each discussion

  // Fetch discussions from the backend
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/discussions");
        setDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };
    fetchDiscussions();
  }, []);

  // Add a new discussion
  const handleAddDiscussion = async () => {
    if (newDiscussion.title && newDiscussion.description) {
      try {
        const response = await axios.post("http://localhost:5000/api/discussions", newDiscussion);
        setDiscussions([response.data, ...discussions]);
        setNewDiscussion({ title: "", description: "" });
      } catch (error) {
        console.error("Error adding discussion:", error);
      }
    } else {
      alert("Please fill out both fields before submitting.");
    }
  };

  // Delete a discussion
  const handleDeleteDiscussion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/discussions/${id}`);
      setDiscussions(discussions.filter((discussion) => discussion._id !== id));
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  // Add a reply to a discussion
  const handleAddReply = async (discussionId) => {
    if (newReply[discussionId]) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/discussions/${discussionId}/replies`,
          { text: newReply[discussionId] }
        );
        setDiscussions((prevDiscussions) =>
          prevDiscussions.map((discussion) =>
            discussion._id === discussionId
              ? { ...discussion, replies: [...discussion.replies, response.data] }
              : discussion
          )
        );
        setNewReply((prev) => ({ ...prev, [discussionId]: "" }));
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    } else {
      alert("Please enter a reply before submitting.");
    }
  };

  return (
    <div className="discussion-container">
      <header className="discussion-header">
        <h1>YouCan Discussions</h1>
        <p>Engage with the community to learn, share, and grow.</p>
      </header>

      {/* New Discussion Form */}
      <div className="new-discussion-form">
        <input
          type="text"
          placeholder="Discussion Title"
          value={newDiscussion.title}
          onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
        />
        <textarea
          placeholder="Discussion Description"
          value={newDiscussion.description}
          onChange={(e) =>
            setNewDiscussion({ ...newDiscussion, description: e.target.value })
          }
        ></textarea>
        <button onClick={handleAddDiscussion}>Start Discussion</button>
      </div>

      {/* Discussion List */}
      <div className="discussion-list">
        {discussions.map((discussion) => (
          <div key={discussion._id} className="discussion-card">
            <h2>{discussion.title}</h2>
            <p>{discussion.description}</p>
            <span>{discussion.replies.length} Replies</span>
            <button onClick={() => handleDeleteDiscussion(discussion._id)}>Delete</button>

            {/* Replies */}
            <div className="replies-section">
              {discussion.replies.map((reply, index) => (
                <div key={index} className="reply">
                  <p>{reply.text}</p>
                </div>
              ))}

              {/* Add Reply Form */}
              <div className="new-reply-form">
                <input
                  type="text"
                  placeholder="Type your reply"
                  value={newReply[discussion._id] || ""}
                  onChange={(e) =>
                    setNewReply({ ...newReply, [discussion._id]: e.target.value })
                  }
                />
                <button onClick={() => handleAddReply(discussion._id)}>Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;

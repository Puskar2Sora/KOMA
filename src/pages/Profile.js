import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const API_BASE = "https://koma-backend-801z.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const uploadPhoto = async () => {
    if (!file) return alert("Please select a photo first.");
    const data = new FormData();
    data.append("photo", file);

    try {
      const res = await axios.put(`${API_BASE}/api/auth/profile-photo`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // ✅ Cloudinary returns the full HTTPS URL
      setUser(prev => ({ ...prev, photo: res.data.photo }));
      alert("Profile photo updated!");
    } catch (err) {
      alert("Upload failed.");
    }
  };

  if (!user) return <div className="loader">Loading Profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-heading">My Profile</h2>
<div className="image-section">
  <img
    className="profile-avatar"
    /* Use the photo URL from your state, with a fallback */
    src={user.photo || "https://via.placeholder.com/150"}
    alt="User Profile"
    /* This helps you debug: if it fails, it prints to console */
    onError={(e) => console.error("Image failed to load:", e.target.src)}
  />
</div>

        <div className="user-details">
          <p className="user-name">
            <b>{user.name}</b> 
            <span className="verified-badge">✅ Verified</span>
          </p>
          <p className="user-email">{user.email}</p>
        </div>

        <div className="photo-upload-section">
          <input className="file-selector" type="file" onChange={e => setFile(e.target.files[0])} />
          <button className="upload-btn" onClick={uploadPhoto}>Update Photo</button>
        </div>

        {/* 🚀 HACKATHON MODE: Unified Action Section */}
        <div className="verification-hub">
          <hr className="divider" />
          <div className="status-cta verified">
            <p>Ready to manage your properties? Access your dashboard below.</p>
            <div className="profile-actions">
               <button className="add-room-btn" onClick={() => navigate('/add-room')}>
                 ➕ Post New Property
               </button>
               <button className="manage-rooms-btn" onClick={() => navigate('/my-rooms')}>
                 🏠 My Listings
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
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
      // Cloudinary returns the full user object with the new path
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
          {/* 🔥 FIXED: Use direct URL for Cloudinary images */}
          <img
            className="profile-avatar"
            src={user.photo || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
        </div>

        <div className="user-details">
          <p className="user-name"><b>{user.name}</b></p>
          <p className="user-email">{user.email}</p>
        </div>

        <div className="photo-upload-section">
          <input className="file-selector" type="file" onChange={e => setFile(e.target.files[0])} />
          <button className="upload-btn" onClick={uploadPhoto}>Update Photo</button>
        </div>

        {/* 🛡️ DYNAMIC OWNER VERIFICATION SECTION */}
        <div className="verification-hub">
          <hr className="divider" />
          
          {user.verificationStatus === 'unverified' && (
            <div className="status-cta unverified">
              <p>Ready to earn? List your property today.</p>
              <button className="verify-nav-btn" onClick={() => navigate('/verify-owner')}>
                Apply to become an Owner
              </button>
            </div>
          )}

          {user.verificationStatus === 'pending' && (
            <div className="status-cta pending">
              <p>🕒 AI Verification in progress... We are checking your documents.</p>
            </div>
          )}

          {user.verificationStatus === 'verified' && (
            <div className="status-cta verified">
              <p>✅ You are a Verified Owner!</p>
              <button className="add-room-btn" onClick={() => navigate('/add-room')}>
                ➕ Add Property Listing
              </button>
            </div>
          )}

          {user.verificationStatus === 'rejected' && (
            <div className="status-cta rejected">
              <p>❌ Verification Failed. Name mismatch on deed.</p>
              <button className="verify-nav-btn" onClick={() => navigate('/verify-owner')}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css"; // Already imported, now we add classes

function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => setUser(res.data));
  }, []);

  const uploadPhoto = async () => {
    const data = new FormData();
    data.append("photo", file);

    const res = await axios.put(
      "http://localhost:5000/api/auth/profile-photo",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setUser(res.data);
  };

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
          <h2 className="profile-heading">My Profile</h2>

          <div className="image-section">
              <img
                className="profile-avatar"
                src={user.photo ? `https://koma-backend-801z.onrender.com${user.photo}` : "https://via.placeholder.com/150"}
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
      </div>
    </div>
  );
}

export default Profile;
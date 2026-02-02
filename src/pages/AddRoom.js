import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/addRoom.css";

function AddRoom() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    address: "",
    // 🔥 Ensure these match your Schema Enum exactly
    roomType: "1 BHK", 
    furnishing: "Unfurnished",
    preferredTenant: "Any",
    area: "",
    amenities: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/rooms", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property Listed Successfully!");
      navigate("/rooms");
    } catch (err) {
      // 🔥 Improved error logging to see EXACTLY what Mongoose is complaining about
      const errMsg = err.response?.data?.message || "Failed to add room";
      alert(`Error: ${errMsg}`); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-room-page">
      <div className="add-room-card">
        <h2 className="form-title">Post Your Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input name="title" placeholder="Title" required onChange={handleChange} />
            <input name="rent" type="number" placeholder="Rent (₹)" required onChange={handleChange} />
            
            {/* 🔥 Required Dropdown */}
            <select name="roomType" required onChange={handleChange} value={formData.roomType}>
              <option value="1 RK">1 RK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="Full House">Full House</option>
            </select>

            <select name="furnishing" onChange={handleChange} value={formData.furnishing}>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Fully-furnished">Fully-furnished</option>
            </select>

            <input name="city" placeholder="City" required onChange={handleChange} />
            <input name="address" placeholder="Address" required onChange={handleChange} />
            <input name="area" placeholder="Area (sqft)" onChange={handleChange} />
            <input name="amenities" placeholder="Amenities (WiFi, AC, etc.)" onChange={handleChange} />
          </div>
          
          <textarea name="description" placeholder="Description" required onChange={handleChange}></textarea>
          
          <div className="upload-box">
            <input type="file" multiple onChange={(e) => setImages(e.target.files)} required />
            <p>📸 Upload at least 1 image</p>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Publishing..." : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
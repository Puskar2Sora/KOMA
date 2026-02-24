import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/addRoom.css";
import { MapContainer, TileLayer, Marker, useMapEvents,useMap } from 'react-leaflet';
// src/pages/AddRoom.js
function MapPicker({ setLocation, formData }) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false); // 🔥 New state for loading

  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });

  const handleLocate = () => {
    setIsLocating(true); // ⏳ Start loading
    
    map.locate().on("locationfound", (e) => {
      setLocation(e.latlng);
      map.flyTo(e.latlng, 16);
      setIsLocating(false); // ✅ Stop loading on success
    }).on("locationerror", (e) => {
      alert("Location access denied or unavailable.");
      setIsLocating(false); // ❌ Stop loading on error
    });
  };

  return (
    <button 
      type="button" 
      onClick={handleLocate}
      disabled={isLocating} // Prevent double clicks
      className="locate-btn"
      style={{
        position: "absolute", 
        top: "10px", 
        right: "10px", 
        zIndex: 1000,
        padding: "8px 12px",
        backgroundColor: isLocating ? "#eee" : "white",
        border: "2px solid #ccc",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: isLocating ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}
    >
      {isLocating ? (
        <>
          <span className="spinner"></span> Finding you...
        </>
      ) : (
        "📍 Use My Current Location"
      )}
    </button>
  );
}
function AddRoom() {
 const [formData, setFormData] = useState({
  title: "",
  description: "",
  rent: "",
  city: "Kolkata", // You can keep city for general filtering
  roomType: "1 BHK", 
  furnishing: "Unfurnished",
  sqft: "",
  amenities: "",
  location: null, // 📍 This will store { lat: 0, lng: 0 } from the map click
});
 const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Inside AddRoom.js
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.location) {
    return alert("Please select the property location on the map first!");
  }

  setLoading(true);
  const data = new FormData();
  
  // Append standard fields
  Object.keys(formData).forEach((key) => {
    if (key !== "location") {
      data.append(key, formData[key]);
    }
  });

  // Append coordinates separately for the GeoJSON backend logic
  data.append("lat", formData.location.lat);
  data.append("lng", formData.location.lng);
  // Ensure address is sent if it's required in your schema
  data.append("address", formData.address || `${formData.title}, ${formData.city}`);

  // Append multiple images
  for (let i = 0; i < images.length; i++) {
    data.append("images", images[i]);
  }

  try {
    const token = localStorage.getItem("token");
    // ✅ Use the base URL that matches your updated router.post("/")
// ✅ Corrected URL
await axios.post("https://koma-backend-801z.onrender.com/api/rooms", data, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    alert("Property Listed Successfully!");
    navigate("/"); // Redirect to home to see the new listing
  } catch (err) {
    console.error(err);
    alert(`Error: ${err.response?.data?.message || "Failed to add room"}`); 
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
            <input name="sqft" placeholder="Area (sqft)" type="number"  required onChange={handleChange} />
            <div className="map-picker-container" style={{ height: "300px", marginBottom: "20px" }}>
  <p>Click on the map to pin the exact property location:</p>
  <MapContainer center={[22.5726, 88.3639]} zoom={13} style={{ height: "100%" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <MapPicker setLocation={(coords) => setFormData({...formData, location: coords})} />
    {formData.location && <Marker position={formData.location} />}
  </MapContainer>
</div>
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
            <input name="amenities" placeholder="Amenities (WiFi, AC, etc.)" onChange={handleChange} />
          </div>
          
          <textarea name="description" placeholder="Description" required onChange={handleChange}></textarea>
          
          <div className="upload-box">
            <input type="file" multiple onChange={(e) => setImages(e.target.files)} required />
            <p>Upload at least 1 image</p>
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/rooms.css";

// Fix for default Leaflet marker icons not showing in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default: Kolkata
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://koma-backend-801z.onrender.com/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const filtered = rooms.filter(r => 
      r.city.toLowerCase().includes(query) || 
      r.address.toLowerCase().includes(query) ||
      r.title.toLowerCase().includes(query)
    );
    setRooms(filtered);
  };

  const findNearby = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported by your browser");
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setMapCenter([latitude, longitude]);
      try {
        const res = await axios.get(
          `https://koma-backend-801z.onrender.com/api/rooms/nearby?lat=${latitude}&lng=${longitude}&distance=15`
        );
        setRooms(res.data);
      } catch (err) {
        console.error("Nearby search failed:", err);
        alert("No rooms found near your location.");
      } finally {
        setLoading(false);
      }
    }, () => {
      alert("Location access denied.");
      setLoading(false);
    });
  };

  return (
    <div className="rooms-page-container">
      <div className="search-header-bar">
        <div className="search-wrapper">
          <form onSubmit={handleSearch} className="location-search-form">
            <input 
              type="text" 
              placeholder="Search by city, address, or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">Search</button>
          </form>
          <button className="location-nearby-btn" onClick={findNearby}>
              📍 Near Me
          </button>
          <button className="reset-all-btn" onClick={fetchRooms}>Reset</button>
        </div>
      </div>

      <div className="content-layout">
        <div className="rooms-list-panel">
          {loading ? (
            <div className="loader-box"><div className="spinner"></div></div>
          ) : rooms.length > 0 ? (
            rooms.map(room => (
              <div key={room._id} className="horizontal-room-card">
                <img 
                  src={room.images?.[0] ? `https://koma-backend-801z.onrender.com${room.images[0]}` : "https://via.placeholder.com/150"} 
                  alt={room.title} 
                />
                <div className="card-details">
                  <div className="card-header-row">
                    <h4>{room.title}</h4>
                    <span className="room-type-tag">{room.roomType}</span>
                  </div>
                  
                  <p className="card-location">📍 {room.city}</p>
                  
                  {/* 🔥 NEW: Quick Specs Section */}
                  <div className="card-specs">
                    <span>🏠 {room.furnishing}</span>
                    {room.area && <span>📏 {room.area} sqft</span>}
                  </div>

                  <p className="card-price">₹{room.rent}<span>/month</span></p>
                  <Link to={`/rooms/${room._id}`} className="details-link">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-msg">No properties found in this area.</div>
          )}
        </div>

        <div className="rooms-map-panel">
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={mapCenter} />
            
            {rooms.map(room => (
              room.location && room.location.coordinates && room.location.coordinates.length === 2 ? (
                <Marker 
                  key={room._id} 
                  position={[room.location.coordinates[1], room.location.coordinates[0]]}
                >
                  <Popup>
                    <div className="map-popup-content">
                      <strong>{room.title}</strong><br/>
                      <span className="popup-specs">{room.roomType} • {room.furnishing}</span><br/>
                      <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>₹{room.rent}/mo</span><br/>
                      <Link to={`/rooms/${room._id}`}>View Details</Link>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/roomDetails.css";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Room not found");
        setLoading(false);
      });
  }, [id]);

  const handleContact = async () => {
    const message = prompt("Enter a brief message for the owner:");
    if (!message) return;

    setSending(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSending(false);
        return alert("Please login to contact the owner.");
      }

      await axios.post(
        "http://localhost:5000/api/rooms/contact",
        { roomId: id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Success! Inquiry sent to owner.");
    } catch (err) {
      console.error("Contact Error:", err);
      alert(err.response?.data?.message || "Failed to send inquiry.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!room) return <p className="loading-text">Property not found.</p>;

  return (
    <div className="room-details-container">
      {/* 🖼️ EXPANDED IMAGE GALLERY (Handles up to 10 images) */}
      <div className="room-gallery-scroll">
        {room.images?.map((img, i) => (
          <img 
            key={i} 
            src={`http://localhost:5000${img}`} 
            alt={`Room view ${i + 1}`} 
            className="room-gallery-item" 
          />
        ))}
      </div>

      <div className="room-details-content">
        <div className="main-info-column">
          <div className="header-badge-row">
            <h1 className="room-title">{room.title}</h1>
            <span className="bhk-badge">{room.roomType}</span>
          </div>
          
          <p className="room-location">📍 {room.address}, {room.city}</p>

          {/* 🔥 NEW: QUICK SPECS GRID */}
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Furnishing</span>
              <span className="spec-value">🏠 {room.furnishing}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Tenant Pref.</span>
              <span className="spec-value">👤 {room.preferredTenant}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Bathrooms</span>
              <span className="spec-value">🚿 {room.bathrooms} Bath</span>
            </div>
            {room.area && (
              <div className="spec-item">
                <span className="spec-label">Built-up Area</span>
                <span className="spec-value">📏 {room.area} sqft</span>
              </div>
            )}
          </div>

          <div className="details-section">
            <h3>Description</h3>
            <p className="room-description">{room.description}</p>
          </div>

          <div className="details-section">
            <h3>Amenities</h3>
            <div className="amenities-tags">
              {room.amenities?.map((a, i) => (
                <span key={i} className="amenity-tag">✅ {a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 💳 STICKY BOOKING CARD */}
        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="price-tag">
              <span className="price-amount">₹{room.rent}</span>
              <span className="price-period">/ month</span>
            </div>
            
            <div className="owner-profile-mini">
              {room.owner?.photo && (
                <img src={`http://localhost:5000${room.owner.photo}`} alt="" />
              )}
              <div>
                <p>Listed by <b>{room.owner?.name}</b></p>
                <p className="owner-status">Property Owner</p>
              </div>
            </div>

            <button 
              className="reserve-btn" 
              onClick={handleContact} 
              disabled={sending}
            >
              {sending ? "Sending Interest..." : "Schedule a Visit / Contact"}
            </button>
            <p className="security-note">🔒 Contact details are secure with KOMA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
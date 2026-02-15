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
    axios.get(`https://koma-backend-801z.onrender.com/api/rooms/${id}`)
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
      if (!token) return alert("Please login to contact the owner.");
      await axios.post("https://koma-backend-801z.onrender.com/api/rooms/contact", 
        { roomId: id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Success! Inquiry sent to owner.");
    } catch (err) {
      alert("Failed to send inquiry.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="loader-container">Loading Property...</div>;
  if (!room) return <div className="error-container">Property not found.</div>;

  return (
    <div className="property-page">
      {/* 🏙️ HERO GALLERY SECTION */}
      <div className="hero-gallery-container">
        <div className="gallery-track">
          {room.images?.map((img, i) => (
            <div className="gallery-slide" key={i}>
              {/* 🔥 FIXED: Direct Cloudinary URL usage */}
              <img src={img} alt={`Property view ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="property-content-wrapper">
        <main className="property-main">
          <section className="main-header">
            <div className="title-row">
              <h1 className="prop-title">{room.title}</h1>
              <span className="type-tag">{room.roomType}</span>
            </div>
            <p className="prop-address">📍 {room.address}, {room.city}</p>
          </section>

          <section className="info-section">
            <h3 className="section-heading">Property Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-card">
                <span className="h-icon">🛋️</span>
                <div>
                  <p className="h-label">Furnishing</p>
                  <p className="h-value">{room.furnishing}</p>
                </div>
              </div>
              <div className="highlight-card">
                <span className="h-icon">📏</span>
                <div>
                  <p className="h-label">Built Area</p>
                  <p className="h-value">{room.sqft || room.area} sqft</p>
                </div>
              </div>
              {/* ... other highlight cards */}
            </div>
          </section>

          <section className="info-section">
            <h3 className="section-heading">Description</h3>
            <p className="prop-desc-text">{room.description}</p>
          </section>
        </main>

        <aside className="property-sidebar">
          <div className="sticky-card">
            <div className="pricing-box">
              <div className="price-main">₹{room.rent?.toLocaleString()}</div>
              <div className="price-sub">per month</div>
            </div>

            <div className="owner-box">
              {/* 🔥 FIXED: Using Cloudinary URL for owner photo */}
              <img 
                src={room.owner?.photo || "/default-avatar.png"} 
                alt="Owner" 
                className="owner-img"
              />
              <div className="owner-text">
                <p className="owner-name"><b>{room.owner?.name}</b></p>
                <p className="owner-label">Verified Owner</p>
              </div>
            </div>

            <button className="cta-button" onClick={handleContact} disabled={sending}>
              {sending ? "Processing..." : "Contact Owner"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default RoomDetails;
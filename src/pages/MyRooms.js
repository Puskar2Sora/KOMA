import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/myRooms.css";

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const API_BASE = "https://koma-backend-801z.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/rooms/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error fetching rooms", err));
  }, []);

  // 🔥 NEW: Delete Functionality
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await axios.delete(`${API_BASE}/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRooms(rooms.filter(room => room._id !== id)); // Update UI
    } catch (err) {
      alert("Failed to delete room.");
    }
  };

  return (
    <div className="my-rooms-page">
      <div className="my-rooms-header">
        <h2 className="my-rooms-title">My Managed Listings</h2>
        <Link to="/add-room" className="add-room-btn">➕ Post New Room</Link>
      </div>

      <div className="rooms-grid">
        {rooms.length === 0 ? (
          <p className="no-rooms">You haven't listed any rooms yet.</p>
        ) : (
          rooms.map(room => (
            <div className="room-card" key={room._id}>
              {/* 🖼️ Cloudinary Thumbnail */}
              <div className="card-image-box">
                <img 
                  src={room.images?.[0] || "https://via.placeholder.com/300x200"} 
                  alt={room.title} 
                />
              </div>
              
              <div className="card-content">
                <h4 className="room-card-title">{room.title}</h4>
                <p className="room-card-price">₹{room.rent?.toLocaleString()} /mo</p>
                
                <div className="room-card-actions">
                  <Link className="action-link view" to={`/rooms/${room._id}`}>View</Link>
                  <Link className="action-link edit" to={`/rooms/${room._id}/edit`}>Edit</Link>
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyRooms;
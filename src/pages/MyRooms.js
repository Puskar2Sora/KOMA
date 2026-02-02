import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/myRooms.css"; // Import the CSS file

function MyRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => setRooms(res.data));
  }, []);

  return (
    <div className="my-rooms-page">
      <h2 className="my-rooms-title">My Rooms</h2>

      <div className="rooms-grid">
        {rooms.map(room => (
            <div className="room-card" key={room._id}>
                <h4 className="room-card-title">{room.title}</h4>
                <div className="room-card-actions">
                    <Link className="action-link view" to={`/rooms/${room._id}`}>View</Link>
                    <Link className="action-link edit" to={`/rooms/${room._id}/edit`}>Edit</Link>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default MyRooms;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/editRoom.css";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    address: "",
    amenities: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://koma-backend-801z.onrender.com/api/rooms/${id}`)
      .then(res => {
        const r = res.data;
        setForm({
          title: r.title || "",
          description: r.description || "",
          rent: r.rent || "",
          city: r.city || "",
          address: r.address || "",
          // 🔥 Convert array from DB to string for the input field
          amenities: r.amenities ? r.amenities.join(", ") : "",
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching room:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    setUpdating(true);

    const data = new FormData();
    // Append text fields
    Object.keys(form).forEach(key => data.append(key, form[key]));

    // 🔥 Append new images to the 'images' field (must match backend multer key)
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await axios.put(
        `https://koma-backend-801z.onrender.com/api/rooms/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/rooms/${id}`);
    } catch (err) {
      alert("Failed to update listing. Ensure you are the owner.");
      setUpdating(false);
    }
  };

  if (loading) return <div className="loader">Fetching listing details...</div>;

  return (
    <div className="edit-room-container">
      <form className="edit-room-form" onSubmit={submit}>
        <h2 className="edit-title">Edit Property Details</h2>

        <div className="input-group">
          <label>Property Title</label>
          <input className="edit-input" name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea className="edit-textarea" name="description" value={form.description} onChange={handleChange} required />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Monthly Rent (₹)</label>
            <input className="edit-input" type="number" name="rent" value={form.rent} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>City</label>
            <input className="edit-input" name="city" value={form.city} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group">
          <label>Address</label>
          <input className="edit-input" name="address" value={form.address} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Amenities (comma separated)</label>
          <input className="edit-input" name="amenities" value={form.amenities} onChange={handleChange} placeholder="WiFi, AC, Parking..." />
        </div>

        <div className="file-input-wrapper">
          <label className="file-label">📸 Update Photos (Optional)</label>
          <p className="file-hint">Uploading new photos will replace current ones.</p>
          <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} />
        </div>

        <button className="update-btn" disabled={updating}>
          {updating ? "Saving Changes..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
}

export default EditRoom;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/editRoom.css"; // Import the CSS file

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      .get(`http://localhost:5000/api/rooms/${id}`)
      .then(res => {
        const r = res.data;
        setForm({
          title: r.title,
          description: r.description,
          rent: r.rent,
          city: r.city,
          address: r.address,
          amenities: r.amenities.join(","),
        });
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key =>
      data.append(key, form[key])
    );

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    await axios.put(
      `http://localhost:5000/api/rooms/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate(`/rooms/${id}`);
  };

  return (
    <div className="edit-room-container">
        <form className="edit-room-form" onSubmit={submit}>
            <h2 className="edit-title">Edit Room</h2>

            <input
                className="edit-input"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
            />

            <textarea
                className="edit-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />

            <input
                className="edit-input"
                name="rent"
                value={form.rent}
                onChange={handleChange}
                placeholder="Rent"
            />

            <input
                className="edit-input"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
            />

            <input
                className="edit-input"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
            />

            <input
                className="edit-input"
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="Amenities (comma separated)"
            />

            <div className="file-input-wrapper">
                <label>Update Images (Optional):</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setImages(e.target.files)}
                />
            </div>

            <button className="update-btn">Update Room</button>
        </form>
    </div>
  );
}

export default EditRoom;
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import UploadForm from "../components/upload/UploadForm";
import { Loader2, ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    address: "",
    amenities: "",
  });

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
          amenities: r.amenities ? r.amenities.join(", ") : "",
        });
        if (r.images) setImages(r.images);
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
    Object.keys(form).forEach(key => data.append(key, form[key]));

    for (let i = 0; i < images.length; i++) {
        if(typeof images[i] !== "string" && !images[i].url) {
            data.append("images", images[i]);
        }
    }

    try {
      await axios.put(
        `https://koma-backend-801z.onrender.com/api/rooms/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess(true);
      setTimeout(() => navigate(`/rooms/${id}`), 2000);
    } catch (err) {
      alert("Failed to update listing. Ensure you are the owner.");
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
      </motion.div>
      <h2 className="text-3xl font-black text-gray-900 mb-2">Changes Saved!</h2>
      <p className="text-gray-500 font-medium">Taking you back to your property...</p>
    </div>
  );

  const InputField = ({ label, ...props }) => (
    <div className="space-y-1.5 w-full">
      <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">{label}</label>
      <input 
        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all shadow-inner font-medium placeholder:text-gray-400 px-4 py-3"
        {...props}
      />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <Link to={`/rooms/${id}`} className="p-2.5 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-full transition-colors text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Property Details</h1>
          <p className="text-gray-500 font-medium">Update the information for your listing.</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-8">
        <div className="bento-card p-6 sm:p-10 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-4 tracking-tight">
            <FileText className="w-5 h-5 text-blue-600" /> Basic Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <InputField label="Listing Title" name="title" value={form.title} required onChange={handleChange} />
            <InputField label="Monthly Rent (₹)" name="rent" type="number" value={form.rent} required onChange={handleChange} />
            <InputField label="City" name="city" value={form.city} required onChange={handleChange} />
            <InputField label="Address" name="address" value={form.address} required onChange={handleChange} />
            
            <div className="md:col-span-2">
              <InputField label="Amenities (comma separated)" name="amenities" value={form.amenities} onChange={handleChange} />
            </div>
            
            <div className="md:col-span-2 space-y-1.5 w-full">
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Description</label>
              <textarea 
                name="description" 
                value={form.description} 
                required 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none min-h-[140px] transition-all shadow-inner font-medium resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bento-card p-6 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 tracking-tight">
            📸 Update Photos (Optional)
          </h3>
          <p className="text-sm text-gray-500 font-medium mb-4">Uploading new photos will completely replace your current gallery.</p>
          <UploadForm images={images} setImages={setImages} />
        </div>

        <button 
          type="submit" 
          disabled={updating}
          className="w-full py-5 bg-gray-900 hover:bg-black text-white font-extrabold tracking-wide text-xl flex justify-center items-center gap-3 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 hover:-translate-y-1"
        >
          {updating ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> Saving Changes...</>
          ) : (
            "Update Listing"
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default EditRoom;

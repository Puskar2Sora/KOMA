import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapView from "../components/map/MapView";
import UploadForm from "../components/upload/UploadForm";
import { Loader2, ArrowLeft, Home, FileText, CheckCircle2 } from "lucide-react";

function AddRoom() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    city: "Kolkata",
    roomType: "1 BHK", 
    furnishing: "Unfurnished",
    sqft: "",
    amenities: "",
    location: null,
  });
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.location) return alert("Please pin the location on the map.");
    if (images.length === 0) return alert("Please upload at least 1 image.");

    setLoading(true);
    const data = new FormData();
    
    Object.keys(formData).forEach((key) => {
      if (key !== "location") data.append(key, formData[key]);
    });

    data.append("lat", formData.location.lat);
    data.append("lng", formData.location.lng);
    data.append("address", formData.address || `${formData.title}, ${formData.city}`);

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await axios.post("https://koma-backend-801z.onrender.com/api/rooms", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess(true);
      setTimeout(() => navigate('/my-rooms'), 2000);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to add property"}`); 
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-black text-white mb-2">Property Listed!</h2>
        <p className="text-gray-400">Taking you to your properties dashboard...</p>
      </div>
    );
  }

  const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input 
          className={`w-full bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all ${icon ? "pl-10 pr-4 py-3" : "px-4 py-3"}`}
          {...props}
        />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <Link to="/profile" className="p-2 glass-panel hover:bg-white/10 rounded-full transition-colors text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Post Your Property</h1>
          <p className="text-gray-400 font-medium">Create a beautiful listing in minutes.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
            <FileText className="w-5 h-5 text-purple-400" /> Basic Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Listing Title" name="title" placeholder="Luxury 2BHK in Salt Lake..." required onChange={handleChange} />
            <InputField label="Monthly Rent (₹)" name="rent" type="number" placeholder="15000" required onChange={handleChange} />
            
            <div className="space-y-1 w-full">
              <label className="block text-sm font-medium text-gray-400">Property Type</label>
              <select name="roomType" required onChange={handleChange} className="w-full px-4 py-3 bg-[#1e1c26] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none hover:bg-white/5 transition-all appearance-none cursor-pointer">
                {["1 RK", "1 BHK", "2 BHK", "3 BHK", "Full House"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="space-y-1 w-full">
              <label className="block text-sm font-medium text-gray-400">Furnishing Style</label>
              <select name="furnishing" required onChange={handleChange} className="w-full px-4 py-3 bg-[#1e1c26] border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none hover:bg-white/5 transition-all appearance-none cursor-pointer">
                {["Unfurnished", "Semi-furnished", "Fully-furnished"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <InputField label="Built Area (sqft)" name="sqft" type="number" placeholder="1200" required onChange={handleChange} />
            <InputField label="Amenities (comma separated)" name="amenities" placeholder="WiFi, AC, Free Parking" onChange={handleChange} />
          </div>

          <div className="space-y-1 w-full">
            <label className="block text-sm font-medium text-gray-400">Full Description</label>
            <textarea 
              name="description" 
              placeholder="Describe what makes your property special..." 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none min-h-[120px] transition-all resize-none"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white border-b border-white/10 pb-4">
            <Home className="w-5 h-5 text-blue-400" /> Location
          </h3>
          <p className="text-sm text-gray-400">Click anywhere on the map to drop a pin on your property's exact location.</p>
          
          <div className="w-full group">
            <MapView 
              location={formData.location} 
              setLocation={(loc) => setFormData({...formData, location: loc})} 
              pickerMode={true} 
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10">
          <h3 className="text-xl font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white border-b border-white/10 pb-4">
            <span className="flex items-center gap-2">📸 Stunning Photos</span>
            <span className="text-xs font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">Max 7 Images</span>
          </h3>
          
          <UploadForm images={images} setImages={setImages} />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xl flex justify-center items-center gap-2 rounded-2xl transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 hover:-translate-y-1"
        >
          {loading ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> Publishing Securely...</>
          ) : (
            "🚀 Publish Property Now"
          )}
        </button>

      </form>
    </motion.div>
  );
}

export default AddRoom;
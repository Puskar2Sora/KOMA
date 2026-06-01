import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
        setTimeout(() => {
          window.location.assign('/my-rooms');
        }, 2000);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Failed to add property"}`); 
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Property Listed!</h2>
        <p className="text-gray-500 font-medium tracking-wide">Taking you to your property dashboard...</p>
      </div>
    );
  }

  const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-1.5 w-full">
      <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input 
          className={`w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium placeholder:text-gray-400 ${icon ? "pl-10 pr-4 py-3" : "px-4 py-3"}`}
          {...props}
        />
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <Link to="/profile" className="p-2.5 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-full transition-colors text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Post Your Property</h1>
          <p className="text-gray-500 font-medium">Create a beautiful listing in minutes.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bento-card p-6 sm:p-10 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-4 tracking-tight">
            <FileText className="w-5 h-5 text-emerald-600" /> Basic Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <InputField label="Listing Title" name="title" placeholder="Luxury 2BHK in Salt Lake..." required onChange={handleChange} />
            <InputField label="Monthly Rent (₹)" name="rent" type="number" placeholder="15000" required onChange={handleChange} />
            
            <div className="space-y-1.5 w-full">
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Property Type</label>
              <select name="roomType" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium appearance-none cursor-pointer">
                {["1 RK", "1 BHK", "2 BHK", "3 BHK", "Full House"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="space-y-1.5 w-full">
              <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Furnishing Style</label>
              <select name="furnishing" required onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none transition-all shadow-inner font-medium appearance-none cursor-pointer">
                {["Unfurnished", "Semi-furnished", "Fully-furnished"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <InputField label="Built Area (sqft)" name="sqft" type="number" placeholder="1200" required onChange={handleChange} />
            <InputField label="Amenities (comma separated)" name="amenities" placeholder="WiFi, AC, Free Parking" onChange={handleChange} />
          </div>

          <div className="space-y-1.5 w-full mt-8">
            <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Full Description</label>
            <textarea 
              name="description" 
              placeholder="Describe what makes your property special..." 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 outline-none min-h-[140px] transition-all shadow-inner font-medium placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="bento-card p-6 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-4 tracking-tight">
            <Home className="w-5 h-5 text-green-600" /> Location
          </h3>
          <p className="text-sm text-gray-500 font-medium">Click anywhere on the map to drop a pin on your property's exact location.</p>
          
          <div className="w-full group">
            <MapView 
              location={formData.location} 
              setLocation={(loc) => setFormData({...formData, location: loc})} 
              pickerMode={true} 
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bento-card p-6 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-gray-900 border-b border-gray-100 pb-4 tracking-tight">
            <span className="flex items-center gap-2">Stunning Photos</span>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest">Max 7 Images</span>
          </h3>
          
          <UploadForm images={images} setImages={setImages} />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-5 bg-gray-900 hover:bg-black text-white font-extrabold tracking-wide text-xl flex justify-center items-center gap-3 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 hover:-translate-y-1"
        >
          {loading ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> Publishing Securely...</>
          ) : (
            " Publish Property Now"
          )}
        </button>

      </form>
    </motion.div>
  );
}

export default AddRoom;
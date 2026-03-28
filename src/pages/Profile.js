import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileDashboard from "../components/profile/ProfileDashboard";
import { Upload, Home, PlusSquare, Loader2 } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const API_BASE = "https://koma-backend-801z.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const uploadPhoto = async () => {
    if (!file) return alert("Please select a photo first.");
    setUploading(true);
    const data = new FormData();
    data.append("photo", file);

    try {
      const res = await axios.put(`${API_BASE}/api/auth/profile-photo`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // ✅ Cloudinary returns the full HTTPS URL
      setUser(prev => ({ ...prev, photo: res.data.photo }));
      setFile(null); // reset file input
      alert("Profile photo updated successfully!");
    } catch (err) {
      alert("Upload failed. Please check file size/format.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* 1. Main Dashboard Component */}
      <ProfileDashboard user={user} />

      {/* 2. Management Controls Layer */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Photo Upload Card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" /> 
              Update Photo
            </h3>
            <p className="text-gray-400 text-sm mb-6">Make sure it's a square image under 5MB.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setFile(e.target.files[0])} 
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-white/10 file:text-purple-300
                hover:file:bg-white/20 transition-colors"
            />
            <button 
              disabled={uploading || !file}
              onClick={uploadPhoto}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Property Management</h3>
            <p className="text-gray-400 text-sm mb-6">Manage your active listings or post a new room space for rental.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/my-rooms"
              className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 border border-white/10 rounded-xl transition-all group"
            >
              <Home className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-200">My Listings</span>
            </Link>
            
            <Link 
              to="/add-room"
              className="flex flex-col items-center justify-center p-4 bg-purple-600/20 hover:bg-purple-600/30 hover:border-purple-500/50 border border-purple-500/30 rounded-xl transition-all group"
            >
              <PlusSquare className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-purple-100">Add Property</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default Profile;
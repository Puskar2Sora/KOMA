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
      setUser(prev => ({ ...prev, photo: res.data.photo }));
      setFile(null); // reset file input
      alert("Profile photo updated successfully!");
      window.location.reload();
    } catch (err) {
      alert("Upload failed. Please check file size/format.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center h-[50vh]">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* 1. Main Dashboard Component */}
      <ProfileDashboard user={user} />

      {/* 2. Management Controls Layer */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Photo Upload Card */}
        <div className="bento-card p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2 tracking-tight">
              <Upload className="w-6 h-6 text-orange-500" /> 
              Update Photo
            </h3>
            <p className="text-gray-500 font-medium text-sm mb-6">Make sure it's a square image under 5MB.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setFile(e.target.files[0])} 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-3 file:px-5
                file:rounded-xl file:border-0
                file:text-sm file:font-bold file:tracking-wide
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100 transition-colors cursor-pointer"
            />
            <button 
              disabled={uploading || !file}
              onClick={uploadPhoto}
              className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bento-card p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Property Management</h3>
            <p className="text-gray-500 font-medium text-sm mb-8">Manage your active listings or post a new room space for rental.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/my-rooms"
              className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-2xl transition-all group shadow-sm hover:shadow-md"
            >
              <Home className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-gray-900 tracking-tight">My Listings</span>
            </Link>
            
            <Link 
              to="/add-room"
              className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 border border-orange-100 hover:border-orange-200 rounded-2xl transition-all group shadow-sm hover:shadow-md"
            >
              <PlusSquare className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-extrabold text-orange-900 tracking-tight">Add Property</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default Profile;
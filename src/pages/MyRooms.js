import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlusSquare, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { getCloudinaryAltText, getCloudinaryImageUrl } from "../utils/cloudinary";

const springConfig = { type: "spring", stiffness: 300, damping: 25 };

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "https://koma-backend-801z.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/rooms/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // Ensure data exists and is an array type before pushing to state
        setRooms(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing permanently?")) return;
    try {
      await axios.delete(`${API_BASE}/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      // OPTIMIZATION: Filter items locally in state instead of forcing a full layout reload
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
    } catch (err) {
      alert("Failed to delete room.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh] bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 py-10 space-y-8 bg-white min-h-screen text-gray-900 font-sans"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 bg-gray-50/60 border border-gray-100 rounded-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Managed Listings</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage, edit, or delete your properties securely.</p>
        </div>
        <motion.div whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }} transition={springConfig}>
          <Link 
            to="/add-room" 
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-emerald-100"
          >
            <PlusSquare className="w-5 h-5" /> Post New Room
          </Link>
        </motion.div>
      </div>

      {/* Grid Display System */}
      {rooms.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/30"
        >
          <p className="text-gray-500 font-bold text-lg mb-4">You haven't listed any properties yet.</p>
          <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
            <Link to="/add-room" className="inline-block px-6 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-colors">
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          layout 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {rooms.map((room) => {
              const imgUrl = getCloudinaryImageUrl(room.images?.[0], "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format");
              
              return (
                <motion.div 
                  layout
                  key={room._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, x: -30 }}
                  transition={springConfig}
                  className="flex flex-col rounded-2xl border-2 border-gray-50 bg-white shadow-sm overflow-hidden hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={imgUrl} 
                      alt={getCloudinaryAltText(room.images?.[0], room.title)} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-extrabold tracking-wide bg-white text-gray-900 rounded-full shadow-sm">
                        ₹{room.rent?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Information Context */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 text-lg truncate mb-1 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {room.title}
                    </h4>
                    <p className="text-xs font-medium text-gray-400 mb-5 truncate">
                      {room.address || room.city}
                    </p>
                    
                    {/* UI Action Row */}
                    <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
                      <motion.div className="flex-1" whileTap={{ scale: 0.93 }}>
                        <Link to={`/rooms/${room._id}`} className="flex justify-center p-2.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors" title="View">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </motion.div>
                      
                      <motion.div className="flex-1" whileTap={{ scale: 0.93 }}>
                        <Link to={`/rooms/${room._id}/edit`} className="flex justify-center p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-100 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </motion.div>

                      <motion.button 
                        whileTap={{ scale: 0.93 }}
                        onClick={() => handleDelete(room._id)} 
                        className="flex-1 flex justify-center p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default MyRooms;
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusSquare, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";

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
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
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
      setRooms(rooms.filter(room => room._id !== id));
    } catch (err) {
      alert("Failed to delete room.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl">
        <div>
          <h2 className="text-3xl font-black text-white">My Managed Listings</h2>
          <p className="text-gray-400 font-medium tracking-wide">Manage, edit, or delete your properties.</p>
        </div>
        <Link 
          to="/add-room" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1"
        >
          <PlusSquare className="w-5 h-5" /> Post New Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl text-center border border-white/10">
          <p className="text-gray-400 text-lg mb-4">You haven't listed any properties yet.</p>
          <Link to="/add-room" className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg">Get Started</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map(room => {
            const imgUrl = room.images?.[0]?.url || room.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format";
            return (
              <div key={room._id} className="glass-panel rounded-2xl overflow-hidden flex flex-col hover:neon-border transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={imgUrl} alt={room.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="px-2 py-1 text-xs font-bold bg-white/10 backdrop-blur-md text-white rounded-md border border-white/20">
                      ₹{room.rent?.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-white text-lg truncate mb-1">{room.title}</h4>
                  <p className="text-sm text-gray-400 mb-6 truncate">{room.address || room.city}</p>
                  
                  <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-white/10">
                    <Link to={`/rooms/${room._id}`} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition" title="View">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                    <Link to={`/rooms/${room._id}/edit`} className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition" title="Edit">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDelete(room._id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default MyRooms;
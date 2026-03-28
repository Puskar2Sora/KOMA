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
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bento-card p-6 sm:p-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Managed Listings</h2>
          <p className="text-gray-500 font-medium tracking-wide">Manage, edit, or delete your properties securely.</p>
        </div>
        <Link 
          to="/add-room" 
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white font-extrabold rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
        >
          <PlusSquare className="w-6 h-6" /> Post New Room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="bento-card p-12 text-center border-dashed border-2 border-gray-200">
          <p className="text-gray-500 font-bold text-lg mb-6">You haven't listed any properties yet.</p>
          <Link to="/add-room" className="inline-block px-8 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors">Get Started</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rooms.map(room => {
            const imgUrl = room.images?.[0]?.url || room.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format";
            return (
              <div key={room._id} className="bento-card flex flex-col group hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img src={imgUrl} alt={room.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1.5 text-xs font-black tracking-wide bg-white text-gray-900 rounded-full shadow-sm">
                      ₹{room.rent?.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <h4 className="font-extrabold text-gray-900 text-xl truncate mb-1 tracking-tight group-hover:text-blue-600 transition-colors">{room.title}</h4>
                  <p className="text-sm font-medium text-gray-500 mb-6 truncate">{room.address || room.city}</p>
                  
                  <div className="flex items-center justify-between gap-3 mt-auto pt-5 border-t border-gray-100">
                    <Link to={`/rooms/${room._id}`} className="flex-1 flex justify-center p-2.5 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-semibold shadow-sm border border-gray-200" title="View">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                    <Link to={`/rooms/${room._id}/edit`} className="flex-1 flex justify-center p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors font-semibold shadow-sm border border-blue-100" title="Edit">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDelete(room._id)} className="flex-1 flex justify-center p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors shadow-sm border border-red-100" title="Delete">
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
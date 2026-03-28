import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapView from "../components/map/MapView";
import { 
  MapPin, Loader2, IndianRupee, MessageSquare, 
  ShieldCheck, Home, Maximize, CheckCircle2 
} from "lucide-react";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    axios.get(`https://koma-backend-801z.onrender.com/api/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleContact = async () => {
    const message = prompt("Enter a brief message for the owner:");
    if (!message) return;
    setSending(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to contact the owner.");
      await axios.post("https://koma-backend-801z.onrender.com/api/rooms/contact", 
        { roomId: id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Success! Inquiry sent to owner.");
    } catch (err) {
      alert("Failed to send inquiry.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
    </div>
  );

  if (!room) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-3xl font-black text-white mb-2">Property Not Found</h2>
      <p className="text-gray-400 mb-6">The listing might have been removed or doesn't exist.</p>
      <Link to="/rooms" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl">Go Back</Link>
    </div>
  );

  const imagesList = room.images?.length > 0 
    ? room.images.map(img => img.url || img) 
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Immersive Image Gallery Header */}
      <div className="glass-panel p-2 rounded-[2rem] overflow-hidden">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-[1.75rem] overflow-hidden bg-black/50 group">
          <img 
            src={imagesList[activeImage]} 
            alt="Property View" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-end gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-600 border border-purple-400 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)] mb-3">
                {room.roomType}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">{room.title}</h1>
              <p className="flex items-center gap-2 text-gray-200 mt-2 font-medium">
                <MapPin className="w-5 h-5 text-purple-400" /> {room.address || room.city}
              </p>
            </div>
            
            <div className="flex gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 overflow-x-auto max-w-full sm:max-w-xs">
              {imagesList.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${activeImage === i ? 'ring-2 ring-purple-500 scale-95' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Home className="w-6 h-6 text-purple-400" /> Property Overview
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Type</span>
                <span className="text-white font-bold">{room.roomType}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Furnishing</span>
                <span className="text-white font-bold">{room.furnishing}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Area</span>
                <span className="text-white font-bold flex items-center gap-1"><Maximize className="w-3 h-3"/> {room.sqft || room.area || "N/A"}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-center items-center text-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">City</span>
                <span className="text-white font-bold">{room.city}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Description</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {room.description}
            </p>

            {room.amenities && room.amenities.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Interactive Map */}
          {room.location && room.location.coordinates && (
            <section className="glass-panel p-6 sm:p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-400" /> Exact Location
              </h2>
              <MapView location={{lat: room.location.coordinates[1], lng: room.location.coordinates[0]}} />
            </section>
          )}
        </div>

        {/* Sidebar Sticky Panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-3xl hover:neon-border transition-all">
              <div className="flex items-end gap-1 mb-6 border-b border-white/10 pb-6">
                <IndianRupee className="w-8 h-8 text-green-400" />
                <span className="text-4xl font-black text-white leading-none">{room.rent?.toLocaleString()}</span>
                <span className="text-gray-400 mb-1">/month</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2"><ShieldCheck className="w-5 h-5 text-green-400 opacity-20"/></div>
                <div className="flex items-center gap-4">
                  <img 
                    src={room.owner?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150"} 
                    alt="Owner"
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/50"
                  />
                  <div>
                    <p className="font-bold text-white truncate">{room.owner?.name}</p>
                    <p className="text-xs text-green-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Owner
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleContact} 
                disabled={sending}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 hover:-translate-y-1"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><MessageSquare className="w-5 h-5" /> Express Interest</>}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">Connect securely through KOMA platform.</p>
            </div>
            
          </div>
        </aside>

      </div>
    </motion.div>
  );
}

export default RoomDetails;
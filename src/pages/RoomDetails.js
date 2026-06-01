import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MapView from "../components/map/MapView";
import { getCloudinaryAltText, getCloudinaryImageDetails, getCloudinaryImageUrl } from "../utils/cloudinary";
import { 
  MapPin, Loader2, IndianRupee, MessageSquare, ChevronLeft, ChevronRight,
  ShieldCheck, Home, Maximize, CheckCircle2 
} from "lucide-react";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
      <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
    </div>
  );

  if (!room) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-3xl font-black text-gray-900 mb-2">Property Not Found</h2>
      <p className="text-gray-500 mb-6">The listing might have been removed or doesn't exist.</p>
      <Link to="/rooms" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition">Go Back</Link>
    </div>
  );

  const imagesList = room.images?.length > 0 
    ? room.images.map(img => getCloudinaryImageUrl(img)) 
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format"];
  const activeImageDetails = getCloudinaryImageDetails(room.images?.[activeImage]);

  const goPrev = () => {
    setActiveImage((current) => (current - 1 + imagesList.length) % imagesList.length);
  };

  const goNext = () => {
    setActiveImage((current) => (current + 1) % imagesList.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;

    const distance = touchStart - touchEnd;
    const swipeThreshold = 40;

    if (distance > swipeThreshold) {
      goNext();
    }

    if (distance < -swipeThreshold) {
      goPrev();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Immersive Image Gallery Header */}
      <div className="bento-card p-2">
        <div
          className="relative w-full h-[300px] md:h-[500px] rounded-[1.75rem] overflow-hidden bg-gray-100 group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={imagesList[activeImage]} 
            alt={getCloudinaryAltText(room.images?.[activeImage], "Property View")} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-end gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white text-gray-900 shadow-lg rounded-full text-sm font-bold mb-4 tracking-wide">
                {room.roomType}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] drop-shadow-md tracking-tight mb-3">{room.title}</h1>
              <p className="flex items-center gap-2 text-gray-200 font-semibold text-lg drop-shadow">
                <MapPin className="w-5 h-5 text-emerald-400 drop-shadow-sm" /> {room.address || room.city}
              </p>
            </div>
            
            <div className="flex gap-2 bg-white/20 backdrop-blur-xl p-2 rounded-2xl border border-white/30 overflow-x-auto max-w-full sm:max-w-xs shadow-xl">
              {imagesList.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all shadow-sm ${activeImage === i ? 'ring-2 ring-white scale-95 border-none' : 'opacity-70 hover:opacity-100 border border-white/20'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white p-3 rounded-full backdrop-blur-md transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 text-white p-3 rounded-full backdrop-blur-md transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          {activeImageDetails && (
            <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/20">
                {activeImageDetails.width && activeImageDetails.height ? `${activeImageDetails.width}x${activeImageDetails.height}` : "Cloudinary image"}
                {activeImageDetails.format ? ` - ${activeImageDetails.format.toUpperCase()}` : ""}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bento-card p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2 tracking-tight">
              <Home className="w-6 h-6 text-emerald-600" /> Property Overview
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bento-inner p-5 flex flex-col justify-center items-center text-center">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Type</span>
                <span className="text-gray-900 font-extrabold tracking-tight text-lg">{room.roomType}</span>
              </div>
              <div className="bento-inner p-5 flex flex-col justify-center items-center text-center">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Furnishing</span>
                <span className="text-gray-900 font-extrabold tracking-tight text-lg">{room.furnishing}</span>
              </div>
              <div className="bento-inner p-5 flex flex-col justify-center items-center text-center">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Area</span>
                <span className="text-gray-900 font-extrabold tracking-tight text-lg flex items-center gap-1.5"><Maximize className="w-4 h-4 text-gray-400"/> {room.sqft || room.area || "N/A"}</span>
              </div>
              <div className="bento-inner p-5 flex flex-col justify-center items-center text-center">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">City</span>
                <span className="text-gray-900 font-extrabold tracking-tight text-lg">{room.city}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Description</h3>
            <p className="text-gray-600 font-medium leading-[1.8] whitespace-pre-wrap text-lg">
              {room.description}
            </p>

            {room.amenities && room.amenities.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {room.amenities.map((item, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold shadow-sm">
                      <CheckCircle2 className="w-4.5 h-4.5 text-green-500" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Interactive Map */}
          {room.location && room.location.coordinates && (
            <section className="bento-card p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 tracking-tight">
                <MapPin className="w-6 h-6 text-emerald-500" /> Exact Location
              </h2>
              <MapView location={{lat: room.location.coordinates[1], lng: room.location.coordinates[0]}} />
            </section>
          )}
        </div>

        {/* Sidebar Sticky Panel */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            <div className="bento-card p-6 sm:p-8 hover:shadow-lg transition-all border border-gray-100">
              <div className="flex items-end gap-1 mb-8 border-b border-gray-100 pb-8">
                <IndianRupee className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-5xl font-black text-gray-900 tracking-tight leading-none">{room.rent?.toLocaleString()}</span>
                <span className="text-gray-500 font-medium mb-1 ml-1 text-lg">/mo</span>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 relative overflow-hidden flex items-center gap-4">
                <div className="absolute top-0 right-0 p-3"><ShieldCheck className="w-6 h-6 text-emerald-500 opacity-10"/></div>
                <img 
                  src={getCloudinaryImageUrl(room.owner?.photo, "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150")} 
                  alt={getCloudinaryAltText(room.owner?.photo, "Owner")}
                  className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-sm bg-gray-200"
                />
                <div>
                  <p className="font-extrabold text-gray-900 text-lg truncate flex items-center gap-1.5">{room.owner?.name}</p>
                  <p className="text-sm text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified
                  </p>
                </div>
              </div>

              <button 
                onClick={handleContact} 
                disabled={sending}
                className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 text-lg"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><MessageSquare className="w-5 h-5" /> Inquire Now</>}
              </button>
              
              <p className="text-center text-xs text-gray-400 font-medium tracking-wide uppercase mt-4">Connect securely through KOMA platform</p>
            </div>
            
          </div>
        </aside>

      </div>
    </motion.div>
  );
}

export default RoomDetails;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Bed, IndianRupee } from "lucide-react";

const RoomCard = ({ room, index }) => {
  // Use first Cloudinary image or fallback
  const fallbackImage = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop";
  const mainImage = room.images?.[0]?.url || room.images?.[0] || fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-panel overflow-hidden group hover:neon-border flex flex-col justify-between h-full rounded-2xl"
    >
      <Link to={`/rooms/${room._id}`} className="block relative overflow-hidden h-48 sm:h-56">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={mainImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 left-3 z-20 flex gap-2">
          <span className="px-2 py-1 text-xs font-semibold bg-purple-600 border border-purple-400 text-white rounded-md flex items-center shadow-[0_0_10px_purple]">
            {room.roomType}
          </span>
          <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-md text-white rounded-md border border-white/20">
            {room.furnishing}
          </span>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow text-gray-200">
        <h3 className="text-xl font-bold truncate group-hover:neon-text-primary transition-all duration-300">
          {room.title}
        </h3>
        
        <p className="flex items-center gap-1.5 text-sm text-gray-400 mt-2 mb-4">
          <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="truncate">{room.address || room.city}</span>
        </p>

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-black text-white">{room.rent}</span>
            <span className="text-xs text-gray-400 self-end mb-1">/mo</span>
          </div>
          <Link 
            to={`/rooms/${room._id}`}
            className="text-sm px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/30 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;

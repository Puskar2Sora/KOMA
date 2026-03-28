import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, IndianRupee } from "lucide-react";

const RoomCard = ({ room, index }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop";
  const mainImage = room.images?.[0]?.url || room.images?.[0] || fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bento-card group flex flex-col justify-between h-full hover:-translate-y-1"
    >
      <Link to={`/rooms/${room._id}`} className="block relative overflow-hidden h-48 sm:h-56">
        <img
          src={mainImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-bold bg-white text-gray-900 rounded-full shadow-sm">
            {room.roomType}
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-full">
            {room.furnishing}
          </span>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
          {room.title}
        </h3>
        
        <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">{room.address || room.city}</span>
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Rent / Mo</span>
            <div className="flex items-center gap-1 text-gray-900">
              <IndianRupee className="w-5 h-5 text-gray-400" />
              <span className="text-2xl font-black">{room.rent}</span>
            </div>
          </div>
          <Link 
            to={`/rooms/${room._id}`}
            className="text-sm px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all font-semibold border border-gray-200 hover:border-gray-300 shadow-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;

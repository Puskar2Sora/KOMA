import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, IndianRupee } from "lucide-react";
import { getCloudinaryAltText, getCloudinaryImageUrl } from "../../utils/cloudinary";

const RoomCard = ({ room, index }) => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const fallbackImage = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop";
  const images = useMemo(() => {
    const normalized = (room.images || [])
      .map((image) => getCloudinaryImageUrl(image))
      .filter(Boolean);

    return normalized.length > 0 ? normalized : [fallbackImage];
  }, [room.images]);

  const activeImageUrl = images[activeImage] || images[0];

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setActiveImage((current) => (current + 1) % images.length);
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
      setActiveImage((current) => (current + 1) % images.length);
    }

    if (distance < -swipeThreshold) {
      setActiveImage((current) => (current - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bento-card group flex flex-col justify-between h-full hover:-translate-y-1"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/rooms/${room._id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/rooms/${room._id}`);
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="block relative overflow-hidden h-48 sm:h-56 cursor-pointer"
      >
        <img
          src={activeImageUrl}
          alt={getCloudinaryAltText(room.images?.[activeImage], room.title)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-bold bg-white text-gray-900 rounded-full shadow-sm">
            {room.roomType}
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-full">
            {room.furnishing}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-2 py-1 rounded-full">
          {images.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`h-1.5 rounded-full transition-all ${dotIndex === activeImage ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 text-gray-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          Swipe photos
        </div>
      </div>
      
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
            Unlock Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;

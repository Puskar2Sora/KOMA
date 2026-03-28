import React from "react";
import RoomList from "../components/rooms/RoomList";
import MapView from "../components/map/MapView";
import { Search, Map } from "lucide-react";
import { motion } from "framer-motion";

function Rooms() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Search Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bento-card p-6 sm:p-10 rounded-3xl flex flex-col xl:flex-row items-center justify-between gap-6"
      >
        <div className="flex-1 space-y-2 text-center xl:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Your <span className="text-blue-600">Next Stay</span>
          </h1>
          <p className="text-gray-500 font-medium">Discover premium properties that perfectly match your vibe.</p>
        </div>
        
        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex flex-1 items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200 transition-colors focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-inner">
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search city, address, zip..." 
              className="bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium w-full sm:w-64"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold transition-all shadow-sm hover:shadow-md">
            <Map className="w-5 h-5 text-gray-500" /> Quick Map
          </button>
        </div>
      </motion.div>

      {/* Room Listing Area */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 px-2 flex items-center gap-2 mb-6 tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse" />
          Available Properties
        </h2>
        
        <RoomList />
      </div>
    </div>
  );
}

export default Rooms;
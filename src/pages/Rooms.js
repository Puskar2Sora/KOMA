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
        className="glass-panel p-6 sm:p-10 rounded-3xl flex flex-col xl:flex-row items-center justify-between gap-6"
      >
        <div className="flex-1 space-y-2 text-center xl:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Find Your <span className="neon-text-primary">Next Stay</span>
          </h1>
          <p className="text-gray-400 font-medium">Discover premium properties that match your vibe.</p>
        </div>
        
        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex flex-1 items-center glass-panel px-4 py-3 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors focus-within:border-purple-500/80">
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search city, address, zip..." 
              className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full sm:w-64"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all hover:neon-border">
            <Map className="w-5 h-5" /> Quick Map
          </button>
        </div>
      </motion.div>

      {/* Room Listing Area */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white px-2 flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse border border-green-200" />
          Available Properties
        </h2>
        
        <RoomList />
      </div>
    </div>
  );
}

export default Rooms;
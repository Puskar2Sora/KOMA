import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";
import { CopyX } from "lucide-react";

const SkeletonCard = () => (
  <div className="glass-panel overflow-hidden h-full rounded-2xl animate-pulse">
    <div className="h-48 sm:h-56 bg-white/5" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-6 w-3/4 bg-white/10 rounded-md" />
      <div className="h-4 w-1/2 bg-white/5 rounded-md mt-2 mb-4" />
      <div className="mt-auto pt-4 border-t border-white/10 flex justify-between">
        <div className="h-8 w-1/3 bg-white/10 rounded-md" />
        <div className="h-8 w-1/4 bg-white/5 rounded-md" />
      </div>
    </div>
  </div>
);

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://koma-backend-801z.onrender.com/api/rooms")
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load rooms. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 glass-panel max-w-xl mx-auto mt-10 rounded-2xl text-center">
        <CopyX className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Network Error</h3>
        <p className="text-gray-400">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition border border-white/20">
          Try Again
        </button>
      </div>
    );
  }

  if (rooms.length === 0) {
    return <div className="text-center text-gray-400 py-20">No properties available right now. Be the first to add one!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
      {rooms.map((room, index) => (
        <RoomCard key={room._id} room={room} index={index} />
      ))}
    </div>
  );
};

export default RoomList;

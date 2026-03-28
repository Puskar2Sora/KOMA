import { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";
import { CopyX } from "lucide-react";

const SkeletonCard = () => (
  <div className="bento-card overflow-hidden h-full flex flex-col justify-between animate-pulse">
    <div className="h-48 sm:h-56 bg-gray-200" />
    <div className="p-5 flex flex-col flex-grow bg-white">
      <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
      <div className="h-4 w-1/2 bg-gray-100 rounded-md mt-4 mb-4" />
      <div className="mt-auto flex justify-between items-end pt-4">
        <div className="flex flex-col gap-2">
           <div className="h-3 w-16 bg-gray-100 rounded-sm" />
           <div className="h-8 w-24 bg-gray-200 rounded-md" />
        </div>
        <div className="h-10 w-24 bg-gray-100 rounded-lg" />
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
      <div className="flex flex-col items-center justify-center p-10 bento-card border border-red-100 bg-red-50 max-w-xl mx-auto mt-10 text-center">
        <CopyX className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Network Error</h3>
        <p className="text-gray-600 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 rounded-xl transition font-semibold">
          Try Again
        </button>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center text-gray-500 py-24 font-medium bento-inner mt-8">
         No properties available right now. Be the first to add one!
      </div>
    );
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

import { useEffect, useState } from "react";
import axios from "axios";
import RoomList from "../components/rooms/RoomList";
import MapView from "../components/map/MapView";
import { Search, LocateFixed, Loader2, Navigation2 } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE = process.env.REACT_APP_API_URL || "https://koma-backend-801z.onrender.com/api";

function Rooms() {
  const [nearbyRooms, setNearbyRooms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRooms = async (url) => {
      try {
        const response = await axios.get(url);
        if (!cancelled) {
          setNearbyRooms(Array.isArray(response.data) ? response.data : []);
          setMapError("");
        }
      } catch (err) {
        if (!cancelled) {
          setMapError(err.response?.data?.message || "Unable to load available rooms.");
        }
      } finally {
        if (!cancelled) setMapLoading(false);
      }
    };

    const loadFallbackRooms = () => {
      setMapError("Location access was denied. Showing all available rooms instead.");
      setUserLocation(null);
      loadRooms(`${API_BASE}/rooms`);
    };

    if (!navigator.geolocation) {
      setMapError("Geolocation is not supported by this browser. Showing all available rooms.");
      loadRooms(`${API_BASE}/rooms`);
      return () => { cancelled = true; };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        loadRooms(`${API_BASE}/rooms/nearby?lat=${location.lat}&lng=${location.lng}&distance=10`);
      },
      () => {
        if (!cancelled) loadFallbackRooms();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bento-card p-6 sm:p-10 rounded-3xl flex flex-col xl:flex-row items-center justify-between gap-6"
      >
        <div className="flex-1 space-y-2 text-center xl:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Your <span className="text-emerald-600">Next Stay</span>
          </h1>
          <p className="text-gray-500 font-medium">Discover premium properties that perfectly match your vibe.</p>
        </div>
        <div className="w-full xl:w-auto flex items-center bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100/50 shadow-inner">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search city, address..."
            aria-label="Search rooms"
            className="bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium w-full sm:w-64"
          />
        </div>
      </motion.div>

      <section className="bento-card p-6 sm:p-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Navigation2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Rooms near you</h2>
            </div>
            <p className="text-gray-500 font-medium">Your location is used to fetch nearby listings and place them on the map.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-fit">
            <LocateFixed className="w-4 h-4 text-blue-600" />
            {userLocation ? "Live location enabled" : "Using city fallback"}
          </div>
        </div>
        {mapLoading ? (
          <div className="h-[420px] flex items-center justify-center rounded-3xl bg-gray-50 border border-gray-100">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          </div>
        ) : (
          <MapView location={userLocation} userLocation={userLocation} rooms={nearbyRooms} interactive />
        )}
        {mapError && (
          <p className="text-sm font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            {mapError}
          </p>
        )}
      </section>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 px-2 flex items-center gap-2 mb-6 tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse" />
          Available Properties
        </h2>
        <RoomList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default Rooms;

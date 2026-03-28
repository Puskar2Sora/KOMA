import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

// Fix generic Leaflet marker icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// A custom neon pin icon
const DefaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ClickHandler = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      if (setLocation) {
        setLocation(e.latlng);
      }
    },
  });
  return null;
};

const MapView = ({
  location,
  setLocation,
  rooms = [],
  interactive = true,
  pickerMode = false
}) => {
  const defaultCenter = location
    ? [location.lat || location[1] || 22.5726, location.lng || location[0] || 88.3639]
    : [22.5726, 88.3639]; // default Kolkata

  return (
    <div className="w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-lg relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={pickerMode ? 13 : 11}
        scrollWheelZoom={interactive}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {pickerMode && <ClickHandler setLocation={setLocation} />}

        {/* Render the picked location if in picker mode */}
        {pickerMode && location && (
          <Marker position={[location.lat, location.lng]} />
        )}

        {/* Render Room Markers if provided */}
        {!pickerMode && rooms.map((room) => {
          if (!room.location || !room.location.coordinates) return null;
          // MongoDB coordinates: [lng, lat]
          const lat = room.location.coordinates[1];
          const lng = room.location.coordinates[0];

          return (
            <Marker key={room._id} position={[lat, lng]}>
              <Popup className="glass-popup z-[9999]">
                <div className="p-1 w-48 text-gray-800">
                  <img
                    src={room.images?.[0]?.url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format"}
                    alt="Room"
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-bold text-sm truncate">{room.title}</h4>
                  <p className="text-purple-600 font-bold text-sm mt-1">₹{room.rent}/mo</p>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="mt-2 block w-full text-center bg-purple-600 text-white text-xs py-1.5 rounded-md hover:bg-purple-700"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {pickerMode && (
        <div className="absolute top-4 right-4 z-[400] bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2 pointer-events-none">
          <MapPin className="text-purple-400 w-4 h-4 animate-bounce" />
          <span className="text-white text-xs font-medium">Click map to pin</span>
        </div>
      )}
    </div>
  );
};

export default MapView;

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
    <div className="w-full h-[250px] md:h-[400px] rounded-3xl overflow-hidden bento-card relative z-0 border border-gray-200 shadow-sm">
      <MapContainer
        center={defaultCenter}
        zoom={pickerMode ? 13 : 11}
        scrollWheelZoom={interactive}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
              <Popup className="z-[9999] bg-white rounded-xl shadow-xl border-none">
                <div className="p-1 w-48 text-gray-800">
                  <img
                    src={room.images?.[0]?.url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format"}
                    alt="Room"
                    className="w-full h-24 object-cover rounded-md mb-2 shadow-sm"
                  />
                  <h4 className="font-bold text-sm truncate">{room.title}</h4>
                  <p className="text-emerald-600 font-bold text-sm mt-1">₹{room.rent}/mo</p>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="mt-3 block w-full text-center bg-gray-50 text-gray-800 border border-gray-200 font-semibold text-xs py-2 rounded-lg hover:bg-gray-100 transition-colors"
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
        <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2 pointer-events-none">
          <MapPin className="text-emerald-500 w-4 h-4 animate-bounce" />
          <span className="text-gray-700 text-xs font-bold tracking-wide">Click map to pin</span>
        </div>
      )}
    </div>
  );
};

export default MapView;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navbar from "../Components/Navbar";

// Fix default marker icon issue in Leaflet
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // default: India
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          console.error("Location access denied:", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
        <>
      <div className="flex items-center justify-center h-screen text-lg">
        Detecting your location...
      </div>
      <Navbar />
      </>
    );
  }

    return (
  <div className="relative w-full h-screen pb-16"> 
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      />

      <Marker position={position}>
        <Popup>You are here 📍</Popup>
      </Marker>
    </MapContainer>

    {/* Navbar sits naturally at bottom */}
    <Navbar />
  </div>
);
};

export default Map;



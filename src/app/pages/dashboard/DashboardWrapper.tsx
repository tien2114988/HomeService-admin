import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Coordinates {
  lat: number;
  lng: number;
}

const MapWithMarker: React.FC = () => {
  // State to store marker position
  const [position, setPosition] = useState<Coordinates | null>(null);

  useEffect(() => {
    // Fetch the geocode data from the API
    const fetchGeocode = async () => {
      const response = await fetch(
        'https://maps.gomaps.pro/maps/api/geocode/json?key=AlzaSycsGBSGqMEm_QMhn1QqOkO689MXBrk6vrn&place_id=ChIJC1YZUiYvdTERzXc5-03QXVw',
      );
      const data = await response.json();
      const location = data.results[0]?.geometry.location;

      if (location) {
        setPosition({ lat: location.lat, lng: location.lng });
      }
    };

    fetchGeocode();
  }, []);

  // If position is not available, show a loading message
  if (!position) {
    return <div>Loading map...</div>;
  }

  // Custom marker icon
  const icon = new L.Icon({
    iconUrl:
      'https://png.pngtree.com/png-clipart/20230425/original/pngtree-3d-location-icon-clipart-in-transparent-background-png-image_9095284.png', // Custom marker image
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Adjust the anchor to center the icon
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={15}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker
        position={position}
        icon={icon}
        draggable={true}
        // Update the state when dragging ends
        eventHandlers={{
          dragend: event => {
            const marker = event.target as L.Marker;
            const newPosition = marker.getLatLng(); // Get updated position
            setPosition({ lat: newPosition.lat, lng: newPosition.lng });
          },
        }}
      >
        <Popup>
          <div>
            <h4>Location</h4>
            <p>Lat: {position.lat}</p>
            <p>Lng: {position.lng}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithMarker;

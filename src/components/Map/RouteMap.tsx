import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Location, Stop } from '../../types';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RouteMapProps {
  startLocation: Location;
  endLocation: Location;
  stops: Stop[];
  className?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({ 
  startLocation, 
  endLocation, 
  stops,
  className = "h-64"
}) => {
  const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const center: [number, number] = [
    (startLocation.lat + endLocation.lat) / 2,
    (startLocation.lng + endLocation.lng) / 2
  ];

  // Create path coordinates
  const pathCoordinates: [number, number][] = [
    [startLocation.lat, startLocation.lng],
    ...stops.map(stop => [stop.location.lat, stop.location.lng] as [number, number]),
    [endLocation.lat, endLocation.lng]
  ];

  return (
    <div className={`${className} rounded-lg overflow-hidden border border-gray-200`}>
      <MapContainer
        center={center}
        zoom={11}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Route line */}
        <Polyline 
          positions={pathCoordinates} 
          color="#3B82F6" 
          weight={4}
          opacity={0.7}
        />
        
        {/* Start marker */}
        <Marker position={[startLocation.lat, startLocation.lng]} icon={startIcon}>
          <Popup>
            <div className="text-right">
              <strong>نقطة الانطلاق</strong>
              <br />
              {startLocation.address}
            </div>
          </Popup>
        </Marker>
        
        {/* Stop markers */}
        {stops.map((stop) => (
          <Marker key={stop.id} position={[stop.location.lat, stop.location.lng]}>
            <Popup>
              <div className="text-right">
                <strong>{stop.name}</strong>
                <br />
                {stop.location.address}
                <br />
                <small>الوقت: {stop.time}</small>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* End marker */}
        <Marker position={[endLocation.lat, endLocation.lng]} icon={endIcon}>
          <Popup>
            <div className="text-right">
              <strong>الوجهة النهائية</strong>
              <br />
              {endLocation.address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
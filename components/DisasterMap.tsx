import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { DamageReport, DamageType, Language } from '../types';
import { translations } from '../translations';

// Fix for default Leaflet markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- Raw SVG Paths for cleaner scaling ---
const HomePath = `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`;
const BusinessPath = `<path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M17 21v-8H7v8"/><line x1="17" x2="17" y1="12" y2="17"/>`;
const VehiclePath = `<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>`;

// Modern Circular Icons (Large Size)
const createCustomIcon = (color: string, iconPath: string) => L.divIcon({
  className: 'custom-circle-marker',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
      <circle cx="26" cy="26" r="24" fill="${color}" stroke="white" stroke-width="3"/>
      <g transform="translate(10, 10) scale(1.33)" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </g>
    </svg>
  `,
  iconSize: [52, 52],
  iconAnchor: [26, 26],
  popupAnchor: [0, -26]
});

// Bright Palette matching Emergency Page Categories
const homeIcon = createCustomIcon('#EA580C', HomePath);    // Orange (Fire/Home)
const businessIcon = createCustomIcon('#2563EB', BusinessPath); // Blue (Police/Business)
const vehicleIcon = createCustomIcon('#DC2626', VehiclePath);   // Red (Emergency/Vehicle)

// Location Pin - Blue Teardrop
const locationPinIcon = L.divIcon({
  className: 'custom-location-marker',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); overflow: visible;">
      <g transform="translate(2, -4)"> 
        <path d="M26 2 C15 2 6 11 6 22 C6 35 26 50 26 50 C26 50 46 35 46 22 C46 11 37 2 26 2 Z" fill="#2563EB" stroke="white" stroke-width="3"/>
        <circle cx="26" cy="22" r="8" fill="white"/>
      </g>
    </svg>
  `,
  iconSize: [52, 52],
  iconAnchor: [26, 46],
  popupAnchor: [0, -46]
});


interface DisasterMapProps {
  reports: DamageReport[];
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number, lng: number } | null;
  lang: Language;
}

const LocationMarker: React.FC<{ onSelect: (lat: number, lng: number) => void, position: {lat: number, lng: number} | null }> = ({ onSelect, position }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker position={position} icon={locationPinIcon}>
      <Popup>New Report Location</Popup>
    </Marker>
  ) : null;
};

export const DisasterMap: React.FC<DisasterMapProps> = ({ reports, onLocationSelect, selectedLocation, lang }) => {
  const t = translations[lang];

  return (
    <div className="h-full w-full z-0 bg-slate-50">
      <MapContainer center={[6.9271, 79.8612]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((report) => (
          <Marker 
            key={report.id} 
            position={[report.lat, report.lng]}
            icon={
              report.type === DamageType.HOME ? homeIcon : 
              report.type === DamageType.BUSINESS ? businessIcon : vehicleIcon
            }
          >
            <Popup>
              <div className="p-1 min-w-[200px] font-sans">
                {report.image && (
                  <img src={report.image} alt="Report evidence" className="w-full h-32 object-cover rounded-lg mb-2" />
                )}
                <strong className={`block text-xs font-bold uppercase mb-1 ${
                   report.type === DamageType.HOME ? 'text-orange-600' : 
                   report.type === DamageType.BUSINESS ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {report.type === DamageType.HOME ? t.home : report.type === DamageType.BUSINESS ? t.business : t.vehicle}
                </strong>
                {report.description && <p className="text-sm font-semibold mb-2 text-slate-800">"{report.description}"</p>}
                
                {report.type === DamageType.HOME && (
                  <div className="text-xs space-y-1 bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.residents}:</span>
                      <span className="font-bold">{report.homeDetails?.residents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">{t.damage}:</span>
                      <span className="font-bold text-slate-800">{report.homeDetails?.damagePercentage}%</span>
                    </div>
                  </div>
                )}
                
                {report.type === DamageType.BUSINESS && (
                  <div className="text-xs space-y-1 bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.size}:</span>
                      <span className="font-bold">
                        {report.businessDetails?.size === 'SMALL' ? t.small : 
                         report.businessDetails?.size === 'MEDIUM' ? t.medium : t.large}
                      </span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">{t.damage}:</span>
                       <span className="font-bold text-blue-600">{report.businessDetails?.damagePercentage}%</span>
                    </div>
                  </div>
                )}

                 {report.type === DamageType.VEHICLE && (
                  <div className="text-xs space-y-1 bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.type}:</span>
                       <span className="font-bold">{report.vehicleDetails?.type}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-slate-500">{t.count}:</span>
                       <span className="font-bold text-red-600">{report.vehicleDetails?.count}</span>
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <LocationMarker onSelect={onLocationSelect} position={selectedLocation} />
      </MapContainer>
    </div>
  );
};
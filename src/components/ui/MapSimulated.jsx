
import React from 'react';
import { MapPin } from 'lucide-react';

const MapSimulated = () => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#001E21]/20 to-[#003336]/20 border border-white/10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <MapPin className="w-8 h-8 text-[#001E21] animate-pulse" />
          <div className="absolute -inset-4 bg-[#001E21]/20 rounded-full animate-ping" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        <p className="text-white text-xs font-medium">Ubicación Principal</p>
        <p className="text-white/60 text-xs">Madrid, España</p>
      </div>
    </div>
  );
};

export default MapSimulated;

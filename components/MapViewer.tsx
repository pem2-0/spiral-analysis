
import React, { useRef, useEffect } from 'react';
import { SpiralType } from '../types';
import { SPIRAL_COLORS } from '../constants';

interface MapViewerProps {
  activeSpiral: SpiralType | null;
  isMapLoaded: boolean;
}

const PhiSpiral: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="-300 -300 600 600" className="w-full h-full animate-pulse-slow">
    <path
      d="M0,0 A50,50 0 0,1 50,0 A50,50 0 0,1 50,50 A50,50 0 0,1 0,50 A50,50 0 0,1 0,0 M-8.09,29.39 A80.9,80.9 0 0,1 77.86,29.39 A80.9,80.9 0 0,1 48.12,-65.45 A80.9,80.9 0 0,1 -65.45,48.12 A80.9,80.9 0 0,1 29.39,-8.09 M-55.57,47.55 A131,131 0 0,1 126.34,47.55 A131,131 0 0,1 77.86,-106.3 A131,131 0 0,1 -106.3,77.86 A131,131 0 0,1 47.55,-55.57 M-90.28,77.05 A212,212 0 0,1 204.4,77.05 A212,212 0 0,1 126.34,-172 A212,212 0 0,1 -172,126.34 A212,212 0 0,1 77.05,-90.28"
      stroke={color}
      strokeWidth="2"
      fill="none"
      style={{ filter: `drop-shadow(0 0 10px ${color})` }}
      strokeLinecap="round"
    />
  </svg>
);

const Sqrt7Spiral: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="-300 -300 600 600" className="w-full h-full animate-pulse-fast">
    <path
      d="M 0 0 L 100 0 L 100 100 L 0 100 Z M 100 0 L 264.5 0 L 264.5 100 L 100 100 Z M 100 100 L 264.5 100 L 264.5 264.5 L 100 264.5 Z M 0 100 L 100 100 L 100 264.5 L 0 264.5 Z M 0 0 L -164.5 0 L -164.5 -164.5 L 0 -164.5 Z M -164.5 0 L -264.5 0 L -264.5 -164.5 L -164.5 -164.5 Z"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      transform="rotate(20)"
      style={{ filter: `drop-shadow(0 0 12px ${color})` }}
      strokeLinecap="round"
    />
  </svg>
);

const PiSpiral: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="-300 -300 600 600" className="w-full h-full opacity-70">
    <circle cx="0" cy="0" r="50" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="0" cy="0" r="100" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="0" cy="0" r="157" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="0" cy="0" r="217" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="0" cy="0" r="280" stroke={color} strokeWidth="1" fill="none" />
  </svg>
);

const SpiralOverlay: React.FC<{ activeSpiral: SpiralType }> = ({ activeSpiral }) => {
    const color = SPIRAL_COLORS[activeSpiral];
    switch (activeSpiral) {
        case SpiralType.Phi:
            return <PhiSpiral color={color} />;
        case SpiralType.Sqrt7:
            return <Sqrt7Spiral color={color} />;
        case SpiralType.Pi:
            return <PiSpiral color={color} />;
        default:
            return null;
    }
};

const MapViewer: React.FC<MapViewerProps> = ({ activeSpiral, isMapLoaded }) => {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isMapLoaded || !bgRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 25; // Parallax intensity
      const y = (clientY / innerHeight - 0.5) * 25;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMapLoaded]);

  return (
    <div className="w-full h-full relative overflow-hidden transition-opacity duration-1000" style={{ opacity: isMapLoaded ? 1 : 0 }}>
       <style>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.8; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
          
          @keyframes pulse-fast {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .animate-pulse-fast { animation: pulse-fast 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

          @keyframes stars {
            0% {transform: translateY(0);}
            100% {transform: translateY(-2000px);}
          }
          .stars {
            background-image: radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, #ddd, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: stars 240s linear infinite;
            height: 4000px;
            width: 100%;
            position: absolute;
            top: 0;
            opacity: 0.3;
          }
       `}</style>
       <div className="stars"></div>
       <img 
          ref={bgRef}
          src="https://cdn.spacetelescope.org/archives/images/screen/planck_2013_cmb.jpg" 
          alt="Cosmic Microwave Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          style={{ transition: 'transform 0.2s ease-out', willChange: 'transform' }}
        />

      {activeSpiral && (
        <div className="absolute inset-0 p-8 transition-all duration-700 ease-in-out">
          <SpiralOverlay activeSpiral={activeSpiral} />
        </div>
      )}
    </div>
  );
};

export default MapViewer;


import React from 'react';
import { SpiralType } from '../types';
import { SPIRAL_COLORS, CrownIcon } from '../constants';

interface CrownProps {
  activeSpiral: SpiralType | null;
  onSelectSpiral: (spiral: SpiralType) => void;
  isMapLoaded: boolean;
  isAnalyzing: boolean;
}

const SpiralButton: React.FC<{
  type: SpiralType;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ type, isActive, onClick, disabled }) => {
  const color = SPIRAL_COLORS[type];
  const baseClasses = "w-full text-left p-4 rounded-lg flex items-center space-x-3 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClasses = `shadow-lg scale-105`;
  const inactiveClasses = "hover:bg-white/10 hover:scale-105";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      style={{
        backgroundColor: isActive ? `${color}40` : 'transparent',
        color: isActive ? color : '#e5e7eb',
        border: `1px solid ${isActive ? color : '#4f46e550'}`,
        textShadow: isActive ? `0 0 8px ${color}` : 'none',
      }}
    >
      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
      <span className="capitalize">{type}</span>
    </button>
  );
};

const Crown: React.FC<CrownProps> = ({ activeSpiral, onSelectSpiral, isMapLoaded, isAnalyzing }) => {
  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg">
      <div className="flex items-center mb-4">
        <CrownIcon className="w-8 h-8 text-indigo-300 mr-3" />
        <h2 className="text-xl font-bold text-indigo-300">Crown: Spiral Selector</h2>
      </div>
      <div className="space-y-3">
        {(Object.keys(SpiralType) as Array<keyof typeof SpiralType>).map((key) => {
          const type = SpiralType[key];
          return (
            <SpiralButton
              key={type}
              type={type}
              isActive={activeSpiral === type}
              onClick={() => onSelectSpiral(type)}
              disabled={!isMapLoaded || isAnalyzing}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Crown;

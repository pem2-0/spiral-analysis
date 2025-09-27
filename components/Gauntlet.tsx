
import React from 'react';
import { GauntletIcon } from '../constants';

interface GauntletProps {
  analysisData: { goldenAngleDip: string } | null;
  isAnalyzing: boolean;
}

const DataRow: React.FC<{label: string, value: string, color: string}> = ({label, value, color}) => (
    <div className="flex justify-between items-baseline py-2 border-b border-indigo-500/10 animate-fade-in">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="font-bold text-lg" style={{ color: color, textShadow: `0 0 5px ${color}80` }}>{value}</span>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
    </div>
)

const Gauntlet: React.FC<GauntletProps> = ({ analysisData, isAnalyzing }) => {
    
    const getDipColor = (dip: string) => {
        if (dip === 'Significant') return '#34d399'; // Emerald
        if (dip === 'Inconclusive') return '#f59e0b'; // Amber
        return '#9ca3af'; // Gray
    }

  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg">
      <div className="flex items-center mb-4">
        <GauntletIcon className="w-8 h-8 text-indigo-300 mr-3" />
        <h2 className="text-xl font-bold text-indigo-300">Gauntlet: EB Metric Tracker</h2>
      </div>
       <div className="space-y-2 min-h-[54px] flex flex-col justify-center">
        {isAnalyzing ? (
            <div className="text-center py-4 text-sky-300 animate-pulse">Calculating...</div>
        ) : analysisData ? (
          <DataRow 
            label="Golden Angle Dip" 
            value={analysisData.goldenAngleDip}
            color={getDipColor(analysisData.goldenAngleDip)}
          />
        ) : (
          <div className="text-center py-4 text-gray-500">
            Awaiting analysis...
          </div>
        )}
      </div>
    </div>
  );
};

export default Gauntlet;

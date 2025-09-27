
import React from 'react';
import { ScepterIcon } from '../constants';

interface ScepterProps {
  analysisData: { varianceRatio: number; pValue: number } | null;
  isAnalyzing: boolean;
}

const DataRow: React.FC<{label: string, value: string | number}> = ({label, value}) => (
    <div className="flex justify-between items-baseline py-2 border-b border-indigo-500/10 animate-fade-in">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="font-mono text-lg text-emerald-300">{value}</span>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
    </div>
)

const Scepter: React.FC<ScepterProps> = ({ analysisData, isAnalyzing }) => {
  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg">
      <div className="flex items-center mb-4">
        <ScepterIcon className="w-8 h-8 text-indigo-300 mr-3" />
        <h2 className="text-xl font-bold text-indigo-300">Scepter: Variance Analysis</h2>
      </div>
      <div className="space-y-2 min-h-[88px] flex flex-col justify-center">
        {isAnalyzing ? (
            <div className="text-center py-4 text-sky-300 animate-pulse">Calculating...</div>
        ) : analysisData ? (
          <>
            <DataRow label="Variance Ratio" value={analysisData.varianceRatio.toFixed(4)} />
            <DataRow label="Empirical P-Value" value={analysisData.pValue.toFixed(4)} />
          </>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Select a spiral to compute variance.
          </div>
        )}
      </div>
    </div>
  );
};

export default Scepter;

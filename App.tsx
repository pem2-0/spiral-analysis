
import React, { useState, useMemo, useCallback } from 'react';
import { SpiralType } from './types';
import Header from './components/Header';
import MapViewer from './components/MapViewer';
import Crown from './components/Crown';
import Scepter from './components/Scepter';
import Gauntlet from './components/Gauntlet';
import Throne from './components/Throne';
import EducationalMode from './components/EducationalMode';
import Orb from './components/Orb';

const App: React.FC = () => {
  const [activeSpiral, setActiveSpiral] = useState<SpiralType | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const analysisData = useMemo(() => {
    if (!activeSpiral) return null;
    switch (activeSpiral) {
      case SpiralType.Phi:
        return { varianceRatio: 1.618, pValue: 0.001, goldenAngleDip: 'Significant' };
      case SpiralType.Sqrt7:
        return { varianceRatio: 2.645, pValue: 0.052, goldenAngleDip: 'Inconclusive' };
      case SpiralType.Pi:
        return { varianceRatio: 3.141, pValue: 0.314, goldenAngleDip: 'None' };
      default:
        return null;
    }
  }, [activeSpiral]);

  const handleLoadMap = () => {
    setIsLoadingMap(true);
    setTimeout(() => {
        setIsMapLoaded(true);
        setIsLoadingMap(false);
    }, 2500); // Simulate loading time
  };
  
  const handleSelectSpiral = useCallback((spiral: SpiralType) => {
    if (spiral === activeSpiral || isAnalyzing) return;
    
    setActiveSpiral(null); // Clear previous selection immediately
    setIsAnalyzing(true);
    
    setTimeout(() => {
        setActiveSpiral(spiral);
        setIsAnalyzing(false);
    }, 1000); // Simulate analysis time
  }, [activeSpiral, isAnalyzing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#100f24] to-[#02020a] flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      <Header />

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Main Content: Map Viewer */}
        <div className="lg:col-span-2 bg-black/30 rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden relative border border-indigo-500/20 flex items-center justify-center">
          <MapViewer activeSpiral={activeSpiral} isMapLoaded={isMapLoaded} />
          {!isMapLoaded && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 p-8 text-center">
                {isLoadingMap ? (
                    <>
                        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Calibrating Quantum Sensors...</h2>
                        <div className="w-full max-w-md bg-indigo-900/50 rounded-full h-2.5">
                            <div className="bg-sky-400 h-2.5 rounded-full animate-pulse" style={{ animation: 'loading-progress 2.5s ease-out forwards' }}></div>
                            <style>{`
                                @keyframes loading-progress {
                                    from { width: 0% }
                                    to { width: 100% }
                                }
                            `}</style>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Awaiting Cosmological Data</h2>
                        <button 
                          onClick={handleLoadMap}
                          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105"
                        >
                          Initiate Data Stream
                        </button>
                     </>
                )}
             </div>
          )}
        </div>

        {/* Side Panel: Controls */}
        <div className="flex flex-col space-y-6">
          <Crown activeSpiral={activeSpiral} onSelectSpiral={handleSelectSpiral} isMapLoaded={isMapLoaded} isAnalyzing={isAnalyzing}/>
          <Scepter analysisData={analysisData} isAnalyzing={isAnalyzing} />
          <Gauntlet analysisData={analysisData} isAnalyzing={isAnalyzing} />
          <Orb isMapLoaded={isMapLoaded}/>
        </div>
      </main>

      <footer className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Throne />
         <EducationalMode activeSpiral={activeSpiral}/>
      </footer>
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { OrbIcon } from '../constants';

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled: boolean }> = ({ label, value, onChange, disabled }) => (
    <div className="space-y-2">
        <label className="flex justify-between text-sm text-gray-400">
            <span>{label}</span>
            <span className="font-mono text-sky-300">{value}%</span>
        </label>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
    </div>
);

const Orb: React.FC<{ isMapLoaded: boolean }> = ({ isMapLoaded }) => {
    const [resonance, setResonance] = useState(50);
    const [amplitude, setAmplitude] = useState(75);
    const [isRecalibrating, setIsRecalibrating] = useState(false);
    const [recalibrated, setRecalibrated] = useState(false);

    const handleRecalibrate = () => {
        setIsRecalibrating(true);
        setRecalibrated(false);
        setTimeout(() => {
            setIsRecalibrating(false);
            setRecalibrated(true);
            setTimeout(() => setRecalibrated(false), 2000);
        }, 1500);
    };

    return (
        <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg transition-opacity duration-500" style={{ opacity: isMapLoaded ? 1 : 0.6 }}>
            <div className="flex items-center mb-4">
                <OrbIcon className="w-8 h-8 text-indigo-300 mr-3" />
                <h2 className="text-xl font-bold text-indigo-300">Orb of Potentia</h2>
            </div>
            <div className="space-y-4">
                <Slider label="Quantum Resonance" value={resonance} onChange={(e) => setResonance(Number(e.target.value))} disabled={!isMapLoaded} />
                <Slider label="Field Amplitude" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} disabled={!isMapLoaded} />
                <button
                    onClick={handleRecalibrate}
                    disabled={!isMapLoaded || isRecalibrating}
                    className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isRecalibrating ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Recalibrating...
                        </>
                    ) : recalibrated ? 'Matrix Recalibrated!' : 'Recalibrate Matrix'}
                </button>
            </div>
        </div>
    );
};

export default Orb;

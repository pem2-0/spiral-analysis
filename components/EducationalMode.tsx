
import React, { useState, useCallback } from 'react';
import { SpiralType } from '../types';
import { runQuery } from '../services/geminiService';

interface EducationalModeProps {
    activeSpiral: SpiralType | null;
}

const EducationalMode: React.FC<EducationalModeProps> = ({ activeSpiral }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [error, setError] = useState('');

    const handleExplainClick = useCallback(async () => {
        const topic = activeSpiral ? `the ${activeSpiral} spiral in cosmology` : 'the significance of logarithmic spirals in cosmological analysis';
        const prompt = `Explain the concept of ${topic}. What is its theoretical basis and why is it interesting for studying the cosmic microwave background?`;
        
        setIsLoading(true);
        setExplanation('');
        setError('');
        try {
            const result = await runQuery(prompt);
            setExplanation(result);
        } catch (e) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to connect to Gemini interpreter. Please check the console.`);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [activeSpiral]);

    return (
        <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg h-full flex flex-col">
            <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-300 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14H9v-2h2v2zm4-4h-2V8a2 2 0 0 0-4 0v2H7V8a4 4 0 0 1 8 0v4z"/></svg>
                <h2 className="text-xl font-bold text-indigo-300">Educational Mode: Gemini Interpreter</h2>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2" style={{maxHeight: '200px'}}>
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-300"></div>
                        <p className="ml-3 text-sky-300">Consulting the cosmos...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-400 whitespace-pre-wrap text-sm text-center p-4">{error}</p>
                ) : explanation ? (
                    <p className="text-gray-300 whitespace-pre-wrap text-sm">{explanation}</p>
                ) : (
                     <p className="text-gray-500 text-center pt-8">Ask Gemini to explain the current analysis.</p>
                )}
            </div>

            <button
                onClick={handleExplainClick}
                disabled={isLoading}
                className="mt-4 w-full px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? 'Thinking...' : `Explain ${activeSpiral ? `the ${activeSpiral} spiral` : 'Concept'}`}
            </button>
        </div>
    );
};

export default EducationalMode;

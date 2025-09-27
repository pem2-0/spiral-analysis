
import React from 'react';
import { ThroneIcon } from '../constants';

const statusItems = [
    { label: "Pre-registration", status: "Complete", color: "text-green-400" },
    { label: "Systematics Appendix", status: "Complete", color: "text-green-400" },
    { label: "Code README", status: "Complete", color: "text-green-400" },
    { label: "Smart Loader", status: "Deployed", color: "text-green-400" },
    { label: "Full Regalia UI", status: "Deployed", color: "text-green-400" },
    { label: "Field Trace", status: "Kansas City Walk Logged", color: "text-sky-300" },
];

const nextSteps = [
    "Build EB tracker",
    "Overlay GPS trace with spiral paths",
    "Deploy splash panel generator",
    "Integrate real-time satellite data feed",
];

const Throne: React.FC = () => {
  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-indigo-500/20 shadow-lg h-full">
      <div className="flex items-center mb-4">
        <ThroneIcon className="w-8 h-8 text-indigo-300 mr-3" />
        <h2 className="text-xl font-bold text-indigo-300">Throne: Global Diagnostics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
            <h3 className="font-semibold text-gray-300 mb-2 border-b border-indigo-500/20 pb-1">Project Status</h3>
            <ul className="space-y-1 text-sm">
                {statusItems.map(item => (
                    <li key={item.label} className="flex justify-between">
                        <span className="text-gray-400">{item.label}:</span>
                        <span className={`font-medium ${item.color}`}>{item.status}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-gray-300 mb-2 border-b border-indigo-500/20 pb-1">Next Steps</h3>
             <ul className="space-y-1 text-sm list-disc list-inside text-gray-400">
                {nextSteps.map(step => (
                    <li key={step}>{step}</li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Throne;

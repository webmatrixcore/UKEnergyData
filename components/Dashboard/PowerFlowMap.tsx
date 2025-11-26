import React from 'react';
import { motion } from 'framer-motion';
import { PowerFlowData } from '../../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  data: PowerFlowData;
}

// Simple node component
const NodeBlock = ({ label, value, sub, color = "bg-slate-800" }: { label: string, value: string, sub?: string, color?: string }) => (
  <div className={`p-3 rounded-lg border border-slate-700/50 ${color} backdrop-blur-sm min-w-[120px]`}>
    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</div>
    <div className="text-xl font-bold text-white font-mono">{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

export const PowerFlowMap: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative w-full h-[400px] bg-[#0b1a2e] rounded-xl border border-slate-800 p-6 overflow-hidden flex items-center justify-between">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Left: Generation & Imports */}
      <div className="flex flex-col gap-4 z-10">
        <NodeBlock label="GB Generation" value={`${data.generation.toFixed(2)} GW`} color="bg-emerald-900/30 border-emerald-700/50" />
        <div className="h-8"></div> {/* Spacer */}
        <NodeBlock label="French Import" value={`${data.imports.france.toFixed(2)} GW`} color="bg-blue-900/30 border-blue-700/50" />
        <NodeBlock label="Dutch Import" value={`${data.imports.netherlands.toFixed(2)} GW`} color="bg-blue-900/30 border-blue-700/50" />
      </div>

      {/* Middle: The Grid (Animated Lines) */}
      <div className="flex-1 mx-8 relative h-full flex items-center justify-center">
        <div className="w-full h-2 bg-slate-800 rounded-full relative overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
        </div>
        
        {/* Connecting Lines Visuals (Simplified for code generation) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700" fill="none">
            <path d="M 0 100 C 100 100, 100 200, 200 200" strokeDasharray="5,5" />
            <path d="M 0 300 C 100 300, 100 200, 200 200" strokeDasharray="5,5" />
        </svg>

        <div className="absolute bg-slate-900 p-4 rounded-full border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] z-20">
            <div className="text-center">
                <div className="text-xs text-cyan-400 mb-1">NET DEMAND</div>
                <div className="text-2xl font-bold text-white font-mono">{data.netDemand.toFixed(2)} GW</div>
            </div>
        </div>
      </div>

      {/* Right: Demand & Exports */}
      <div className="flex flex-col gap-4 z-10">
        <NodeBlock label="National Demand" value={`${data.demand.toFixed(2)} GW`} color="bg-amber-900/30 border-amber-700/50" />
        <div className="h-8"></div>
        <NodeBlock label="Irish Export" value={`${data.exports.ireland.toFixed(2)} GW`} color="bg-purple-900/30 border-purple-700/50" />
        <NodeBlock label="Pumped Storage" value={`-${data.storage.pumped.toFixed(2)} GW`} sub="Charging" color="bg-indigo-900/30 border-indigo-700/50" />
      </div>

    </div>
  );
};
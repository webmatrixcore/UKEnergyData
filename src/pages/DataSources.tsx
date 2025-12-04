import React from 'react';
import { Database, Server, AlertTriangle } from 'lucide-react';

export const DataSources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Data Sources & Methodology</h1>
      
      <div className="space-y-12">
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="text-cyan-400" /> Primary Data Streams
            </h2>
            <div className="grid gap-6">
                <div className="bg-[#0f2238] p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">National Grid ESO Carbon Intensity API</h3>
                    <p className="mb-4">This is the backbone of our Dashboard. It provides the real-time generation mix (percentage of wind, solar, gas, etc.) and regional carbon intensity figures.</p>
                    <div className="text-sm font-mono bg-black/30 p-3 rounded text-slate-400 border border-slate-800">
                        Endpoint: https://api.carbonintensity.org.uk/generation
                    </div>
                </div>
                
                <div className="bg-[#0f2238] p-6 rounded-lg border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle size={64} />
                    </div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">Demand Estimation Methodology</h3>
                    <p className="mb-4">
                        <strong>Note:</strong> The public ESO Carbon Intensity API provides <em>relative</em> generation data (percentages) rather than absolute telemetry (GW). 
                        To provide a useful dashboard experience with absolute values, we apply a demand estimation model.
                    </p>
                    <div className="bg-amber-900/20 p-4 rounded border-l-4 border-amber-500 text-slate-300 text-sm">
                        Our algorithm estimates total GB Demand (GW) based on historical seasonal baselines, time-of-day load profiles, and day-of-week factors. 
                        While accurate enough for identifying trends and approximate scale, these absolute figures are simulations and should not be used for commercial trading.
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="text-purple-400" /> Content & Reference Sources
            </h2>
            <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-[#0b1a2e] p-4 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                    <div>
                        <strong className="text-white block">Ofgem (Office of Gas and Electricity Markets)</strong>
                        <span className="text-sm text-slate-400">We source regulatory updates, price cap methodology decisions, and compliance news directly from Ofgem publications.</span>
                    </div>
                </li>
                <li className="flex items-start gap-4 bg-[#0b1a2e] p-4 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                    <div>
                        <strong className="text-white block">DESNZ (Dept for Energy Security and Net Zero)</strong>
                        <span className="text-sm text-slate-400">Source for government policy announcements, subsidy schemes (like the Boiler Upgrade Scheme), and CfD allocation rounds.</span>
                    </div>
                </li>
                <li className="flex items-start gap-4 bg-[#0b1a2e] p-4 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                    <div>
                        <strong className="text-white block">Elexon BMRS</strong>
                        <span className="text-sm text-slate-400">Reference for Balancing Mechanism (BM) data, system prices, and outage information used in our market analysis.</span>
                    </div>
                </li>
            </ul>
        </section>
      </div>
    </div>
  );
};
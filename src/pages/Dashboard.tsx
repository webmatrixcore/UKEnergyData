
import React, { useEffect, useState } from 'react';
import { fetchDashboardData, fetchHistoryData } from '../services/api';
import { FuelMix, CarbonData, PowerFlowData, HistoryPoint } from '../types';
import { GenerationMixChart } from '../components/Dashboard/GenerationMixChart';
import { AdvancedSystemChart } from '../components/Dashboard/AdvancedSystemChart';
import { CarbonGauge } from '../components/Dashboard/CarbonGauge';
import { PowerFlowMap } from '../components/Dashboard/PowerFlowMap';
import { RefreshCcw, Battery, Zap, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [fuelMix, setFuelMix] = useState<FuelMix[]>([]);
  const [carbon, setCarbon] = useState<CarbonData | null>(null);
  const [flow, setFlow] = useState<PowerFlowData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await fetchDashboardData();
        const hist = await fetchHistoryData();
        
        setFuelMix(data.fuelMix);
        setCarbon(data.carbon);
        setFlow(data.flow);
        setHistory(hist);
        setLastUpdated(new Date());
    } catch (err) {
        setError("Unable to connect to National Grid ESO Data Service. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading && !lastUpdated) {
      return (
          <div className="min-h-screen flex items-center justify-center flex-col gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-cyan-400 animate-pulse">Fetching Live ESO Data...</div>
          </div>
      );
  }

  if (error && !lastUpdated) {
      return (
          <div className="min-h-screen flex items-center justify-center px-4">
              <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-center max-w-md">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4"/>
                  <h3 className="text-xl font-bold text-white mb-2">Data Connection Error</h3>
                  <p className="text-red-200 mb-6 text-sm">{error}</p>
                  <button onClick={loadData} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                      Retry Connection
                  </button>
              </div>
          </div>
      );
  }

  const totalGen = fuelMix.reduce((acc, item) => acc + item.value, 0);
  
  // Calculate category totals
  const renewables = fuelMix.filter(f => ['Wind', 'Solar', 'Hydro', 'Biomass'].includes(f.label)).reduce((acc, f) => acc + f.percentage, 0);
  const fossil = fuelMix.filter(f => ['Gas', 'Coal'].includes(f.label)).reduce((acc, f) => acc + f.percentage, 0);
  const lowCarbon = renewables + (fuelMix.find(f => f.label === 'Nuclear')?.percentage || 0);
  const others = 100 - lowCarbon - fossil; // Imports + Other

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Real-time System Data</h1>
          <p className="text-slate-400 text-sm mt-1">Live telemetry via Carbon Intensity API (National Grid ESO)</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
          <span className="font-medium text-emerald-500">LIVE</span>
          <span className="text-slate-700">|</span>
          <span>Updated: {lastUpdated?.toLocaleTimeString()}</span>
          <button onClick={loadData} className="hover:text-white transition-colors ml-2" disabled={loading}>
            <RefreshCcw size={14} className={loading ? "animate-spin" : "text-cyan-500"}/>
          </button>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Generation Mix */}
        <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-5 col-span-1 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Zap size={18} className="text-yellow-500"/> Generation Mix</h3>
          </div>
          <GenerationMixChart data={fuelMix} total={totalGen} />
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {fuelMix.slice(0,6).map(fuel => (
                <div key={fuel.id} className="flex justify-between items-center p-2 bg-slate-900/50 rounded border border-slate-800/50 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shadow-sm" style={{background: fuel.color}}></div>
                        <span className="text-slate-300 font-medium">{fuel.label}</span>
                    </div>
                    <div className="text-right">
                        <div className="font-mono text-white font-bold">{fuel.percentage}%</div>
                        <div className="text-[10px] text-slate-500">{fuel.value.toFixed(1)} GW</div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Card 2: Carbon & Stats */}
        <div className="grid grid-rows-2 gap-6 col-span-1">
            <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-5 relative overflow-hidden shadow-lg">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
                 <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Carbon Intensity</h3>
                 {carbon && <CarbonGauge data={carbon} />}
            </div>
            <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-5 flex flex-col justify-center space-y-5 shadow-lg">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Battery size={18} className="text-indigo-400"/> Storage Status (Est)</h3>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
                        <span>Pumped Hydro</span>
                        <span className="text-white font-mono">1.8 / 2.4 GWh</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800/50">
                        <div className="bg-indigo-500 h-2 rounded-full shadow-[0_0_10px_#6366f1]" style={{width: '75%'}}></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
                        <span>Grid Batteries</span>
                        <span className="text-white font-mono">0.9 / 1.2 GWh</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800/50">
                        <div className="bg-emerald-500 h-2 rounded-full shadow-[0_0_10px_#10b981]" style={{width: '60%'}}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Card 3: Gen Type Bar */}
        <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-5 col-span-1 flex flex-col shadow-lg">
             <h3 className="text-lg font-semibold text-white mb-6">Source Breakdown</h3>
             <div className="flex-1 flex flex-col justify-center gap-6">
                {[
                    { label: 'Zero Carbon', val: lowCarbon, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
                    { label: 'Renewables', val: renewables, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/20' },
                    { label: 'Fossil Fuels', val: fossil, color: 'bg-orange-500', shadow: 'shadow-orange-500/20' },
                    { label: 'Others/Imports', val: others, color: 'bg-slate-500', shadow: 'shadow-slate-500/20' }
                ].map(cat => (
                    <div key={cat.label}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-300 font-medium">{cat.label}</span>
                            <span className="text-white font-bold font-mono">{cat.val.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 relative group">
                            <div className={`${cat.color} ${cat.shadow} h-full rounded-full relative overflow-hidden transition-all duration-1000 shadow-lg`} style={{width: `${Math.max(cat.val, 2)}%`}}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>

      {/* Middle: Power Flow */}
      <div className="w-full">
        <h3 className="text-xl font-semibold text-white mb-4">International Interconnectors</h3>
        {flow && <PowerFlowMap data={flow} />}
      </div>

      {/* Bottom: History Curve */}
      <div className="w-full">
        <AdvancedSystemChart data={history} />
      </div>
    </div>
  );
};

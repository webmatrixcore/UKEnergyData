
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { HistoryPoint } from '../../types';
import { EMISSION_FACTORS } from '../../services/api';
import { Info, Power, Zap, Leaf } from 'lucide-react';

interface Props {
  data: HistoryPoint[];
}

// Color constants
const COLORS = {
    Gas: '#f97316',      // Orange
    Solar: '#eab308',    // Yellow
    Coal: '#3f3f46',     // Zinc
    Hydro: '#3b82f6',    // Blue
    Wind: '#0ea5e9',     // Sky
    Misc: '#94a3b8',     // Slate
    Imports: '#ef4444',  // Red
    Storage: '#8b5cf6',  // Violet
    Biomass: '#10b981',  // Emerald
    Nuclear: '#a855f7',  // Purple
    Other: '#64748b'     // Slate
};

export const AdvancedSystemChart: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Use the last data point if no hover, or the hovered point
  const activeData = useMemo(() => {
      if (data.length === 0) return null;
      if (activeIndex !== null && data[activeIndex]) return data[activeIndex];
      return data[data.length - 1];
  }, [data, activeIndex]);

  // Calculated Totals for the active slice
  const totalGen = activeData ? (
      activeData.Gas + activeData.Solar + activeData.Coal + activeData.Hydro + 
      activeData.Wind + activeData.Other + activeData.Imports + activeData.Storage + 
      activeData.Biomass + activeData.Nuclear
  ) : 0;

  const totalEmissionsWeight = activeData ? (
      activeData.Gas * EMISSION_FACTORS.Gas +
      activeData.Coal * EMISSION_FACTORS.Coal +
      activeData.Biomass * EMISSION_FACTORS.Biomass +
      activeData.Imports * EMISSION_FACTORS.Imports +
      activeData.Other * EMISSION_FACTORS.Other
  ) : 0;

  // Approximate total GWh for the whole visible period (simple integration: sum of GW * 0.5h)
  const totalEnergyMap = useMemo(() => {
      const map: Record<string, number> = {};
      const keys = Object.keys(COLORS);
      keys.forEach(k => map[k] = 0);
      
      data.forEach(d => {
          // @ts-ignore
          keys.forEach(k => map[k] += (d[k] || 0) * 0.5);
      });
      return map;
  }, [data]);
  
  // Approximate Total Emissions Tonnage for the period
  const totalEmissionsMap = useMemo(() => {
      const map: Record<string, number> = {};
      const keys = Object.keys(COLORS);
      keys.forEach(k => map[k] = 0);
      data.forEach(d => {
          // @ts-ignore
          keys.forEach(k => {
               // @ts-ignore
               const val = (d[k] || 0) * 0.5; // GWh
               // @ts-ignore
               const factor = EMISSION_FACTORS[k] || 0; // g/kWh = kg/MWh = tonnes/GWh
               map[k] += val * factor; // tonnes
          });
      });
      return map;
  }, [data]);


  const handleMouseMove = (state: any) => {
    if (state.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    }
  };

  if (!data || data.length === 0) {
      return <div className="h-[800px] flex items-center justify-center text-slate-500">Loading System Data...</div>;
  }

  return (
    <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Header Toolbar */}
      <div className="bg-[#0f2238] p-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-lg">Generation, CO₂ Emissions & Demand</h3>
              <Info size={16} className="text-slate-500 cursor-help"/>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                  <span>All sources</span>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-cyan-500"></div>
              </div>
              <div className="flex items-center gap-2">
                  <span>Mix</span>
                  <div className="w-8 h-4 bg-cyan-900 rounded-full relative cursor-pointer border border-cyan-700">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-white">Type</span>
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-white">GW</span>
                  <div className="w-8 h-4 bg-cyan-900 rounded-full relative cursor-pointer border border-cyan-700">
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span>%</span>
              </div>
              <div className="text-cyan-400">Live Data</div>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[850px]">
          
          {/* Left Column: Charts */}
          <div className="flex-1 flex flex-col border-r border-slate-800 min-h-[600px]">
              
              {/* CHART 1: GENERATION STACK */}
              <div className="flex-1 p-4 relative border-b border-slate-800/50">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500 font-bold tracking-wider">Generation (GW)</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} onMouseMove={handleMouseMove} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <defs>
                            {Object.entries(COLORS).map(([key, color]) => (
                                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.9}/>
                                    <stop offset="95%" stopColor={color} stopOpacity={0.7}/>
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#64748b" tick={{fontSize: 10}} domain={[0, 'auto']} width={30}/>
                        <Tooltip trigger="hover" content={() => null} cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}/>
                        
                        <Area type="monotone" dataKey="Gas" stackId="1" stroke={COLORS.Gas} fill={`url(#colorGas)`} />
                        <Area type="monotone" dataKey="Coal" stackId="1" stroke={COLORS.Coal} fill={`url(#colorCoal)`} />
                        <Area type="monotone" dataKey="Imports" stackId="1" stroke={COLORS.Imports} fill={`url(#colorImports)`} />
                        <Area type="monotone" dataKey="Biomass" stackId="1" stroke={COLORS.Biomass} fill={`url(#colorBiomass)`} />
                        <Area type="monotone" dataKey="Nuclear" stackId="1" stroke={COLORS.Nuclear} fill={`url(#colorNuclear)`} />
                        <Area type="monotone" dataKey="Hydro" stackId="1" stroke={COLORS.Hydro} fill={`url(#colorHydro)`} />
                        <Area type="monotone" dataKey="Wind" stackId="1" stroke={COLORS.Wind} fill={`url(#colorWind)`} />
                        <Area type="monotone" dataKey="Solar" stackId="1" stroke={COLORS.Solar} fill={`url(#colorSolar)`} />
                        <Area type="monotone" dataKey="Other" stackId="1" stroke={COLORS.Other} fill={`url(#colorOther)`} />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>

              {/* CHART 2: CARBON INTENSITY */}
              <div className="h-[200px] p-4 relative border-b border-slate-800/50 bg-[#081424]">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500 font-bold tracking-wider">Intensity (gCO₂/kWh)</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} onMouseMove={handleMouseMove} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#64748b" tick={{fontSize: 10}} domain={[0, 350]} width={30}/>
                        <Tooltip trigger="hover" content={() => null} cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}/>
                        <Area type="monotone" dataKey="carbonIntensity" stroke="#cbd5e1" strokeWidth={2} fill="url(#colorCarbon)" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>

              {/* CHART 3: DEMAND */}
              <div className="h-[200px] p-4 relative bg-[#081424]">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-500 font-bold tracking-wider">Demand (GW)</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} onMouseMove={handleMouseMove} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 10}} interval={12} />
                        <YAxis stroke="#64748b" tick={{fontSize: 10}} domain={['auto', 'auto']} width={30}/>
                        <Tooltip trigger="hover" content={() => null} cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}/>
                        
                        <Line type="monotone" dataKey="demand_gross" stroke="#ef4444" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="demand_transmission" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="demand_national" stroke="#cbd5e1" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 text-[10px]">
                      <div className="flex items-center gap-1 text-slate-300"><div className="w-2 h-0.5 bg-slate-300"></div> National Demand</div>
                      <div className="flex items-center gap-1 text-blue-400"><div className="w-2 h-0.5 bg-blue-500"></div> Transmission Demand</div>
                      <div className="flex items-center gap-1 text-red-400"><div className="w-2 h-0.5 bg-red-500"></div> Actual Gross</div>
                  </div>
              </div>
          </div>

          {/* Right Column: Stats Panel */}
          <div className="w-full lg:w-[350px] bg-[#060e18] flex flex-col text-sm">
              
              {/* SECTION 1: GENERATION TABLE */}
              <div className="flex-1 flex flex-col border-b border-slate-800 p-4">
                  <div className="flex justify-between text-slate-400 text-xs font-bold uppercase mb-2 px-2">
                      <span className="w-24">Source</span>
                      <span className="w-12 text-right">GW</span>
                      <span className="w-12 text-right">%</span>
                      <span className="w-12 text-right">GWh</span>
                  </div>
                  <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                      {Object.keys(COLORS).map((key) => {
                          const k = key as keyof typeof COLORS;
                          // @ts-ignore
                          const val = activeData ? (activeData[k] || 0) : 0;
                          const perc = totalGen > 0 ? (val / totalGen) * 100 : 0;
                          const totalEnergy = totalEnergyMap[k];

                          if (val <= 0.01 && totalEnergy < 1) return null;

                          return (
                              <div key={key} className="flex justify-between items-center p-2 hover:bg-slate-800/50 rounded group cursor-default">
                                  <div className="flex items-center gap-2 w-24">
                                      <div className="w-3 h-1 rounded-full" style={{background: COLORS[k]}}></div>
                                      <span className="text-slate-300 font-medium">{key}</span>
                                  </div>
                                  <span className="w-12 text-right font-mono text-white">{val.toFixed(1)}</span>
                                  <span className="w-12 text-right font-mono text-slate-400">{perc.toFixed(1)}</span>
                                  <span className="w-12 text-right font-mono text-slate-500">{totalEnergy.toFixed(0)}</span>
                              </div>
                          );
                      })}
                      <div className="border-t border-slate-800 mt-2 pt-2 flex justify-between items-center px-2">
                          <span className="font-bold text-white w-24">All</span>
                          <span className="font-bold text-white w-12 text-right">{totalGen.toFixed(1)}</span>
                          <span className="font-bold text-white w-12 text-right">100</span>
                          <span className="font-bold text-white w-12 text-right">
                              {Object.values(totalEnergyMap).reduce((a,b) => a+b, 0).toFixed(0)}
                          </span>
                      </div>
                  </div>
              </div>

              {/* SECTION 2: EMISSIONS TABLE */}
              <div className="h-[200px] border-b border-slate-800 p-4 bg-[#081424]">
                   <h4 className="text-slate-400 text-xs font-bold uppercase mb-3">Emissions Breakdown</h4>
                   <div className="flex justify-between text-slate-500 text-[10px] uppercase mb-1 px-2">
                        <span className="w-20">Source</span>
                        <span className="w-16 text-right">gCO₂/kWh</span>
                        <span className="w-12 text-right">%</span>
                        <span className="w-16 text-right">CO₂(t)</span>
                   </div>
                   <div className="space-y-1 overflow-y-auto h-[120px] pr-1 custom-scrollbar">
                        {['Gas', 'Coal', 'Biomass', 'Imports', 'Other'].map((key) => {
                            const k = key as keyof typeof COLORS;
                            // @ts-ignore
                            const gw = activeData ? (activeData[k] || 0) : 0;
                            const intensity = EMISSION_FACTORS[key];
                            
                            // Calculate this source's contribution to current total weighted intensity
                            const emissionsWeight = gw * intensity;
                            const share = totalEmissionsWeight > 0 ? (emissionsWeight / totalEmissionsWeight) * 100 : 0;
                            const totalTonnes = totalEmissionsMap[k];

                            if (gw <= 0 && totalTonnes < 1) return null;

                            return (
                                <div key={key} className="flex justify-between items-center p-1.5 hover:bg-slate-800/50 rounded text-xs">
                                    <div className="flex items-center gap-2 w-20">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{background: COLORS[k]}}></div>
                                        <span className="text-slate-300">{key}</span>
                                    </div>
                                    <span className="w-16 text-right font-mono text-slate-400">{intensity}</span>
                                    <span className="w-12 text-right font-mono text-slate-400">{share.toFixed(1)}</span>
                                    <span className="w-16 text-right font-mono text-slate-300">{totalTonnes.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                                </div>
                            );
                        })}
                         <div className="border-t border-slate-800 mt-1 pt-1 flex justify-between items-center px-2 text-xs">
                            <span className="font-bold text-white w-20">Avg/Tot</span>
                            <span className="font-bold text-white w-16 text-right">{activeData?.carbonIntensity}</span>
                            <span className="font-bold text-white w-12 text-right">100</span>
                            <span className="font-bold text-white w-16 text-right">
                                {Object.values(totalEmissionsMap).reduce((a,b) => a+b, 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                        </div>
                   </div>
              </div>

              {/* SECTION 3: DEMAND TABLE */}
              <div className="h-[200px] p-4 bg-[#081424]">
                   <h4 className="text-slate-400 text-xs font-bold uppercase mb-3">Demand Summary</h4>
                   <div className="space-y-2 text-xs">
                       <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                           <span className="text-slate-400">National Demand</span>
                           <div className="text-right">
                               <span className="block text-white font-bold font-mono">{activeData?.demand_national.toFixed(2)} GW</span>
                           </div>
                       </div>
                       <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded border-l-2 border-blue-500">
                           <span className="text-blue-400">Transmission Demand</span>
                           <div className="text-right">
                               <span className="block text-white font-bold font-mono">{activeData?.demand_transmission.toFixed(2)} GW</span>
                           </div>
                       </div>
                       <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded border-l-2 border-red-500">
                           <span className="text-red-400">Gross Demand</span>
                           <div className="text-right">
                               <span className="block text-white font-bold font-mono">{activeData?.demand_gross.toFixed(2)} GW</span>
                           </div>
                       </div>
                       <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between text-slate-500 text-[10px]">
                           <span>TSD/Gross Ratio</span>
                           <span>{activeData ? ((activeData.demand_transmission / activeData.demand_gross) * 100).toFixed(1) : 0}%</span>
                       </div>
                   </div>
              </div>

          </div>
      </div>
    </div>
  );
};

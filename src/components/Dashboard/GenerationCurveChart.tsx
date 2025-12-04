
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
}

export const GenerationCurveChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
      return (
        <div className="h-[350px] w-full flex items-center justify-center flex-col gap-2 text-slate-500">
            <div className="animate-spin w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full"></div>
            <span>Loading 24h generation history...</span>
        </div>
      );
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNuclear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
             <linearGradient id="colorBiomass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            tick={{fontSize: 11}} 
            interval={12} // Show tick every ~6 hours (since 30min intervals)
          />
          <YAxis 
            stroke="#64748b" 
            tick={{fontSize: 11}} 
            label={{ value: 'GW', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f2238', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
            itemStyle={{ padding: 0 }}
            formatter={(value: number) => [`${value.toFixed(2)} GW`]}
          />
          <Area type="monotone" dataKey="Coal" stackId="1" stroke="#3f3f46" fill="#3f3f46" />
          <Area type="monotone" dataKey="Other" stackId="1" stroke="#64748b" fill="#64748b" />
          <Area type="monotone" dataKey="Imports" stackId="1" stroke="#ef4444" fill="#ef4444" />
          <Area type="monotone" dataKey="Hydro" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
          <Area type="monotone" dataKey="Biomass" stackId="1" stroke="#10b981" fill="url(#colorBiomass)" />
          <Area type="monotone" dataKey="Nuclear" stackId="1" stroke="#a855f7" fill="url(#colorNuclear)" />
          <Area type="monotone" dataKey="Solar" stackId="1" stroke="#eab308" fill="url(#colorSolar)" />
          <Area type="monotone" dataKey="Wind" stackId="1" stroke="#0ea5e9" fill="url(#colorWind)" />
          <Area type="monotone" dataKey="Gas" stackId="1" stroke="#f97316" fill="url(#colorGas)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CarbonData } from '../../types';
import { Leaf } from 'lucide-react';

interface Props {
  data: CarbonData;
}

export const CarbonGauge: React.FC<Props> = ({ data }) => {
  // Create a semi-circle gauge
  const gaugeData = [
    { name: 'Value', value: data.current, color: data.status === 'low' ? '#10b981' : data.status === 'medium' ? '#eab308' : '#ef4444' },
    { name: 'Remaining', value: 400 - data.current, color: '#1e293b' },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {gaugeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="absolute bottom-6 flex flex-col items-center">
        <Leaf className={`w-6 h-6 mb-1 ${data.status === 'low' ? 'text-emerald-400' : data.status === 'medium' ? 'text-amber-400' : 'text-red-400'}`} />
        <span className="text-3xl font-bold text-white">{data.current}</span>
        <span className="text-xs text-slate-400">gCO₂/kWh</span>
        <span className={`text-sm font-medium mt-1 uppercase px-2 py-0.5 rounded-full bg-slate-800 border ${
             data.status === 'low' ? 'text-emerald-400 border-emerald-500/30' : 
             data.status === 'medium' ? 'text-amber-400 border-amber-500/30' : 
             'text-red-400 border-red-500/30'
        }`}>
          {data.status} Intensity
        </span>
      </div>
    </div>
  );
};
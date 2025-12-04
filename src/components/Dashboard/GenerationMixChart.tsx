import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FuelMix } from '../../types';

interface Props {
  data: FuelMix[];
  total: number;
}

export const GenerationMixChart: React.FC<Props> = ({ data, total }) => {
  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data as any}
            innerRadius={80}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f2238', borderColor: '#334155', color: '#fff' }}
            itemStyle={{ color: '#cbd5e1' }}
            formatter={(value: number) => [`${value.toFixed(2)} GW`, 'Output']}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-slate-400 text-sm font-medium">Total Gen</span>
        <span className="text-2xl font-bold text-white">{total.toFixed(2)}</span>
        <span className="text-xs text-slate-500">GW</span>
      </div>
    </div>
  );
};
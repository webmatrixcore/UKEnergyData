import React from 'react';
import { FileText, Download } from 'lucide-react';

const REPORTS = [
  { id: 1, title: 'Annual Grid Carbon Report 2023', date: 'Jan 2024', size: '4.2 MB' },
  { id: 2, title: 'Q1 2024 Flexibility Market Analysis', date: 'Apr 2024', size: '2.1 MB' },
  { id: 3, title: 'Future Energy Scenarios (FES) Summary', date: 'July 2024', size: '8.5 MB' },
  { id: 4, title: 'Winter Outlook Report 2024/25', date: 'Oct 2024', size: '3.6 MB' },
];

export const Reports: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Energy Reports</h1>
        <p className="text-slate-400">Download in-depth analysis and official datasets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {REPORTS.map((report) => (
          <div key={report.id} className="bg-[#0f2238] border border-slate-700/50 rounded-xl p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-lg text-cyan-400 group-hover:text-cyan-300 border border-slate-700">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">{report.title}</h3>
                <div className="text-xs text-slate-500 mt-1">
                   Published: {report.date} • Size: {report.size}
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
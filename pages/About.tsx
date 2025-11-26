import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">About UK Energy Data</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="leading-relaxed text-lg">
            The UK energy landscape is undergoing a rapid transformation. As we move from large fossil-fuel power stations to a decentralized grid powered by wind, solar, and batteries, the complexity of the system increases exponentially.
          </p>
          <p className="mt-4 leading-relaxed">
            <strong>UK Energy Data</strong> was built to make this complexity accessible. We believe that transparent data is the foundation of a successful Net Zero transition. Whether you are a policy maker, an industry analyst, or a household trying to optimize energy usage, having access to real-time grid data is essential.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#0b1a2e] p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Real-Time Visualization</h3>
                <p>We aggregate live telemetry from the National Grid ESO to show exactly how Britain is powering itself right now, visualizing complex fuel mixes and power flows.</p>
            </div>
            <div className="bg-[#0b1a2e] p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold text-emerald-400 mb-3">Decarbonization Tracking</h3>
                <p>We track the carbon intensity of the grid in real-time, helping users understand the environmental impact of their electricity usage.</p>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
            <li><strong>Policy Analysis:</strong> We digest complex regulatory documents from Ofgem and DESNZ into clear, actionable insights.</li>
            <li><strong>Market Intelligence:</strong> We provide updates on major infrastructure projects, from offshore wind farms to battery storage pipelines.</li>
            <li><strong>Consumer Education:</strong> We provide guides to help households navigate smart tariffs, heat pumps, and energy efficiency measures.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
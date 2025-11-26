import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 bg-[#0b1a2e] p-8 rounded-xl border border-slate-800">
        <p className="text-sm text-slate-500">Last updated: May 2024</p>
        
        <section>
            <h3 className="text-xl font-bold text-white mb-2">1. Introduction</h3>
            <p>At UK Energy Data, we respect your privacy. This policy explains how we handle data when you visit our platform.</p>
        </section>

        <section>
            <h3 className="text-xl font-bold text-white mb-2">2. Data Collection</h3>
            <p>We are a privacy-first platform. We do not require you to create an account to access our dashboards or articles.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 marker:text-cyan-500">
                <li>We do not collect names, email addresses, or phone numbers.</li>
                <li>We do not track your location via GPS.</li>
                <li>We do not sell your data to third parties.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-white mb-2">3. Cookies & Local Storage</h3>
            <p>We use standard internet technologies to ensure the site functions correctly:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 marker:text-cyan-500">
                <li><strong>Local Storage:</strong> Used to save simple preferences (e.g., dashboard layout settings) on your specific device.</li>
                <li><strong>Analytics:</strong> We use anonymous, aggregate analytics to understand which charts are most popular. No personally identifiable information (PII) is attached to this data.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-xl font-bold text-white mb-2">4. Third-Party Links</h3>
            <p>Our content often links to official sources (Ofgem.gov.uk, NationalGridESO.com). We are not responsible for the privacy practices of these external sites.</p>
        </section>
        
        <section>
            <h3 className="text-xl font-bold text-white mb-2">5. Contact</h3>
            <p>If you have any questions about this privacy policy, please contact us at privacy@ukenergydata.example.com.</p>
        </section>
      </div>
    </div>
  );
};
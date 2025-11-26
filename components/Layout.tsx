import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-200 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-[#050d18] border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 UK Energy Data Platform. Data simulated for demonstration purposes.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/sources" className="hover:text-cyan-400 cursor-pointer transition-colors">Data Sources</Link>
            <Link to="/about" className="hover:text-cyan-400 cursor-pointer transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
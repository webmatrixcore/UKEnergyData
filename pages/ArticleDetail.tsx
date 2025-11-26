import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Article } from '../types';
import { ArrowLeft, Calendar, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // Note: In a real setup, we'd need to install this. For this demo, I'll simulate rendering.

interface Props {
  articles: Article[];
  type: 'policy' | 'article';
  backLink: string;
}

export const ArticleDetail: React.FC<Props> = ({ articles, type, backLink }) => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <Navigate to={backLink} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to={backLink} className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to {type === 'policy' ? 'Policies' : 'Feed'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                <span className="bg-slate-800 text-cyan-400 px-2 py-1 rounded uppercase text-xs font-bold tracking-wider border border-slate-700">
                    {article.category}
                </span>
                <span className="flex items-center gap-1"><Calendar size={14}/> {article.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">{article.title}</h1>
            {article.imageUrl && (
                <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8 border border-slate-800">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                {/* Simulating Markdown Content Rendering */}
                <p className="text-xl text-slate-200 font-light leading-relaxed border-l-4 border-cyan-500 pl-6 mb-8 italic">
                    {article.excerpt}
                </p>
                <div className="space-y-6">
                    {article.content.split('\n').map((line, i) => {
                         if(line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                         if(line.trim() !== '') return <p key={i} className="leading-relaxed">{line}</p>;
                         return <br key={i} />;
                    })}
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar / TOC */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
                <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Table of Contents</h3>
                    <ul className="space-y-3 text-sm">
                        {article.content.split('\n').filter(l => l.startsWith('## ')).map((h, i) => (
                             <li key={i}>
                                 <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors block border-l border-slate-700 pl-3 hover:border-cyan-400">
                                     {h.replace('## ', '')}
                                 </a>
                             </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-[#0b1a2e] border border-slate-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Actions</h3>
                    <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded transition-colors border border-slate-700">
                            <Share2 size={16} /> Share
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-400 py-2 rounded transition-colors border border-cyan-900/50">
                            <Bookmark size={16} /> Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
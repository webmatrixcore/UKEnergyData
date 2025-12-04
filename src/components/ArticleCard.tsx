import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props {
  article: Article;
  basePath: string;
}

export const ArticleCard: React.FC<Props> = ({ article, basePath }) => {
  return (
    <Link to={`${basePath}/${article.slug}`} className="group block h-full">
      <div className="bg-[#0f2238] rounded-xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/80 backdrop-blur-sm text-cyan-400 text-xs font-bold px-2 py-1 rounded border border-slate-700">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center text-slate-400 text-xs mb-3 gap-2">
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
            {article.excerpt}
          </p>
          <div className="flex items-center text-cyan-500 text-sm font-medium mt-auto">
            Read Article <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};
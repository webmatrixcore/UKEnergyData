import React from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';

interface Props {
  title: string;
  subtitle: string;
  articles: Article[];
  basePath: string;
}

export const ArticleList: React.FC<Props> = ({ title, subtitle, articles, basePath }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-slate-400 max-w-3xl">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
            <ArticleCard key={article.id} article={article} basePath={basePath} />
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ArticleList } from './pages/ArticleList';
import { ArticleDetail } from './pages/ArticleDetail';
import { Reports } from './pages/Reports';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { DataSources } from './pages/DataSources';
import { POLICIES, INSIGHTS, NEWS, SAVING_GUIDES } from './services/mockData';

// Placeholder for simple pages to reuse ArticleList
const Industry = () => <ArticleList title="Industry News" subtitle="Major infrastructure projects and market developments." articles={NEWS} basePath="/industry" />;
const Insights = () => <ArticleList title="Energy Insights" subtitle="Deep dives into data trends and future forecasts." articles={INSIGHTS} basePath="/insights" />;
const Policy = () => <ArticleList title="Policy Library" subtitle="Comprehensive archive of UK energy regulation." articles={POLICIES} basePath="/policy" />;
const EnergySaving = () => <ArticleList title="Energy Saving" subtitle="Practical guides for home efficiency." articles={SAVING_GUIDES} basePath="/energy-saving" />;
const News = () => <ArticleList title="Latest News" subtitle="Breaking headlines from the energy sector." articles={NEWS} basePath="/news" />;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<ArticleDetail articles={INSIGHTS} type="article" backLink="/insights" />} />

          <Route path="/policy" element={<Policy />} />
          <Route path="/policy/:slug" element={<ArticleDetail articles={POLICIES} type="policy" backLink="/policy" />} />

          <Route path="/industry" element={<Industry />} />
          <Route path="/industry/:slug" element={<ArticleDetail articles={NEWS} type="article" backLink="/industry" />} />

          <Route path="/energy-saving" element={<EnergySaving />} />
          <Route path="/energy-saving/:slug" element={<ArticleDetail articles={SAVING_GUIDES} type="article" backLink="/energy-saving" />} />

          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<ArticleDetail articles={NEWS} type="article" backLink="/news" />} />

          <Route path="/reports" element={<Reports />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sources" element={<DataSources />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

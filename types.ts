
export interface FuelMix {
  id: string;
  label: string;
  value: number; // GW
  percentage: number;
  color: string;
}

export interface CarbonData {
  current: number; // gCO2/kWh
  status: 'low' | 'medium' | 'high';
  forecast: number[];
}

export interface PowerFlowData {
  generation: number;
  demand: number;
  netDemand: number;
  imports: {
    france: number;
    netherlands: number;
    belgium: number;
  };
  exports: {
    ireland: number;
  };
  storage: {
    pumped: number;
    battery: number;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string; // Markdown-like or HTML string
  imageUrl?: string;
  author?: string;
}

export interface HistoryPoint {
  time: string;
  timestamp: number;
  
  // Fuel Types (GW)
  Gas: number;
  Wind: number;
  Solar: number;
  Nuclear: number;
  Biomass: number;
  Imports: number;
  Hydro: number;
  Coal: number;
  Other: number;
  Storage: number;

  // Demand Metrics (GW)
  demand_national: number;
  demand_transmission: number;
  demand_gross: number;
  demand_net: number;

  // Carbon (gCO2/kWh)
  carbonIntensity: number;
}

export enum PageType {
  DASHBOARD = 'dashboard',
  INSIGHTS = 'insights',
  POLICY = 'policy',
  INDUSTRY = 'industry',
  SAVING = 'saving',
  NEWS = 'news',
  REPORTS = 'reports',
  SOURCES = 'sources',
  ABOUT = 'about'
}

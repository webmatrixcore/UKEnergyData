
import { FuelMix, CarbonData, PowerFlowData, HistoryPoint } from '../types';

const API_BASE = 'https://api.carbonintensity.org.uk';

// Helper: Estimate UK demand based on season and time of day
const getEstimatedTotalDemand = (date: Date = new Date()) => {
  const month = date.getMonth(); // 0-11
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const timeFloat = hour + minutes / 60;
  
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  // Seasonal Baselines (GW)
  let peakLoad = 40; // Default Spring/Autumn
  let baseLoad = 22;

  // Winter (Nov - Feb)
  if (month >= 10 || month <= 1) {
    peakLoad = 48;
    baseLoad = 28;
  } 
  // Summer (Jun - Aug)
  else if (month >= 5 && month <= 7) {
    peakLoad = 32;
    baseLoad = 18;
  }

  // Daily Profile Factors (0.0 - 1.0)
  let factor = 0.5;
  
  if (timeFloat < 6) {
    factor = 0.1; 
  }
  else if (timeFloat < 9) {
    factor = 0.1 + ((timeFloat - 6) / 3) * 0.8; 
  }
  else if (timeFloat < 16) {
    factor = 0.85; 
  }
  else if (timeFloat < 19) {
    factor = 0.9 + ((timeFloat - 16) / 3) * 0.1; // Peak at 1.0
  }
  else {
    factor = 1.0 - ((timeFloat - 19) / 5) * 0.7;
  }

  let demand = baseLoad + (peakLoad - baseLoad) * factor;

  if (isWeekend) demand *= 0.85;

  return demand;
};

export const fetchDashboardData = async () => {
  try {
    const [genResp, intResp] = await Promise.all([
      fetch(`${API_BASE}/generation`),
      fetch(`${API_BASE}/intensity`)
    ]);

    if (!genResp.ok || !intResp.ok) throw new Error("API Error");

    const genData = await genResp.json();
    const intData = await intResp.json();

    const currentMix = genData.data.generationmix;
    const currentIntensity = intData.data[0];

    const totalDemand = getEstimatedTotalDemand();

    // Map to FuelMix
    const fuelMix: FuelMix[] = currentMix.map((item: any) => {
      let color = '#64748b'; // Default slate
      switch(item.fuel) {
        case 'gas': color = '#f97316'; break;     // Orange
        case 'wind': color = '#0ea5e9'; break;    // Sky Blue
        case 'nuclear': color = '#a855f7'; break; // Purple
        case 'solar': color = '#eab308'; break;   // Yellow
        case 'biomass': color = '#10b981'; break; // Emerald
        case 'imports': color = '#ef4444'; break; // Red
        case 'hydro': color = '#3b82f6'; break;   // Blue
        case 'coal': color = '#3f3f46'; break;    // Zinc
        case 'other': color = '#94a3b8'; break;   // Slate
      }
      
      return {
        id: item.fuel,
        label: item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1),
        value: (item.perc / 100) * totalDemand,
        percentage: item.perc,
        color
      };
    }).sort((a: any, b: any) => b.value - a.value);

    // Map to CarbonData
    const carbon: CarbonData = {
      current: currentIntensity.intensity.actual || currentIntensity.intensity.forecast,
      status: currentIntensity.intensity.index,
      forecast: [] 
    };

    const importsData = currentMix.find((x: any) => x.fuel === 'imports');
    const importsPerc = importsData ? importsData.perc : 0;
    const importGW = (importsPerc / 100) * totalDemand;
    
    const flow: PowerFlowData = {
      generation: totalDemand, 
      demand: totalDemand, 
      netDemand: totalDemand - importGW,
      imports: {
        france: importGW * 0.5,     // IFA + IFA2
        netherlands: importGW * 0.3, // BritNed
        belgium: importGW * 0.2,     // Nemo Link
      },
      exports: {
        ireland: 0.4 + Math.random() * 0.2, // Simulated constant export to NI/ROI
      },
      storage: {
        pumped: 0.0, 
        battery: 0.0
      }
    };

    return { fuelMix, carbon, flow };

  } catch (error) {
    console.error("Failed to fetch energy data", error);
    throw error;
  }
};

export const fetchHistoryData = async (): Promise<HistoryPoint[]> => {
    try {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        const from = yesterday.toISOString();
        const to = now.toISOString();
        
        // Fetch Generation Mix History AND Carbon Intensity History
        const [genResp, intResp] = await Promise.all([
            fetch(`${API_BASE}/generation/${from}/${to}`),
            fetch(`${API_BASE}/intensity/${from}/${to}`)
        ]);

        if (!genResp.ok || !intResp.ok) throw new Error("History API Error");
        
        const genJson = await genResp.json();
        const intJson = await intResp.json();
        
        const genData = genJson.data; // Array of { from, to, generationmix }
        const intData = intJson.data; // Array of { from, to, intensity }

        // Map to unified HistoryPoint format
        return genData.map((point: any, index: number) => {
            const d = new Date(point.from);
            // Use the index to try and match intensity data (assuming similar 30min slots)
            // or find by time. Intensity data might be slightly different length.
            const intensityPoint = intData.find((i: any) => i.from === point.from) || intData[index];
            const carbonVal = intensityPoint ? (intensityPoint.intensity.actual || intensityPoint.intensity.forecast) : 0;

            const baseDemand = getEstimatedTotalDemand(d);
            
            // Simulate slight variations for different demand definitions
            const nationalDemand = baseDemand;
            const transmissionDemand = baseDemand * 0.92; // Excluding embedded
            const grossDemand = baseDemand * 1.05; // Including station load / losses
            const netDemand = baseDemand * 0.85; // Net of wind/solar embedded

            const getVal = (fuel: string) => {
                const f = point.generationmix.find((x: any) => x.fuel === fuel);
                return f ? (f.perc / 100) * nationalDemand : 0;
            };

            return {
                time: `${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()}`,
                timestamp: d.getTime(),
                Gas: getVal('gas'),
                Wind: getVal('wind'),
                Solar: getVal('solar'),
                Nuclear: getVal('nuclear'),
                Biomass: getVal('biomass'),
                Imports: getVal('imports'),
                Hydro: getVal('hydro'),
                Coal: getVal('coal'),
                Other: getVal('other'),
                Storage: 0.1 + Math.random() * 0.2, // Simulated pumped storage

                demand_national: nationalDemand,
                demand_transmission: transmissionDemand,
                demand_gross: grossDemand,
                demand_net: netDemand,

                carbonIntensity: carbonVal
            };
        });
    } catch (error) {
        console.error("Failed to fetch history", error);
        return [];
    }
};

// Emission factors (gCO2/kWh) for table calculation
export const EMISSION_FACTORS: Record<string, number> = {
    Gas: 390,
    Coal: 950,
    Biomass: 120,
    Imports: 150, // Average EU mix
    Other: 300,
    Wind: 0,
    Solar: 0,
    Nuclear: 0,
    Hydro: 0,
    Storage: 0
};

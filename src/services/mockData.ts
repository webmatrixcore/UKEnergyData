
import { Article } from '../types';

// --- Content Data ---

export const POLICIES: Article[] = [
  {
    id: 'p1',
    title: 'Ofgem Regulatory Update: Price Cap Methodology Review',
    slug: '2024-05-15-ofgem-regulatory-update',
    date: '2024-05-15',
    category: 'Regulation',
    excerpt: 'A comprehensive analysis of the changes to the default tariff cap methodology and its impact on supplier hedging strategies.',
    content: `
## Executive Summary

The Office of Gas and Electricity Markets (Ofgem) has concluded its consultation on the Price Cap methodology for the upcoming period. This update introduces significant adjustments to the Earnings Before Interest and Tax (EBIT) allowance and revises the backwardation periods for wholesale cost calculations.

## Key Methodology Changes

### 1. Wholesale Cost Allowance
The observation window for the wholesale cost index has been shifted. Previously based on a strict quarterly backward-looking average, the new mechanism incorporates a weighted adjustment for shorter-term volatility. This is intended to reduce the lag between spot market prices and consumer bills.

*   **Old Mechanism**: Simple average of forward curve prices over 3 months.
*   **New Mechanism**: Weighted average favoring the final month of the observation window (60/20/20 split).

### 2. Levelisation of Standing Charges
Ofgem is proceeding with the equalisation of standing charges across payment methods. This effectively removes the "PPM Premium" (Prepayment Meter) by socializing the cost across Direct Debit customers.

> "This change ensures that vulnerable customers on prepayment meters are not penalized for their payment method, aligning their fixed costs with those paying via monthly direct debit." — *Ofgem Consultation Decision*

## Financial Implications for Suppliers

Suppliers must adjust their hedging strategies immediately. The shift in the observation window increases the risk of basis risk if hedges are not aligned with the new weighting.

### EBIT Allowance Adjustment
The EBIT allowance has been marginally increased from 1.9% to 2.4% to account for increased cost of capital and bad debt provisioning.

## Implementation Timeline

1.  **July 2024**: Publication of final unit rates for the Oct-Dec cap period.
2.  **October 2024**: Implementation of Standing Charge levelisation.
3.  **April 2025**: Full review of the Operating Cost Allowance.

## Conclusion

While this update stabilizes the supplier market, it suggests that standing charges will remain a significant portion of consumer bills for the foreseeable future. Industry stakeholders are advised to review their standard variable tariff (SVT) models immediately.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p2',
    title: 'Boiler Upgrade Scheme (BUS) Extension & Funding',
    slug: '2024-04-20-boiler-upgrade-scheme-bus',
    date: '2024-04-20',
    category: 'Subsidies',
    excerpt: 'Government confirms the extension of the £7,500 heat pump grant through 2028 with an additional £1.5bn in funding.',
    content: `
## Scheme Overview

The Department for Energy Security and Net Zero (DESNZ) has confirmed the extension of the Boiler Upgrade Scheme (BUS). The grant, which was increased to **£7,500** in late 2023, is designed to subsidize the upfront cost of replacing fossil fuel boilers with low-carbon alternatives.

## Eligibility Criteria

To qualify for the grant, the installation must meet specific requirements:
*   **Capacity**: The system must not exceed 45kWth.
*   **Efficiency**: A minimum SCOP (Seasonal Coefficient of Performance) of 2.8 is required.
*   **Insulation**: The property must have a valid EPC with no outstanding recommendations for loft or cavity wall insulation.

## Funding Allocation

The additional **£1.5 billion** allocated in the Spring Budget ensures the scheme will run until 2028. 

| Technology | Grant Amount |
|:---|:---|
| Air Source Heat Pump | £7,500 |
| Ground Source Heat Pump | £7,500 |
| Biomass Boiler | £5,000 |

*Note: Biomass boilers are only eligible in rural locations not connected to the gas grid.*

## Market Impact

Since the grant uplift from £5,000 to £7,500, applications have risen by **40%** month-on-month. This policy is critical for the UK to meet its target of 600,000 heat pump installations per year by 2028.

## How to Apply

The scheme remains "installer-led". Homeowners do not apply directly; instead, MCS-certified installers apply for the voucher on behalf of the customer, deducting the grant amount from the final invoice.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'p3',
    title: 'Contracts for Difference (CfD) Allocation Round 6',
    slug: '2024-03-10-cfd-allocation-round-6',
    date: '2024-03-10',
    category: 'Market Mechanism',
    excerpt: 'Strike prices for offshore wind have been raised by 66% to attract investment in AR6 following the failure of AR5.',
    content: `
## Context: The Failure of AR5

Allocation Round 5 (AR5) failed to secure any offshore wind bids due to a low administrative strike price that did not account for inflation and rising supply chain costs. Allocation Round 6 (AR6) aims to rectify this.

## Revised Administrative Strike Prices (2012 Prices)

The government has significantly increased the ceiling prices for renewable technologies to ensure project viability.

*   **Offshore Wind**: Increased from £44/MWh to **£73/MWh**.
*   **Floating Offshore Wind**: Increased to **£176/MWh**.
*   **Solar PV**: Increased to **£61/MWh**.

## Budget Envelope

The total budget for AR6 has been set at **£800 million** (in 2012 money), making it the largest round to date.

### Pot Structure
*   **Pot 1**: Established technologies (Solar, Onshore Wind).
*   **Pot 2**: Emerging technologies (Floating Wind, Tidal).
*   **Pot 3**: Offshore Wind (Ring-fenced).

## Industry Reaction

Energy UK and RenewableUK have welcomed the changes, stating that the revised prices reflect the "new economic reality" of high interest rates and steel costs. However, developers warn that grid connection delays remain the single biggest bottleneck to deployment.

## Next Steps

*   **March 2024**: Budget released.
*   **August 2024**: Sealed bids submission.
*   **September 2024**: Results announcement.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000'
  }
];

export const INSIGHTS: Article[] = [
  {
    id: 'i1',
    title: 'The Rise of Grid Flexibility Markets: DSR & DFS',
    slug: 'grid-flexibility-markets',
    date: '2024-05-18',
    category: 'Market Analysis',
    excerpt: 'Demand Side Response (DSR) is no longer a niche experiment. With the ESO Demand Flexibility Service, it is becoming a pillar of grid stability.',
    content: `
## The Flexibility Imperative

As the UK grid integrates more intermittent renewables (Wind and Solar), the system inertia decreases. Traditionally, gas turbines provided this inertia. Today, we need alternative ways to balance supply and demand instantly.

Enter **Demand Side Response (DSR)**.

## The Demand Flexibility Service (DFS)

Launched initially as a winter contingency tool, the DFS allows consumers and businesses to get paid for turning down power usage during peak times.

### Performance Data (Winter 2023/24)
*   **Total Events**: 12 test events and 2 live utilization events.
*   **Capacity Delivered**: Peak delivery reached **2.5 GW**—equivalent to a large nuclear power station.
*   **Participation**: Over 2.2 million households and businesses participated via suppliers like Octopus Energy, British Gas, and E.ON Next.

## Market Evolution: From "Turn Down" to "Turn Up"

While DFS focuses on reducing demand, the future lies in "Turn Up" services—paying consumers to use energy when wind output is high and prices are negative.

### The Balancing Mechanism (BM)
Historically, only large power stations could bid into the BM. In 2024, aggregators can now bundle thousands of EV chargers and home batteries to bid as a single "Virtual Power Plant" (VPP).

## Economic Outlook

By 2030, the National Grid ESO estimates that flexibility could save consumers **£10 billion per year** by avoiding the need to build peaking gas plants and grid reinforcement.

> "Flexibility is the hidden fuel of the net zero transition."

## Conclusion

The success of DFS proves that consumer behavior is a dispatchable asset. The next phase involves automating this via smart meters and Home Energy Management Systems (HEMS) to minimize user friction.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef520918bc09?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'i2',
    title: 'UK Battery Storage Pipeline: The 2025 Outlook',
    slug: 'battery-storage-outlook-2025',
    date: '2024-05-10',
    category: 'Technology',
    excerpt: 'The UK battery storage sector is booming, but duration is increasing. We analyze the shift from 1-hour to 2-hour and 4-hour systems.',
    content: `
## Current Status

As of Q2 2024, the UK has approximately **4.9 GW** of operational battery energy storage systems (BESS). This capacity is crucial for frequency response services (Dynamic Containment, DC).

## The Pipeline

The planning pipeline is enormous, standing at over **90 GW**. However, the "build-out rate" is constrained by grid connection dates, with some projects receiving offers for the 2030s.

### Key Projects Under Construction
1.  **Carrington Battery (Manchester)**: 50MW
2.  **Uskmouth Energy Park**: 230MW
3.  **Hunterston Park**: 400MW

## The Shift in Duration

Historically, UK batteries were 1-hour duration systems designed for Frequency Response (FFR/DC). However, these markets are becoming saturated.

The revenue stack is shifting towards **Wholesale Trading** (Arbitrage) and the **Capacity Market**.
*   **Arbitrage**: Charging when electricity is cheap (windy nights) and discharging during peak price periods (17:00-19:00).
*   To maximize arbitrage revenue, longer duration batteries are needed.
*   **Trend**: New projects are predominantly **2-hour** duration, with **4-hour** systems expected to become standard by 2027.

## Revenue Saturation Risks

The "cannibalization" effect is real. As more batteries enter the market, the volatility in intraday prices decreases, reducing the spread available for arbitrage. This reinforces the need for deeper duration storage to capture value over longer timeframes.

## Conclusion

The UK is a global leader in BESS deployment. The challenge for 2025 is not technology, but grid access and the evolution of market signals to reward longer-duration storage.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=1000'
  }
];

export const NEWS: Article[] = [
  {
    id: 'n1',
    title: 'Hornsea 3 Offshore Wind Farm Reaches Final Investment Decision',
    slug: 'hornsea-3-milestone',
    date: '2024-05-20',
    category: 'Infrastructure',
    excerpt: 'Orsted has confirmed the FID for the 2.9 GW Hornsea 3 project, set to become the single largest offshore wind farm in the world.',
    content: `
## Project Greenlit

Renewable energy giant Ørsted has officially taken the Final Investment Decision (FID) on the **Hornsea 3** offshore wind farm. Located 160 km off the Yorkshire coast, this project is a critical component of the UK's target to reach 50 GW of offshore wind by 2030.

## Technical Specifications

*   **Capacity**: 2.9 GW (Gigawatts)
*   **Homes Powered**: Approx. 3.3 million UK homes
*   **Turbines**: Siemens Gamesa SG 14-236 DD (14 MW capacity per turbine)
*   **Completion Date**: Expected 2027

## Economic Viability

The project faced uncertainty due to rising supply chain costs. Initially secured under a Contract for Difference (CfD) at £37.35/MWh (2012 prices), the project viability was threatened by inflation.

However, Ørsted has confirmed that a combination of corporate Power Purchase Agreements (PPAs) and flexibility in the CfD mechanism has allowed the project to proceed.

> "Hornsea 3 will be a cornerstone of the UK's energy security. It demonstrates that despite macroeconomic challenges, large-scale offshore wind remains investable." — *Mads Nipper, Group President and CEO of Ørsted*

## Supply Chain Impact

The project includes a multi-million pound investment in the planned SeAH Wind monopile factory in Teesside, creating up to 750 direct jobs and securing the UK's position as a manufacturing hub for offshore wind components.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1509391364305-c84e8109a66d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'n2',
    title: 'National Grid ESO Launches "Open Balancing Platform"',
    slug: 'eso-control-room-tech',
    date: '2024-05-19',
    category: 'Technology',
    excerpt: 'A major upgrade to the control room technology allows the ESO to dispatch hundreds of small-scale assets simultaneously.',
    content: `
## The Challenge of Small Assets

Historically, the National Grid Electricity System Operator (ESO) control room engineers had to manually instruct power stations to increase or decrease generation. This worked when the grid had 20 large power stations. It does not work when the grid has 20,000 small batteries and wind farms.

## The Solution: Open Balancing Platform (OBP)

The newly launched **Open Balancing Platform** automates the dispatch process. It groups small units (like battery storage sites) into aggregate blocks and sends bulk instructions.

### Key Features
1.  **Bulk Dispatch**: Sends hundreds of instructions per minute, removing human bottlenecks.
2.  **Real-Time Optimization**: Algorithms select the cheapest mix of assets to balance the grid second-by-second.
3.  **Battery Unlocking**: Specifically designed to allow battery storage to participate more fully in the Balancing Mechanism.

## Impact on Costs

By utilizing cheaper, smaller assets rather than relying solely on large gas turbines, the OBP is expected to reduce balancing costs. In 2022/23, balancing costs reached record highs; this technology is a direct countermeasure.

## Industry Response

"This is a game changer for battery optimizers," said the Head of Trading at a major aggregator. "Previously, we would be skipped in the merit order simply because the control room didn't have the bandwidth to call us. Now, the algorithms will pick us based on price."
    `,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'
  }
];

export const SAVING_GUIDES: Article[] = [
  {
    id: 's1',
    title: 'Heat Pump Efficiency: The Ultimate Guide to COP',
    slug: 'heat-pump-efficiency-guide',
    date: '2024-01-15',
    category: 'Home Heating',
    excerpt: 'How to run your heat pump at a Coefficient of Performance (COP) of 4.0 or higher using weather compensation and flow temperatures.',
    content: `
## Understanding COP

The efficiency of a heat pump is measured by its **Coefficient of Performance (COP)**. A COP of 3.0 means for every 1 kWh of electricity you put in, you get 3 kWh of heat out.

*   Gas Boiler Efficiency: ~0.9 (90%)
*   Heat Pump Goal: >3.5 (350%)

## The Golden Rule: Flow Temperature

The lower the temperature of the water circulating in your radiators, the higher the efficiency.

| Flow Temp | Estimated COP | Cost per kWh (Heat) |
|:---|:---|:---|
| 55°C | 2.8 | 9.6p |
| 45°C | 3.4 | 7.9p |
| 35°C | 4.2 | 6.4p |

*(Assumes electricity price of 27p/kWh)*

## How to Lower Flow Temperature

### 1. Weather Compensation
Ensure your "Weather Compensation" curve is active. This automatically adjusts the flow temperature based on the temperature outside.
*   **Cold Day (-3°C)**: Flow runs at 45°C.
*   **Mild Day (10°C)**: Flow runs at 32°C.
This maximizes efficiency 90% of the year.

### 2. Radiator Balancing
If one room is cold, do not turn up the flow temperature. Instead, open the lockshield valve on that radiator to increase flow rate.

### 3. Continuous Heating
Heat pumps work best "low and slow". Instead of blasting heat for 2 hours in the morning, run the system at a lower temperature for longer periods. This maintains the fabric temperature of the building.

## Insulation vs. Airtightness

While insulation is important, **airtightness** is often more critical for heat pumps. Drafts kill efficiency. Simple draft-proofing around windows and doors can improve performance significantly before investing in expensive external wall insulation.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 's2',
    title: 'Smart Tariffs: How to Shift Load and Save Money',
    slug: 'smart-meter-data-guide',
    date: '2024-02-20',
    category: 'Monitoring',
    excerpt: 'Stop paying the price cap rate. We explain Agile tariffs, Economy 7, and how to use battery storage to get paid to consume.',
    content: `
## The Problem with the Price Cap

Most UK households are on the Standard Variable Tariff (Price Cap), paying a flat rate (e.g., 24p/kWh) regardless of when they use energy. However, the wholesale price of electricity varies wildly—from **negative** prices on windy nights to **£1.00/kWh** during peak winter evenings.

## Smart Time-of-Use Tariffs

If you have a smart meter (SMETS2), you can access tariffs that track these wholesale costs.

### 1. EV Tariffs (e.g., Intelligent Octopus, OVO Charge Anytime)
These offer a very low rate (e.g., 7p/kWh) for 4-6 hours overnight to charge your car.
*   **Strategy**: Schedule your washing machine and dishwasher to run during this window.

### 2. Dynamic Tariffs (e.g., Octopus Agile)
The price changes every 30 minutes.
*   **Best for**: Households with batteries or EV chargers who can automate their usage.
*   **Plunge Pricing**: When wind generation is high, prices can go negative. You get paid to use electricity.

## Analyzing Your Data

Before switching, you need to understand your "Load Profile".

1.  **Download Data**: Use apps like *Loop* or *Octopus Home Mini* to get your half-hourly CSV data.
2.  **Identify Peak**: How much do you use between 16:00 and 19:00? This is the "red zone".
3.  **Shiftable Load**: Can you move cooking or laundry out of the red zone?

## The Battery Business Case

Installing a home battery (5kWh - 10kWh) allows you to:
1.  Charge the battery at cheap night rates (7p).
2.  Run the house from the battery during peak times (saving 24p+).
3.  **ROI**: Typical payback periods for battery-only systems have dropped to 6-8 years with smart tariffs.

## Conclusion

The days of "set and forget" energy bills are over. Active engagement via smart tariffs is the single most effective way to cut bills, far outstripping the savings from switching lights to LEDs.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }
];

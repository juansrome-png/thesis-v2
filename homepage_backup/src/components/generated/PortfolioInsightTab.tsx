import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, PieChart, Newspaper, ArrowUpRight, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
interface AllocationSlice {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
interface NewsItem {
  id: string;
  title: string;
  href: string;
  source: string;
  tag: string;
}
const sampleAllocationIndustry: AllocationSlice[] = [{
  name: 'Technology',
  value: 48500,
  percentage: 62,
  color: '#2563eb'
}, {
  name: 'Healthcare',
  value: 11800,
  percentage: 15,
  color: '#059669'
}, {
  name: 'Financials',
  value: 9200,
  percentage: 12,
  color: '#ea580c'
}, {
  name: 'Consumer',
  value: 4600,
  percentage: 6,
  color: '#ef4444'
}, {
  name: 'Energy',
  value: 1600,
  percentage: 5,
  color: '#7c3aed'
}];
const sampleAllocationAssetClass: AllocationSlice[] = [{
  name: 'Stocks',
  value: 68000,
  percentage: 78,
  color: '#0ea5e9'
}, {
  name: 'ETFs',
  value: 15700,
  percentage: 18,
  color: '#22c55e'
}, {
  name: 'Bonds',
  value: 3500,
  percentage: 4,
  color: '#f97316'
}];
const sampleNewsIndustry: NewsItem[] = [{
  id: 'n1',
  title: 'Tech megacaps extend AI-led rally',
  href: 'https://www.ft.com/',
  source: 'Financial Times',
  tag: 'Technology'
}, {
  id: 'n2',
  title: 'Healthcare M&A wave lifts biotech valuations',
  href: 'https://www.bloomberg.com/',
  source: 'Bloomberg',
  tag: 'Healthcare'
}, {
  id: 'n3',
  title: 'Bank capital rules soften; credit conditions ease',
  href: 'https://www.wsj.com/',
  source: 'WSJ',
  tag: 'Financials'
}, {
  id: 'n4',
  title: 'Consumer spending resilience drives retail sector gains',
  href: 'https://www.reuters.com/',
  source: 'Reuters',
  tag: 'Consumer'
}, {
  id: 'n5',
  title: 'Energy sector volatility amid OPEC+ production cuts',
  href: 'https://www.bloomberg.com/',
  source: 'Bloomberg',
  tag: 'Energy'
}];
const sampleNewsAssetClass: NewsItem[] = [{
  id: 'ac1',
  title: 'Stocks rally as earnings season surprises to the upside',
  href: 'https://www.reuters.com/',
  source: 'Reuters',
  tag: 'Stocks'
}, {
  id: 'ac2',
  title: 'Passive flows into ETFs hit new monthly record',
  href: 'https://www.bloomberg.com/',
  source: 'Bloomberg',
  tag: 'ETFs'
}, {
  id: 'ac3',
  title: 'Treasury yields ease after inflation cools',
  href: 'https://www.wsj.com/',
  source: 'WSJ',
  tag: 'Bonds'
}, {
  id: 'ac4',
  title: 'Equity markets show resilience despite rate uncertainty',
  href: 'https://www.ft.com/',
  source: 'Financial Times',
  tag: 'Stocks'
}, {
  id: 'ac5',
  title: 'Fixed income strategies adapt to new yield environment',
  href: 'https://www.bloomberg.com/',
  source: 'Bloomberg',
  tag: 'Bonds'
}];

// @component: PortfolioInsightTab
export default function PortfolioInsightTab() {
  const navigate = useNavigate();
  const [holdings, setHoldings] = useState<any[]>([]);

  // Load holdings from localStorage on component mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem('portfolioHoldings');
    if (savedHoldings) {
      try {
        const parsedHoldings = JSON.parse(savedHoldings);
        setHoldings(parsedHoldings);
      } catch (error) {
        console.error('Error parsing saved holdings:', error);
        setHoldings([]);
      }
    }
  }, []);

  // Calculate total value from actual holdings
  const totalValue = useMemo(() => {
    return holdings.reduce((sum, holding) => sum + holding.value, 0);
  }, [holdings]);

  // Calculate industry allocation based on actual holdings
  const industryAllocation = useMemo(() => {
    const industryMap = holdings.reduce((acc, holding) => {
      let industry;
      
      if (holding.assetType === 'ETF') {
        // For ETFs, check if it's sector-specific or general
        if (holding.sector && holding.sector !== 'General') {
          industry = holding.sector; // Use specific sector for sector ETFs
        } else {
          industry = 'Mix'; // Use "Mix" for general ETFs
        }
      } else {
        industry = holding.sector || 'Technology'; // Default to Technology for stocks/crypto
      }
      
      const value = holding.value;
      if (acc[industry]) {
        acc[industry] += value;
      } else {
        acc[industry] = value;
      }
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#2563eb', '#059669', '#dc2626', '#ea580c', '#7c3aed', '#6b7280'];
    let colorIndex = 0;

    return Object.entries(industryMap).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100,
      color: colors[colorIndex++ % colors.length]
    }));
  }, [holdings, totalValue]);

  // Calculate asset class allocation based on actual holdings
  const assetClassAllocation = useMemo(() => {
    const assetMap = holdings.reduce((acc, holding) => {
      const assetType = holding.assetType || 'Stock'; // Default to Stock if no assetType
      const value = holding.value;
      if (acc[assetType]) {
        acc[assetType] += value;
      } else {
        acc[assetType] = value;
      }
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#2563eb', '#059669', '#dc2626', '#ea580c', '#7c3aed'];
    let colorIndex = 0;

    return Object.entries(assetMap).map(([name, value]) => ({
      name: name === 'Stock' ? 'Stocks' : name === 'ETF' ? 'ETFs' : name === 'Crypto' ? 'Crypto' : name,
      value,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100,
      color: colors[colorIndex++ % colors.length]
    }));
  }, [holdings, totalValue]);

  const totalIndustry = useMemo(() => industryAllocation.reduce((s, a) => s + a.value, 0), [industryAllocation]);
  const totalAssetClass = useMemo(() => assetClassAllocation.reduce((s, a) => s + a.value, 0), [assetClassAllocation]);
  const insightsIndustry = useMemo(() => {
    const tech = industryAllocation.find(a => a.name === 'Technology');
    const health = industryAllocation.find(a => a.name === 'Healthcare');
    const energy = industryAllocation.find(a => a.name === 'Energy');
    const mix = industryAllocation.find(a => a.name === 'Mix');
    const list: {
      id: string;
      tone: 'positive' | 'caution';
      text: string;
    }[] = [];
    if (tech && tech.percentage >= 55) {
      list.push({
        id: 'i-tech',
        tone: 'positive',
        text: `Strong AI exposure with ${tech.percentage}% in Technology; aligns with current market momentum.`
      });
    }
    if (health && health.percentage < 12) {
      list.push({
        id: 'i-health',
        tone: 'caution',
        text: `Healthcare allocation at ${health.percentage}% is below recommended 15-20% for diversification.`
      });
    }
    if (energy && energy.percentage > 8) {
      list.push({
        id: 'i-energy',
        tone: 'caution',
        text: `Energy sector exposure at ${energy.percentage}% may be volatile; consider rebalancing.`
      });
    }
    if (mix && mix.percentage > 20) {
      list.push({
        id: 'i-mix',
        tone: 'positive',
        text: `Good diversification with ${mix.percentage}% in diversified ETFs, reducing single-stock risk.`
      });
    }
    if (tech && tech.percentage < 30) {
      list.push({
        id: 'i-tech-low',
        tone: 'caution',
        text: `Technology allocation at ${tech.percentage}% may miss growth opportunities in current market.`
      });
    }
    if (industryAllocation.length === 1) {
      list.push({
        id: 'i-concentration',
        tone: 'caution',
        text: `Portfolio is highly concentrated in one sector; consider diversifying across industries.`
      });
    }
    return list;
  }, [industryAllocation]);
  const insightsAssetClass = useMemo(() => {
    const stocks = assetClassAllocation.find(a => a.name === 'Stocks');
    const bonds = assetClassAllocation.find(a => a.name === 'Bonds');
    const etfs = assetClassAllocation.find(a => a.name === 'ETFs');
    const crypto = assetClassAllocation.find(a => a.name === 'Crypto');
    const list: {
      id: string;
      tone: 'positive' | 'caution';
      text: string;
    }[] = [];
    if (stocks && stocks.percentage >= 70) {
      list.push({
        id: 'ac-stocks',
        tone: 'positive',
        text: `Growth tilt intact with ${stocks.percentage}% in Stocks — momentum supportive.`
      });
    }
    if (bonds && bonds.percentage <= 5) {
      list.push({
        id: 'ac-bonds',
        tone: 'caution',
        text: `Minimal bond ballast (${bonds.percentage}%) — consider duration for drawdown protection.`
      });
    }
    if (etfs && etfs.percentage >= 15) {
      list.push({
        id: 'ac-etfs',
        tone: 'positive',
        text: `Efficient core via ETFs (${etfs.percentage}%) helps fee control and diversification.`
      });
    }
    if (crypto && crypto.percentage > 10) {
      list.push({
        id: 'ac-crypto',
        tone: 'caution',
        text: `High crypto allocation at ${crypto.percentage}% increases portfolio volatility and risk.`
      });
    }
    if (stocks && stocks.percentage < 50) {
      list.push({
        id: 'ac-stocks-low',
        tone: 'caution',
        text: `Low equity allocation at ${stocks.percentage}% may limit growth potential in favorable markets.`
      });
    }
    return list;
  }, [assetClassAllocation]);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{
    background: "linear-gradient(90deg, oklch(0.984 0.003 247.858) 0%, oklch(0.97 0.014 254.604) 100%)"
  }}>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/portfolio-dashboard')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Allocation Insights</h1>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Asset Class Section */}
        <section className="mb-12">
          <article className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Allocation — Asset Class</h2>
                <p className="text-sm text-slate-600">Stocks, ETFs, and Bonds</p>
              </div>
              <PieChart className="w-5 h-5 text-slate-400" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {assetClassAllocation.map(item => <div key={`aclass-${item.name}`} className="p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-100/60 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full" style={{
                      backgroundColor: item.color
                    }} />
                        <h3 className="text-base font-medium text-slate-900">{item.name}</h3>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{item.percentage}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-2 rounded-full" style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">${item.value.toLocaleString()} of ${totalAssetClass.toLocaleString()}</p>
                  </div>)}
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4">
                <figure className="w-full h-64">
                  <div className="w-full h-full grid place-items-center">
                    <div className="relative w-56 h-56 rounded-full" style={{
                    background: `conic-gradient(${assetClassAllocation.map((s, index) => {
                      const startAngle = index === 0 ? 0 : assetClassAllocation.slice(0, index).reduce((sum, item) => sum + item.percentage, 0);
                      const endAngle = startAngle + s.percentage;
                      return `${s.color} ${startAngle}% ${endAngle}%`;
                    }).join(', ')})`
                  }} aria-hidden="true"></div>
                  </div>
                  <figcaption className="sr-only">Asset class allocation donut chart</figcaption>
                </figure>
              </div>
            </div>

            {/* Asset Class Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Asset Class Exposure Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Your portfolio maintains a growth-oriented allocation with 78% equity exposure through individual stocks, 
                complemented by 18% ETF holdings for diversification and 4% bond allocation for stability. This structure 
                positions you to capture market upside while maintaining some defensive characteristics through the ETF sleeve 
                and minimal bond exposure.
              </p>
            </div>

            {/* Asset Class Important Things to Monitor */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl mt-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Important Things to Monitor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-amber-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Equity Allocation Thresholds</h3>
                      <p className="text-sm text-slate-600 mb-3">Current 78% equity exposure may impact portfolio volatility during market downturns</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-100 text-amber-700">Neutral</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-red-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Bond Allocation Impact</h3>
                      <p className="text-sm text-slate-600 mb-3">4% bond allocation provides minimal downside protection during market volatility</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">Negative</span>
                        <span className="text-xs text-slate-500">Quarterly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-emerald-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">ETF Diversification</h3>
                      <p className="text-sm text-slate-600 mb-3">18% ETF allocation contributes to portfolio diversification and cost efficiency</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">Positive</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-amber-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Correlation Risk</h3>
                      <p className="text-sm text-slate-600 mb-3">Individual stocks and ETF holdings may exhibit correlation during market stress</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-100 text-amber-700">Neutral</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Asset Class Insights */}
          <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl mt-8" style={{
          background: "linear-gradient(90deg, oklch(64.09% 0.29 333.01deg) 0%, oklch(58.92% 0.22 297.17deg) 10%, oklch(0.208 0.042 265.755) 100%)"
        }}>
            <header className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">AI Insights — Asset Class</h2>
              <Brain className="w-5 h-5 opacity-80" />
            </header>
            <ul className="space-y-3">
              {insightsAssetClass.map(note => <li key={note.id} className={`p-4 rounded-2xl flex items-start gap-3 ${note.tone === 'positive' ? 'bg-white/10' : 'bg-amber-500/10'}`}>
                  {note.tone === 'positive' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  <p className="text-sm leading-6 opacity-95">{note.text}</p>
                </li>)}
            </ul>
          </aside>

          {/* Asset Class News */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl mt-8" style={{
          background: "linear-gradient(90deg, oklch(35.62% 0 none) 0%, oklch(41.35% 0 286.41deg) 10%, oklch(0.208 0.042 265.755) 100%)"
        }}>
            <header className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Relevant News — Asset Class</h2>
                <p className="text-sm text-slate-200">Market color tied to your sleeves</p>
              </div>
              <Newspaper className="w-5 h-5 text-white/80" />
            </header>
            <ul className="space-y-4">
              {sampleNewsAssetClass.map(item => <li key={item.id} className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors">
                  <a className="group inline-flex items-start justify-between w-full" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={`Open ${item.source} article: ${item.title}`}>
                    <div className="pr-6">
                      <h3 className="font-semibold text-white group-hover:underline underline-offset-4 decoration-white/30">{item.title}</h3>
                      <p className="mt-1 text-xs text-white/80">Source: {item.source}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/15 text-white">{item.tag}<ArrowUpRight className="w-3.5 h-3.5" /></span>
                  </a>
                </li>)}
            </ul>
          </div>
        </section>

        {/* Industry Section */}
        <section className="mb-12">
          <article className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Allocation — Industry</h2>
                <p className="text-sm text-slate-600">Sector sleeves</p>
              </div>
              <PieChart className="w-5 h-5 text-slate-400" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {industryAllocation.map(item => <div key={`alloc-${item.name}`} className="p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-100/60 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full" style={{
                      backgroundColor: item.color
                    }} />
                        <h3 className="text-base font-medium text-slate-900">{item.name}</h3>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{item.percentage}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-2 rounded-full" style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">${item.value.toLocaleString()} of ${totalIndustry.toLocaleString()}</p>
                  </div>)}
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4">
                <figure className="w-full h-64">
                  <div className="w-full h-full grid place-items-center">
                    <div className="relative w-56 h-56 rounded-full" style={{
                    background: `conic-gradient(${industryAllocation.map((s, index) => {
                      const startAngle = index === 0 ? 0 : industryAllocation.slice(0, index).reduce((sum, item) => sum + item.percentage, 0);
                      const endAngle = startAngle + s.percentage;
                      return `${s.color} ${startAngle}% ${endAngle}%`;
                    }).join(', ')})`
                  }} aria-hidden="true"></div>
                  </div>
                  <figcaption className="sr-only">Industry allocation donut chart</figcaption>
                </figure>
              </div>
            </div>

            {/* Industry Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Industry Exposure Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Your portfolio exhibits a strong technology concentration with 62% allocation, reflecting confidence in AI and 
                digital transformation trends. Healthcare at 15% provides defensive balance, while Financials (12%) and 
                Consumer (6%) offer cyclical exposure. The minimal Energy allocation (5%) reduces commodity sensitivity, 
                creating a growth-focused sector mix with some defensive characteristics.
              </p>
            </div>

            {/* Industry Important Things to Monitor */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl mt-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Important Things to Monitor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-red-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Technology Concentration</h3>
                      <p className="text-sm text-slate-600 mb-3">62% technology allocation creates sector-specific risk exposure</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">Negative</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-emerald-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Healthcare Defensive Balance</h3>
                      <p className="text-sm text-slate-600 mb-3">15% healthcare allocation provides defensive characteristics during market stress</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">Positive</span>
                        <span className="text-xs text-slate-500">Quarterly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-amber-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Financials Rate Sensitivity</h3>
                      <p className="text-sm text-slate-600 mb-3">12% financials allocation is sensitive to interest rate changes and credit conditions</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-100 text-amber-700">Neutral</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-amber-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Consumer Spending Patterns</h3>
                      <p className="text-sm text-slate-600 mb-3">6% consumer allocation reflects economic cycle sensitivity and spending trends</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-100 text-amber-700">Neutral</span>
                        <span className="text-xs text-slate-500">Monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full mt-2 bg-emerald-500"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Energy Inflation Hedge</h3>
                      <p className="text-sm text-slate-600 mb-3">5% energy allocation provides inflation protection during commodity price increases</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">Positive</span>
                        <span className="text-xs text-slate-500">Quarterly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Industry Insights */}
          <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl mt-8" style={{
          background: "linear-gradient(90deg, oklch(64.09% 0.29 333.01deg) 0%, oklch(58.92% 0.22 297.17deg) 10%, oklch(0.208 0.042 265.755) 100%)"
        }}>
            <header className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">AI Insights — Industry</h2>
              <Brain className="w-5 h-5 opacity-80" />
            </header>
            <ul className="space-y-3">
              {insightsIndustry.map(note => <li key={note.id} className={`p-4 rounded-2xl flex items-start gap-3 ${note.tone === 'positive' ? 'bg-white/10' : 'bg-amber-500/10'}`}>
                  {note.tone === 'positive' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  <p className="text-sm leading-6 opacity-95">{note.text}</p>
                </li>)}
            </ul>
          </aside>

          {/* Industry News */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl mt-8" style={{
          background: "linear-gradient(90deg, oklch(43.62% 0 326.07deg) 0%, oklch(40.71% 0 308.58deg) 10%, oklch(0.208 0.042 265.755) 100%)"
        }}>
            <header className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Relevant News — Industry</h2>
                <p className="text-sm text-slate-200">Curated headlines mapped to your sector mix</p>
              </div>
              <Newspaper className="w-5 h-5 text-white/80" />
            </header>
            <ul className="space-y-4">
              {sampleNewsIndustry.map(item => <li key={item.id} className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors">
                  <a className="group inline-flex items-start justify-between w-full" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={`Open ${item.source} article: ${item.title}`}>
                    <div className="pr-6">
                      <h3 className="font-semibold text-white group-hover:underline underline-offset-4 decoration-white/30">{item.title}</h3>
                      <p className="mt-1 text-xs text-white/80">Source: {item.source}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/15 text-white">{item.tag}<ArrowUpRight className="w-3.5 h-3.5" /></span>
                  </a>
                </li>)}
            </ul>
          </div>
        </section>
      </main>
    </div>;
}
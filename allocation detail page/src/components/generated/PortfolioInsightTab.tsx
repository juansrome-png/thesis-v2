import { useMemo } from 'react';
import { Brain, PieChart, Newspaper, ArrowUpRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
}];

// @component: PortfolioInsightTab
export default function PortfolioInsightTab() {
  const totalIndustry = useMemo(() => sampleAllocationIndustry.reduce((s, a) => s + a.value, 0), []);
  const totalAssetClass = useMemo(() => sampleAllocationAssetClass.reduce((s, a) => s + a.value, 0), []);
  const insightsIndustry = useMemo(() => {
    const tech = sampleAllocationIndustry.find(a => a.name === 'Technology');
    const health = sampleAllocationIndustry.find(a => a.name === 'Healthcare');
    const energy = sampleAllocationIndustry.find(a => a.name === 'Energy');
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
        text: `Healthcare is at ${health.percentage}% — consider a modest increase for defensiveness.`
      });
    }
    if (energy && energy.percentage > 7) {
      list.push({
        id: 'i-energy',
        tone: 'caution',
        text: `Energy overweight at ${energy.percentage}%; watch sensitivity to commodity swings.`
      });
    } else if (energy) {
      list.push({
        id: 'i-energy-balance',
        tone: 'positive',
        text: `Balanced energy exposure at ${energy.percentage}% reduces volatility drag.`
      });
    }
    const top = [...sampleAllocationIndustry].sort((a, b) => b.percentage - a.percentage)[0];
    if (top) {
      list.push({
        id: 'i-top',
        tone: 'positive',
        text: `${top.name} is your core sleeve at ${top.percentage}%. Stay disciplined with trims on outsized rallies.`
      });
    }
    return list;
  }, []);
  const insightsAssetClass = useMemo(() => {
    const stocks = sampleAllocationAssetClass.find(a => a.name === 'Stocks');
    const bonds = sampleAllocationAssetClass.find(a => a.name === 'Bonds');
    const etfs = sampleAllocationAssetClass.find(a => a.name === 'ETFs');
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
    const top = [...sampleAllocationAssetClass].sort((a, b) => b.percentage - a.percentage)[0];
    if (top) {
      list.push({
        id: 'ac-top',
        tone: 'positive',
        text: `${top.name} is the dominant sleeve at ${top.percentage}%. Rebalance bands: ±5%.`
      });
    }
    return list;
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{
    background: "linear-gradient(90deg, oklch(0.984 0.003 247.858) 0%, oklch(0.97 0.014 254.604) 100%)"
  }}>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">AI Portfolio Insights</h1>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
                {sampleAllocationIndustry.map(item => <div key={`alloc-${item.name}`} className="p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-100/60 transition-colors">
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
                  {/* Simple donut using CSS gradients for zero-dep visual */}
                  <div className="w-full h-full grid place-items-center">
                    <div className="relative w-56 h-56 rounded-full" style={{
                    background: `conic-gradient(${sampleAllocationIndustry.map(s => `${s.color} ${s.percentage}%`).join(', ')})`
                  }} aria-hidden="true"></div>
                  </div>
                  <figcaption className="sr-only">Industry allocation donut chart</figcaption>
                </figure>
              </div>
            </div>
          </article>

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
                {sampleAllocationAssetClass.map(item => <div key={`aclass-${item.name}`} className="p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-100/60 transition-colors">
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
                    background: `conic-gradient(${sampleAllocationAssetClass.map(s => `${s.color} ${s.percentage}%`).join(', ')})`
                  }} aria-hidden="true"></div>
                  </div>
                  <figcaption className="sr-only">Asset class allocation donut chart</figcaption>
                </figure>
              </div>
            </div>
          </article>
        </section>

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
          </aside><div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl mt-8" style={{
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
          </div><section className="mt-8 grid grid-cols-1 gap-6">
          
        </section>

        <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl" style={{
        background: "linear-gradient(90deg, oklch(64.09% 0.29 333.01deg) 0%, oklch(58.92% 0.22 297.17deg) 10%, oklch(0.208 0.042 265.755) 100%)",
        height: "422px"
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
          </aside><section className="mt-6 grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl" style={{
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
      </main>
    </div>;
}
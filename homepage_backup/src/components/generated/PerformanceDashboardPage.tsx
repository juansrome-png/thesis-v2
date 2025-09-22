import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, PieChart, Trophy, TrendingUp, TrendingDown, BarChart3, Sparkles, ArrowLeft, Filter, Wallet } from "lucide-react";
import { AllocationPieChart } from './AllocationPieChart';
import { useNavigate, Link } from 'react-router-dom';
export interface PerformanceDashboardPageProps {
  onBackToDashboard: () => void;
}

// Default holdings data (same as Portfolio Dashboard)
const defaultHoldings = [{
  id: '1',
  ticker: 'AAPL',
  name: 'Apple Inc.',
  quantity: 50,
  currentPrice: 195.89,
  purchasePrice: 180.50,
  dailyChange: 2.34,
  value: 9794.50
}, {
  id: '2',
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  quantity: 25,
  currentPrice: 875.28,
  purchasePrice: 820.00,
  dailyChange: -15.67,
  value: 21882.00
}, {
  id: '3',
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  quantity: 40,
  currentPrice: 420.15,
  purchasePrice: 395.00,
  dailyChange: 8.92,
  value: 16806.00
}];
const benchmarkSeries: {
  label: string;
  portfolio: number;
  spx: number;
}[] = [{
  label: "1D",
  portfolio: 0.6,
  spx: 0.4
}, {
  label: "1M",
  portfolio: 3.8,
  spx: 2.9
}, {
  label: "YTD",
  portfolio: 18.4,
  spx: 16.7
}];
const timeframes: {
  id: string;
  label: string;
}[] = [{
  id: "1D",
  label: "1D"
}, {
  id: "1M",
  label: "1M"
}, {
  id: "YTD",
  label: "YTD"
}];
export function PerformanceDashboardPage({
  onBackToDashboard
}: PerformanceDashboardPageProps) {
  const [selectedTf, setSelectedTf] = useState<string>("YTD");
  const [holdings, setHoldings] = useState(defaultHoldings);
  const navigate = useNavigate();

  // Load holdings from localStorage on component mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem('portfolioHoldings');
    if (savedHoldings) {
      try {
        const parsedHoldings = JSON.parse(savedHoldings);
        setHoldings(parsedHoldings);
      } catch (error) {
        console.error('Error parsing saved holdings:', error);
        setHoldings(defaultHoldings);
      }
    }
  }, []);
  const totals = useMemo(() => {
    // Transform holdings to handle both data structures
    const transformedHoldings = holdings.map(h => ({
      ...h,
      price: h.price || h.currentPrice || h.purchasePrice || 0,
      purchasePrice: h.purchasePrice || h.price || h.currentPrice || 0,
      changePct: h.changePct || (h.dailyChange || 0),
      type: h.type || 'stock',
      sector: h.sector || 'Technology'
    }));

    const totalValue = transformedHoldings.reduce((sum, h) => sum + h.quantity * h.price, 0);
    const sorted = [...transformedHoldings].sort((a, b) => b.changePct - a.changePct);
    const winners = sorted.slice(0, 3);
    const losers = [...sorted].reverse().slice(0, 3);
    const byType = transformedHoldings.reduce<Record<string, number>>((acc, h) => {
      const v = h.quantity * h.price;
      acc[h.type] = (acc[h.type] || 0) + v;
      return acc;
    }, {});
    const bySector = transformedHoldings.reduce<Record<string, number>>((acc, h) => {
      const v = h.quantity * h.price;
      acc[h.sector] = (acc[h.sector] || 0) + v;
      return acc;
    }, {});

    // Format data for pie charts
    const typeAllocation = Object.entries(byType).map(([name, value]) => ({
      name: name === 'etf' ? 'ETFs' : name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100, // Round to 2 decimal places
      color: name === 'stock' ? '#3B82F6' : name === 'crypto' ? '#10B981' : name === 'bond' ? '#F59E0B' : '#EF4444'
    }));

    const sectorAllocation = Object.entries(bySector).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100, // Round to 2 decimal places
      color: name === 'Semiconductors' ? '#3B82F6' : name === 'Consumer Tech' ? '#10B981' : name === 'Index' ? '#F59E0B' : name === 'Crypto' ? '#EF4444' : name === 'EV' ? '#8B5CF6' : '#6B7280'
    }));

    return {
      totalValue,
      winners,
      losers,
      byType,
      bySector,
      typeAllocation,
      sectorAllocation,
      transformedHoldings
    };
  }, [holdings]);
  const benchPoint = useMemo(() => benchmarkSeries.find(b => b.label === selectedTf)!, [selectedTf]);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Performance Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/portfolio-dashboard')} className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </button>
              <nav aria-label="Timeframe" className="flex items-center gap-2">
                {timeframes.map(tf => <button key={tf.id} onClick={() => setSelectedTf(tf.id)} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${selectedTf === tf.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"}`}>
                    <span>{tf.label}</span>
                  </button>)}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <article className="lg:col-span-8 space-y-6">
          {/* ROI vs S&P 500 - First Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">ROI vs S&P 500</h2>
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span>Portfolio</span>
                <span className="h-2 w-8 rounded bg-gray-900" aria-hidden="true"></span>
                <span>S&P 500</span>
                <span className="h-2 w-8 rounded bg-gray-300" aria-hidden="true"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benchmarkSeries.map(point => <div key={point.label} className={`rounded-lg border ${selectedTf === point.label ? "border-gray-300 bg-gray-50" : "border-gray-100"} p-4`}>
                  <p className="text-sm text-gray-500">{point.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{point.portfolio}%</p>
                  <p className="text-sm text-gray-600">S&P {point.spx}%</p>
                  <p className={`mt-1 text-sm font-medium ${point.portfolio - point.spx >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {point.portfolio - point.spx >= 0 ? "+" : ""}{(point.portfolio - point.spx).toFixed(1)}% vs S&P
                  </p>
                </div>)}
            </div>
          </section>

          {/* Top Movers - Second Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Movers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-100 p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3 inline-flex items-center gap-2"><Trophy className="h-4 w-4 text-green-600" /><span>Top 3 Winners</span></h3>
                <ul className="space-y-3">
                  {totals.winners.map(w => <li key={w.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{w.ticker}</p>
                          <p className="text-xs text-gray-500">{w.name}</p>
                        </div>
                      </div>
                      <p className="text-green-600 font-semibold">+{w.changePct}%</p>
                    </li>)}
                </ul>
              </div>
              <div className="rounded-lg border border-gray-100 p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3 inline-flex items-center gap-2"><Trophy className="h-4 w-4 text-red-600" /><span>Top 3 Losers</span></h3>
                <ul className="space-y-3">
                  {totals.losers.map(l => <li key={l.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{l.ticker}</p>
                          <p className="text-xs text-gray-500">{l.name}</p>
                        </div>
                      </div>
                      <p className="text-red-600 font-semibold">{l.changePct}%</p>
                    </li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* AI Summary - Third Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /><span>AI Summary</span></h2>
            <p className="text-sm text-gray-600 mb-4">Daily, monthly, and YTD narrative of performance with biggest contributors.</p>
            <div className="rounded-lg border border-gray-100 p-4 bg-gradient-to-br from-gray-50 to-white">
              <p className="text-gray-800 leading-relaxed">
                <span>You outperformed the S&P by 1.7% {selectedTf === "1D" ? "today" : selectedTf === "1M" ? "this month" : "YTD"}. Strength came from </span>
                {totals.winners.length > 0 && (
                  <>
                    <strong>{totals.winners[0].ticker} +{totals.winners[0].changePct}%</strong>
                    {totals.winners.length > 1 && (
                      <>
                        <span> and </span>
                        <strong>{totals.winners[1].ticker} +{totals.winners[1].changePct}%</strong>
                      </>
                    )}
                  </>
                )}
                {totals.losers.length > 0 && (
                  <>
                    <span>, partly offset by </span>
                    <strong>{totals.losers[0].ticker} {totals.losers[0].changePct}%</strong>
                  </>
                )}
                <span>. Positioning remains tilted to semiconductors and crypto, which drove most of the excess return.</span>
              </p>
            </div>
          </section>

          {/* Unified Portfolio Tracking - Fourth Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Portfolio</h1>
            </div>
            <p className="mt-2 text-sm text-gray-600">Total Portfolio</p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4">Ticker</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Quantity</th>
                    <th className="py-2 pr-4">Current Price</th>
                    <th className="py-2 pr-4">Purchase Price</th>
                    <th className="py-2 pr-4">Value</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Sector</th>
                    <th className="py-2 pr-4">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {totals.transformedHoldings?.map(h => {
                  const value = h.quantity * h.price;
                  const sign = h.changePct >= 0 ? "+" : "";
                  return (
                    <Link key={h.id} to={`/stock-detail/${h.ticker}`} className="contents">
                      <tr className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                        <td className="py-3 pr-4 font-semibold text-gray-900">{h.ticker}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.name}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.quantity}</td>
                        <td className="py-3 pr-4 text-gray-700">${h.price.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-gray-700">${h.purchasePrice.toLocaleString()}</td>
                        <td className="py-3 pr-4 font-medium text-gray-900">${value.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-gray-700 capitalize">{h.type}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.sector}</td>
                        <td className={`py-3 pr-4 font-medium ${h.changePct >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {sign}{h.changePct}%
                        </td>
                      </tr>
                    </Link>
                  );
                })}
                </tbody>
              </table>
            </div>
          </section>
        </article>

        <aside className="lg:col-span-4 space-y-6">
          <div>
            <AllocationPieChart 
              data={totals.typeAllocation} 
              totalValue={totals.totalValue} 
              secondaryTitle="Sector Allocation" 
              secondarySubtitle="Industry Distribution" 
              secondaryData={totals.sectorAllocation} 
            />
          </div>
        </aside>
      </div>
      </main>
    </div>;
}
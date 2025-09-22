import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Upload, PieChart, Trophy, TrendingUp, TrendingDown, BarChart3, Sparkles, ArrowLeft, Filter } from "lucide-react";
export interface PerformanceDashboardPageProps {
  onBackToDashboard: () => void;
}

// Static demo data declared outside component per instructions
const holdingsData: {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  price: number;
  type: "stock" | "crypto" | "bond" | "etf";
  sector: string;
  changePct: number;
}[] = [{
  id: "NVDA",
  ticker: "NVDA",
  name: "NVIDIA Corporation",
  quantity: 42,
  price: 125.4,
  type: "stock",
  sector: "Semiconductors",
  changePct: 3.2
}, {
  id: "AAPL",
  ticker: "AAPL",
  name: "Apple Inc.",
  quantity: 60,
  price: 185.12,
  type: "stock",
  sector: "Consumer Tech",
  changePct: 1.1
}, {
  id: "SPY",
  ticker: "SPY",
  name: "SPDR S&P 500 ETF",
  quantity: 20,
  price: 514.22,
  type: "etf",
  sector: "Index",
  changePct: -0.4
}, {
  id: "BTC",
  ticker: "BTC",
  name: "Bitcoin",
  quantity: 0.85,
  price: 61234,
  type: "crypto",
  sector: "Crypto",
  changePct: 2.6
}, {
  id: "TSLA",
  ticker: "TSLA",
  name: "Tesla Inc.",
  quantity: 15,
  price: 242.33,
  type: "stock",
  sector: "EV",
  changePct: -1.9
}, {
  id: "UST10",
  ticker: "UST10",
  name: "US 10Y Bond",
  quantity: 1000,
  price: 0.98,
  type: "bond",
  sector: "Treasury",
  changePct: 0.1
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
  const totals = useMemo(() => {
    const totalValue = holdingsData.reduce((sum, h) => sum + h.quantity * h.price, 0);
    const sorted = [...holdingsData].sort((a, b) => b.changePct - a.changePct);
    const winners = sorted.slice(0, 3);
    const losers = [...sorted].reverse().slice(0, 3);
    const byType = holdingsData.reduce<Record<string, number>>((acc, h) => {
      const v = h.quantity * h.price;
      acc[h.type] = (acc[h.type] || 0) + v;
      return acc;
    }, {});
    const bySector = holdingsData.reduce<Record<string, number>>((acc, h) => {
      const v = h.quantity * h.price;
      acc[h.sector] = (acc[h.sector] || 0) + v;
      return acc;
    }, {});
    return {
      totalValue,
      winners,
      losers,
      byType,
      bySector
    };
  }, []);
  const benchPoint = useMemo(() => benchmarkSeries.find(b => b.label === selectedTf)!, [selectedTf]);
  return <section className="p-6 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={onBackToDashboard} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back</span>
        </button>
        <nav aria-label="Timeframe" className="flex items-center gap-2">
          {timeframes.map(tf => <button key={tf.id} onClick={() => setSelectedTf(tf.id)} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${selectedTf === tf.id ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"}`}>
              <span>{tf.label}</span>
            </button>)}
        </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <article className="lg:col-span-8 space-y-6">
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Unified Portfolio Tracking</h1>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  <span>Upload Holdings</span>
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Import or manually upload stocks, crypto, bonds, and ETFs. Balances update daily.</p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4">Ticker</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Quantity</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Value</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Sector</th>
                    <th className="py-2 pr-4">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingsData.map(h => {
                  const value = h.quantity * h.price;
                  const sign = h.changePct >= 0 ? "+" : "";
                  return <tr key={h.id} className="border-b border-gray-50">
                        <td className="py-3 pr-4 font-semibold text-gray-900">{h.ticker}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.name}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.quantity}</td>
                        <td className="py-3 pr-4 text-gray-700">${h.price.toLocaleString()}</td>
                        <td className="py-3 pr-4 font-medium text-gray-900">${value.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-gray-700 capitalize">{h.type}</td>
                        <td className="py-3 pr-4 text-gray-700">{h.sector}</td>
                        <td className={`py-3 pr-4 font-medium ${h.changePct >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {sign}{h.changePct}%
                        </td>
                      </tr>;
                })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
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

          <section className="bg-white border border-gray-200 rounded-xl p-6">
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
        </article>

        <aside className="lg:col-span-4 space-y-6">
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 inline-flex items-center gap-2"><PieChart className="h-5 w-5" /><span>Allocation</span></h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">By Type</h3>
                <ul className="space-y-2">
                  {Object.entries(totals.byType).map(([k, v]) => {
                  const pct = v / totals.totalValue * 100;
                  return <li key={k} className="flex items-center justify-between">
                        <p className="text-gray-700 capitalize">{k}</p>
                        <p className="font-medium text-gray-900">{pct.toFixed(1)}%</p>
                      </li>;
                })}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">By Sector</h3>
                <ul className="space-y-2">
                  {Object.entries(totals.bySector).map(([k, v]) => {
                  const pct = v / totals.totalValue * 100;
                  return <li key={k} className="flex items-center justify-between">
                        <p className="text-gray-700">{k}</p>
                        <p className="font-medium text-gray-900">{pct.toFixed(1)}%</p>
                      </li>;
                })}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /><span>AI Summary</span></h2>
            <p className="text-sm text-gray-600 mb-4">Daily, monthly, and YTD narrative of performance with biggest contributors.</p>
            <div className="rounded-lg border border-gray-100 p-4 bg-gradient-to-br from-gray-50 to-white">
              <p className="text-gray-800 leading-relaxed">
                <span>You outperformed the S&P by 1.7% {selectedTf === "1D" ? "today" : selectedTf === "1M" ? "this month" : "YTD"}. Strength came from </span>
                <strong>NVDA +3.2%</strong>
                <span> and </span>
                <strong>BTC +2.6%</strong>
                <span>, partly offset by </span>
                <strong>TSLA -1.9%</strong>
                <span>. Positioning remains tilted to semiconductors and crypto, which drove most of the excess return.</span>
              </p>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 inline-flex items-center gap-2"><BarChart3 className="h-5 w-5" /><span>Totals</span></h2>
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Total Portfolio Value</dt>
                <dd className="font-semibold text-gray-900">${totals.totalValue.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Vs S&P {benchPoint.label}</dt>
                <dd className={`font-semibold ${benchPoint.portfolio - benchPoint.spx >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {(benchPoint.portfolio - benchPoint.spx >= 0 ? "+" : "") + (benchPoint.portfolio - benchPoint.spx).toFixed(1)}%
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </section>;
}
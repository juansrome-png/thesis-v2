import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, BarChart3, PieChart, Wallet, Bell } from 'lucide-react';
import { AllocationPieChart } from './AllocationPieChart';
const mockHoldings = [{
  id: '1',
  ticker: 'AAPL',
  name: 'Apple Inc.',
  quantity: 50,
  currentPrice: 195.89,
  dailyChange: 2.34,
  value: 9794.50
}, {
  id: '2',
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  quantity: 25,
  currentPrice: 875.28,
  dailyChange: -15.67,
  value: 21882.00
}, {
  id: '3',
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  quantity: 40,
  currentPrice: 420.15,
  dailyChange: 8.92,
  value: 16806.00
}] as any[];
const topPerformers = [{
  ticker: 'NVDA',
  change: 15.8,
  isPositive: true
}, {
  ticker: 'AAPL',
  change: 8.2,
  isPositive: true
}, {
  ticker: 'MSFT',
  change: 2.1,
  isPositive: true
}] as any[];
const aiInsights = ['Portfolio outperforming S&P 500 by 4.2% this month', 'Tech sector allocation at optimal level (65%)', 'NVIDIA showing strong momentum ahead of earnings'];
const portfolioNews = [{
  id: 'ft-nvda-guidance',
  title: 'NVIDIA raises guidance amid AI demand',
  href: 'https://www.ft.com/',
  source: 'Financial Times'
}, {
  id: 'wsj-apple-supply',
  title: 'Apple supply chain shows resilience ahead of holiday quarter',
  href: 'https://www.wsj.com/',
  source: 'WSJ'
}, {
  id: 'bloom-msft-cloud',
  title: 'Microsoft Azure growth accelerates on enterprise AI workloads',
  href: 'https://www.bloomberg.com/',
  source: 'Bloomberg'
}] as any[];

// @component: PortfolioDashboard
export const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.value, 0);
  const totalDailyChange = mockHoldings.reduce((sum, holding) => sum + holding.dailyChange * holding.quantity, 0);
  const dailyChangePercent = totalDailyChange / totalValue * 100;

  // demo allocation by industry (existing) and by asset class (stocks/bonds/etfs)
  const industryAllocation = [{
    name: 'Technology',
    value: 48482.5,
    percentage: 65.2,
    color: '#3B82F6'
  }, {
    name: 'Healthcare',
    value: 11172.6,
    percentage: 15.0,
    color: '#10B981'
  }, {
    name: 'Financial',
    value: 8938.08,
    percentage: 12.0,
    color: '#F59E0B'
  }, {
    name: 'Consumer',
    value: 4469.04,
    percentage: 6.0,
    color: '#EF4444'
  }, {
    name: 'Energy',
    value: 1338.78,
    percentage: 1.8,
    color: '#8B5CF6'
  }] as any[];
  const assetClassAllocation = [{
    name: 'Stocks',
    value: Math.round(totalValue * 0.78),
    percentage: 78,
    color: '#0EA5E9'
  }, {
    name: 'ETFs',
    value: Math.round(totalValue * 0.18),
    percentage: 18,
    color: '#22C55E'
  }, {
    name: 'Bonds',
    value: Math.round(totalValue * 0.04),
    percentage: 4,
    color: '#F97316'
  }] as any[];

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Portfolio Insights</h1>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Holdings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Total Portfolio Value</h3>
            <p className="text-3xl font-bold text-slate-900">${totalValue.toLocaleString()}</p>
            <div className={`flex items-center mt-2 ${dailyChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {dailyChangePercent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{dailyChangePercent.toFixed(2)}% today</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">vs S&P 500</h3>
            <p className="text-2xl font-bold text-emerald-600">+4.2%</p>
            <p className="text-sm text-slate-500 mt-1">Outperforming this month</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Top Performer</h3>
            <p className="text-xl font-bold text-slate-900">NVDA</p>
            <p className="text-sm text-emerald-600">+15.8% today</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">AI Alerts</h3>
            <div className="flex items-center">
              <Bell className="w-4 h-4 text-amber-500 mr-2" />
              <span className="text-sm text-slate-700">3 insights</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden">
              <div className="p-6 border-b border-slate-200/50">
                <h2 className="text-lg font-semibold text-slate-900">Holdings Overview</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-slate-600">Asset</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Quantity</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Price</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Daily Change</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockHoldings.map(holding => <tr key={holding.id} className="border-t border-slate-200/30 hover:bg-slate-50/30 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-slate-900">{holding.ticker}</p>
                            <p className="text-sm text-slate-500">{holding.name}</p>
                          </div>
                        </td>
                        <td className="p-4 text-right text-slate-900">{holding.quantity}</td>
                        <td className="p-4 text-right text-slate-900">${holding.currentPrice.toFixed(2)}</td>
                        <td className={`p-4 text-right font-medium ${holding.dailyChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {holding.dailyChange >= 0 ? '+' : ''}${holding.dailyChange.toFixed(2)}
                        </td>
                        <td className="p-4 text-right font-semibold text-slate-900">${holding.value.toLocaleString()}</td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8">
              <AllocationPieChart data={industryAllocation} totalValue={totalValue} secondaryTitle="Asset Class Allocation" secondarySubtitle="Stocks / Bonds / ETFs" secondaryData={assetClassAllocation} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Portfolio Allocation</h3>
                <PieChart className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Technology</span>
                  <span className="text-sm font-medium text-slate-900">65%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: '65%'
                }}></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI Insights</h3>
                <BarChart3 className="w-5 h-5 opacity-80" />
              </div>
              <ul className="space-y-2">
                {aiInsights.map((insight, index) => <li key={index} className="text-sm opacity-90">• {insight}</li>)}
              </ul>
              <div className="mt-6 pt-4 border-t border-white/20">
                <h4 className="text-sm font-medium mb-3 opacity-90">Relevant News</h4>
                <ul className="space-y-2">
                  {portfolioNews.map(item => <li key={item.id} className="text-sm">
                      <a className="underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={`Open news from ${item.source}: ${item.title}`}>
                        <span>{item.title}</span>
                        <span className="ml-2 opacity-80">· {item.source}</span>
                      </a>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
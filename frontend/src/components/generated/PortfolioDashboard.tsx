import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Plus, BarChart3, PieChart, Wallet, Bell, Building2, FileText, Home, User, Sparkles } from 'lucide-react';

import { AllocationPieChart } from './AllocationPieChart';
import { AddHoldingsModal } from './AddHoldingsModal';
import { Link } from 'react-router-dom';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { usePortfolioData } from '../../hooks/useFinancialData';
import { usePortfolioAllocations } from '../../hooks/usePortfolioAllocations';
import { STORAGE_KEYS } from '../../types/assetTypes';

// Mock alerts data (same as AIAlertsPage)
const mockAlerts = [
  { id: '1', priority: 'high', ticker: 'AAPL' },
  { id: '2', priority: 'high', ticker: 'NVDA' },
  { id: '3', priority: 'medium', ticker: 'MSFT' },
  { id: '4', priority: 'medium', ticker: 'TSLA' },
  { id: '5', priority: 'low', ticker: 'GOOGL' },
  { id: '6', priority: 'low', ticker: 'AMZN' }
];

// Function to get alert count for medium and high priority
const getAlertCount = () => {
  return mockAlerts.filter(alert => alert.priority === 'medium' || alert.priority === 'high').length;
};
const mockHoldings = [{
  id: '1',
  ticker: 'AAPL',
  name: 'Apple Inc.',
  quantity: 50,
  currentPrice: 195.89,
  purchasePrice: 180.50,
  dailyChange: 2.34,
  value: 9794.50,
  sector: 'Technology',
  assetType: 'Stock'
}, {
  id: '2',
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  quantity: 25,
  currentPrice: 875.28,
  purchasePrice: 820.00,
  dailyChange: -15.67,
  value: 21882.00,
  sector: 'Technology',
  assetType: 'Stock'
}, {
  id: '3',
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  quantity: 40,
  currentPrice: 420.15,
  purchasePrice: 395.00,
  dailyChange: 8.92,
  value: 16806.00,
  sector: 'Technology',
  assetType: 'Stock'
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
const aiInsights = [
  'Portfolio outperforming S&P 500 by 4.2% this month',
  'Tech sector allocation at optimal level (65%)',
  'NVIDIA showing strong momentum ahead of earnings',
  'Apple maintaining steady growth with iPhone 15 demand',
  'Microsoft Azure cloud services driving enterprise adoption'
];
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
}, {
  id: 'reuters-tech-rally',
  title: 'Tech stocks extend rally as AI adoption accelerates',
  href: 'https://www.reuters.com/',
  source: 'Reuters'
}, {
  id: 'cnbc-market-outlook',
  title: 'Market analysts bullish on semiconductor sector growth',
  href: 'https://www.cnbc.com/',
  source: 'CNBC'
}] as any[];

// Custom components for pie charts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 shadow-xl">
        <p className="font-semibold text-slate-900">{data.name}</p>
        <p className="text-sm text-slate-600">${data.value.toLocaleString()}</p>
        <p className="text-sm font-medium" style={{ color: data.color }}>
          {data.percentage}% of portfolio
        </p>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percentage < 3) return null;
  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      className="text-xs font-bold" 
      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
    >
      {`${percentage.toFixed(1)}%`}
    </text>
  );
};

// @component: PortfolioDashboard
export const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [holdings, setHoldings] = useState(mockHoldings);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [alertsViewed, setAlertsViewed] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load holdings and alerts viewed state from localStorage on component mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_HOLDINGS);
    if (savedHoldings) {
      try {
        const parsedHoldings = JSON.parse(savedHoldings);
        setHoldings(parsedHoldings);
      } catch (error) {
        console.error('Error parsing saved holdings:', error);
        setHoldings(mockHoldings);
      }
    }

    // Load alerts viewed state
    const alertsViewedState = localStorage.getItem('alertsViewed');
    if (alertsViewedState === 'true') {
      setAlertsViewed(true);
    }
  }, []);

  // Get symbols for real-time data fetching
  const symbols = useMemo(() => {
    const symbolList = holdings.map(h => h.ticker);
    return symbolList;
  }, [holdings]);
  
  // Fetch real-time portfolio data (with error handling)
  const { portfolioData: realTimeData, loading: dataLoading, error: dataError } = usePortfolioData(symbols);
  
  
  // Update holdings with real-time prices when available
  const [updatedHoldings, setUpdatedHoldings] = useState(holdings);
  
  useEffect(() => {
    
    if (realTimeData && Object.keys(realTimeData).length > 0) {
      const updated = holdings.map(holding => {
        const liveData = realTimeData[holding.ticker];
        
        if (liveData) {
          return {
            ...holding,
            currentPrice: liveData.price,
            dailyChange: liveData.change,
            value: holding.quantity * liveData.price
          };
        }
        return holding;
      });
      setUpdatedHoldings(updated);
    } else {
      setUpdatedHoldings(holdings);
    }
  }, [realTimeData, holdings]);

  // Mock AI insights for now (will be replaced with real API later)
  const aiInsights = {
    summary: "Your portfolio shows strong diversification across technology and financial sectors.",
    recommendations: ["Consider adding more international exposure", "Monitor tech sector concentration"],
    riskAssessment: "Moderate risk profile with good diversification"
  };
  const insightsLoading = false;

  const handleAddHolding = (newHolding: any) => {
    const updatedHoldings = [...holdings, newHolding];
    setHoldings(updatedHoldings);
    // Save to localStorage for Performance Dashboard to access
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO_HOLDINGS, JSON.stringify(updatedHoldings));
    
    // Save thesis to localStorage if provided
    if (newHolding.thesis && newHolding.ticker) {
      const thesisData = [{
        id: Date.now().toString(),
        content: newHolding.thesis,
        date: new Date().toISOString().split('T')[0],
        tags: []
      }];
      localStorage.setItem(`thesis_${newHolding.ticker}`, JSON.stringify(thesisData));
    }
  };

  const handleDeleteHolding = (holdingId: string) => {
    const updatedHoldings = holdings.filter(holding => holding.id !== holdingId);
    setHoldings(updatedHoldings);
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO_HOLDINGS, JSON.stringify(updatedHoldings));
    
    // Also update the updatedHoldings state
    setUpdatedHoldings(updatedHoldings);
    localStorage.setItem(STORAGE_KEYS.UPDATED_PORTFOLIO_HOLDINGS, JSON.stringify(updatedHoldings));
  };

  const handleAlertsClick = () => {
    setAlertsViewed(true);
    // Save to localStorage to persist across sessions
    localStorage.setItem('alertsViewed', 'true');
  };

  // Use shared hook for consistent allocation calculations
  const {
    industryAllocation,
    assetClassAllocation,
    totalValue,
    totalDailyChange,
    dailyChangePercent
  } = usePortfolioAllocations(updatedHoldings);

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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
              <Plus className="w-4 h-4" />
              <span>Add Holdings</span>
            </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Total Portfolio Value</h3>
            <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">${totalValue.toLocaleString()}</p>
              {dataLoading && (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <div className={`flex items-center mt-2 ${dailyChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {dailyChangePercent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{dailyChangePercent.toFixed(2)}% today</span>
              {dataError && (
                <span className="text-xs text-red-500 ml-2">(Using cached data)</span>
              )}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <h3 className="text-sm font-medium text-slate-600 mb-2">vs S&P 500</h3>
            <p className="text-2xl font-bold text-emerald-600">+4.2%</p>
            <p className="text-sm text-slate-500 mt-1">Outperforming this month</p>
          </div>

          <Link to="/stock-detail/NVDA" className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:bg-white/80 transition-colors cursor-pointer">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Top Performer</h3>
            <p className="text-xl font-bold text-slate-900">NVDA</p>
            <p className="text-sm text-emerald-600">+15.8% today</p>
          </Link>

          <Link to="/ai-alerts" onClick={handleAlertsClick} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:bg-white/80 transition-colors cursor-pointer relative">
            {!alertsViewed && (
              <div className="absolute top-3 right-3">
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getAlertCount()}
                </span>
          </div>
            )}
            <h3 className="text-sm font-medium text-slate-600 mb-2">AI Alerts</h3>
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-amber-500 mr-3" />
              <span className="text-base font-medium text-slate-700">{getAlertCount()} alerts</span>
            </div>
          </Link>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden">
              <div className="p-6 border-b border-slate-200/50">
                <Link to="/performance" className="flex items-center justify-between hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors cursor-pointer">
                  <h2 className="text-lg font-semibold text-slate-900">Portfolio</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditMode(!isEditMode);
                      }}
                      className={`text-sm px-3 py-1 rounded-md transition-colors ${
                        isEditMode 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                    <Link to="/performance" className="text-sm px-3 py-1 rounded-md transition-colors bg-green-100 text-green-700 hover:bg-green-200">
                      View Details →
                    </Link>
                  </div>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-slate-600">Asset</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Quantity</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Current Price</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Purchase Price</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Daily Change</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-600">Value</th>
                      {isEditMode && <th className="text-center p-4 text-sm font-medium text-slate-600">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {updatedHoldings.map(holding => <tr key={holding.id} className="border-t border-slate-200/30 hover:bg-slate-50/30 transition-colors cursor-pointer">
                        <td className="p-4">
                          <Link to={`/stock-detail/${holding.ticker}`} className="block hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-colors">
                          <div>
                            <p className="font-medium text-slate-900">{holding.ticker}</p>
                            <p className="text-sm text-slate-500">{holding.name}</p>
                          </div>
                          </Link>
                        </td>
                        <td className="p-4 text-right text-slate-900">{holding.quantity}</td>
                        <td className="p-4 text-right text-slate-900">${holding.currentPrice.toFixed(2)}</td>
                        <td className="p-4 text-right text-slate-900">${(holding.purchasePrice || holding.currentPrice).toFixed(2)}</td>
                        <td className={`p-4 text-right font-medium ${holding.dailyChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {holding.dailyChange >= 0 ? '+' : ''}${holding.dailyChange.toFixed(2)}
                        </td>
                        <td className="p-4 text-right font-semibold text-slate-900">${holding.value.toLocaleString()}</td>
                        {isEditMode && (
                          <td className="p-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete ${holding.ticker}?`)) {
                                  handleDeleteHolding(holding.id);
                                }
                              }}
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 shadow-xl shadow-slate-200/20">
                <Link to="/portfolio-insights" className="block hover:bg-slate-50/30 rounded-2xl p-2 -m-2 transition-colors cursor-pointer">
                  <header className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">Industry Allocation</h3>
                      <p className="text-xs text-slate-600">Breakdown by industry</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-white" />
                    </div>
                  </header>
                  <div className="h-56 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={industryAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={CustomLabel}
                          outerRadius={90}
                          innerRadius={45}
                          dataKey="value"
                          stroke="none"
                        >
                          {industryAllocation.map((entry, index) => (
                            <Cell key={`industry-${entry.name}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {industryAllocation.map(item => (
                      <div key={`industry-row-${item.name}`} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">${(item.value as number).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">{item.percentage.toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 shadow-xl shadow-slate-200/20">
                <Link to="/portfolio-insights" className="block hover:bg-slate-50/30 rounded-2xl p-2 -m-2 transition-colors cursor-pointer">
                  <header className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">Asset Class Allocation</h3>
                      <p className="text-xs text-slate-600">Stocks / Bonds / ETFs</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-white" />
                    </div>
                  </header>
                  <div className="h-56 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={assetClassAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={CustomLabel}
                          outerRadius={90}
                          innerRadius={45}
                          dataKey="value"
                          stroke="none"
                        >
                          {assetClassAllocation.map((entry, index) => (
                            <Cell key={`asset-${entry.name}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {assetClassAllocation.map(item => (
                      <div key={`asset-row-${item.name}`} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">${(item.value as number).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">{item.percentage.toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Insights
                </h3>
                <BarChart3 className="w-5 h-5 opacity-80" />
              </div>
              {aiInsights ? (
                <div className="text-sm opacity-90">
                  <p className="mb-2"><strong>Summary:</strong> {aiInsights.summary}</p>
                  <p className="mb-2"><strong>Risk:</strong> {aiInsights.riskAssessment}</p>
                  <div>
                    <strong>Recommendations:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {aiInsights.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
              </ul>
                  </div>
                </div>
              ) : (
                <div className="text-sm opacity-90">
                  AI insights will be available soon...
                </div>
              )}
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

      {/* Add Holdings Modal */}
      <AddHoldingsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHolding={handleAddHolding}
      />
    </div>;
};
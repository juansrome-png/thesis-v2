import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MetricsOverview } from './MetricsOverview';
import { PriceChart } from './PriceChart';
import { ThesisSection } from './ThesisSection';
import { AnalystInsightsTab } from './AnalystInsightsTab';
import { WebSocketService } from '../../services/financialDataService';

// @component: StockDetailPage
export const StockDetailPage = ({ ticker = 'AAPL' }: { ticker?: string }) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'news'>('insights');
  const [selectedRange, setSelectedRange] = useState('1M');
  const navigate = useNavigate();
  const wsService = useRef<WebSocketService | null>(null);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [cachedPrice, setCachedPrice] = useState<any>(null);
  
  // Load cached real-time price data from portfolio dashboard first
  useEffect(() => {
    const updatedHoldings = localStorage.getItem('updatedPortfolioHoldings');
    if (updatedHoldings) {
      try {
        const parsedHoldings = JSON.parse(updatedHoldings);
        const holding = parsedHoldings.find((h: any) => h.ticker === ticker);
        if (holding) {
          setCachedPrice({
            price: Math.round(holding.currentPrice * 100) / 100,
            change: Math.round(holding.dailyChange * 100) / 100,
            changePercent: Math.round(((holding.dailyChange / holding.purchasePrice) * 100) * 100) / 100,
            volume: holding.volume,
            high: holding.high,
            low: holding.low,
            open: holding.open,
            previousClose: holding.previousClose
          });
        }
      } catch (error) {
        console.error('Error parsing cached holdings:', error);
      }
    }
  }, [ticker]);
  
  // Set up WebSocket for real-time updates
  useEffect(() => {
    if (!wsService.current) {
      wsService.current = new WebSocketService();
    }
    
      wsService.current.connect([ticker], (newData) => {
        if (newData[ticker]) {
        const liveData = newData[ticker];
        const roundedData = {
          ...liveData,
          price: Math.round(liveData.price * 100) / 100,
          change: Math.round(liveData.change * 100) / 100,
          changePercent: Math.round(liveData.changePercent * 100) / 100
        };
        setRealTimeData(roundedData);
        
        // Update localStorage to keep prices synchronized with portfolio dashboard
        const updatedHoldings = localStorage.getItem('updatedPortfolioHoldings');
        if (updatedHoldings) {
          try {
            const parsedHoldings = JSON.parse(updatedHoldings);
            const updatedHoldingsList = parsedHoldings.map((holding: any) => {
              if (holding.ticker === ticker) {
                return {
                  ...holding,
                  currentPrice: roundedData.price,
                  dailyChange: roundedData.change,
                  value: Math.round(holding.quantity * roundedData.price * 100) / 100
                };
              }
              return holding;
            });
            localStorage.setItem('updatedPortfolioHoldings', JSON.stringify(updatedHoldingsList));
          } catch (error) {
            console.error('Error updating localStorage:', error);
          }
        }
      }
    });
    
    // Cleanup WebSocket on unmount
    return () => {
      if (wsService.current) {
        wsService.current.disconnect();
      }
    };
  }, [ticker]);
  
  // Get stock data with real-time updates and decimal rounding
  const getStockData = (ticker: string) => {
    const baseData = {
      'AAPL': {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        assetType: 'Stock',
        currentPrice: 195.89,
        purchasePrice: 150.00,
        change: 5.67,
        changePercent: 2.98,
        volume: '45.2M',
        marketCap: '3.02T',
        peRatio: 28.5,
        eps: 6.87,
        beta: 1.29,
        week52Low: 164.08,
        week52High: 199.62,
        analystConsensus: 'Buy',
        analystCount: 42,
        avgPriceTarget: 210.50,
        dividendYield: 0.44
      },
      'NVDA': {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        assetType: 'Stock',
        currentPrice: 875.28,
        purchasePrice: 800.00,
        change: -15.67,
        changePercent: -1.76,
        volume: '28.5M',
        marketCap: '2.15T',
        peRatio: 65.2,
        eps: 13.42,
        beta: 1.68,
        week52Low: 409.25,
        week52High: 974.00,
        analystConsensus: 'Buy',
        analystCount: 38,
        avgPriceTarget: 950.00,
        dividendYield: 0.03
      },
      'MSFT': {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        assetType: 'Stock',
        currentPrice: 420.15,
        purchasePrice: 380.00,
        change: 8.92,
        changePercent: 2.17,
        volume: '22.1M',
        marketCap: '3.12T',
        peRatio: 32.8,
        eps: 12.81,
        beta: 0.91,
        week52Low: 309.45,
        week52High: 430.82,
        analystConsensus: 'Buy',
        analystCount: 45,
        avgPriceTarget: 450.00,
        dividendYield: 0.71
      },
      'SPY': {
        symbol: 'SPY',
        name: 'SPDR S&P 500 ETF Trust',
        assetType: 'ETF',
        currentPrice: 485.67,
        purchasePrice: 450.00,
        change: 2.34,
        changePercent: 0.48,
        aum: '425.8B',
        expenseRatio: 0.0945,
        topHoldings: [
          { name: 'Apple Inc.', weight: 7.2 },
          { name: 'Microsoft Corp.', weight: 6.8 },
          { name: 'Amazon.com Inc.', weight: 3.1 }
        ],
        totalHoldings: 503,
        trackingDifference: -0.02,
        avgSpread: 0.01,
        distributionYield: 1.45
      },
      'BTC': {
        symbol: 'BTC',
        name: 'Bitcoin',
        assetType: 'Crypto',
        currentPrice: 43250.00,
        purchasePrice: 40000.00,
        change: 1250.00,
        changePercent: 2.98,
        volume24h: '28.5B',
        marketCap: '850.2B',
        circulatingSupply: '19.65M',
        maxSupply: '21.00M',
        dexLiquidity: '2.1B'
      }
    };
    
    const baseStockData = baseData[ticker] || baseData['AAPL'];
    
    // Priority: Real-time data > Cached data from portfolio > Base data
    const priceData = realTimeData || cachedPrice;
    
    if (priceData) {
      return {
        ...baseStockData,
        currentPrice: priceData.price,
        change: priceData.change,
        changePercent: priceData.changePercent,
        volume: priceData.volume ? Math.round(priceData.volume).toLocaleString() : baseStockData.volume,
        high: priceData.high ? Math.round(priceData.high * 100) / 100 : baseStockData.high,
        low: priceData.low ? Math.round(priceData.low * 100) / 100 : baseStockData.low,
        open: priceData.open ? Math.round(priceData.open * 100) / 100 : baseStockData.open,
        previousClose: priceData.previousClose ? Math.round(priceData.previousClose * 100) / 100 : baseStockData.previousClose
      };
    }
    
    // Apply decimal rounding to base data
    return {
      ...baseStockData,
      currentPrice: Math.round(baseStockData.currentPrice * 100) / 100,
      purchasePrice: Math.round(baseStockData.purchasePrice * 100) / 100,
      change: Math.round(baseStockData.change * 100) / 100,
      changePercent: Math.round(baseStockData.changePercent * 100) / 100,
      week52Low: Math.round(baseStockData.week52Low * 100) / 100,
      week52High: Math.round(baseStockData.week52High * 100) / 100,
      avgPriceTarget: baseStockData.avgPriceTarget ? Math.round(baseStockData.avgPriceTarget * 100) / 100 : baseStockData.avgPriceTarget,
      peRatio: baseStockData.peRatio ? Math.round(baseStockData.peRatio * 100) / 100 : baseStockData.peRatio,
      eps: baseStockData.eps ? Math.round(baseStockData.eps * 100) / 100 : baseStockData.eps,
      beta: baseStockData.beta ? Math.round(baseStockData.beta * 100) / 100 : baseStockData.beta,
      dividendYield: baseStockData.dividendYield ? Math.round(baseStockData.dividendYield * 100) / 100 : baseStockData.dividendYield
    };
  };
  
  const stockData = getStockData(ticker);
  const tabVariants = {
    active: {
      backgroundColor: '#f1f5f9',
      color: '#0f172a'
    },
    inactive: {
      backgroundColor: 'transparent',
      color: '#64748b'
    }
  };

  // @return
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => navigate('/portfolio-dashboard')} 
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{stockData.name}</h1>
                <p className="text-gray-600">{stockData.symbol}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <MetricsOverview stockData={stockData} />
            
            {/* Asset-Specific Metrics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Metrics</h2>
              
              {stockData.assetType === 'Stock' && (
                <div className="grid grid-cols-1 gap-6">
                  {/* Financial Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Financial Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">P/E (TTM)</span>
                          <span className="text-lg font-bold text-blue-900">{stockData.peRatio}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">EPS (TTM)</span>
                          <span className="text-lg font-bold text-blue-900">${stockData.eps}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">Beta (5Y)</span>
                          <span className="text-lg font-bold text-blue-900">{stockData.beta}</span>
                        </div>
                        {stockData.dividendYield > 0 && (
                          <div className="flex justify-between items-center py-3">
                            <span className="text-blue-700 font-medium">Dividend Yield</span>
                            <span className="text-lg font-bold text-blue-900">{stockData.dividendYield}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">52W Range</span>
                          <span className="text-sm font-bold text-blue-900">${stockData.week52Low} - ${stockData.week52High}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">Analyst Consensus</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{stockData.analystConsensus}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-blue-100">
                          <span className="text-blue-700 font-medium">Analysts</span>
                          <span className="text-lg font-bold text-blue-900">{stockData.analystCount}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-blue-700 font-medium">Avg Target</span>
                          <span className="text-lg font-bold text-blue-900">${stockData.avgPriceTarget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {stockData.assetType === 'ETF' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Holdings */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Holdings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-purple-100">
                        <span className="text-purple-700 font-medium">Total Holdings</span>
                        <span className="text-lg font-bold text-purple-900">{stockData.totalHoldings}</span>
                      </div>
                      <div className="space-y-3">
                        <span className="text-purple-700 font-medium">Top Holdings:</span>
                        {stockData.topHoldings.map((holding, index) => (
                          <div key={index} className="flex justify-between items-center py-2 px-3 bg-purple-25 rounded-lg">
                            <span className="text-purple-800 text-sm">{holding.name}</span>
                            <span className="text-sm font-bold text-purple-900">{holding.weight}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      Performance
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-orange-100">
                        <span className="text-orange-700 font-medium">Tracking Difference (1Y)</span>
                        <span className="text-lg font-bold text-orange-900">{stockData.trackingDifference}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-orange-100">
                        <span className="text-orange-700 font-medium">Avg Spread</span>
                        <span className="text-lg font-bold text-orange-900">{stockData.avgSpread}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-orange-700 font-medium">Distribution Yield</span>
                        <span className="text-lg font-bold text-orange-900">{stockData.distributionYield}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {stockData.assetType === 'Crypto' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Supply */}
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3"></div>
                      Supply
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-slate-700 font-medium">Circulating Supply</span>
                        <span className="text-lg font-bold text-slate-900">{stockData.circulatingSupply}M</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-700 font-medium">Max Supply</span>
                        <span className="text-lg font-bold text-slate-900">{stockData.maxSupply}M</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced (Optional) */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
                    <h3 className="text-lg font-semibold text-cyan-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      On-Chain
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-cyan-700 font-medium">DEX Liquidity</span>
                        <span className="text-lg font-bold text-cyan-900">{stockData.dexLiquidity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <PriceChart selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          </div>

          <div className="space-y-8">
            <ThesisSection ticker={ticker} />
            
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button onClick={() => setActiveTab('insights')} className="flex-1 px-6 py-4 text-sm font-medium relative">
                    <motion.div variants={tabVariants} animate={activeTab === 'insights' ? 'active' : 'inactive'} className="absolute inset-0" />
                    <span className="relative">Analyst Insights</span>
                  </button>
                  <button onClick={() => setActiveTab('news')} className="flex-1 px-6 py-4 text-sm font-medium relative">
                    <motion.div variants={tabVariants} animate={activeTab === 'news' ? 'active' : 'inactive'} className="absolute inset-0" />
                    <span className="relative">Recent News</span>
                  </button>
                  <Link to={`/asset-detail/${ticker}`} className="flex-1 px-6 py-4 text-sm font-medium text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors rounded-lg mx-1">
                    <span>Investment Thesis</span>
                  </Link>
                </nav>
              </div>
              
              <motion.div key={activeTab} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3
            }} className="p-6">
                <AnalystInsightsTab activeTab={activeTab} symbol={stockData.symbol} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
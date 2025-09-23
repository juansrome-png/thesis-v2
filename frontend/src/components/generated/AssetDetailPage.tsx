import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface AssetDetailPageProps {
  ticker?: string;
  onBack?: () => void;
}
const mockPriceData = [{
  date: '2024-01',
  price: 175.30
}, {
  date: '2024-02',
  price: 182.45
}, {
  date: '2024-03',
  price: 189.20
}, {
  date: '2024-04',
  price: 195.89
}] as any[];
const mockNews = [{
  id: '1',
  title: 'Apple Reports Strong Q4 Earnings',
  summary: 'Revenue beats expectations...',
  sentiment: 'positive'
}, {
  id: '2',
  title: 'New iPhone Sales Exceed Forecasts',
  summary: 'Strong consumer demand...',
  sentiment: 'positive'
}] as any[];

// @component: AssetDetailPage
export const AssetDetailPage = ({
  ticker = 'AAPL',
  onBack
}: AssetDetailPageProps) => {
  const navigate = useNavigate();
  // Mock data based on ticker
  const getAssetData = (ticker: string) => {
    const assetDataMap: Record<string, any> = {
      'AAPL': {
        name: 'Apple Inc.',
        assetType: 'Stock',
        currentPrice: 195.89,
        change: 2.34,
        changePercent: 1.21,
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
        dividendYield: 0.44,
        priceData: [
          { date: '2024-01', price: 175.30 },
          { date: '2024-02', price: 182.45 },
          { date: '2024-03', price: 189.20 },
          { date: '2024-04', price: 195.89 }
        ],
        news: [
          { id: '1', title: 'Apple Reports Strong Q4 Earnings', summary: 'Revenue beats expectations...', sentiment: 'positive' },
          { id: '2', title: 'New iPhone Sales Exceed Forecasts', summary: 'Strong consumer demand...', sentiment: 'positive' }
        ],
        thesisAlerts: [
          { type: 'strengthening', text: 'iPhone sales growth aligns with your thesis on consumer loyalty' },
          { type: 'weakening', text: 'China market concerns may impact long-term growth projections' }
        ],
        defaultThesis: 'Apple remains a dominant force in premium consumer electronics with strong ecosystem lock-in effects. The company\'s services revenue provides recurring income streams while hardware innovation continues to drive upgrade cycles.',
        aiUpdate: 'Apple\'s recent quarterly performance demonstrates continued strength in services revenue growth, with App Store and subscription services showing robust performance. The company\'s focus on AI integration across its ecosystem, particularly with upcoming iOS features, indicates strategic positioning for the next phase of mobile computing.\n\nMarket sentiment reflects ongoing discussions around competitive positioning and operational efficiency. These developments suggest potential implications for user engagement and revenue per device metrics, as well as long-term strategic direction within the company\'s primary operating segments.',
        monitoringItems: [
          {
            title: 'iPhone Sales Growth',
            description: 'Monitor quarterly iPhone unit sales and revenue growth trends',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'Services Revenue',
            description: 'Track App Store, iCloud, and subscription service revenue growth',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'China Market Exposure',
            description: 'Watch for regulatory changes and market share shifts in China',
            status: 'negative',
            frequency: 'Monthly'
          },
          {
            title: 'Supply Chain Issues',
            description: 'Monitor production delays and component shortages',
            status: 'negative',
            frequency: 'Weekly'
          },
          {
            title: 'Competition in Services',
            description: 'Track competitive pressure from Google, Spotify, and others',
            status: 'neutral',
            frequency: 'Monthly'
          },
          {
            title: 'Innovation Pipeline',
            description: 'Monitor new product launches and R&D investments',
            status: 'positive',
            frequency: 'Quarterly'
          }
        ]
      },
      'NVDA': {
        name: 'NVIDIA Corporation',
        assetType: 'Stock',
        currentPrice: 875.28,
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
        dividendYield: 0.03,
        priceData: [
          { date: '2024-01', price: 750.20 },
          { date: '2024-02', price: 820.45 },
          { date: '2024-03', price: 890.20 },
          { date: '2024-04', price: 875.28 }
        ],
        news: [
          { id: '1', title: 'NVIDIA AI Chip Demand Surges', summary: 'Data center revenue exceeds expectations...', sentiment: 'positive' },
          { id: '2', title: 'Gaming GPU Sales Decline', summary: 'Consumer segment shows weakness...', sentiment: 'negative' }
        ],
        thesisAlerts: [
          { type: 'strengthening', text: 'AI data center growth validates thesis on AI infrastructure leadership' },
          { type: 'weakening', text: 'Gaming segment weakness may impact overall revenue mix' }
        ],
        defaultThesis: 'NVIDIA is positioned as the leading provider of AI infrastructure with strong moats in data center GPUs. The company\'s CUDA platform creates switching costs while AI demand continues to accelerate across industries.',
        aiUpdate: 'NVIDIA\'s data center revenue continues to show exceptional growth, driven by enterprise AI adoption and cloud computing expansion. Recent developments in AI model training requirements and inference workloads indicate sustained demand for high-performance computing solutions.\n\nThese trends suggest potential implications for market share dynamics in the AI infrastructure space and competitive positioning against emerging alternatives. The company\'s CUDA platform ecosystem and developer community engagement remain key factors in maintaining technological leadership.',
        monitoringItems: [
          {
            title: 'Data Center Revenue',
            description: 'Track H100/A100 GPU sales and data center revenue growth',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'AI Market Expansion',
            description: 'Monitor enterprise AI adoption and new use cases',
            status: 'positive',
            frequency: 'Monthly'
          },
          {
            title: 'Gaming GPU Demand',
            description: 'Watch consumer gaming segment performance',
            status: 'negative',
            frequency: 'Quarterly'
          },
          {
            title: 'Competition from AMD',
            description: 'Track AMD\'s competitive positioning in data center',
            status: 'negative',
            frequency: 'Monthly'
          },
          {
            title: 'Regulatory Environment',
            description: 'Monitor export restrictions and AI regulations',
            status: 'negative',
            frequency: 'Weekly'
          },
          {
            title: 'CUDA Ecosystem',
            description: 'Track developer adoption and software partnerships',
            status: 'positive',
            frequency: 'Quarterly'
          }
        ]
      },
      'MSFT': {
        name: 'Microsoft Corporation',
        assetType: 'Stock',
        currentPrice: 420.15,
        change: 8.92,
        changePercent: 2.17,
        volume: '22.8M',
        marketCap: '3.12T',
        peRatio: 32.8,
        eps: 12.81,
        beta: 0.91,
        week52Low: 309.45,
        week52High: 430.82,
        analystConsensus: 'Buy',
        analystCount: 45,
        avgPriceTarget: 450.00,
        dividendYield: 0.71,
        priceData: [
          { date: '2024-01', price: 380.20 },
          { date: '2024-02', price: 395.45 },
          { date: '2024-03', price: 410.20 },
          { date: '2024-04', price: 420.15 }
        ],
        news: [
          { id: '1', title: 'Azure Cloud Growth Accelerates', summary: 'Enterprise adoption drives revenue...', sentiment: 'positive' },
          { id: '2', title: 'Office 365 Subscriptions Increase', summary: 'Productivity suite shows strong demand...', sentiment: 'positive' }
        ],
        thesisAlerts: [
          { type: 'strengthening', text: 'Azure growth validates thesis on cloud leadership and enterprise stickiness' },
          { type: 'strengthening', text: 'Office 365 retention rates support recurring revenue thesis' }
        ],
        defaultThesis: 'Microsoft\'s cloud-first strategy with Azure and Office 365 creates strong recurring revenue streams. The company\'s enterprise focus and productivity tools provide competitive moats in the business software market.',
        aiUpdate: 'Microsoft\'s Azure cloud platform continues to demonstrate strong growth momentum, with enterprise adoption accelerating across various industries. The integration of AI capabilities through Copilot and other productivity tools shows increasing traction in commercial markets.\n\nThese developments indicate potential implications for customer retention rates and average revenue per user metrics in the enterprise software segment. The company\'s focus on hybrid cloud solutions and enterprise security features positions it well for continued market expansion.',
        monitoringItems: [
          {
            title: 'Azure Cloud Growth',
            description: 'Monitor Azure revenue growth and market share expansion',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'Office 365 Subscriptions',
            description: 'Track commercial and consumer subscription growth',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'AI Integration',
            description: 'Watch Copilot adoption and AI feature monetization',
            status: 'positive',
            frequency: 'Monthly'
          },
          {
            title: 'Competition with AWS',
            description: 'Monitor competitive pressure from Amazon Web Services',
            status: 'negative',
            frequency: 'Monthly'
          },
          {
            title: 'Enterprise Contracts',
            description: 'Track large enterprise deal renewals and expansions',
            status: 'positive',
            frequency: 'Quarterly'
          },
          {
            title: 'Regulatory Scrutiny',
            description: 'Monitor antitrust concerns and regulatory changes',
            status: 'negative',
            frequency: 'Monthly'
          }
        ]
      },
      'SPY': {
        name: 'SPDR S&P 500 ETF Trust',
        assetType: 'ETF',
        currentPrice: 485.67,
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
        distributionYield: 1.45,
        priceData: [
          { date: '2024-01', price: 475.20 },
          { date: '2024-02', price: 480.45 },
          { date: '2024-03', price: 483.20 },
          { date: '2024-04', price: 485.67 }
        ],
        news: [
          { id: '1', title: 'S&P 500 Reaches New Highs', summary: 'Index performance driven by tech sector...', sentiment: 'positive' }
        ],
        thesisAlerts: [
          { type: 'strengthening', text: 'Broad market exposure provides diversification benefits' }
        ],
        defaultThesis: 'SPY provides broad exposure to the S&P 500 index with low costs and high liquidity. The ETF offers diversification across sectors and market caps.',
        aiUpdate: 'The S&P 500 ETF continues to benefit from broad market strength and sector rotation patterns. Recent performance reflects underlying economic conditions and corporate earnings trends.\n\nThese trends suggest implications for portfolio diversification and risk management strategies across different market environments.',
        monitoringItems: [
          {
            title: 'Tracking Error',
            description: 'Monitor performance vs S&P 500 benchmark',
            status: 'positive',
            frequency: 'Monthly'
          }
        ]
      },
      'BTC': {
        name: 'Bitcoin',
        assetType: 'Crypto',
        currentPrice: 43250.00,
        change: 1250.00,
        changePercent: 2.98,
        volume24h: '28.5B',
        marketCap: '850.2B',
        circulatingSupply: '19.65M',
        maxSupply: '21.00M',
        dexLiquidity: '2.1B',
        priceData: [
          { date: '2024-01', price: 42000.00 },
          { date: '2024-02', price: 43500.00 },
          { date: '2024-03', price: 42800.00 },
          { date: '2024-04', price: 43250.00 }
        ],
        news: [
          { id: '1', title: 'Bitcoin ETF Approval Drives Demand', summary: 'Institutional adoption increases...', sentiment: 'positive' }
        ],
        thesisAlerts: [
          { type: 'strengthening', text: 'Institutional adoption and ETF approval support long-term thesis' }
        ],
        defaultThesis: 'Bitcoin serves as digital gold and store of value with limited supply and growing institutional adoption. The cryptocurrency offers portfolio diversification and inflation hedge characteristics.',
        aiUpdate: 'Bitcoin continues to show resilience amid market volatility, with institutional adoption and regulatory clarity supporting long-term fundamentals. Recent developments in ETF approvals and corporate treasury allocations indicate growing mainstream acceptance.\n\nThese trends suggest implications for portfolio diversification strategies and the evolving role of digital assets in traditional investment frameworks.',
        monitoringItems: [
          {
            title: 'Network Activity',
            description: 'Monitor transaction volume and network congestion',
            status: 'positive',
            frequency: 'Daily'
          }
        ]
      }
    };
    
    return assetDataMap[ticker] || assetDataMap['AAPL'];
  };
  
  const assetData = getAssetData(ticker);
  
  // Get user's actual thesis from localStorage or use default
  const getUserThesis = (ticker: string): string => {
    const stored = localStorage.getItem(`thesis_${ticker}`);
    if (stored) {
      const theses = JSON.parse(stored);
      if (theses.length > 0) {
        // Return the most recent thesis
        return theses[0].content;
      }
    }
    return assetData.defaultThesis;
  };
  
  const [thesis, setThesis] = useState(getUserThesis(ticker));
  
  // Refresh thesis when component mounts or ticker changes
  useEffect(() => {
    const userThesis = getUserThesis(ticker);
    setThesis(userThesis);
  }, [ticker]);

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(`/stock-detail/${ticker}`)} 
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Stock Detail</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{assetData.name} Investment Thesis</h1>
          <p className="text-lg text-slate-600">Detailed analysis and thesis monitoring for {assetData.name}</p>
        </div>

        {/* Investment Thesis and AI Thesis Health sections - moved above price chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Investment Thesis</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{thesis}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">AI Thesis Health</h2>
            <div className="space-y-4">
              {assetData.thesisAlerts.map((alert, index) => <div key={index} className={`p-4 rounded-2xl flex items-start space-x-3 ${alert.type === 'strengthening' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  {alert.type === 'strengthening' ? <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />}
                  <p className={`text-sm ${alert.type === 'strengthening' ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {alert.text}
                  </p>
                </div>)}
            </div>
          </div>
        </div>

        {/* Thesis AI Update section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Thesis AI Update</h2>
          <div className="space-y-4">
            {assetData.aiUpdate.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Important Things to Monitor section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Important Things to Monitor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assetData.monitoringItems.map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${item.status === 'positive' ? 'bg-emerald-500' : item.status === 'negative' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'positive' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === 'negative' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status === 'positive' ? 'Positive' : item.status === 'negative' ? 'Negative' : 'Neutral'}
                      </span>
                      <span className="text-xs text-slate-500">{item.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Chart and Financial Metrics Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Price Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{ticker}</h1>
                <p className="text-lg text-slate-600">{assetData.name}</p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">${assetData.currentPrice}</p>
                <div className={`flex items-center ${assetData.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {assetData.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  <span>{assetData.change >= 0 ? '+' : ''}{assetData.change} ({assetData.changePercent >= 0 ? '+' : ''}{assetData.changePercent}%)</span>
              </div>
            </div>
          </div>

            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={assetData.priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }} />
                <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={3} dot={{
                fill: '#3B82F6',
                strokeWidth: 2
              }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

          {/* Asset-Specific Metrics */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Financial Metrics</h2>
          
          {assetData.assetType === 'Stock' && (
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
                      <span className="text-lg font-bold text-blue-900">{assetData.peRatio}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-blue-700 font-medium">EPS (TTM)</span>
                      <span className="text-lg font-bold text-blue-900">${assetData.eps}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-blue-700 font-medium">Beta (5Y)</span>
                      <span className="text-lg font-bold text-blue-900">{assetData.beta}</span>
                    </div>
                    {assetData.dividendYield > 0 && (
                      <div className="flex justify-between items-center py-3">
                        <span className="text-blue-700 font-medium">Dividend Yield</span>
                        <span className="text-lg font-bold text-blue-900">{assetData.dividendYield}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-blue-700 font-medium">52W Range</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-900">${assetData.week52Low}</div>
                        <div className="text-xs text-blue-600">to</div>
                        <div className="text-sm font-bold text-blue-900">${assetData.week52High}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-blue-700 font-medium">Analyst Consensus</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{assetData.analystConsensus}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-blue-100">
                      <span className="text-blue-700 font-medium">Analysts</span>
                      <span className="text-lg font-bold text-blue-900">{assetData.analystCount}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-blue-700 font-medium">Avg Target</span>
                      <span className="text-lg font-bold text-blue-900">${assetData.avgPriceTarget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {assetData.assetType === 'ETF' && (
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
                    <span className="text-lg font-bold text-purple-900">{assetData.totalHoldings}</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-purple-700 font-medium">Top Holdings:</span>
                    {assetData.topHoldings.map((holding, index) => (
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
                    <span className="text-lg font-bold text-orange-900">{assetData.trackingDifference}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-orange-100">
                    <span className="text-orange-700 font-medium">Avg Spread</span>
                    <span className="text-lg font-bold text-orange-900">{assetData.avgSpread}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-orange-700 font-medium">Distribution Yield</span>
                    <span className="text-lg font-bold text-orange-900">{assetData.distributionYield}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {assetData.assetType === 'Crypto' && (
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
                    <span className="text-lg font-bold text-slate-900">{assetData.circulatingSupply}M</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-700 font-medium">Max Supply</span>
                    <span className="text-lg font-bold text-slate-900">{assetData.maxSupply}M</span>
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
                    <span className="text-lg font-bold text-cyan-900">{assetData.dexLiquidity}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Relevant News</h2>
          <div className="space-y-4">
            {assetData.news.map(article => <div key={article.id} className="p-6 bg-slate-50/50 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-slate-600 text-sm">{article.summary}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${article.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {article.sentiment}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
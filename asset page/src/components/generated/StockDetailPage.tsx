import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { MetricsOverview } from './MetricsOverview';
import { PriceChart } from './PriceChart';
import { ThesisSection } from './ThesisSection';
import { AnalystInsightsTab } from './AnalystInsightsTab';

// @component: StockDetailPage
export const StockDetailPage = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'news'>('insights');
  const [selectedRange, setSelectedRange] = useState('1M');
  const stockData = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 195.89,
    purchasePrice: 150.00,
    change: 5.67,
    changePercent: 2.98,
    volume: '45.2M',
    marketCap: '3.1T'
  };
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
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
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
            <PriceChart selectedRange={selectedRange} onRangeChange={setSelectedRange} />
          </div>

          <div className="space-y-8">
            <ThesisSection />
            
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
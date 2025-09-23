import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
interface MetricsOverviewProps {
  stockData: {
    symbol: string;
    name: string;
    currentPrice: number;
    purchasePrice: number;
    change: number;
    changePercent: number;
    volume: string;
    marketCap: string;
  };
}

// @component: MetricsOverview
export const MetricsOverview = ({
  stockData
}: MetricsOverviewProps) => {
  const profitLoss = stockData.currentPrice - stockData.purchasePrice;
  const returnPercent = profitLoss / stockData.purchasePrice * 100;
  const isPositive = profitLoss > 0;
  const isDayPositive = stockData.change > 0;
  const metrics = [{
    label: 'Current Price',
    value: `$${stockData.currentPrice.toFixed(2)}`
  }, {
    label: 'Purchase Price',
    value: `$${stockData.purchasePrice.toFixed(2)}`
  }, {
    label: 'Volume',
    value: stockData.volume
  }, {
    label: 'Market Cap',
    value: stockData.marketCap
  }] as any[];

  // @return
  return <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <span>Current Performance</span>
            </h2>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${stockData.currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isDayPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isDayPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {isDayPositive ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              <span>Your Position</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total P/L</span>
                <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${profitLoss.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Return</span>
                <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{returnPercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <span>Key Metrics</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map(metric => <motion.div key={metric.label} whileHover={{
            scale: 1.02
          }} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span>{metric.label}</span>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  <span>{metric.value}</span>
                </p>
              </motion.div>)}
          </div>
        </div>
      </div>
    </div>;
};
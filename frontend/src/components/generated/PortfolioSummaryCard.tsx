import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
interface PortfolioSummaryCardProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  spComparison: number;
  monthlyReturn: number;
  yearlyReturn: number;
}

// @component: PortfolioSummaryCard
export const PortfolioSummaryCard = ({
  totalValue,
  dailyChange,
  dailyChangePercent,
  spComparison,
  monthlyReturn,
  yearlyReturn
}: PortfolioSummaryCardProps) => {
  // @return
  return <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl shadow-slate-200/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-medium text-slate-600 mb-2">Total Portfolio Value</h2>
          <p className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ${totalValue.toLocaleString()}
          </p>
        </div>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className={`p-4 rounded-2xl ${dailyChangePercent >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <div className="flex items-center mb-2">
            {dailyChangePercent >= 0 ? <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" /> : <TrendingDown className="w-4 h-4 text-red-600 mr-2" />}
            <span className="text-sm font-medium text-slate-600">Today</span>
          </div>
          <p className={`text-xl font-bold ${dailyChangePercent >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
            {dailyChangePercent >= 0 ? '+' : ''}{dailyChangePercent.toFixed(2)}%
          </p>
          <p className={`text-sm ${dailyChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${dailyChange >= 0 ? '+' : ''}{dailyChange.toLocaleString()}
          </p>
        </div>

        <div className={`p-4 rounded-2xl ${spComparison >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-slate-600">vs S&P 500</span>
          </div>
          <p className={`text-xl font-bold ${spComparison >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            {spComparison >= 0 ? '+' : ''}{spComparison.toFixed(1)}%
          </p>
          <p className="text-sm text-slate-500">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/50">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600 mb-1">Monthly Return</p>
          <p className={`text-lg font-bold ${monthlyReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {monthlyReturn >= 0 ? '+' : ''}{monthlyReturn.toFixed(1)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600 mb-1">Yearly Return</p>
          <p className={`text-lg font-bold ${yearlyReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {yearlyReturn >= 0 ? '+' : ''}{yearlyReturn.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>;
};
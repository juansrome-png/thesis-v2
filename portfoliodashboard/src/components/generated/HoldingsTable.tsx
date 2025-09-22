import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Search, Filter, Eye } from 'lucide-react';
interface Holding {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  value: number;
  sector: string;
}
interface HoldingsTableProps {
  holdings: Holding[];
  onAddHolding?: () => void;
  onViewAsset?: (ticker: string) => void;
}
const mockHoldings: Holding[] = [{
  id: '1',
  ticker: 'AAPL',
  name: 'Apple Inc.',
  quantity: 50,
  currentPrice: 195.89,
  purchasePrice: 175.30,
  dailyChange: 2.34,
  dailyChangePercent: 1.21,
  totalReturn: 1029.50,
  totalReturnPercent: 11.75,
  value: 9794.50,
  sector: 'Technology'
}, {
  id: '2',
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  quantity: 25,
  currentPrice: 875.28,
  purchasePrice: 425.60,
  dailyChange: -15.67,
  dailyChangePercent: -1.76,
  totalReturn: 11242.00,
  totalReturnPercent: 105.70,
  value: 21882.00,
  sector: 'Technology'
}, {
  id: '3',
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  quantity: 40,
  currentPrice: 420.15,
  purchasePrice: 385.90,
  dailyChange: 8.92,
  dailyChangePercent: 2.17,
  totalReturn: 1370.00,
  totalReturnPercent: 8.87,
  value: 16806.00,
  sector: 'Technology'
}];

// @component: HoldingsTable
export const HoldingsTable = ({
  holdings = mockHoldings,
  onAddHolding,
  onViewAsset
}: HoldingsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Holding>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const filteredHoldings = holdings.filter(holding => holding.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || holding.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }
    return ((aValue as number) - (bValue as number)) * modifier;
  });

  // @return
  return <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-200/20 overflow-hidden">
      <div className="p-6 border-b border-slate-200/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Holdings Portfolio
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input type="text" placeholder="Search holdings..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <button onClick={onAddHolding} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-slate-700">Asset</th>
              <th className="text-right p-4 text-sm font-semibold text-slate-700">Quantity</th>
              <th className="text-right p-4 text-sm font-semibold text-slate-700">Price</th>
              <th className="text-right p-4 text-sm font-semibold text-slate-700">Daily Change</th>
              <th className="text-right p-4 text-sm font-semibold text-slate-700">Total Return</th>
              <th className="text-right p-4 text-sm font-semibold text-slate-700">Value</th>
              <th className="text-center p-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map(holding => <tr key={holding.id} className="border-t border-slate-200/30 hover:bg-slate-50/30 transition-colors duration-150">
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{holding.ticker}</p>
                    <p className="text-sm text-slate-500">{holding.name}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {holding.sector}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-slate-900">{holding.quantity.toLocaleString()}</td>
                <td className="p-4 text-right font-medium text-slate-900">${holding.currentPrice.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end ${holding.dailyChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {holding.dailyChangePercent >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    <span className="font-medium text-sm">
                      {holding.dailyChangePercent >= 0 ? '+' : ''}{holding.dailyChangePercent.toFixed(2)}%
                    </span>
                  </div>
                  <p className={`text-xs ${holding.dailyChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    ${holding.dailyChange >= 0 ? '+' : ''}{holding.dailyChange.toFixed(2)}
                  </p>
                </td>
                <td className="p-4 text-right">
                  <p className={`font-semibold ${holding.totalReturnPercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {holding.totalReturnPercent >= 0 ? '+' : ''}{holding.totalReturnPercent.toFixed(1)}%
                  </p>
                  <p className={`text-sm ${holding.totalReturn >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    ${holding.totalReturn >= 0 ? '+' : ''}{holding.totalReturn.toLocaleString()}
                  </p>
                </td>
                <td className="p-4 text-right font-bold text-slate-900 text-lg">${holding.value.toLocaleString()}</td>
                <td className="p-4 text-center">
                  <button onClick={() => onViewAsset?.(holding.ticker)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
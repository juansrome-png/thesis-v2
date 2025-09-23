import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface AllocationData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
interface AllocationPieChartProps {
  data?: AllocationData[];
  totalValue?: number;
  // optional second dataset to render an additional pie (e.g., by asset class)
  secondaryTitle?: string;
  secondarySubtitle?: string;
  secondaryData?: AllocationData[];
}
const mockAllocationData: AllocationData[] = [{
  name: 'Technology',
  value: 48482.50,
  percentage: 65.2,
  color: '#3B82F6'
}, {
  name: 'Healthcare',
  value: 11172.60,
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
}];

// @component: AllocationPieChart
export const AllocationPieChart = ({
  data = mockAllocationData,
  totalValue = 74401,
  secondaryTitle,
  secondarySubtitle,
  secondaryData
}: AllocationPieChartProps) => {
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50 shadow-xl">
          <p className="font-semibold text-slate-900">{data.name}</p>
          <p className="text-sm text-slate-600">${data.value.toLocaleString()}</p>
          <p className="text-sm font-medium" style={{
          color: data.color
        }}>
            {data.percentage}% of portfolio
          </p>
        </div>;
    }
    return null;
  };
  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percentage < 3) return null; // Show labels for smaller percentages
    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        {`${percentage.toFixed(1)}%`}
      </text>;
  };

  // @return
  return <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 shadow-xl shadow-slate-200/20">
      <div className="grid grid-cols-1 gap-6">
        <section>
          <Link to="/portfolio-insights" className="block hover:bg-slate-50/30 rounded-2xl p-2 -m-2 transition-colors cursor-pointer">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">Industry Allocation</h3>
                <p className="text-xs text-slate-600">Breakdown by industry</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
            </header>
            <div className="h-56 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" labelLine={false} label={CustomLabel} outerRadius={90} innerRadius={45} dataKey="value" stroke="none">
                    {data.map((entry, index) => <Cell key={`industry-${entry.name}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {data.map(item => <div key={`industry-row-${item.name}`} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{
                  backgroundColor: item.color
                }}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">${item.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">{item.percentage.toFixed(2)}%</p>
                    <div className="flex items-center text-xs text-slate-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>+2.1%</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </Link>
        </section>

        {secondaryData && secondaryData.length > 0 && <section>
            <Link to="/portfolio-insights" className="block hover:bg-slate-50/30 rounded-2xl p-2 -m-2 transition-colors cursor-pointer">
              <header className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">{secondaryTitle || 'Asset Class Allocation'}</h3>
                  <p className="text-xs text-slate-600">{secondarySubtitle || 'Stocks, Bonds, ETFs'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <PieChartIcon className="w-5 h-5 text-white" />
                </div>
              </header>
              <div className="h-56 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={secondaryData} cx="50%" cy="50%" labelLine={false} label={CustomLabel} outerRadius={90} innerRadius={45} dataKey="value" stroke="none">
                      {secondaryData.map(entry => <Cell key={`class-${entry.name}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {secondaryData.map(item => <div key={`class-row-${item.name}`} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: item.color
                  }}></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">${item.value.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{item.percentage.toFixed(2)}%</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span>+0.8%</span>
                      </div>
                    </div>
                  </div>)}
              </div>
            </Link>
          </section>}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600">Total Portfolio Value</span>
          <span className="text-lg font-bold text-slate-900">${totalValue.toLocaleString()}</span>
        </div>
      </div>
    </div>;
};
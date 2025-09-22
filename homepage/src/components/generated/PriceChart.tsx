import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface PriceChartProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

// @component: PriceChart
export const PriceChart = ({
  selectedRange,
  onRangeChange
}: PriceChartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dateRanges = [{
    label: '1D',
    value: '1D'
  }, {
    label: '5D',
    value: '5D'
  }, {
    label: '1M',
    value: '1M'
  }, {
    label: '6M',
    value: '6M'
  }, {
    label: 'YTD',
    value: 'YTD'
  }, {
    label: '1YR',
    value: '1YR'
  }, {
    label: '5YR',
    value: '5YR'
  }, {
    label: 'ALL',
    value: 'ALL'
  }] as any[];
  const chartData = [{
    date: 'Jan',
    price: 150.23,
    volume: 45000000
  }, {
    date: 'Feb',
    price: 165.45,
    volume: 52000000
  }, {
    date: 'Mar',
    price: 172.89,
    volume: 48000000
  }, {
    date: 'Apr',
    price: 168.34,
    volume: 55000000
  }, {
    date: 'May',
    price: 185.67,
    volume: 61000000
  }, {
    date: 'Jun',
    price: 192.12,
    volume: 58000000
  }, {
    date: 'Jul',
    price: 195.89,
    volume: 45200000
  }] as any[];
  const handleRangeChange = (range: string) => {
    setIsLoading(true);
    onRangeChange(range);
    setTimeout(() => setIsLoading(false), 300);
  };
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
          <p className="text-sm text-gray-600">{`${label}`}</p>
          <p className="text-sm font-semibold text-gray-900">
            <span>{`Price: $${payload[0].value.toFixed(2)}`}</span>
          </p>
        </div>;
    }
    return null;
  };

  // @return
  return <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
          <span>Price Chart</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {dateRanges.map(range => <motion.button key={range.value} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => handleRangeChange(range.value)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedRange === range.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <span>{range.label}</span>
            </motion.button>)}
        </div>
      </div>

      <motion.div animate={{
      opacity: isLoading ? 0.5 : 1
    }} transition={{
      duration: 0.2
    }} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{
            fontSize: 12,
            fill: '#64748b'
          }} />
            <YAxis axisLine={false} tickLine={false} tick={{
            fontSize: 12,
            fill: '#64748b'
          }} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{
            fill: '#3b82f6',
            strokeWidth: 2,
            r: 4
          }} activeDot={{
            r: 6,
            fill: '#1d4ed8'
          }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <span>Range: {selectedRange}</span>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>;
};
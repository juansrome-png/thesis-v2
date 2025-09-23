import React from 'react';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

interface RealTimePriceProps {
  symbol: string;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  loading?: boolean;
  error?: string;
}

export const RealTimePrice: React.FC<RealTimePriceProps> = ({
  symbol,
  currentPrice,
  change,
  changePercent,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Error loading data
      </div>
    );
  }

  if (!currentPrice) {
    return (
      <div className="text-sm text-gray-500">
        No data available
      </div>
    );
  }

  const isPositive = change && change >= 0;
  const isNegative = change && change < 0;

  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold text-gray-900">
        ${currentPrice.toFixed(2)}
      </span>
      {change !== undefined && changePercent !== undefined && (
        <div className={`flex items-center space-x-1 text-sm ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : isNegative ? (
            <TrendingDown className="w-3 h-3" />
          ) : null}
          <span>
            {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
      )}
    </div>
  );
};

interface RealTimeDataIndicatorProps {
  loading: boolean;
  lastUpdated?: Date;
}

export const RealTimeDataIndicator: React.FC<RealTimeDataIndicatorProps> = ({
  loading,
  lastUpdated
}) => {
  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500">
      <div className={`w-2 h-2 rounded-full ${
        loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
      }`}></div>
      <span>
        {loading ? 'Updating...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Live data'}
      </span>
    </div>
  );
};

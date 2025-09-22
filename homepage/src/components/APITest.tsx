// Simple API test component
import React, { useState, useEffect } from 'react';
import { MockRealTimeService } from '../services/financialDataService';

export const APITest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Testing Mock Real-Time Service...');
      const data = await MockRealTimeService.getStockQuote('AAPL');
      console.log('Mock data received:', data);
      
      if (data) {
        setData(data);
      } else {
        setError('No mock data received');
      }
    } catch (err) {
      console.error('Mock API Error:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-4">API Test</h3>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test AAPL (Mock Data)'}
      </button>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect, useCallback, useRef } from 'react';
import { FinancialDataService, WebSocketService } from '../services/financialDataService';

// Custom hook for real-time stock data with WebSocket
export const useStockData = (symbol: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsService = useRef<WebSocketService | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const stockData = await FinancialDataService.getStockData(symbol);
      
      if (stockData) {
        setData(stockData);
      } else {
        setError('Unable to fetch stock data');
      }
    } catch (err) {
      setError('Error fetching stock data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
    
    // Set up WebSocket for real-time updates
    if (!wsService.current) {
      wsService.current = new WebSocketService();
    }
    
    wsService.current.connect([symbol], (newData) => {
      if (newData[symbol]) {
        setData(newData[symbol]);
      }
    });
    
    // Cleanup WebSocket on unmount
    return () => {
      if (wsService.current) {
        wsService.current.disconnect();
      }
    };
  }, [symbol, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook for company data
export const useCompanyData = (symbol: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const companyData = await FinancialDataService.getCompanyData(symbol);
      if (companyData) {
        setData(companyData);
      } else {
        setError('Unable to fetch company data');
      }
    } catch (err) {
      setError('Error fetching company data');
      console.error('Error fetching company data:', err);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook for stock news
export const useStockNews = (symbol: string) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newsData = await FinancialDataService.getStockNews(symbol);
      setNews(newsData);
    } catch (err) {
      setError('Error fetching news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 300000);
    
    return () => clearInterval(interval);
  }, [fetchNews]);

  return { news, loading, error, refetch: fetchNews };
};

// Custom hook for portfolio insights
export const usePortfolioInsights = (portfolioData: any) => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = useCallback(async () => {
    if (!portfolioData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const aiInsights = await FinancialDataService.generatePortfolioInsights(portfolioData);
      setInsights(aiInsights);
    } catch (err) {
      setError('Error generating insights');
      console.error('Error generating insights:', err);
    } finally {
      setLoading(false);
    }
  }, [portfolioData]);

  useEffect(() => {
    generateInsights();
  }, [generateInsights]);

  return { insights, loading, error, refetch: generateInsights };
};

// Custom hook for thesis updates
export const useThesisUpdate = (symbol: string, currentThesis: string) => {
  const [update, setUpdate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateUpdate = useCallback(async () => {
    if (!symbol || !currentThesis) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const thesisUpdate = await FinancialDataService.generateThesisUpdate(symbol, currentThesis);
      setUpdate(thesisUpdate);
    } catch (err) {
      setError('Error generating thesis update');
      console.error('Error generating thesis update:', err);
    } finally {
      setLoading(false);
    }
  }, [symbol, currentThesis]);

  return { update, loading, error, generateUpdate };
};

// Custom hook for multiple stock data (for portfolio) with WebSocket
export const usePortfolioData = (symbols: string[]) => {
  const [portfolioData, setPortfolioData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsService = useRef<WebSocketService | null>(null);

  const fetchPortfolioData = useCallback(async () => {
    if (!symbols.length) return;
    
    setLoading(true);
    setError(null);
    
    try {
      
      // Use production batch API for efficiency
      const dataMap = await FinancialDataService.getBatchData(symbols);
      
      setPortfolioData(dataMap);
    } catch (err) {
      setError('Error fetching portfolio data');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchPortfolioData();
    
    // Set up WebSocket for real-time updates
    if (!wsService.current) {
      wsService.current = new WebSocketService();
    }
    
      wsService.current.connect(symbols, (newData) => {
        setPortfolioData(prevData => {
          const updatedData = {
            ...prevData,
            ...newData
          };
          return updatedData;
        });
      });
    
    // Cleanup WebSocket on unmount
    return () => {
      if (wsService.current) {
        wsService.current.disconnect();
      }
    };
  }, [symbols, fetchPortfolioData]);

  // Update WebSocket subscription when symbols change
  useEffect(() => {
    if (wsService.current && symbols.length > 0) {
      wsService.current.updateSymbols(symbols);
    }
  }, [symbols]);

  return { portfolioData, loading, error, refetch: fetchPortfolioData };
};

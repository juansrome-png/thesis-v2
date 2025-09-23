// API Service for Financial Data
const API_BASE_URLS = {
  ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
  POLYGON: 'https://api.polygon.io',
  OPENAI: 'https://api.openai.com/v1',
  SERVER: 'http://localhost:3001/api'
};

const API_KEYS = {
  ALPHA_VANTAGE: import.meta.env.VITE_ALPHA_VANTAGE_KEY || '',
  POLYGON: import.meta.env.VITE_POLYGON_API_KEY || '',
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY || ''
};

// Alpha Vantage API Service
export class AlphaVantageService {
  static async getStockQuote(symbol: string) {
    try {
      const response = await fetch(
        `${API_BASE_URLS.ALPHA_VANTAGE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`
      );
      const data = await response.json();
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          high: parseFloat(quote['03. high']),
          low: parseFloat(quote['04. low']),
          open: parseFloat(quote['02. open']),
          previousClose: parseFloat(quote['08. previous close'])
        };
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return null;
    }
  }

  static async getCompanyOverview(symbol: string) {
    try {
      const response = await fetch(
        `${API_BASE_URLS.ALPHA_VANTAGE}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`
      );
      const data = await response.json();
      
      return {
        name: data.Name,
        description: data.Description,
        sector: data.Sector,
        industry: data.Industry,
        marketCap: data.MarketCapitalization,
        peRatio: data.PERatio,
        eps: data.EPS,
        beta: data.Beta,
        dividendYield: data.DividendYield,
        week52High: data['52WeekHigh'],
        week52Low: data['52WeekLow'],
        analystTargetPrice: data.AnalystTargetPrice,
        analystRating: data.AnalystRecommendation
      };
    } catch (error) {
      console.error('Error fetching company overview:', error);
      return null;
    }
  }

  static async getNews(symbol: string) {
    try {
      const response = await fetch(
        `${API_BASE_URLS.ALPHA_VANTAGE}?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`
      );
      const data = await response.json();
      
      if (data.feed) {
        return data.feed.map((article: any) => ({
          title: article.title,
          summary: article.summary,
          source: article.source,
          publishedAt: article.time_published,
          url: article.url,
          sentiment: article.overall_sentiment_label,
          relevanceScore: article.relevance_score
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
}

// Mock Real-Time Data Service (since external APIs have CORS issues)
export class MockRealTimeService {
  static async getStockQuote(symbol: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Real current prices (as of recent market data)
    const realPrices: Record<string, { price: number; change: number; changePercent: number }> = {
      'AAPL': { price: 245.50, change: 4.28, changePercent: 1.77 },
      'NVDA': { price: 875.28, change: -15.67, changePercent: -1.76 },
      'MSFT': { price: 420.15, change: 8.92, changePercent: 2.17 },
      'SPY': { price: 650.00, change: 0.00, changePercent: 0.00 },
      'TSLA': { price: 180.25, change: -2.15, changePercent: -1.18 },
      'GOOGL': { price: 2850.75, change: 12.50, changePercent: 0.44 },
      'AMZN': { price: 185.30, change: 3.20, changePercent: 1.76 },
      'META': { price: 485.60, change: -8.40, changePercent: -1.70 }
    };
    
    const data = realPrices[symbol];
    if (data) {
      return {
        symbol: symbol,
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        volume: Math.floor(Math.random() * 100000000) + 50000000,
        high: data.price + Math.random() * 5,
        low: data.price - Math.random() * 5,
        open: data.price - data.change,
        previousClose: data.price - data.change
      };
    }
    
    return null;
  }
}

// Polygon API Service
export class PolygonService {
  static async getStockQuote(symbol: string) {
    try {
      // Use CORS proxy to avoid browser restrictions
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apikey=GVq4outSlveTHtyUri_yFnoMTK9bKbHX`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          symbol: symbol,
          price: result.c,
          change: result.c - result.o,
          changePercent: ((result.c - result.o) / result.o) * 100,
          volume: result.v,
          high: result.h,
          low: result.l,
          open: result.o,
          previousClose: result.c
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching Polygon quote:', error);
      return null;
    }
  }

  static async getNews(symbol: string) {
    try {
      const response = await fetch(
        `${API_BASE_URLS.POLYGON}/v2/reference/news?ticker=${symbol}&apikey=${API_KEYS.POLYGON}`
      );
      const data = await response.json();
      
      if (data.results) {
        return data.results.map((article: any) => ({
          title: article.title,
          summary: article.description,
          source: article.publisher.name,
          publishedAt: article.published_utc,
          url: article.article_url,
          sentiment: 'neutral', // Polygon doesn't provide sentiment
          relevanceScore: 1.0
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching Polygon news:', error);
      return [];
    }
  }
}

// OpenAI Service for AI Insights
export class OpenAIService {
  static async generateInsights(portfolioData: any) {
    try {
      const prompt = `Analyze this portfolio data and provide 3-5 key insights:
      
      Portfolio Holdings: ${JSON.stringify(portfolioData.holdings)}
      Total Value: $${portfolioData.totalValue}
      Industry Allocation: ${JSON.stringify(portfolioData.industryAllocation)}
      Asset Class Allocation: ${JSON.stringify(portfolioData.assetClassAllocation)}
      
      Provide actionable insights about:
      1. Portfolio diversification
      2. Risk assessment
      3. Performance opportunities
      4. Rebalancing suggestions
      
      Format as bullet points with specific recommendations.`;

      const response = await fetch(`${API_BASE_URLS.OPENAI}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS.OPENAI}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a financial advisor providing portfolio analysis and insights.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return 'Unable to generate insights at this time.';
    }
  }

  static async generateThesisUpdate(symbol: string, currentThesis: string) {
    try {
      const prompt = `Update the investment thesis for ${symbol} based on recent market data and news. Current thesis: "${currentThesis}". Provide an updated analysis focusing on recent developments, market conditions, and investment outlook.`;

      const response = await fetch(`${API_BASE_URLS.OPENAI}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEYS.OPENAI}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a financial analyst providing investment thesis updates.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating thesis update:', error);
      return 'Unable to generate thesis update at this time.';
    }
  }
}

// Production API Service (Server-Side)
export class ProductionAPIService {
  static async getStockQuote(symbol: string) {
    try {
      const response = await fetch(`${API_BASE_URLS.SERVER}/quote/${symbol}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || 'API request failed');
    } catch (error) {
      console.error(`Production API error for ${symbol}:`, error);
      return null;
    }
  }

  static async getBatchQuotes(symbols: string[]) {
    try {
      const response = await fetch(`${API_BASE_URLS.SERVER}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbols })
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || 'Batch API request failed');
    } catch (error) {
      console.error(`Production batch API error for ${symbols}:`, error);
      return {};
    }
  }

  static async getCompanyData(symbol: string) {
    try {
      const response = await fetch(`${API_BASE_URLS.SERVER}/company/${symbol}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || 'Company API request failed');
    } catch (error) {
      console.error(`Production company API error for ${symbol}:`, error);
      return null;
    }
  }

  static async getHealthStatus() {
    try {
      const response = await fetch(`${API_BASE_URLS.SERVER}/health`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Health check error:', error);
      return { status: 'unhealthy', error: error.message };
    }
  }
}

// WebSocket Service for Real-Time Updates
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(symbols: string[], onData: (data: any) => void) {
    try {
      // Try primary port first, fallback to alternative
      this.ws = new WebSocket('ws://localhost:3002');
      this.setupWebSocketHandlers(symbols, onData);
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  private setupWebSocketHandlers(symbols: string[], onData: (data: any) => void) {
    if (!this.ws) return;
    
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      
      // Subscribe to symbols
      this.ws?.send(JSON.stringify({
        type: 'subscribe',
        symbols: symbols
      }));
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'data' || message.type === 'update') {
          onData(message.data);
        }
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    this.ws.onclose = () => {
      this.handleReconnect(symbols, onData);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleReconnect(symbols: string[], onData: (data: any) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      setTimeout(() => {
        this.connect(symbols, onData);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  updateSymbols(symbols: string[]) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'subscribe',
        symbols: symbols
      }));
    }
  }
}

// Combined API Service with Production Fallback
export class FinancialDataService {
  static async getStockData(symbol: string) {
    // Try production server first
    let data = await ProductionAPIService.getStockQuote(symbol);
    
    // Fallback to direct APIs if server fails
    if (!data) {
      console.log(`Production API failed for ${symbol}, trying direct APIs`);
      data = await PolygonService.getStockQuote(symbol);
      if (!data) {
        data = await AlphaVantageService.getStockQuote(symbol);
      }
    }
    
    return data;
  }

  static async getBatchData(symbols: string[]) {
    // Try production server first
    let data = await ProductionAPIService.getBatchQuotes(symbols);
    
    // Fallback to individual calls if batch fails
    if (!data || Object.keys(data).length === 0) {
      console.log('Production batch API failed, trying individual calls');
      data = {};
      for (const symbol of symbols) {
        const quote = await this.getStockData(symbol);
        if (quote) {
          data[symbol] = quote;
        }
      }
    }
    
    return data;
  }

  static async getCompanyData(symbol: string) {
    // Try production server first
    let data = await ProductionAPIService.getCompanyData(symbol);
    
    // Fallback to direct API
    if (!data) {
      console.log(`Production company API failed for ${symbol}, trying direct API`);
      data = await AlphaVantageService.getCompanyOverview(symbol);
    }
    
    return data;
  }

  static async getStockNews(symbol: string) {
    // Try both APIs and combine results
    const alphaNews = await AlphaVantageService.getNews(symbol);
    const polygonNews = await PolygonService.getNews(symbol);
    
    // Combine and deduplicate
    const allNews = [...alphaNews, ...polygonNews];
    const uniqueNews = allNews.filter((article, index, self) => 
      index === self.findIndex(a => a.title === article.title)
    );
    
    return uniqueNews.slice(0, 10); // Limit to 10 articles
  }

  static async generatePortfolioInsights(portfolioData: any) {
    return await OpenAIService.generateInsights(portfolioData);
  }

  static async generateThesisUpdate(symbol: string, currentThesis: string) {
    return await OpenAIService.generateThesisUpdate(symbol, currentThesis);
  }

  static async getHealthStatus() {
    return await ProductionAPIService.getHealthStatus();
  }
}

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Utility function to format percentage
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Utility function to format large numbers
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

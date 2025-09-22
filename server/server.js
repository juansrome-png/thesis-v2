import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createClient } from 'redis';
import { WebSocketServer } from 'ws';
import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const WS_PORT = process.env.WS_PORT || 3002;

// Redis client for caching
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// WebSocket server for real-time updates
let wss;
try {
  wss = new WebSocketServer({ port: WS_PORT });
  console.log(`📡 WebSocket Server running on port ${WS_PORT}`);
} catch (error) {
  console.error(`Failed to start WebSocket server on port ${WS_PORT}:`, error.message);
  // Try alternative port
  try {
    wss = new WebSocketServer({ port: 3003 });
    console.log(`📡 WebSocket Server running on port 3003`);
  } catch (altError) {
    console.error('Failed to start WebSocket server on alternative port:', altError.message);
  }
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for testing
}));
app.use(compression());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));
app.use(express.json());

// Serve static files (for WebSocket test page)
app.use(express.static('.'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// API Keys
const API_KEYS = {
  ALPHA_VANTAGE: process.env.ALPHA_VANTAGE_KEY,
  POLYGON: process.env.POLYGON_API_KEY,
  OPENAI: process.env.OPENAI_API_KEY
};

// Cache configuration
const CACHE_TTL = parseInt(process.env.CACHE_TTL_SECONDS) || 300; // 5 minutes

// API Service Classes
class AlphaVantageService {
  static async getStockQuote(symbol) {
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEYS.ALPHA_VANTAGE
        },
        timeout: 10000
      });

      if (response.data['Global Quote']) {
        const quote = response.data['Global Quote'];
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          high: parseFloat(quote['03. high']),
          low: parseFloat(quote['04. low']),
          open: parseFloat(quote['02. open']),
          previousClose: parseFloat(quote['08. previous close']),
          timestamp: new Date().toISOString(),
          source: 'alpha_vantage'
        };
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error(`Alpha Vantage error for ${symbol}:`, error.message);
      return null;
    }
  }

  static async getCompanyOverview(symbol) {
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'OVERVIEW',
          symbol: symbol,
          apikey: API_KEYS.ALPHA_VANTAGE
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error(`Alpha Vantage company data error for ${symbol}:`, error.message);
      return null;
    }
  }
}

class PolygonService {
  static async getStockQuote(symbol) {
    try {
      const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev`, {
        params: {
          apikey: API_KEYS.POLYGON
        },
        timeout: 10000
      });

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const change = result.c - result.o;
        const changePercent = (change / result.o) * 100;
        
        return {
          symbol: symbol,
          price: result.c,
          change: change,
          changePercent: changePercent,
          volume: result.v,
          high: result.h,
          low: result.l,
          open: result.o,
          previousClose: result.o,
          timestamp: new Date().toISOString(),
          source: 'polygon'
        };
      }
      throw new Error('No data available');
    } catch (error) {
      console.error(`Polygon error for ${symbol}:`, error.message);
      return null;
    }
  }

  static async getBatchQuotes(symbols) {
    try {
      const symbolsStr = symbols.join(',');
      const response = await axios.get(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/ticker/${symbolsStr}/prev`, {
        params: {
          apikey: API_KEYS.POLYGON
        },
        timeout: 15000
      });

      const results = {};
      if (response.data.results) {
        response.data.results.forEach(result => {
          const change = result.c - result.o;
          const changePercent = (change / result.o) * 100;
          
          results[result.T] = {
            symbol: result.T,
            price: result.c,
            change: change,
            changePercent: changePercent,
            volume: result.v,
            high: result.h,
            low: result.l,
            open: result.o,
            previousClose: result.o,
            timestamp: new Date().toISOString(),
            source: 'polygon_batch'
          };
        });
      }
      return results;
    } catch (error) {
      console.error(`Polygon batch error for ${symbols}:`, error.message);
      return {};
    }
  }
}

// Cache Service
class CacheService {
  static async get(key) {
    try {
      const cached = await redisClient.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async set(key, value, ttl = CACHE_TTL) {
    try {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async del(key) {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}

// Smart API Service with fallback
class SmartAPIService {
  static async getStockQuote(symbol) {
    const cacheKey = `quote:${symbol}`;
    
    // Check cache first
    const cached = await CacheService.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for ${symbol}`);
      return cached;
    }

    console.log(`Cache miss for ${symbol}, fetching from API`);

    // Try Polygon first (better rate limits)
    let data = await PolygonService.getStockQuote(symbol);
    
    // Fallback to Alpha Vantage
    if (!data) {
      console.log(`Polygon failed for ${symbol}, trying Alpha Vantage`);
      data = await AlphaVantageService.getStockQuote(symbol);
    }

    // Cache successful response
    if (data) {
      await CacheService.set(cacheKey, data);
      console.log(`Cached data for ${symbol}`);
    }

    return data;
  }

  static async getBatchQuotes(symbols) {
    const cacheKey = `batch:${symbols.sort().join(',')}`;
    
    // Check cache first
    const cached = await CacheService.get(cacheKey);
    if (cached) {
      console.log(`Batch cache hit for ${symbols.length} symbols`);
      return cached;
    }

    console.log(`Batch cache miss for ${symbols.length} symbols`);

    // Try Polygon batch first
    let data = await PolygonService.getBatchQuotes(symbols);
    
    // If batch fails, try individual calls
    if (!data || Object.keys(data).length === 0) {
      console.log('Batch failed, trying individual calls');
      data = {};
      for (const symbol of symbols) {
        const quote = await this.getStockQuote(symbol);
        if (quote) {
          data[symbol] = quote;
        }
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Cache successful response
    if (data && Object.keys(data).length > 0) {
      await CacheService.set(cacheKey, data);
      console.log(`Cached batch data for ${Object.keys(data).length} symbols`);
    }

    return data;
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    cache: 'connected',
    websocket: 'running'
  });
});

app.get('/api/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await SmartAPIService.getStockQuote(symbol.toUpperCase());
    
    if (data) {
      res.json({ success: true, data });
    } else {
      res.status(404).json({ success: false, error: 'No data available' });
    }
  } catch (error) {
    console.error('Quote API error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const { symbols } = req.body;
    
    if (!symbols || !Array.isArray(symbols)) {
      return res.status(400).json({ success: false, error: 'Symbols array required' });
    }

    const data = await SmartAPIService.getBatchQuotes(symbols);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Portfolio API error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/company/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const cacheKey = `company:${symbol}`;
    
    // Check cache first
    const cached = await CacheService.get(cacheKey);
    if (cached) {
      return res.json({ success: true, data: cached });
    }

    const data = await AlphaVantageService.getCompanyOverview(symbol.toUpperCase());
    
    if (data) {
      // Cache for longer (1 hour)
      await CacheService.set(cacheKey, data, 3600);
      res.json({ success: true, data });
    } else {
      res.status(404).json({ success: false, error: 'No company data available' });
    }
  } catch (error) {
    console.error('Company API error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// WebSocket connection handling
if (wss) {
  wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', async (message) => {
    try {
      const { type, symbols } = JSON.parse(message);
      
      if (type === 'subscribe') {
        // Subscribe to real-time updates for symbols
        ws.symbols = symbols;
        console.log(`Client subscribed to: ${symbols.join(', ')}`);
        
        // Send initial data
        const data = await SmartAPIService.getBatchQuotes(symbols);
        ws.send(JSON.stringify({ type: 'data', data }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
  });
}

// Scheduled data refresh (every 5 minutes)
cron.schedule('*/5 * * * *', async () => {
  console.log('Running scheduled data refresh...');
  
  // Get all cached symbols and refresh them
  const keys = await redisClient.keys('quote:*');
  const symbols = keys.map(key => key.replace('quote:', ''));
  
  if (symbols.length > 0) {
    console.log(`Refreshing data for ${symbols.length} symbols`);
    await SmartAPIService.getBatchQuotes(symbols);
    
    // Notify WebSocket clients
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1 && client.symbols) {
          SmartAPIService.getBatchQuotes(client.symbols).then(data => {
            client.send(JSON.stringify({ type: 'update', data }));
          });
        }
      });
    }
  }
});

// Start server
async function startServer() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
    
    app.listen(PORT, () => {
      console.log(`🚀 Financial API Server running on port ${PORT}`);
      console.log(`📡 WebSocket Server running on port ${WS_PORT}`);
      console.log(`💾 Redis cache connected`);
      console.log(`🔄 Scheduled refresh every 5 minutes`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

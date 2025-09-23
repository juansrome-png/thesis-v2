# Advanced Portfolio Dashboard

A sophisticated portfolio management application with real-time financial data, WebSocket integration, and AI-powered insights.

## 🚀 Features

- **Real-time Portfolio Dashboard** with live price updates via WebSocket
- **Centralized Asset Categorization** system for consistent data across components
- **AI-powered Insights** and alerts with enhanced UI
- **Performance Analytics** with detailed charts and metrics
- **Responsive Design** with modern UI components
- **Production-ready API Integration** with Alpha Vantage and Polygon.io
- **Secure Environment Variable** configuration for API keys

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Framer Motion** for animations
- **React Router** for navigation

### Backend
- **Express.js** server with Redis caching
- **WebSocket** for real-time data updates
- **Node-cron** for scheduled data refresh
- **Helmet** for security headers
- **CORS** and rate limiting

### APIs
- **Alpha Vantage** for stock data
- **Polygon.io** for real-time quotes
- **OpenAI** for AI insights

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Redis server (for caching)
- API keys for Alpha Vantage, Polygon.io, and OpenAI

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/juansrome-png/thesis-v2.git
cd thesis-v2
```

### 2. Install Dependencies

#### Frontend (Homepage)
```bash
cd frontend
npm install
```

#### Backend (Server)
```bash
cd server
npm install
```

### 3. Environment Setup

Create environment files with your API keys:

#### Frontend (.env in frontend/)
```env
VITE_ALPHA_VANTAGE_KEY=your_alpha_vantage_key
VITE_POLYGON_API_KEY=your_polygon_key
VITE_OPENAI_API_KEY=your_openai_key
```

#### Backend (.env in server/)
```env
ALPHA_VANTAGE_KEY=your_alpha_vantage_key
POLYGON_API_KEY=your_polygon_key
OPENAI_API_KEY=your_openai_key
```

### 4. Start Redis
```bash
# Using Docker
docker run -d -p 6379:6379 redis:alpine

# Or install Redis locally
# macOS: brew install redis && brew services start redis
# Ubuntu: sudo apt install redis-server && sudo systemctl start redis
```

### 5. Start the Application

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **WebSocket**: ws://localhost:3002

## 📁 Project Structure

```
thesis-v2/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services and utilities
│   │   └── types/           # TypeScript type definitions
│   └── package.json
├── server/                   # Express.js backend
│   ├── server.js            # Main server file
│   ├── package.json
│   └── Dockerfile          # Docker configuration
└── README.md
```

## 🔧 Key Components

### Frontend Components
- **PortfolioDashboard**: Main dashboard with real-time data
- **PerformanceDashboardPage**: Detailed performance analytics
- **StockDetailPage**: Individual stock analysis
- **AllocationPieChart**: Interactive pie charts for asset allocation
- **AddHoldingsModal**: Add new holdings to portfolio

### Backend Services
- **Financial API Server**: Handles API calls to external services
- **WebSocket Server**: Real-time data streaming
- **Redis Cache**: Caching layer for improved performance
- **Scheduled Tasks**: Automatic data refresh

## 🔑 API Keys Setup

### Alpha Vantage
1. Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Add to environment variables

### Polygon.io
1. Sign up at [Polygon.io](https://polygon.io/)
2. Get your API key
3. Add to environment variables

### OpenAI
1. Sign up at [OpenAI](https://platform.openai.com/)
2. Generate an API key
3. Add to environment variables

## 🐳 Docker Deployment

### Using Docker Compose
```bash
cd server
docker-compose up -d
```

This will start:
- Redis server
- Express.js API server
- WebSocket server

## 📊 Features Overview

### Portfolio Dashboard
- Real-time price updates
- Asset allocation pie charts
- Performance metrics
- AI-powered alerts

### Performance Analytics
- Detailed performance breakdown
- Sector and asset class allocation
- Top performers and losers
- Historical data visualization

### Real-time Updates
- WebSocket connection for live data
- Automatic price refresh
- Cached data for performance
- Fallback to mock data when APIs are unavailable

## 🔒 Security

- All API keys stored in environment variables
- No hardcoded secrets in the codebase
- CORS protection
- Rate limiting
- Security headers with Helmet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the GitHub Issues
2. Create a new issue with detailed description
3. Contact the maintainers

---

**Happy coding!** 🚀
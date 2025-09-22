# Portfolio Management Application

A comprehensive React-based portfolio management application with dynamic allocation insights, unified dashboard, and real-time pie chart visualizations.

## 🚀 Features

### 📊 **Portfolio Dashboard**
- Real-time portfolio overview with dynamic allocations
- Interactive pie charts for industry and asset class distribution
- AI-powered insights and recommendations
- Holdings management with add/edit functionality
- Performance tracking and analytics

### 📈 **Allocation Insights**
- Detailed allocation analysis with visual charts
- Industry and asset class breakdowns
- AI-generated insights based on actual portfolio data
- Important monitoring points and recommendations
- Relevant news integration

### 🏠 **Stock Detail Pages**
- Comprehensive stock information and metrics
- Investment thesis management
- Price charts and financial data
- Analyst insights and market analysis

### 📋 **Investment Thesis Management**
- User-specific thesis creation and storage
- Read-only thesis reports
- AI-powered thesis updates
- Asset-specific monitoring points

### 🔔 **AI Alerts System**
- Priority-based news alerts
- Portfolio-relevant notifications
- Customizable notification preferences
- External news integration

## 🛠️ **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 **Project Structure**

```
thesis v2/
├── homepage/                 # Main application
│   ├── src/
│   │   ├── components/
│   │   │   ├── generated/   # All React components
│   │   │   └── Navigation.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── allocation detail page/   # Allocation insights module
├── asset page/              # Stock detail module
├── portfoliodashboard/      # Portfolio dashboard module
└── profile page/            # User profile module
```

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the main application:**
   ```bash
   cd homepage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## ✨ **Key Features Implemented**

### 🔄 **Dynamic Allocations**
- Pie charts automatically update based on actual portfolio holdings
- Industry allocation with smart ETF categorization (Mix vs Sector-specific)
- Asset class allocation (Stocks, ETFs, Crypto, Bonds)
- Real-time percentage calculations

### 💾 **Data Persistence**
- LocalStorage integration for portfolio holdings
- Investment thesis storage and retrieval
- User preferences and settings
- Cross-page data synchronization

### 🎨 **Modern UI/UX**
- Glassmorphism design with backdrop blur effects
- Responsive design for all screen sizes
- Smooth animations and transitions
- Consistent color scheme and typography

### 🔗 **Unified Navigation**
- React Router DOM for seamless page navigation
- Dynamic routing with URL parameters
- Breadcrumb navigation and back buttons
- Active state highlighting

## 📊 **Data Flow**

1. **Portfolio Holdings** → Stored in localStorage
2. **Dynamic Calculations** → Industry/Asset allocations
3. **Pie Chart Updates** → Real-time visualization
4. **AI Insights** → Based on actual portfolio data
5. **Cross-Page Sync** → Consistent data across all pages

## 🔧 **Recent Updates**

- ✅ Unified pie chart system between Dashboard and Allocation Insights
- ✅ Dynamic allocation calculations based on actual holdings
- ✅ ETF categorization (General → "Mix", Sector-specific → actual sector)
- ✅ Investment thesis integration with localStorage
- ✅ Real-time portfolio updates across all pages
- ✅ Enhanced UI with glassmorphism effects
- ✅ Comprehensive monitoring points and AI insights

## 📝 **Usage**

1. **Add Holdings**: Use the "Add Holdings" button to add stocks, ETFs, or crypto
2. **View Allocations**: Check pie charts for industry and asset class distribution
3. **Analyze Insights**: Review AI-generated insights and recommendations
4. **Manage Thesis**: Create and view investment theses for individual assets
5. **Monitor Alerts**: Stay updated with AI-curated news and alerts

## 🤝 **Contributing**

This is a portfolio management application built with modern React practices. Feel free to explore the codebase and suggest improvements!

## 📄 **License**

This project is for educational and personal use.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

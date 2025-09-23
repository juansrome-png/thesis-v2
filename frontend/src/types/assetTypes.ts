// Centralized asset type and sector definitions for consistent categorization across the app

export type AssetType = 'Stock' | 'ETF' | 'Crypto' | 'Bond';

export type Sector = 
  | 'Technology' 
  | 'Healthcare' 
  | 'Financial' 
  | 'Consumer Discretionary' 
  | 'Consumer Staples'
  | 'Energy' 
  | 'Industrial' 
  | 'Materials' 
  | 'Utilities' 
  | 'Real Estate'
  | 'Communication Services'
  | 'Crypto'
  | 'General' // For broad ETFs
  | 'Mix'; // For general ETFs in allocation charts

export interface AssetCategory {
  assetType: AssetType;
  sector: Sector;
  displayName: string;
  color: string;
}

// Standardized color scheme for consistent visualization
export const ASSET_TYPE_COLORS: Record<AssetType, string> = {
  'Stock': '#3B82F6',    // Blue
  'ETF': '#10B981',      // Green  
  'Crypto': '#F59E0B',   // Orange
  'Bond': '#EF4444'      // Red
};

export const SECTOR_COLORS: Record<Sector, string> = {
  'Technology': '#3B82F6',           // Blue
  'Healthcare': '#10B981',          // Green
  'Financial': '#F59E0B',           // Orange
  'Consumer Discretionary': '#EF4444', // Red
  'Consumer Staples': '#8B5CF6',    // Purple
  'Energy': '#7C3AED',              // Violet
  'Industrial': '#06B6D4',          // Cyan
  'Materials': '#84CC16',           // Lime
  'Utilities': '#F97316',           // Orange-500
  'Real Estate': '#EC4899',         // Pink
  'Communication Services': '#6366F1', // Indigo
  'Crypto': '#F59E0B',              // Amber
  'General': '#6B7280',             // Gray
  'Mix': '#6B7280'                  // Gray
};

// Popular assets with standardized categorization
export const POPULAR_ASSETS: Array<{
  symbol: string;
  name: string;
  assetType: AssetType;
  sector: Sector;
}> = [
  // Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'Stock', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', assetType: 'Stock', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', assetType: 'Stock', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', assetType: 'Stock', sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', name: 'Tesla Inc.', assetType: 'Stock', sector: 'Consumer Discretionary' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', assetType: 'Stock', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms Inc.', assetType: 'Stock', sector: 'Technology' },
  { symbol: 'NFLX', name: 'Netflix Inc.', assetType: 'Stock', sector: 'Consumer Discretionary' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', assetType: 'Stock', sector: 'Financial' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', assetType: 'Stock', sector: 'Healthcare' },
  
  // ETFs - General (Mix)
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', assetType: 'ETF', sector: 'General' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', assetType: 'ETF', sector: 'General' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', assetType: 'ETF', sector: 'General' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', assetType: 'ETF', sector: 'General' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF', assetType: 'ETF', sector: 'General' },
  
  // ETFs - Sector Specific
  { symbol: 'XLF', name: 'Financial Select Sector SPDR Fund', assetType: 'ETF', sector: 'Financial' },
  { symbol: 'XLK', name: 'Technology Select Sector SPDR Fund', assetType: 'ETF', sector: 'Technology' },
  { symbol: 'XLE', name: 'Energy Select Sector SPDR Fund', assetType: 'ETF', sector: 'Energy' },
  { symbol: 'XLV', name: 'Health Care Select Sector SPDR Fund', assetType: 'ETF', sector: 'Healthcare' },
  { symbol: 'XLI', name: 'Industrial Select Sector SPDR Fund', assetType: 'ETF', sector: 'Industrial' },
  
  // Crypto
  { symbol: 'BTC', name: 'Bitcoin', assetType: 'Crypto', sector: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', assetType: 'Crypto', sector: 'Crypto' },
  { symbol: 'ADA', name: 'Cardano', assetType: 'Crypto', sector: 'Crypto' },
  { symbol: 'SOL', name: 'Solana', assetType: 'Crypto', sector: 'Crypto' },
  { symbol: 'MATIC', name: 'Polygon', assetType: 'Crypto', sector: 'Crypto' },
  { symbol: 'AVAX', name: 'Avalanche', assetType: 'Crypto', sector: 'Crypto' },
];

// Utility functions for consistent categorization
export const getAssetTypeColor = (assetType: AssetType): string => {
  return ASSET_TYPE_COLORS[assetType] || '#6B7280';
};

export const getSectorColor = (sector: Sector): string => {
  return SECTOR_COLORS[sector] || '#6B7280';
};

export const getDisplayName = (assetType: AssetType): string => {
  const displayNames: Record<AssetType, string> = {
    'Stock': 'Stocks',
    'ETF': 'ETFs', 
    'Crypto': 'Crypto',
    'Bond': 'Bonds'
  };
  return displayNames[assetType] || assetType;
};

export const getIndustryForAllocation = (holding: any): Sector => {
  if (holding.assetType === 'ETF') {
    // For ETFs, check if it's sector-specific or general
    if (holding.sector && holding.sector !== 'General') {
      return holding.sector as Sector; // Use specific sector for sector ETFs
    } else {
      return 'Mix'; // Use "Mix" for general ETFs
    }
  } else {
    return (holding.sector as Sector) || 'Technology'; // Default to Technology for stocks/crypto
  }
};

// Standardized localStorage keys
export const STORAGE_KEYS = {
  PORTFOLIO_HOLDINGS: 'portfolioHoldings',
  UPDATED_PORTFOLIO_HOLDINGS: 'updatedPortfolioHoldings',
  USER_PREFERENCES: 'userPreferences',
  AI_INSIGHTS: 'aiInsights'
} as const;

import { AssetType, Sector, ASSET_TYPE_COLORS, SECTOR_COLORS, getDisplayName, getIndustryForAllocation } from '../types/assetTypes';

export interface AllocationSlice {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export class AssetCategorizationService {
  /**
   * Calculate industry allocation based on holdings with consistent logic
   */
  static calculateIndustryAllocation(holdings: any[]): AllocationSlice[] {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
    
    const industryMap = holdings.reduce((acc, holding) => {
      const industry = getIndustryForAllocation(holding);
      const value = holding.value;
      
      if (acc[industry]) {
        acc[industry] += value;
      } else {
        acc[industry] = value;
      }
      return acc;
    }, {} as Record<string, number>);

    const colors = Object.values(SECTOR_COLORS);
    let colorIndex = 0;

    return Object.entries(industryMap).map(([name, value]) => ({
      name,
      value: value as number,
      percentage: Math.round((value as number / totalValue) * 100 * 100) / 100,
      color: colors[colorIndex++ % colors.length]
    }));
  }

  /**
   * Calculate asset class allocation based on holdings with consistent logic
   */
  static calculateAssetClassAllocation(holdings: any[]): AllocationSlice[] {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
    
    const assetMap = holdings.reduce((acc, holding) => {
      const assetType = (holding.assetType || 'Stock') as AssetType;
      const value = holding.value;
      
      if (acc[assetType]) {
        acc[assetType] += value;
      } else {
        acc[assetType] = value;
      }
      return acc;
    }, {} as Record<string, number>);

    const colors = Object.values(ASSET_TYPE_COLORS);
    let colorIndex = 0;

    return Object.entries(assetMap).map(([name, value]) => ({
      name: getDisplayName(name as AssetType),
      value: value as number,
      percentage: Math.round((value as number / totalValue) * 100 * 100) / 100,
      color: colors[colorIndex++ % colors.length]
    }));
  }

  /**
   * Get consistent color for asset type
   */
  static getAssetTypeColor(assetType: AssetType): string {
    return ASSET_TYPE_COLORS[assetType] || '#6B7280';
  }

  /**
   * Get consistent color for sector
   */
  static getSectorColor(sector: Sector): string {
    return SECTOR_COLORS[sector] || '#6B7280';
  }

  /**
   * Normalize holding data to ensure consistent structure
   */
  static normalizeHolding(holding: any): any {
    return {
      ...holding,
      assetType: holding.assetType || 'Stock',
      sector: holding.sector || 'Technology',
      value: holding.value || (holding.quantity * (holding.currentPrice || holding.purchasePrice || 0)),
      currentPrice: holding.currentPrice || holding.purchasePrice || 0,
      dailyChange: holding.dailyChange || 0,
      changePct: holding.changePct || 0
    };
  }

  /**
   * Get all available sectors for dropdowns/forms
   */
  static getAvailableSectors(): Array<{ value: Sector; label: string }> {
    return [
      { value: 'Technology', label: 'Technology' },
      { value: 'Healthcare', label: 'Healthcare' },
      { value: 'Financial', label: 'Financial' },
      { value: 'Consumer Discretionary', label: 'Consumer Discretionary' },
      { value: 'Consumer Staples', label: 'Consumer Staples' },
      { value: 'Energy', label: 'Energy' },
      { value: 'Industrial', label: 'Industrial' },
      { value: 'Materials', label: 'Materials' },
      { value: 'Utilities', label: 'Utilities' },
      { value: 'Real Estate', label: 'Real Estate' },
      { value: 'Communication Services', label: 'Communication Services' },
      { value: 'Crypto', label: 'Crypto' },
      { value: 'General', label: 'General (ETF)' }
    ];
  }

  /**
   * Get all available asset types for dropdowns/forms
   */
  static getAvailableAssetTypes(): Array<{ value: AssetType; label: string }> {
    return [
      { value: 'Stock', label: 'Stock' },
      { value: 'ETF', label: 'ETF' },
      { value: 'Crypto', label: 'Crypto' },
      { value: 'Bond', label: 'Bond' }
    ];
  }
}

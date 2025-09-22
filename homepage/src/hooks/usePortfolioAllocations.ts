import { useMemo } from 'react';
import { AssetCategorizationService } from '../services/assetCategorizationService';
import { AllocationSlice } from '../services/assetCategorizationService';

export interface PortfolioAllocations {
  industryAllocation: AllocationSlice[];
  assetClassAllocation: AllocationSlice[];
  totalValue: number;
  totalDailyChange: number;
  dailyChangePercent: number;
}

/**
 * Custom hook to calculate portfolio allocations consistently across components
 * This prevents white screen errors by ensuring consistent data structure
 */
export const usePortfolioAllocations = (holdings: any[]): PortfolioAllocations => {
  return useMemo(() => {
    // Normalize holdings to ensure consistent structure
    const normalizedHoldings = holdings.map(holding => 
      AssetCategorizationService.normalizeHolding(holding)
    );

    // Calculate totals
    const totalValue = normalizedHoldings.reduce((sum, holding) => sum + holding.value, 0);
    const totalDailyChange = normalizedHoldings.reduce((sum, holding) => sum + holding.dailyChange * holding.quantity, 0);
    const dailyChangePercent = totalValue > 0 ? totalDailyChange / totalValue * 100 : 0;

    // Calculate allocations using centralized service
    const industryAllocation = AssetCategorizationService.calculateIndustryAllocation(normalizedHoldings);
    const assetClassAllocation = AssetCategorizationService.calculateAssetClassAllocation(normalizedHoldings);

    return {
      industryAllocation,
      assetClassAllocation,
      totalValue,
      totalDailyChange,
      dailyChangePercent
    };
  }, [holdings]);
};

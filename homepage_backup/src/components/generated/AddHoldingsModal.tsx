import { useState } from 'react';
import { X, Search, TrendingUp, TrendingDown, DollarSign, Hash, Calendar } from 'lucide-react';

interface AddHoldingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHolding: (holding: any) => void;
}

interface HoldingForm {
  symbol: string;
  name: string;
  assetType: 'Stock' | 'ETF' | 'Crypto';
  sector?: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  thesis?: string;
}

// Mock data for popular assets
const popularAssets = [
  // Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Stock', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock', sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', sector: 'Consumer Discretionary' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Stock', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Stock', sector: 'Technology' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'Stock', sector: 'Consumer Discretionary' },
  
  // ETFs - General (Mix)
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'ETF', sector: 'General' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', sector: 'General' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', type: 'ETF', sector: 'General' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'ETF', sector: 'General' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF', type: 'ETF', sector: 'General' },
  
  // ETFs - Sector Specific
  { symbol: 'XLF', name: 'Financial Select Sector SPDR Fund', type: 'ETF', sector: 'Financial' },
  { symbol: 'XLK', name: 'Technology Select Sector SPDR Fund', type: 'ETF', sector: 'Technology' },
  { symbol: 'XLE', name: 'Energy Select Sector SPDR Fund', type: 'ETF', sector: 'Energy' },
  { symbol: 'XLV', name: 'Health Care Select Sector SPDR Fund', type: 'ETF', sector: 'Healthcare' },
  { symbol: 'XLI', name: 'Industrial Select Sector SPDR Fund', type: 'ETF', sector: 'Industrial' },
  
  // Crypto
  { symbol: 'BTC', name: 'Bitcoin', type: 'Crypto', sector: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', type: 'Crypto', sector: 'Crypto' },
  { symbol: 'ADA', name: 'Cardano', type: 'Crypto', sector: 'Crypto' },
  { symbol: 'SOL', name: 'Solana', type: 'Crypto', sector: 'Crypto' },
  { symbol: 'MATIC', name: 'Polygon', type: 'Crypto', sector: 'Crypto' },
  { symbol: 'AVAX', name: 'Avalanche', type: 'Crypto', sector: 'Crypto' },
];

export const AddHoldingsModal = ({ isOpen, onClose, onAddHolding }: AddHoldingsModalProps) => {
  const [formData, setFormData] = useState<HoldingForm>({
    symbol: '',
    name: '',
    assetType: 'Stock',
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    thesis: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [step, setStep] = useState<'search' | 'details'>('search');

  const filteredAssets = popularAssets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset);
    setFormData(prev => ({
      ...prev,
      symbol: asset.symbol,
      name: asset.name,
      assetType: asset.type,
      sector: asset.sector
    }));
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHolding = {
      id: Date.now().toString(),
      ticker: formData.symbol,
      name: formData.name,
      quantity: formData.quantity,
      purchasePrice: formData.purchasePrice,
      purchaseDate: formData.purchaseDate,
      assetType: formData.assetType,
      sector: formData.sector,
      currentPrice: formData.purchasePrice, // Will be updated with real data
      dailyChange: 0,
      value: formData.quantity * formData.purchasePrice,
      thesis: formData.thesis
    };

    onAddHolding(newHolding);
    onClose();
    
    // Reset form
    setFormData({
      symbol: '',
      name: '',
      assetType: 'Stock',
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      thesis: ''
    });
    setSelectedAsset(null);
    setStep('search');
    setSearchTerm('');
  };

  const handleBack = () => {
    setStep('search');
    setSelectedAsset(null);
    setFormData(prev => ({
      ...prev,
      symbol: '',
      name: '',
      assetType: 'Stock'
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Add Holdings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {step === 'search' ? (
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search for Asset
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by symbol or name (e.g., AAPL, Bitcoin, SPY)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Popular Assets */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Assets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => handleAssetSelect(asset)}
                      className="p-4 text-left border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-900">{asset.symbol}</div>
                          <div className="text-sm text-slate-600 truncate">{asset.name}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          asset.type === 'Stock' ? 'bg-blue-100 text-blue-700' :
                          asset.type === 'ETF' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {asset.type}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Entry */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Or Add Manually</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Symbol
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., AAPL"
                      value={formData.symbol}
                      onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Asset Type
                    </label>
                    <select
                      value={formData.assetType}
                      onChange={(e) => setFormData(prev => ({ ...prev, assetType: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="Stock">Stock</option>
                      <option value="ETF">ETF</option>
                      <option value="Crypto">Crypto</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company/Asset Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Apple Inc."
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => setStep('details')}
                  disabled={!formData.symbol || !formData.name}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Asset */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{formData.symbol}</div>
                    <div className="text-sm text-slate-600">{formData.name}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    formData.assetType === 'Stock' ? 'bg-blue-100 text-blue-700' :
                    formData.assetType === 'ETF' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {formData.assetType}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBack}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  ← Change Asset
                </button>
              </div>

              {/* Purchase Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="0"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.purchasePrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Investment Thesis (Optional)
                </label>
                <textarea
                  placeholder="What's your investment thesis? Why did you choose this investment?"
                  value={formData.thesis}
                  onChange={(e) => setFormData(prev => ({ ...prev, thesis: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Total Value Display */}
              {formData.quantity > 0 && formData.purchasePrice > 0 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">Total Value</span>
                    <span className="text-lg font-bold text-blue-900">
                      ${(formData.quantity * formData.purchasePrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.quantity || !formData.purchasePrice}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add Holding
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

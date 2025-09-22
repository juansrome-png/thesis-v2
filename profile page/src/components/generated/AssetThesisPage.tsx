import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Edit3, Save, X, ExternalLink } from 'lucide-react';
interface AssetThesisPageProps {
  ticker: string;
  name: string;
  onBack: () => void;
}

// @component: AssetThesisPage
export const AssetThesisPage = ({
  ticker,
  name,
  onBack
}: AssetThesisPageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [thesis, setThesis] = useState("Apple continues to dominate the premium smartphone market with strong brand loyalty and ecosystem lock-in. The services segment provides recurring revenue growth, while their push into AR/VR and autonomous vehicles positions them for future growth. Strong balance sheet and consistent capital returns to shareholders.");
  const alerts = [{
    id: 1,
    type: 'strengthening' as const,
    title: 'Q4 Services Revenue Beat Expectations',
    description: 'Services revenue grew 16% YoY, supporting thesis on recurring revenue growth',
    timestamp: '2 hours ago'
  }, {
    id: 2,
    type: 'weakening' as const,
    title: 'iPhone Sales Decline in China',
    description: 'Market share dropping due to local competition, questioning global dominance thesis',
    timestamp: '1 day ago'
  }, {
    id: 3,
    type: 'neutral' as const,
    title: 'AR/VR Development Update',
    description: 'Vision Pro sales slower than expected, but development continues as planned',
    timestamp: '3 days ago'
  }] as any[];
  const news = [{
    id: 1,
    title: 'Apple Reports Strong Q4 Results Driven by Services Growth',
    source: 'Reuters',
    timestamp: '4 hours ago',
    sentiment: 'positive' as const
  }, {
    id: 2,
    title: 'iPhone Market Share Challenges in Emerging Markets',
    source: 'Bloomberg',
    timestamp: '1 day ago',
    sentiment: 'negative' as const
  }, {
    id: 3,
    title: 'Apple Increases R&D Spending for Next-Gen Technologies',
    source: 'Wall Street Journal',
    timestamp: '2 days ago',
    sentiment: 'positive' as const
  }] as any[];
  const handleSave = () => {
    setIsEditing(false);
  };

  // @return
  return <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ticker}</h1>
              <p className="text-gray-600">{name}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">$185.42</p>
              <p className="text-green-600 font-medium">+2.3% (+4.18)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Investment Thesis</h2>
              {!isEditing ? <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Edit3 className="h-4 w-4" />
                  <span className="font-medium">Edit</span>
                </button> : <div className="flex items-center space-x-2">
                  <button onClick={handleSave} className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                    <Save className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>}
            </div>
            
            {isEditing ? <textarea value={thesis} onChange={e => setThesis(e.target.value)} className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Describe your investment thesis..." /> : <p className="text-gray-700 leading-relaxed">{thesis}</p>}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Relevant News</h2>
            <div className="space-y-4">
              {news.map(item => <div key={item.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.sentiment === 'positive' ? 'bg-green-100 text-green-700' : item.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {item.sentiment}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 ml-4">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Thesis Health Alerts</h2>
            <div className="space-y-4">
              {alerts.map(alert => <motion.div key={alert.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className={`p-4 rounded-lg border-l-4 ${alert.type === 'strengthening' ? 'bg-green-50 border-green-500' : alert.type === 'weakening' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}>
                  <div className="flex items-start space-x-3">
                    {alert.type === 'strengthening' ? <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" /> : alert.type === 'weakening' ? <TrendingDown className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${alert.type === 'strengthening' ? 'text-green-900' : alert.type === 'weakening' ? 'text-red-900' : 'text-yellow-900'}`}>
                        {alert.title}
                      </h3>
                      <p className={`text-sm ${alert.type === 'strengthening' ? 'text-green-700' : alert.type === 'weakening' ? 'text-red-700' : 'text-yellow-700'}`}>
                        {alert.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
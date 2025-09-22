import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertTriangle, AlertCircle, Info, ExternalLink, TrendingUp, TrendingDown, X, Settings, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  ticker: string;
  companyName: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  implications: string[];
}

const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Apple Reports Record Q4 Revenue Despite Supply Chain Challenges',
    source: 'Reuters',
    publishedAt: '2024-01-15T10:30:00Z',
    url: 'https://reuters.com/apple-q4-earnings',
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    priority: 'high',
    category: 'Earnings',
    sentiment: 'positive',
    implications: [
      'Strong revenue growth indicates resilient demand for Apple products',
      'Supply chain improvements could lead to better margins in Q1',
      'Services revenue growth continues to diversify revenue streams'
    ]
  },
  {
    id: '2',
    title: 'NVIDIA Faces Regulatory Hurdles in China Market',
    source: 'Bloomberg',
    publishedAt: '2024-01-14T15:45:00Z',
    url: 'https://bloomberg.com/nvidia-china-regulations',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    priority: 'high',
    category: 'Regulatory',
    sentiment: 'negative',
    implications: [
      'Potential revenue impact from Chinese market restrictions',
      'May need to diversify customer base beyond China',
      'Could accelerate focus on other AI markets'
    ]
  },
  {
    id: '3',
    title: 'Microsoft Azure Cloud Services See 25% Growth',
    source: 'TechCrunch',
    publishedAt: '2024-01-13T09:15:00Z',
    url: 'https://techcrunch.com/microsoft-azure-growth',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    priority: 'medium',
    category: 'Business Growth',
    sentiment: 'positive',
    implications: [
      'Cloud computing segment continues to drive revenue',
      'Enterprise adoption of AI services showing strong momentum',
      'Competitive position against AWS remains strong'
    ]
  },
  {
    id: '4',
    title: 'Tesla Announces New Gigafactory in Texas',
    source: 'Wall Street Journal',
    publishedAt: '2024-01-12T14:20:00Z',
    url: 'https://wsj.com/tesla-texas-gigafactory',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    priority: 'medium',
    category: 'Expansion',
    sentiment: 'positive',
    implications: [
      'Increased production capacity for electric vehicles',
      'Potential job creation and economic impact in Texas',
      'Long-term growth strategy for North American market'
    ]
  },
  {
    id: '5',
    title: 'Google Parent Alphabet Reports Mixed Q4 Results',
    source: 'CNBC',
    publishedAt: '2024-01-11T16:30:00Z',
    url: 'https://cnbc.com/alphabet-q4-results',
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    priority: 'low',
    category: 'Earnings',
    sentiment: 'neutral',
    implications: [
      'Search advertising revenue remains stable',
      'YouTube growth continues but faces competition',
      'Cloud division showing steady progress'
    ]
  },
  {
    id: '6',
    title: 'Amazon Web Services Faces Increased Competition',
    source: 'Forbes',
    publishedAt: '2024-01-10T11:45:00Z',
    url: 'https://forbes.com/aws-competition',
    ticker: 'AMZN',
    companyName: 'Amazon.com Inc.',
    priority: 'low',
    category: 'Competition',
    sentiment: 'negative',
    implications: [
      'Market share pressure from Microsoft Azure and Google Cloud',
      'May need to invest more in AI and machine learning services',
      'Pricing pressure could impact margins'
    ]
  }
];

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'medium':
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    case 'low':
      return <Info className="w-4 h-4 text-blue-500" />;
    default:
      return <Info className="w-4 h-4 text-gray-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    case 'negative':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    case 'neutral':
      return <ArrowRight className="w-4 h-4 text-gray-500" />;
    default:
      return <ArrowRight className="w-4 h-4 text-gray-500" />;
  }
};

export default function AIAlertsPage() {
  const navigate = useNavigate();
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    high: true,
    medium: true,
    low: false
  });

  const highPriorityArticles = mockNewsArticles.filter(article => article.priority === 'high');
  const mediumPriorityArticles = mockNewsArticles.filter(article => article.priority === 'medium');
  const lowPriorityArticles = mockNewsArticles.filter(article => article.priority === 'low');

  // Load notification preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem('notificationPreferences');
    if (savedPrefs) {
      try {
        const parsedPrefs = JSON.parse(savedPrefs);
        setNotificationPrefs(parsedPrefs);
      } catch (error) {
        console.error('Error parsing notification preferences:', error);
      }
    }
  }, []);

  // Save notification preferences to localStorage
  const saveNotificationPrefs = (prefs: typeof notificationPrefs) => {
    setNotificationPrefs(prefs);
    localStorage.setItem('notificationPreferences', JSON.stringify(prefs));
  };

  // Toggle notification preference
  const toggleNotification = (priority: 'high' | 'medium' | 'low') => {
    const newPrefs = { ...notificationPrefs, [priority]: !notificationPrefs[priority] };
    saveNotificationPrefs(newPrefs);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderArticleCard = (article: NewsArticle) => (
    <div key={article.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getPriorityIcon(article.priority)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(article.priority)}`}>
            {article.priority.toUpperCase()}
          </span>
          <span className="text-sm text-slate-500">{article.category}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getSentimentIcon(article.sentiment)}
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{article.title}</h3>
        <div className="flex items-center space-x-4 text-sm text-slate-600">
          <span className="font-medium">{article.ticker}</span>
          <span>{article.companyName}</span>
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>

      <div className="bg-slate-50/50 rounded-xl p-4">
        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
          <Bell className="w-4 h-4 mr-2 text-blue-600" />
          Portfolio Implications
        </h4>
        <ul className="space-y-2">
          {article.implications.map((implication, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span>{implication}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/portfolio-dashboard')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">AI Alerts</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-600">
              <span className="font-medium">{mockNewsArticles.length}</span> total alerts
            </div>
            <button 
              onClick={() => setIsManageModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Manage Alerts</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Portfolio News & Alerts</h2>
          <p className="text-slate-600">AI-curated news articles and their implications for your portfolio holdings</p>
        </div>

        <div className="space-y-8">
          {/* High Priority Alerts */}
          {highPriorityArticles.length > 0 && (
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-slate-900">High Priority Alerts</h3>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  {highPriorityArticles.length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {highPriorityArticles.map(renderArticleCard)}
              </div>
            </section>
          )}

          {/* Medium Priority Alerts */}
          {mediumPriorityArticles.length > 0 && (
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-semibold text-slate-900">Medium Priority Alerts</h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                  {mediumPriorityArticles.length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mediumPriorityArticles.map(renderArticleCard)}
              </div>
            </section>
          )}

          {/* Low Priority Alerts */}
          {lowPriorityArticles.length > 0 && (
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <Info className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-slate-900">Low Priority Alerts</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {lowPriorityArticles.length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {lowPriorityArticles.map(renderArticleCard)}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Manage Alerts Modal */}
      {isManageModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Notification Preferences</h2>
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* High Priority Toggle */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-slate-900">High Priority Alerts</h3>
                    <p className="text-sm text-slate-600">Critical news requiring immediate attention</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('high')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationPrefs.high ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationPrefs.high ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Medium Priority Toggle */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Medium Priority Alerts</h3>
                    <p className="text-sm text-slate-600">Important news for portfolio monitoring</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('medium')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationPrefs.medium ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationPrefs.medium ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Low Priority Toggle */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Low Priority Alerts</h3>
                    <p className="text-sm text-slate-600">General news and market updates</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification('low')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationPrefs.low ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationPrefs.low ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

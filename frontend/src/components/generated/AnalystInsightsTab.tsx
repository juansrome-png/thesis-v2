import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, AlertCircle, Clock } from 'lucide-react';
interface AnalystInsightsTabProps {
  activeTab: 'insights' | 'news';
  symbol: string;
}

// @component: AnalystInsightsTab
export const AnalystInsightsTab = ({
  activeTab,
  symbol
}: AnalystInsightsTabProps) => {
  // Get stock-specific insights
  const getStockInsights = (symbol: string) => {
    const insightsMap: Record<string, any> = {
      'AAPL': {
        summary: "Apple continues to show strong fundamentals with services revenue growing 8% YoY. Recent supply chain improvements and iPhone 15 adoption rates exceed expectations.",
        sentiment: "Bullish",
        keyPoints: ["Services revenue maintains strong growth trajectory", "Supply chain optimization reducing costs", "AI integration driving premium pricing power"],
        correlation: "Your long-term bullish thesis aligns with current market sentiment and analyst upgrades."
      },
      'NVDA': {
        summary: "NVIDIA maintains leadership in AI infrastructure with data center revenue surging 409% YoY. Strong demand for H100 GPUs and expanding enterprise AI adoption driving growth.",
        sentiment: "Bullish",
        keyPoints: ["Data center revenue growth accelerating", "Enterprise AI adoption expanding rapidly", "CUDA platform creating strong moats"],
        correlation: "Your AI infrastructure thesis is validated by strong data center performance and enterprise demand."
      },
      'MSFT': {
        summary: "Microsoft's cloud-first strategy continues to deliver with Azure growth of 29% YoY. Office 365 commercial revenue up 12% and Copilot adoption accelerating across enterprise.",
        sentiment: "Bullish",
        keyPoints: ["Azure cloud growth maintaining momentum", "Office 365 commercial revenue expanding", "Copilot AI integration driving adoption"],
        correlation: "Your cloud leadership thesis is supported by strong Azure performance and enterprise stickiness."
      }
    };
    
    return insightsMap[symbol] || insightsMap['AAPL'];
  };
  
  const getStockNews = (symbol: string) => {
    const newsMap: Record<string, any[]> = {
      'AAPL': [{
        id: '1',
        title: 'Apple Reports Strong Q4 Earnings, Beats Revenue Expectations',
        source: 'Financial Times',
        time: '2 hours ago',
        url: 'https://ft.com/apple-earnings'
      }, {
        id: '2',
        title: 'iPhone 15 Sales Surge in Key Markets Despite Economic Headwinds',
        source: 'Reuters',
        time: '5 hours ago',
        url: 'https://reuters.com/apple-iphone'
      }, {
        id: '3',
        title: 'Analysts Upgrade AAPL Following Services Growth',
        source: 'Bloomberg',
        time: '1 day ago',
        url: 'https://bloomberg.com/apple-upgrade'
      }],
      'NVDA': [{
        id: '1',
        title: 'NVIDIA Data Center Revenue Surges 409% in Q4',
        source: 'Financial Times',
        time: '2 hours ago',
        url: 'https://ft.com/nvidia-earnings'
      }, {
        id: '2',
        title: 'Enterprise AI Adoption Drives Strong H100 GPU Demand',
        source: 'Reuters',
        time: '5 hours ago',
        url: 'https://reuters.com/nvidia-ai-demand'
      }, {
        id: '3',
        title: 'Analysts Raise NVDA Price Targets on AI Growth',
        source: 'Bloomberg',
        time: '1 day ago',
        url: 'https://bloomberg.com/nvidia-upgrade'
      }],
      'MSFT': [{
        id: '1',
        title: 'Microsoft Azure Growth Accelerates to 29% YoY',
        source: 'Financial Times',
        time: '2 hours ago',
        url: 'https://ft.com/microsoft-earnings'
      }, {
        id: '2',
        title: 'Office 365 Commercial Revenue Up 12% in Q4',
        source: 'Reuters',
        time: '5 hours ago',
        url: 'https://reuters.com/microsoft-office365'
      }, {
        id: '3',
        title: 'Copilot AI Integration Driving Enterprise Adoption',
        source: 'Bloomberg',
        time: '1 day ago',
        url: 'https://bloomberg.com/microsoft-copilot'
      }]
    };
    
    return newsMap[symbol] || newsMap['AAPL'];
  };
  
  const insights = getStockInsights(symbol);
  const newsArticles = getStockNews(symbol);
  const sources = [{
    name: 'MarketWatch',
    url: 'https://marketwatch.com'
  }, {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com'
  }, {
    name: 'Seeking Alpha',
    url: 'https://seekingalpha.com'
  }, {
    name: 'The Motley Fool',
    url: 'https://fool.com'
  }] as any[];

  // @return
  return <div className="space-y-6">
      {activeTab === 'insights' ? <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                <span>AI Market Analysis</span>
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span>{insights.summary}</span>
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${insights.sentiment === 'Bullish' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <span>Market Sentiment: {insights.sentiment}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              <span>Key Insights</span>
            </h4>
            <ul className="space-y-2">
              {insights.keyPoints.map((point, index) => <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>)}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  <span>Thesis Correlation</span>
                </h4>
                <p className="text-blue-800 text-sm">
                  <span>{insights.correlation}</span>
                </p>
              </div>
            </div>
          </div>
        </div> : <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              <span>Recent News</span>
            </h3>
          </div>
          {newsArticles.map(article => <motion.a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" whileHover={{
        scale: 1.01
      }} className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2 leading-snug">
                    <span>{article.title}</span>
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.time}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </motion.a>)}
        </div>}

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          <span>Sources</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {sources.map(source => <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors">
              <span>{source.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>)}
        </div>
      </div>
    </div>;
};
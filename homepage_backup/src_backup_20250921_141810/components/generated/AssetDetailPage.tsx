import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Edit, Save, X } from 'lucide-react';
interface AssetDetailPageProps {
  ticker?: string;
  onBack?: () => void;
}
const mockPriceData = [{
  date: '2024-01',
  price: 175.30
}, {
  date: '2024-02',
  price: 182.45
}, {
  date: '2024-03',
  price: 189.20
}, {
  date: '2024-04',
  price: 195.89
}] as any[];
const mockNews = [{
  id: '1',
  title: 'Apple Reports Strong Q4 Earnings',
  summary: 'Revenue beats expectations...',
  sentiment: 'positive'
}, {
  id: '2',
  title: 'New iPhone Sales Exceed Forecasts',
  summary: 'Strong consumer demand...',
  sentiment: 'positive'
}] as any[];
const thesisAlerts = [{
  type: 'strengthening',
  text: 'iPhone sales growth aligns with your thesis on consumer loyalty'
}, {
  type: 'weakening',
  text: 'China market concerns may impact long-term growth projections'
}] as any[];

// @component: AssetDetailPage
export const AssetDetailPage = ({
  ticker = 'AAPL',
  onBack
}: AssetDetailPageProps) => {
  const [thesis, setThesis] = useState('Apple remains a dominant force in premium consumer electronics with strong ecosystem lock-in effects. The company\'s services revenue provides recurring income streams while hardware innovation continues to drive upgrade cycles.');
  const [isEditingThesis, setIsEditingThesis] = useState(false);

  // @return
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button onClick={onBack} className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Portfolio</span>
        </button>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{ticker}</h1>
              <p className="text-lg text-slate-600">Apple Inc.</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900">$195.89</p>
              <div className="flex items-center text-emerald-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.34 (+1.21%)</span>
              </div>
            </div>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }} />
                <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={3} dot={{
                fill: '#3B82F6',
                strokeWidth: 2
              }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Investment Thesis</h2>
              {!isEditingThesis ? <button onClick={() => setIsEditingThesis(true)} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button> : <div className="flex gap-2">
                  <button onClick={() => setIsEditingThesis(false)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsEditingThesis(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>}
            </div>
            {isEditingThesis ? <textarea value={thesis} onChange={e => setThesis(e.target.value)} className="w-full h-32 p-4 border border-slate-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Enter your investment thesis..." /> : <p className="text-slate-700 leading-relaxed">{thesis}</p>}
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">AI Thesis Health</h2>
            <div className="space-y-4">
              {thesisAlerts.map((alert, index) => <div key={index} className={`p-4 rounded-2xl flex items-start space-x-3 ${alert.type === 'strengthening' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  {alert.type === 'strengthening' ? <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />}
                  <p className={`text-sm ${alert.type === 'strengthening' ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {alert.text}
                  </p>
                </div>)}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/50 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Relevant News</h2>
          <div className="space-y-4">
            {mockNews.map(article => <div key={article.id} className="p-6 bg-slate-50/50 rounded-2xl hover:bg-slate-100/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-slate-600 text-sm">{article.summary}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${article.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {article.sentiment}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
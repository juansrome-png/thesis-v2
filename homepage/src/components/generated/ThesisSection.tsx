import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit3, Calendar } from 'lucide-react';
interface Thesis {
  id: string;
  content: string;
  date: string;
  tags: string[];
}

// @component: ThesisSection
export const ThesisSection = ({ ticker = 'AAPL' }: { ticker?: string }) => {
  // Get stock-specific default thesis or user's saved thesis
  const getDefaultThesis = (ticker: string): Thesis[] => {
    // First check if user has saved thesis in localStorage
    const stored = localStorage.getItem(`thesis_${ticker}`);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Otherwise use default thesis
    const defaultTheses: Record<string, Thesis[]> = {
      'AAPL': [{
        id: '1',
        content: 'Strong fundamentals with growing services revenue. iPhone sales remain resilient despite market headwinds.',
        date: '2024-01-15',
        tags: ['Bullish', 'Long-term']
      }],
      'NVDA': [{
        id: '1',
        content: 'Leading AI infrastructure provider with strong moats in data center GPUs. CUDA platform creates switching costs while AI demand accelerates.',
        date: '2024-01-15',
        tags: ['Bullish', 'Long-term']
      }],
      'MSFT': [{
        id: '1',
        content: 'Cloud-first strategy with Azure and Office 365 creates strong recurring revenue streams. Enterprise focus provides competitive moats.',
        date: '2024-01-15',
        tags: ['Bullish', 'Long-term']
      }]
    };
    
    return defaultTheses[ticker] || defaultTheses['AAPL'];
  };
  
  const [theses, setTheses] = useState<Thesis[]>(getDefaultThesis(ticker));
  const [isAdding, setIsAdding] = useState(false);
  const [newThesis, setNewThesis] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const availableTags = ['Bullish', 'Bearish', 'Long-term', 'Short-term', 'Technical', 'Fundamental'];
  
  // Save thesis to localStorage whenever it changes
  const saveThesisToStorage = (ticker: string, thesisData: Thesis[]) => {
    localStorage.setItem(`thesis_${ticker}`, JSON.stringify(thesisData));
  };
  
  const handleAddThesis = () => {
    if (newThesis.trim()) {
      const thesis: Thesis = {
        id: Date.now().toString(),
        content: newThesis.trim(),
        date: new Date().toISOString().split('T')[0],
        tags: selectedTags
      };
      const updatedTheses = [thesis, ...theses];
      setTheses(updatedTheses);
      saveThesisToStorage(ticker, updatedTheses);
      setNewThesis('');
      setSelectedTags([]);
      setIsAdding(false);
    }
  };
  
  const handleDeleteThesis = (id: string) => {
    const updatedTheses = theses.filter(thesis => thesis.id !== id);
    setTheses(updatedTheses);
    saveThesisToStorage(ticker, updatedTheses);
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  // @return
  return <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          <span>Investment Thesis</span>
        </h2>
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Thesis</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="mb-6 p-4 bg-gray-50 rounded-xl">
            <textarea value={newThesis} onChange={e => setNewThesis(e.target.value)} placeholder="Share your investment thesis..." className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} />
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {availableTags.map(tag => <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <span>{tag}</span>
                </button>)}
            </div>
            <div className="flex gap-3">
              <button onClick={handleAddThesis} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <span>Save Thesis</span>
              </button>
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <span>Cancel</span>
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>

      <div className="space-y-4">
        <AnimatePresence>
          {theses.map(thesis => <motion.div key={thesis.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(thesis.date).toLocaleDateString()}</span>
                </div>
                <button onClick={() => handleDeleteThesis(thesis.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-900 mb-3 leading-relaxed">
                <span>{thesis.content}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {thesis.tags.map(tag => <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>)}
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>

      {theses.length === 0 && !isAdding && <div className="text-center py-8 text-gray-500">
          <p>
            <span>No investment thesis yet. Add your first analysis above.</span>
          </p>
        </div>}
    </div>;
};
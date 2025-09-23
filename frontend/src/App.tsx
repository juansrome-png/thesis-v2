import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Container, Theme } from './settings/types';
import { LandingPage } from './components/generated/LandingPage';
import { AuthPage } from './components/generated/AuthPage';
import { AssetThesisPage } from './components/generated/AssetThesisPage';
import { PerformanceDashboardPage } from './components/generated/PerformanceDashboardPage';
import { StockDetailPage } from './components/generated/StockDetailPage';
import { PortfolioDashboard } from './components/generated/PortfolioDashboard';
import PortfolioInsightTab from './components/generated/PortfolioInsightTab';
import { AssetDetailPage } from './components/generated/AssetDetailPage';
import AIAlertsPage from './components/generated/AIAlertsPage';
import { ProfilePage } from './components/generated/ProfilePage';
import { Navigation } from './components/Navigation';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

// Wrapper component for AssetThesisPage to handle URL parameters
const AssetThesisPageWrapper = ({ onBack }: { onBack: () => void }) => {
  const { ticker } = useParams<{ ticker: string }>();
  return (
    <AssetThesisPage 
      ticker={ticker || 'AAPL'} 
      name={ticker || 'Apple Inc.'} 
      onBack={onBack} 
    />
  );
};

// Wrapper component for StockDetailPage to handle URL parameters
const StockDetailPageWrapper = () => {
  const { ticker } = useParams<{ ticker: string }>();
  return <StockDetailPage ticker={ticker || 'AAPL'} />;
};

// Wrapper component for AssetDetailPage to handle URL parameters
const AssetDetailPageWrapper = () => {
  const { ticker } = useParams<{ ticker: string }>();
  return <AssetDetailPage ticker={ticker || 'AAPL'} />;
};

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  const handleAuthSuccess = () => {
    window.location.href = '/portfolio-dashboard';
  };

  const handleAuthBack = () => {
    window.location.href = '/';
  };


  const handleAssetThesisBack = () => {
    window.location.href = '/portfolio-dashboard';
  };

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
          <Route path="/auth" element={<AuthPage onSuccess={handleAuthSuccess} onBack={handleAuthBack} />} />
          <Route path="/performance" element={
            <div>
              <Navigation />
              <PerformanceDashboardPage onBackToDashboard={() => {}} />
            </div>
          } />
          <Route path="/asset-thesis/:ticker" element={<AssetThesisPageWrapper onBack={handleAssetThesisBack} />} />
          <Route path="/stock-detail/:ticker" element={
            <div>
              <Navigation />
              <StockDetailPageWrapper />
            </div>
          } />
          <Route path="/portfolio-dashboard" element={
            <div>
              <Navigation />
              <PortfolioDashboard />
            </div>
          } />
          <Route path="/portfolio-insights" element={
            <div>
              <Navigation />
              <PortfolioInsightTab />
            </div>
          } />
          <Route path="/ai-alerts" element={
            <div>
              <Navigation />
              <AIAlertsPage />
            </div>
          } />
          <Route path="/asset-detail/:ticker" element={
            <div>
              <Navigation />
              <AssetDetailPageWrapper />
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <Navigation />
              <ProfilePage />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
        <Route path="/auth" element={<AuthPage onSuccess={handleAuthSuccess} onBack={handleAuthBack} />} />
        <Route path="/performance" element={
          <div>
            <Navigation />
            <PerformanceDashboardPage onBackToDashboard={() => {}} />
          </div>
        } />
        <Route path="/asset-thesis/:ticker" element={<AssetThesisPageWrapper onBack={handleAssetThesisBack} />} />
        <Route path="/stock-detail/:ticker" element={
          <div>
            <Navigation />
            <StockDetailPageWrapper />
          </div>
        } />
        <Route path="/portfolio-dashboard" element={
          <div>
            <Navigation />
            <PortfolioDashboard />
          </div>
        } />
        <Route path="/portfolio-insights" element={
          <div>
            <Navigation />
            <PortfolioInsightTab />
          </div>
        } />
        <Route path="/ai-alerts" element={
          <div>
            <Navigation />
            <AIAlertsPage />
          </div>
        } />
        <Route path="/asset-detail/:ticker" element={
          <div>
            <Navigation />
            <AssetDetailPageWrapper />
          </div>
        } />
        <Route path="/profile" element={
          <div>
            <Navigation />
            <ProfilePage />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
}

export default App;
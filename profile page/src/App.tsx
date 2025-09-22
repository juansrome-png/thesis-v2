import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { LandingPage } from './components/generated/LandingPage';
import { AuthPage } from './components/generated/AuthPage';
import { DashboardLayout } from './components/generated/DashboardLayout';
import { AssetThesisPage } from './components/generated/AssetThesisPage';
import { PerformanceDashboardPage } from './components/generated/PerformanceDashboardPage';
import { ProfilePage } from './components/generated/ProfilePage';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

type CurrentPage = 'landing' | 'auth' | 'dashboard' | 'asset-thesis' | 'performance' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('profile');
  const [selectedAsset, setSelectedAsset] = useState<{ticker: string, name: string} | null>(null);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleAuthBack = () => {
    setCurrentPage('landing');
  };

  const handleDashboardNavigation = (key: 'dashboard' | 'theses' | 'settings' | 'logout' | 'performance') => {
    if (key === 'logout') {
      setCurrentPage('landing');
      return;
    }
    if (key === 'performance') {
      setCurrentPage('performance');
      return;
    }
    if (key === 'settings') {
      setCurrentPage('profile');
      return;
    }
    setCurrentPage('dashboard');
  };

  const handleAssetThesisBack = () => {
    setCurrentPage('dashboard');
  };

  const generatedComponent = useMemo(() => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'auth':
        return <AuthPage onSuccess={handleAuthSuccess} onBack={handleAuthBack} />;
      case 'dashboard':
        return <DashboardLayout active="dashboard" onNavigate={handleDashboardNavigation} />;
      case 'profile':
        return (
          <DashboardLayout active="settings" onNavigate={handleDashboardNavigation}>
            <ProfilePage onBack={() => setCurrentPage('dashboard')} />
          </DashboardLayout>
        );
      case 'performance':
        return (
          <DashboardLayout active="dashboard" onNavigate={handleDashboardNavigation}>
            <PerformanceDashboardPage onBackToDashboard={() => setCurrentPage('dashboard')} />
          </DashboardLayout>
        );
      case 'asset-thesis':
        return selectedAsset ? (
          <AssetThesisPage 
            ticker={selectedAsset.ticker} 
            name={selectedAsset.name} 
            onBack={handleAssetThesisBack} 
          />
        ) : (
          <DashboardLayout active="dashboard" onNavigate={handleDashboardNavigation} />
        );
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  }, [currentPage, selectedAsset]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;
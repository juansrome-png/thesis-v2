import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, LayoutDashboard, FileText, Settings, LogOut, Menu, X, Bell, Search, User, LineChart, BarChart3, PieChart, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
interface DashboardLayoutProps {
  children?: React.ReactNode;
  active: 'dashboard' | 'theses' | 'settings';
  onNavigate: (key: 'dashboard' | 'theses' | 'settings' | 'logout' | 'performance') => void;
}

// @component: DashboardLayout
export const DashboardLayout = ({
  children,
  active,
  onNavigate
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [{
    key: 'dashboard' as const,
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  }, {
    key: 'performance' as const,
    name: 'Performance',
    icon: LineChart,
    path: '/performance'
  }, {
    key: 'theses' as const,
    name: 'My Theses',
    icon: FileText,
    path: '/dashboard'
  }, {
    key: 'settings' as const,
    name: 'Settings',
    icon: Settings,
    path: '/dashboard'
  }] as any[];

  const additionalPages = [
    {
      name: 'Stock Detail',
      icon: Building2,
      path: '/stock-detail'
    },
    {
      name: 'Portfolio Dashboard',
      icon: BarChart3,
      path: '/portfolio-dashboard'
    },
    {
      name: 'Portfolio Insights',
      icon: PieChart,
      path: '/portfolio-insights'
    },
    {
      name: 'Asset Detail',
      icon: Building2,
      path: '/asset-detail'
    }
  ];

  // @return
  return <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 lg:hidden bg-gray-900 bg-opacity-50" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <motion.div initial={false} animate={{
      x: sidebarOpen ? 0 : -280
    }} className="fixed inset-y-0 left-0 z-50 w-70 bg-white border-r border-gray-200 lg:static lg:translate-x-0 lg:inset-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Thesis</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">Main Navigation</h3>
              {navigation.map(item => <button key={item.key} onClick={() => {
                onNavigate(item.key);
                setSidebarOpen(false);
              }} className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${active === item.key ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>)}
            </div>
            
            <div className="space-y-2 mt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">Additional Pages</h3>
              {additionalPages.map((page, index) => (
                <Link key={index} to={page.path} onClick={() => setSidebarOpen(false)} className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-50">
                  <page.icon className="h-5 w-5" />
                  <span className="font-medium">{page.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
            
            <button onClick={() => onNavigate('logout')} className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="hidden sm:flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children || <div className="p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
                <p className="text-gray-600 mt-2">Track your investments and monitor performance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">$127,430</p>
                  <p className="text-sm text-green-600 mt-1">+12.4% this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">vs S&P 500</h3>
                  <p className="text-2xl font-bold text-green-600 mt-2">+4.2%</p>
                  <p className="text-sm text-gray-600 mt-1">Outperforming</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Active Positions</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">23</p>
                  <p className="text-sm text-gray-600 mt-1">Across 5 sectors</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Thesis Alerts</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">3</p>
                  <p className="text-sm text-gray-600 mt-1">Require attention</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <button onClick={() => onNavigate('performance')} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
                    <LineChart className="h-4 w-4" />
                    <span>View Performance</span>
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Your recent portfolio activity will appear here.</p>
              </div>
            </div>}
        </main>
      </div>
    </div>;
};
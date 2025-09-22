import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, PieChart, Building2, LineChart, User } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const pages = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Portfolio Dashboard', path: '/portfolio-dashboard', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Thesis
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActive(page.path) 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <page.icon className={`h-4 w-4 ${isActive(page.path) ? 'text-blue-600' : ''}`} />
                  <span>{page.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Profile button */}
          <div className="hidden md:flex">
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                isActive('/profile')
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = e.target.value;
                }
              }}
            >
              <option value="">Navigate to...</option>
              {pages.map((page) => (
                <option key={page.path} value={page.path}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

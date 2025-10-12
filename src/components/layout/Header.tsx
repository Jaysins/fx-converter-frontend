import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              FX Converter
            </h1>
          </div>

          {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
            <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                Dashboard
            </button>
            <button
                onClick={() => navigate('/conversion')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                Convert
            </button>
            <button
                onClick={() => navigate('/conversions')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                History
            </button>
        </nav>
          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-600">
                {user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation - Mobile */}
        <nav className="md:hidden pb-3 flex gap-2">
            <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                Dashboard
            </button>
            <button
                onClick={() => navigate('/conversion')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                Convert
            </button>
            <button
                onClick={() => navigate('/conversions')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
                History
            </button>
        </nav>
      </div>
    </header>
  );
}
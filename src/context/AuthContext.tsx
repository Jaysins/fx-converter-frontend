import { createContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth.types';
import { authService } from '../services/auth.service';

/**
 * Auth Context - provides authentication state to entire app
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initAuth = async () => {
      const { token: storedToken, user: storedUser } = authService.getAuthData();
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        
        // Verify token is still valid by fetching profile
        try {
          const freshUser = await authService.getProfile();
          setUser(freshUser);
        } catch (error) {
          // Token invalid, clear auth data
          authService.clearAuthData();
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login({ email, password });
      
      // Store auth data
      authService.setAuthData(response.token, response.user);
      
      // Update state
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      // Re-throw error to be handled by component
      throw error;
    }
  };

  /**
   * Register new user
   */
  const register = async (
    email: string, 
    password: string, 
    name: string
  ): Promise<void> => {
    try {
      const response = await authService.register({ email, password, name });
      
      // Store auth data
      authService.setAuthData(response.token, response.user);
      
      // Update state
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      // Re-throw error to be handled by component
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = (): void => {
    authService.clearAuthData();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
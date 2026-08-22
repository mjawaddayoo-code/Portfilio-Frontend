import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api, { getErrorMessage } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'portfolio_admin_token';
const ADMIN_KEY = 'portfolio_admin';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem(ADMIN_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      setAdmin(data.admin);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
      setToken(null);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
      setToken(data.token);
      setAdmin(data.admin);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, token, loading, isAuthenticated: !!token, login, logout, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

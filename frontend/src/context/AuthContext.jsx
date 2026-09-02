import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults - use local backend on localhost, live domain /api on hosting, or VITE_API_URL
  const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    // On live domain (e.g. Namecheap), point to same domain /api or fallback
    if (hostname.includes('onrender.com')) {
      return 'https://sss-website.onrender.com/api';
    }
    return `${window.location.protocol}//${window.location.host}/api`;
  };

  axios.defaults.baseURL = getBaseUrl();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      checkUserSession();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const checkUserSession = async () => {
    try {
      const response = await axios.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error('Session expired or invalid', error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

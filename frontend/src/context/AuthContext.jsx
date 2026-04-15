import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const storedToken = localStorage.getItem('token');

if (storedToken) {
  axios.defaults.headers.common['x-auth-token'] = storedToken;
}

const decodeUserFromToken = (authToken) => {
  try {
    const decoded = jwtDecode(authToken);
    return decoded.user || decoded;
  } catch (err) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(Boolean(storedToken));
  const navigate = useNavigate();

  const setAuthToken = (authToken) => {
    if (authToken) {
      axios.defaults.headers.common['x-auth-token'] = authToken;
      localStorage.setItem('token', authToken);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  const resolveAndStoreUser = (authToken, authUser) => {
    const resolvedUser = authUser || decodeUserFromToken(authToken);
    setToken(authToken);
    setAuthToken(authToken);
    setUser(resolvedUser);
    return resolvedUser;
  };

  const loadUser = async (authToken = token) => {
    if (!authToken) {
      setLoading(false);
      return null;
    }

    try {
      setAuthToken(authToken);
      const res = await axios.get('/api/user');
      setUser(res.data);
      return res.data;
    } catch (err) {
      const fallbackUser = decodeUserFromToken(authToken);
      if (fallbackUser) {
        setUser(fallbackUser);
        return fallbackUser;
      }

      setUser(null);
      setToken(null);
      setAuthToken(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      const resolvedUser = resolveAndStoreUser(res.data.token, res.data.user);
      navigate(resolvedUser?.role === 'admin' ? '/admin' : '/client', {
        replace: true
      });
      return resolvedUser;
    } catch (err) {
      throw err.response?.data || { msg: err.message || 'Registration failed.' };
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      const resolvedUser = resolveAndStoreUser(res.data.token, res.data.user);
      navigate(resolvedUser?.role === 'admin' ? '/admin' : '/client', {
        replace: true
      });
      return resolvedUser;
    } catch (err) {
      throw err.response?.data || { msg: err.message || 'Invalid credentials' };
    }
  };

  const logout = (redirect = true) => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    setLoading(false);

    if (redirect) {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

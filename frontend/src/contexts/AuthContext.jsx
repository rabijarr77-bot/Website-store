import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          authService.setAuthToken(token);
          const userData = await authService.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Login berhasil!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login gagal';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Registrasi berhasil!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registrasi gagal';
      toast.error(message);
      return { success: false, message };
    }
  };

  const adminLogin = async (credentials) => {
    try {
      const response = await authService.adminLogin(credentials);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Login admin berhasil!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login admin gagal';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authService.setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Anda telah logout');
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      toast.success('Profil berhasil diperbarui');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal memperbarui profil';
      toast.error(message);
      return { success: false, message };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await authService.changePassword(passwordData);
      toast.success('Password berhasil diubah');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Gagal mengubah password';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    adminLogin,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
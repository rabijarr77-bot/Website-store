import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  LockClosedIcon,
  UserIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { login, adminLogin, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const result = isAdmin 
        ? await adminLogin({ username: data.username, password: data.password })
        : await login({ email: data.email, password: data.password });
      
      if (result.success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <ServerIcon className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">DRY HOST</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isAdmin ? 'Admin Login' : 'Masuk ke Akun'}
          </h2>
          <p className="text-gray-600">
            {isAdmin 
              ? 'Masuk sebagai administrator untuk mengelola sistem' 
              : 'Masuk untuk mengakses layanan hosting terbaik'}
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email/Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAdmin ? 'Username Admin' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isAdmin ? 'text' : 'email'}
                  {...register(isAdmin ? 'username' : 'email', {
                    required: isAdmin ? 'Username wajib diisi' : 'Email wajib diisi',
                    pattern: !isAdmin ? {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email tidak valid'
                    } : undefined
                  })}
                  className="input-field pl-10"
                  placeholder={isAdmin ? 'Masukkan username admin' : 'Masukkan email Anda'}
                />
              </div>
              {errors[isAdmin ? 'username' : 'email'] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[isAdmin ? 'username' : 'email'].message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Kata sandi wajib diisi',
                    minLength: {
                      value: 8,
                      message: 'Kata sandi minimal 8 karakter'
                    }
                  })}
                  className="input-field pl-10 pr-10"
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ingat saya
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Lupa kata sandi?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <LockClosedIcon className="w-5 h-5" />
                    <span>{isAdmin ? 'Masuk Admin' : 'Masuk'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau</span>
              </div>
            </div>
          </div>

          {/* Admin Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleAdminMode}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              {isAdmin 
                ? 'Login sebagai user biasa' 
                : 'Login sebagai admin'}
            </button>
          </div>

          {/* Register Link */}
          {!isAdmin && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link
                  to="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            © 2024 DRY HOST - Solusi Hosting Terbaik di Indonesia
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
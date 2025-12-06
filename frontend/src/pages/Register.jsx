import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ServerIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const result = await registerUser({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordRequirement = ({ text, isValid }) => (
    <div className={`flex items-center space-x-2 text-sm ${
      isValid ? 'text-green-600' : 'text-gray-500'
    }`}>
      <CheckIcon className={`w-4 h-4 ${isValid ? 'text-green-500' : 'text-gray-400'}`} />
      <span>{text}</span>
    </div>
  );

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
            Daftar Akun Baru
          </h2>
          <p className="text-gray-600">
            Bergabung dengan ribuan pengguna hosting terbaik di Indonesia
          </p>
        </div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('fullName', {
                    required: 'Nama lengkap wajib diisi',
                    minLength: {
                      value: 3,
                      message: 'Nama lengkap minimal 3 karakter'
                    }
                  })}
                  className="input-field pl-10"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('username', {
                    required: 'Username wajib diisi',
                    minLength: {
                      value: 3,
                      message: 'Username minimal 3 karakter'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Username hanya boleh mengandung huruf, angka, dan underscore'
                    }
                  })}
                  className="input-field pl-10"
                  placeholder="Masukkan username Anda"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email tidak valid'
                    }
                  })}
                  className="input-field pl-10"
                  placeholder="Masukkan email Anda"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
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
                    },
                    validate: {
                      hasUpperCase: value => /[A-Z]/.test(value) || 'Harus mengandung huruf besar',
                      hasLowerCase: value => /[a-z]/.test(value) || 'Harus mengandung huruf kecil',
                      hasNumber: value => /[0-9]/.test(value) || 'Harus mengandung angka',
                      hasSpecialChar: value => /[!@#$%^&*]/.test(value) || 'Harus mengandung karakter spesial (!@#$%^&*)'
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

            {/* Password Requirements */}
            {password && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Persyaratan Kata Sandi:
                </h4>
                <PasswordRequirement
                  text="Minimal 8 karakter"
                  isValid={password.length >= 8}
                />
                <PasswordRequirement
                  text="Mengandung huruf besar"
                  isValid={/[A-Z]/.test(password)}
                />
                <PasswordRequirement
                  text="Mengandung huruf kecil"
                  isValid={/[a-z]/.test(password)}
                />
                <PasswordRequirement
                  text="Mengandung angka"
                  isValid={/[0-9]/.test(password)}
                />
                <PasswordRequirement
                  text="Mengandung karakter spesial (!@#$%^&*)"
                  isValid={/[!@#$%^&*]/.test(password)}
                />
              </div>
            )}

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Konfirmasi kata sandi wajib diisi',
                    validate: value => value === password || 'Kata sandi tidak cocok'
                  })}
                  className="input-field pl-10 pr-10"
                  placeholder="Konfirmasi kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                {...register('terms', {
                  required: 'Anda harus menyetujui syarat dan ketentuan'
                })}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Saya menyetujui{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Syarat dan Ketentuan
                </Link>{' '}
                serta{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.terms.message}
              </p>
            )}

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
                    <UserIcon className="w-5 h-5" />
                    <span>Daftar Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link
                to="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
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

export default Register;
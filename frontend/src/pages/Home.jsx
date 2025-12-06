import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ServerIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  useEffect(() => {
    // Add reveal animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: ServerIcon,
      title: 'Server Cepat',
      description: 'Performa optimal dengan server berkualitas tinggi untuk kebutuhan Anda.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Keamanan Terjamin',
      description: 'Perlindungan keamanan terbaik untuk data dan aplikasi Anda.'
    },
    {
      icon: ClockIcon,
      title: 'Dukungan 24/7',
      description: 'Tim support siap membantu kapan saja dengan respon cepat.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Harga Terjangkau',
      description: 'Harga kompetitif dengan kualitas terbaik di kelasnya.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Pelanggan Aktif' },
    { number: '99.9%', label: 'Uptime Server' },
    { number: '24/7', label: 'Dukungan Teknis' },
    { number: '50+', label: 'Server Aktif' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-animation absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="floating-animation absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70" style={{ animationDelay: '2s' }}></div>
          <div className="floating-animation absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <SparklesIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Hosting Terbaik di Indonesia
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Hosting dan VPS</span>
                <br />
                <span className="text-gray-700">Cepat, Aman, dan Terjangkau</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Solusi hosting untuk website, game, dan aplikasi Anda dengan dukungan 24/7, 
                performa optimal, dan harga yang bersaing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <span>Lihat Produk</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1554474051-02565e8d8886?w=800&h=600&fit=crop"
                  alt="Server Illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kenapa Memilih <span className="gradient-text">DRY HOST?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan solusi hosting terbaik dengan teknologi terkini 
              dan dukungan profesional 24/7.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="reveal-on-scroll text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="reveal-on-scroll"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Siap Memulai <span className="gradient-text">Perjalanan Digital</span> Anda?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Bergabung dengan ribuan pelanggan yang telah mempercayakan hosting mereka kepada kami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <span>Mulai Sekarang</span>
                <ChevronRightIcon className="w-5 h-5" />
              </Link>
              
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
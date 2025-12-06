import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  ServerIcon, 
  CpuChipIcon, 
  CircleStackIcon, 
  ClockIcon,
  CheckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState('all');
  const { isAuthenticated } = useAuth();

  const type = searchParams.get('type') || 'all';

  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  // Mock data untuk demo
  const mockProducts = [
    {
      _id: '1',
      name: 'VPS Basic',
      type: 'vps',
      price: 199000,
      ram: '2 GB',
      disk: '20 GB SSD',
      cpu: '1 Core',
      provider: 'DigitalOcean',
      description: 'VPS ideal untuk website kecil hingga menengah dengan performa stabil.',
      features: ['Dukungan 24/7', 'Backup Harian', 'Panel Kontrol', 'Keamanan Tinggi'],
      isActive: true
    },
    {
      _id: '2',
      name: 'VPS Pro',
      type: 'vps',
      price: 399000,
      ram: '4 GB',
      disk: '40 GB SSD',
      cpu: '2 Core',
      provider: 'DigitalOcean',
      description: 'VPS performa tinggi untuk aplikasi dan website dengan traffic tinggi.',
      features: ['Dukungan 24/7', 'Backup Harian', 'Panel Kontrol', 'Keamanan Tinggi', 'Dedicated IP'],
      isActive: true
    },
    {
      _id: '3',
      name: 'Panel Pterodactyl Basic',
      type: 'pterodactyl',
      price: 149000,
      ram: '2 GB',
      disk: '20 GB',
      cpu: '1 Core',
      egg: 'Egg Node.js',
      runtime: 'Node.js 20.x',
      subdomain: 'panel.dryhost.id',
      description: 'Panel game server dengan management yang mudah dan fitur lengkap.',
      features: ['Management Panel', 'Auto Installer', 'File Manager', 'Database Support'],
      isActive: true
    },
    {
      _id: '4',
      name: 'Panel Pterodactyl Pro',
      type: 'pterodactyl',
      price: 299000,
      ram: '4 GB',
      disk: '40 GB',
      cpu: '2 Core',
      egg: 'Egg Node.js',
      runtime: 'Node.js 20.x',
      subdomain: 'panel.dryhost.id',
      description: 'Panel game server premium dengan resource yang lebih besar.',
      features: ['Management Panel', 'Auto Installer', 'File Manager', 'Database Support', 'Custom Domain'],
      isActive: true
    },
    {
      _id: '5',
      name: 'VPS Enterprise',
      type: 'vps',
      price: 799000,
      ram: '8 GB',
      disk: '80 GB SSD',
      cpu: '4 Core',
      provider: 'DigitalOcean',
      description: 'VPS enterprise untuk aplikasi besar dengan kebutuhan resource tinggi.',
      features: ['Dukungan 24/7', 'Backup Harian', 'Panel Kontrol', 'Keamanan Tinggi', 'Dedicated IP', 'Premium Support'],
      isActive: true
    }
  ];

  const filteredProducts = selectedType === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.type === selectedType);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSearchParams(type === 'all' ? {} : { type });
  };

  const handleBuyNow = (productId) => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu untuk membeli produk');
      return;
    }
    // Navigate to checkout page
    window.location.href = `/checkout/${productId}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace(',00', '');
  };

  const getProductIcon = (type) => {
    return type === 'vps' ? ServerIcon : CpuChipIcon;
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pilihan <span className="gradient-text">Produk Terbaik</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan solusi hosting dan VPS yang sesuai dengan kebutuhan Anda. 
              Semua produk dilengkapi dengan dukungan teknis 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleTypeChange('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua Produk
            </button>
            <button
              onClick={() => handleTypeChange('vps')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === 'vps'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              VPS
            </button>
            <button
              onClick={() => handleTypeChange('pterodactyl')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedType === 'pterodactyl'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Panel Pterodactyl
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ServerIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada produk yang tersedia
              </h3>
              <p className="text-gray-600">
                Silakan coba filter lain atau kembali nanti.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const ProductIcon = getProductIcon(product.type);
                
                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card card-hover p-6 flex flex-col"
                  >
                    {/* Product Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <ProductIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.type === 'vps' ? product.provider : 'Panel Management'}
                          </p>
                        </div>
                      </div>
                      {product.type === 'pterodactyl' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {product.runtime}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-gray-600">/bulan</div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <CircleStackIcon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">RAM</span>
                        </div>
                        <span className="font-semibold text-gray-900">{product.ram}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <ServerIcon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Penyimpanan</span>
                        </div>
                        <span className="font-semibold text-gray-900">{product.disk}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <CpuChipIcon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">CPU</span>
                        </div>
                        <span className="font-semibold text-gray-900">{product.cpu}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Fitur Utama:</h4>
                      <div className="space-y-2">
                        {product.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={() => handleBuyNow(product._id)}
                      className="w-full btn-primary"
                    >
                      BELI SEKARANG
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Masih Bingung Memilih?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Tim kami siap membantu Anda memilih produk yang tepat sesuai kebutuhan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Konsultasi Gratis
              </Link>
              
              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Lihat Semua Produk
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
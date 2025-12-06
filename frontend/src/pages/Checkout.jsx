import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  ShieldCheckIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  // Mock product data
  const mockProduct = {
    _id: '1',
    name: 'VPS Basic',
    type: 'vps',
    price: 199000,
    ram: '2 GB',
    disk: '20 GB SSD',
    cpu: '1 Core',
    provider: 'DigitalOcean',
    description: 'VPS ideal untuk website kecil hingga menengah dengan performa stabil.',
    features: ['Dukungan 24/7', 'Backup Harian', 'Panel Kontrol', 'Keamanan Tinggi']
  };

  const paymentMethods = [
    {
      id: 'midtrans',
      name: 'Midtrans',
      description: 'Bayar dengan OVO, Gopay, Dana, Kartu Kredit',
      icon: CreditCardIcon,
      type: 'gateway'
    },
    {
      id: 'manual',
      name: 'Transfer Bank',
      description: 'Bayar secara manual via transfer bank',
      icon: BanknotesIcon,
      type: 'manual'
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/auth/login');
      return;
    }

    // Load product data
    setProduct(mockProduct);
  }, [isAuthenticated, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace(',00', '');
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate creating transaction
      const transactionId = 'txn_' + Date.now();
      
      if (selectedPayment === 'midtrans') {
        // Redirect to Midtrans payment
        toast.success('Mengalihkan ke halaman pembayaran Midtrans...');
        // Simulate successful payment
        setTimeout(() => {
          navigate(`/payment/${transactionId}`);
        }, 2000);
      } else {
        // Manual payment
        toast.success('Silakan upload bukti pembayaran');
        navigate(`/payment/${transactionId}`);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout Produk
          </h1>
          <p className="text-gray-600">
            Selesaikan pembelian Anda dengan aman dan mudah
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ringkasan Pesanan
              </h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.provider || 'Panel Management'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spesifikasi:</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 ml-4">
                    <div>• RAM: {product.ram}</div>
                    <div>• Disk: {product.disk}</div>
                    <div>• CPU: {product.cpu}</div>
                    {product.runtime && (
                      <div>• Runtime: {product.runtime}</div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    /bulan, tanpa biaya tambahan
                  </p>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Pembayaran Aman 100%
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Data Anda terlindungi dengan enkripsi SSL
                </p>
              </div>
            </motion.div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Pilih Metode Pembayaran
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <method.icon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              {selectedPayment && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      {selectedPayment === 'midtrans' ? (
                        <>
                          <p className="font-medium mb-1">Pembayaran Otomatis</p>
                          <p>
                            Anda akan diarahkan ke halaman pembayaran Midtrans. 
                            Pembayaran akan diverifikasi otomatis setelah berhasil.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium mb-1">Pembayaran Manual</p>
                          <p>
                            Silakan transfer ke rekening yang tersedia dan upload bukti pembayaran. 
                            Admin akan memverifikasi dalam 1x24 jam.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={handlePayment}
                  disabled={!selectedPayment || isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    <span>
                      {selectedPayment === 'midtrans' 
                        ? 'LANJUT KE PEMBAYARAN' 
                        : 'PILIH METODE MANUAL'}
                    </span>
                  )}
                </button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Dengan melanjutkan, Anda menyetujui{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                    Syarat dan Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                    Kebijakan Privasi
                  </Link>{' '}
                  kami.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
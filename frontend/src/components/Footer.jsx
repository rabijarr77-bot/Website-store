import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ServerIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <ServerIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">DRY HOST</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi hosting dan VPS terbaik untuk website, game, dan aplikasi Anda. 
              Dengan dukungan 24/7 dan performa optimal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pesanan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?type=vps" className="text-gray-400 hover:text-white transition-colors text-sm">
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link to="/products?type=pterodactyl" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Panel Pterodactyl
                </Link>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Game Server</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Web Hosting</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">+62 8XX-XXXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">support@dryhost.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 text-sm">Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} DRY HOST - Semua Hak Dilindungi
            </p>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Syarat & Ketentuan
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Kebijakan Privasi
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
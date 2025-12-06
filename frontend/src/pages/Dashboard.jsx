import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Dashboard User
          </h1>
          <p className="text-gray-600 mb-8">
            Kelola akun, pesanan, dan server Anda di sini
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/profile" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profil</h3>
              <p className="text-gray-600">Kelola informasi akun Anda</p>
            </Link>
            
            <Link to="/orders" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pesanan</h3>
              <p className="text-gray-600">Lihat riwayat dan status pesanan</p>
            </Link>
            
            <Link to="/products" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Produk</h3>
              <p className="text-gray-600">Jelajahi produk kami</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
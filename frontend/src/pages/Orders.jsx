import React from 'react';

const Orders = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pesanan Saya
          </h1>
          <p className="text-gray-600 mb-8">
            Lihat status dan riwayat semua pesanan Anda
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Daftar Pesanan
            </h2>
            <p className="text-gray-600">
              Belum ada pesanan. Mulai belanja sekarang!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
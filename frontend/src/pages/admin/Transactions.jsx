import React from 'react';

const AdminTransactions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Transaksi</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Verifikasi Manual</button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur management transaksi untuk admin. Verifikasi pembayaran, lihat detail transaksi, dan kelola status pesanan.
        </p>
      </div>
    </div>
  );
};

export default AdminTransactions;
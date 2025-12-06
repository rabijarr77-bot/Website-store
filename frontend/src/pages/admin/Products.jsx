import React from 'react';

const AdminProducts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>
        <button className="btn-primary">
          Tambah Produk Baru
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur management produk untuk admin. Tambah, edit, dan hapus produk VPS dan Panel Pterodactyl.
        </p>
      </div>
    </div>
  );
};

export default AdminProducts;
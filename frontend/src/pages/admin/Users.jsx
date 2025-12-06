import React from 'react';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Pengguna</h1>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn-primary">Tambah Pengguna</button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur management pengguna untuk admin. Lihat daftar pengguna, ubah status, dan kelola akses.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
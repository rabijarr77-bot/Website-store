import React from 'react';

const AdminNotifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Notifikasi</h1>
        <button className="btn-primary">
          Buat Notifikasi Baru
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur management notifikasi untuk admin. Kirim notifikasi maintenance, trouble, atau info ke semua user.
        </p>
      </div>
    </div>
  );
};

export default AdminNotifications;
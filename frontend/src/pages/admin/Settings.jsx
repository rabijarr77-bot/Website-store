import React from 'react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <button className="btn-primary">
          Simpan Perubahan
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur pengaturan sistem untuk admin. Konfigurasi API key, payment gateway, dan pengaturan umum.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
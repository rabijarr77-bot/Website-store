import React from 'react';

const AdminServers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Server</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">Refresh Status</button>
          <button className="btn-primary">Tambah Server</button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">
          Fitur monitoring dan management server untuk admin. Lihat status server, restart, dan kelola resource.
        </p>
      </div>
    </div>
  );
};

export default AdminServers;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  ServerIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data untuk dashboard
const mockStats = {
  totalUsers: 1247,
  totalProducts: 8,
  totalServers: 156,
  ordersToday: 23,
  monthlyRevenue: 45600000,
  serversByProvider: [
    { name: 'DigitalOcean', value: 89, color: '#0080FF' },
    { name: 'Vultr', value: 45, color: '#FF6B35' },
    { name: 'Linode', value: 22, color: '#00D26A' }
  ],
  activeRuntimes: [
    { runtime: 'Node.js 20.x', count: 67, status: 'active' },
    { runtime: 'Python 3.11', count: 34, status: 'active' },
    { runtime: 'PHP 8.2', count: 28, status: 'active' }
  ]
};

const mockRecentTransactions = [
  {
    id: '1',
    user: { fullName: 'John Doe', email: 'john@example.com' },
    product: { name: 'VPS Basic', type: 'vps' },
    amount: 199000,
    status: 'verified',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    user: { fullName: 'Jane Smith', email: 'jane@example.com' },
    product: { name: 'Panel Pterodactyl Pro', type: 'pterodactyl' },
    amount: 299000,
    status: 'waiting_verification',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    user: { fullName: 'Bob Johnson', email: 'bob@example.com' },
    product: { name: 'VPS Pro', type: 'vps' },
    amount: 399000,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

const mockChartData = [
  { name: 'Senin', orders: 12, servers: 5 },
  { name: 'Selasa', orders: 19, servers: 8 },
  { name: 'Rabu', orders: 15, servers: 6 },
  { name: 'Kamis', orders: 25, servers: 12 },
  { name: 'Jumat', orders: 22, servers: 9 },
  { name: 'Sabtu', orders: 18, servers: 7 },
  { name: 'Minggu', orders: 14, servers: 4 }
];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [recentTransactions, setRecentTransactions] = useState(mockRecentTransactions);
  const [chartData, setChartData] = useState(mockChartData);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace(',00', '');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckIcon className="w-3 h-3 mr-1" />
            Terverifikasi
          </span>
        );
      case 'waiting_verification':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            Menunggu
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XIcon className="w-3 h-3 mr-1" />
            Dibatalkan
          </span>
        );
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.type === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.type === 'up' ? (
                <TrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              <span>{trend.value}% dari bulan lalu</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">
            Selamat datang kembali, {user?.fullName || 'Administrator'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/transactions"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lihat Transaksi
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers.toLocaleString()}
          icon={UsersIcon}
          color="bg-blue-500"
          trend={{ type: 'up', value: 12 }}
        />
        <StatCard
          title="Produk Aktif"
          value={stats.totalProducts}
          icon={ServerIcon}
          color="bg-green-500"
          trend={{ type: 'up', value: 8 }}
        />
        <StatCard
          title="Pesanan Hari Ini"
          value={stats.ordersToday}
          icon={ShoppingCartIcon}
          color="bg-yellow-500"
          trend={{ type: 'up', value: 15 }}
        />
        <StatCard
          title="Pendapatan Bulan Ini"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={CurrencyDollarIcon}
          color="bg-purple-500"
          trend={{ type: 'up', value: 22 }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tren Pesanan 7 Hari Terakhir
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3B82F6" name="Pesanan" />
              <Bar dataKey="servers" fill="#10B981" name="Server Dibu" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Server Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribusi Server per Provider
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.serversByProvider}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.serversByProvider.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Transactions & Server Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Transaksi Terbaru
            </h3>
            <Link
              to="/admin/transactions"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Lihat Semua
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {transaction.user.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Runtime Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status Runtime Panel Pterodactyl
          </h3>
          
          <div className="space-y-4">
            {stats.activeRuntimes.map((runtime) => (
              <div
                key={runtime.runtime}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {runtime.runtime}
                  </p>
                  <p className="text-sm text-gray-600">
                    {runtime.count} server aktif
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium capitalize">
                    {runtime.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/admin/products"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Tambah Produk
              </Link>
              <Link
                to="/admin/notifications"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Buat Notifikasi
              </Link>
              <Link
                to="/admin/settings"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Pengaturan API
              </Link>
              <Link
                to="/admin/servers"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Monitor Server
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
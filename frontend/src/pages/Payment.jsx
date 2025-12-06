import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { transactionId } = useParams();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Halaman Pembayaran
          </h1>
          <p className="text-gray-600 mb-8">
            Menampilkan detail pembayaran untuk transaksi: {transactionId}
          </p>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-4">
              Fitur pembayaran sedang dikembangkan. Untuk demo, transaksi akan otomatis diverifikasi.
            </p>
            <button className="btn-primary">
              Simulasi Pembayaran Berhasil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
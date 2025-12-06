import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Detail Produk
          </h1>
          <p className="text-gray-600 mb-8">
            Menampilkan detail untuk produk dengan ID: {id}
          </p>
          <Link 
            to="/products"
            className="btn-primary"
          >
            Kembali ke Produk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
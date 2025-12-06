import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Profil User
          </h1>
          <p className="text-gray-600 mb-8">
            Kelola informasi profil dan keamanan akun Anda
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Akun
            </h2>
            <p className="text-gray-600">
              Fitur profil sedang dikembangkan. Anda dapat mengubah nama, email, dan password di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
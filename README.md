# DRY HOST - Platform Hosting dan VPS Indonesia

Website hosting dan VPS profesional dengan fitur lengkap, pembayaran otomatis, dan management panel Pterodactyl.

## 🚀 Fitur Utama

### Untuk Pelanggan
- ✅ Registrasi dan login user dengan JWT authentication
- ✅ Berbagai produk VPS dan Panel Pterodactyl
- ✅ Sistem pembayaran otomatis (Midtrans) dan manual
- ✅ Dashboard user untuk monitoring pesanan dan server
- ✅ Notifikasi real-time untuk status transaksi dan server
- ✅ Desain modern dengan animasi dan efek visual

### Untuk Admin
- ✅ Dashboard admin dengan statistik lengkap
- ✅ Management produk, transaksi, dan pengguna
- ✅ Verifikasi pembayaran manual
- ✅ Sistem notifikasi maintenance/trouble
- ✅ Monitoring server dan runtime panel
- ✅ Pengaturan API untuk provider VPS dan Pterodactyl

### Teknologi
- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
- **Payment**: Midtrans (sandbox)
- **Real-time**: WebSocket untuk notifikasi

## 📋 Persyaratan Sistem

### Backend
- Node.js versi 16 atau lebih tinggi
- MongoDB versi 4.4 atau lebih tinggi
- NPM atau Yarn

### Frontend
- Node.js versi 16 atau lebih tinggi
- NPM atau Yarn

## 🛠️ Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/dryhost.git
cd dryhost
```

### 2. Setup Backend

#### a. Install Dependencies
```bash
cd backend
npm install
```

#### b. Konfigurasi Environment
```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Anda:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/dryhost

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Midtrans (Sandbox)
MIDTRANS_SERVER_KEY=SB-Mid-server-your_server_key
MIDTRANS_CLIENT_KEY=SB-Mid-client-your_client_key
MIDTRANS_IS_PRODUCTION=false

# Pterodactyl API
PTERODACTYL_API_KEY=your_pterodactyl_api_key
PTERODACTYL_URL=https://panel.dryhost.id

# VPS Provider API
DIGITALOCEAN_API_KEY=your_digitalocean_api_key
VULTR_API_KEY=your_vultr_api_key

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

#### c. Jalankan Backend
```bash
# Mode development dengan auto-reload
npm run dev

# Atau mode production
npm start
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

#### a. Install Dependencies
```bash
cd ../frontend
npm install
```

#### b. Konfigurasi Environment
Buat file `.env` di folder frontend:
```env
VITE_API_URL=http://localhost:5000
```

#### c. Jalankan Frontend
```bash
# Mode development
npm run dev

# Build untuk production
npm run build
```

Frontend akan berjalan di `http://localhost:5173`

## 🔧 Konfigurasi Awal

### 1. Setup Database
- Pastikan MongoDB sudah berjalan
- Database akan dibuat otomatis saat pertama kali dijalankan

### 2. Setup Admin
- Login sebagai admin dengan kredensial yang sudah diatur di `.env`
- Atau buat admin pertama melalui database langsung

### 3. Setup Midtrans (Untuk Demo)
- Daftar di https://midtrans.com untuk akun sandbox
- Dapatkan Server Key dan Client Key
- Masukkan ke file `.env`

### 4. Setup Provider VPS (Optional)
- Untuk demo, sistem akan mensimulasikan pembuatan VPS
- Untuk produksi, masukkan API key provider yang sesuai

### 5. Setup Pterodactyl (Optional)
- Install Pterodactyl Panel di server Anda
- Dapatkan API key dari panel admin
- Masukkan URL dan API key ke file `.env`

## 📱 Cara Penggunaan

### Untuk Pelanggan
1. **Registrasi**: Buat akun baru melalui halaman register
2. **Login**: Masuk ke dashboard user
3. **Pilih Produk**: Lihat dan pilih produk yang sesuai
4. **Checkout**: Pilih metode pembayaran dan selesaikan transaksi
5. **Buat Server**: Setelah pembayaran diverifikasi, buat akun server Anda

### Untuk Admin
1. **Login Admin**: Masuk sebagai admin dengan kredensial khusus
2. **Dashboard**: Lihat statistik dan overview sistem
3. **Kelola Produk**: Tambah, edit, atau hapus produk
4. **Verifikasi Transaksi**: Verifikasi pembayaran manual dari user
5. **Monitor Server**: Lihat status semua server yang aktif
6. **Notifikasi**: Kirim notifikasi maintenance atau trouble ke user

## 🔐 Kredensial Default

### Admin Login
- **Username**: admin (atau sesuai konfigurasi .env)
- **Password**: admin123 (atau sesuai konfigurasi .env)

### User Demo
- **Email**: user@example.com
- **Password**: password123

## 🚀 Fitur Demo

### Midtrans Demo
- Sistem menggunakan Midtrans sandbox mode
- Untuk testing, gunakan kartu kredit test: `4811 1111 1111 1114`
- Atau gunakan e-wallet demo yang tersedia

### VPS Demo
- Pembuatan VPS akan mensimulasikan response dari provider
- IP address dan detail server akan di-generate secara acak untuk demo

### Pterodactyl Demo
- Akun panel akan dibuat dengan data dummy untuk demonstrasi
- Subdomain akan mengarah ke panel yang sudah dikonfigurasi

## 📁 Struktur Folder

```
dryhost/
├── backend/
│   ├── controllers/     # Logic bisnis
│   ├── middleware/      # Middleware auth, upload, dll
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── uploads/        # File uploads
│   ├── server.js       # Entry point
│   └── .env           # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Pages/routes
│   │   ├── contexts/   # React contexts
│   │   ├── services/   # API services
│   │   └── App.jsx     # Main app
│   ├── public/         # Static files
│   └── vite.config.js  # Vite configuration
└── README.md
```

## 🛡️ Keamanan

- Password di-hash dengan bcrypt
- JWT untuk autentikasi
- Validasi input pada setiap form
- CORS configuration
- File upload validation
- Environment variables untuk sensitive data

## 📊 Monitoring

- Dashboard admin dengan statistik real-time
- Chart untuk tren pesanan dan server
- Notifikasi untuk transaksi dan status server
- Log aktivitas sistem

## 🎨 Customization

### Warna dan Tema
- Edit file `frontend/tailwind.config.js`
- Ubah warna primary dan secondary sesuai kebutuhan

### Animasi
- Gunakan Framer Motion untuk animasi custom
- Edit komponen di folder `frontend/src/components`

### Logo dan Branding
- Ganti logo di komponen Header
- Ubah nama brand di semua komponen yang relevan

## 🔧 Troubleshooting

### Backend tidak bisa dijalankan
```bash
# Pastikan MongoDB berjalan
sudo systemctl status mongod

# Cek error log
npm run dev
```

### Frontend tidak bisa connect ke backend
```bash
# Pastikan backend berjalan di port 5000
# Cek file frontend/.env untuk API_URL
```

### Socket.io tidak berfungsi
```bash
# Pastikan port WebSocket tidak diblokir firewall
# Cek konfigurasi CORS di backend/server.js
```

## 📞 Dukungan

Untuk bantuan dan support:
- Email: support@dryhost.id
- WhatsApp: +62 8XX-XXXX-XXXX
- Dokumentasi: https://docs.dryhost.id

## 📄 Lisensi

Proyek ini dilisensikan under MIT License.

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch untuk fitur baru
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## 🔄 Update dan Maintenance

Untuk update sistem:
1. Backup database dan file konfigurasi
2. Pull update dari repository
3. Update dependencies jika diperlukan
4. Restart service

---

**DRY HOST - Solusi Hosting Terbaik di Indonesia** 🇮🇩

Built with ❤️ using Node.js, React.js, and MongoDB
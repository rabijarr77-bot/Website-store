# 🚀 Deployment Guide - DRY HOST

## 📋 Persiapan Sebelum Deploy

### 1. Persiapkan Akun yang Dibutuhkan
- **GitHub**: Untuk hosting kode (gratis)
- **Vercel**: Untuk deploy frontend (gratis)
- **Render**: Untuk deploy backend (gratis)
- **MongoDB Atlas**: Untuk database cloud (gratis tier)

### 2. Install Tools
- Git
- Node.js 16+
- MongoDB Compass (optional, untuk manage database)

## 🎯 Langkah Deployment

### Step 1: Setup GitHub Repository

1. Buat akun GitHub di [github.com](https://github.com)
2. Buat repository baru dengan nama `dryhost`
3. Upload kode project ke repository:

```bash
# Di folder project dryhost
git init
git add .
git commit -m "Initial commit - DRY HOST platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dryhost.git
git push -u origin main
```

### Step 2: Deploy Frontend ke Vercel

1. Daftar akun Vercel di [vercel.com](https://vercel.com)
2. Klik "New Project"
3. Import repository GitHub yang sudah dibuat
4. Configure build settings:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: (akan diisi setelah backend deploy)
6. Klik "Deploy"

### Step 3: Setup MongoDB Atlas

1. Daftar di [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create cluster gratis (M0 tier)
3. Setup security:
   - Create database user
   - Add IP access list (0.0.0.0/0 untuk testing)
4. Get connection string:
   - Klik "Connect" → "Connect your application"
   - Copy connection string
   - Simpan untuk environment variable

### Step 4: Deploy Backend ke Render

1. Daftar akun Render di [render.com](https://render.com)
2. Klik "New" → "Web Service"
3. Connect repository GitHub
4. Configure service:
   - **Name**: dryhost-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dryhost
   JWT_SECRET=your_jwt_secret_here
   FRONTEND_URL=https://your-frontend-url.vercel.app
   MIDTRANS_SERVER_KEY=SB-Mid-server-your_key
   MIDTRANS_CLIENT_KEY=SB-Mid-client-your_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
6. Klik "Create Web Service"

### Step 5: Update Environment Variables

1. Setelah backend deploy, dapatkan URL dari Render
2. Update environment variable di Vercel:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com`
3. Redeploy frontend

### Step 6: Setup Midtrans (Untuk Payment Demo)

1. Daftar akun sandbox di [midtrans.com](https://midtrans.com)
2. Dapatkan Server Key dan Client Key dari dashboard
3. Update environment variables di Render
4. Redeploy backend

## 🔧 Environment Variables Reference

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dryhost

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend URL (dari Vercel)
FRONTEND_URL=https://your-frontend-url.vercel.app

# Midtrans Sandbox
MIDTRANS_SERVER_KEY=SB-Mid-server-your_server_key
MIDTRANS_CLIENT_KEY=SB-Mid-client-your_client_key
MIDTRANS_IS_PRODUCTION=false

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Frontend (Vercel Environment Variables)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 📱 Access URLs Setelah Deploy

- **Frontend**: `https://your-project-name.vercel.app`
- **Backend API**: `https://your-backend-url.onrender.com`
- **Admin Login**: `/auth/login` → pilih "Login sebagai Admin"

## 🎉 Testing Aplikasi

### 1. User Flow Testing
- Register akun baru
- Login dan browse produk
- Lakukan checkout dan pembayaran demo
- Lihat dashboard user

### 2. Admin Flow Testing
- Login sebagai admin
- Lihat dashboard statistik
- Verifikasi transaksi (jika manual payment)
- Kelola produk dan pengguna
- Kirim notifikasi maintenance

### 3. Payment Testing (Midtrans)
- Gunakan kartu test: `4811 1111 1111 1114`
- CVV:任意 3 angka
- Expiry:任意 masa depan
- OTP: `112233`

## 🛠️ Troubleshooting

### Frontend tidak bisa connect ke backend
- Pastikan `VITE_API_URL` sudah benar di Vercel
- Cek CORS configuration di backend
- Pastikan backend sudah running

### Database connection error
- Pastikan IP address sudah di-whitelist di MongoDB Atlas
- Cek connection string format
- Pastikan database user punya permission benar

### Payment tidak berfungsi
- Pastikan Midtrans keys sudah benar
- Cek mode sandbox vs production
- Pastikan backend bisa akses Midtrans API

## 📞 Support

Jika mengalami masalah saat deployment:
1. Cek log di Vercel/Render dashboard
2. Pastikan semua environment variables sudah diisi
3. Test koneksi database dengan MongoDB Compass
4. Hubungi support platform (Vercel/Render) jika ada issue teknis

## 🎯 Next Steps Setelah Deploy

1. **Custom Domain**: Setup custom domain untuk branding
2. **SSL Certificate**: Pastikan HTTPS aktif untuk security
3. **Monitoring**: Setup monitoring dan alerting
4. **Backup**: Schedule database backup regular
5. **CDN**: Setup CDN untuk optimasi performa
6. **Analytics**: Tambahkan Google Analytics atau similar

---

**Selamat! 🎉 Website DRY HOST Anda sudah siap diakses dari mana saja!**

Jangan lupa share linknya setelah deploy selesai! 🚀🇮🇩
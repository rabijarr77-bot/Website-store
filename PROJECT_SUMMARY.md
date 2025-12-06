# DRY HOST - Project Summary

## 🎯 Project Overview

DRY HOST adalah platform hosting dan VPS profesional berbahasa Indonesia dengan fitur lengkap termasuk:
- Sistem pembayaran otomatis (Midtrans) dan manual
- Management panel Pterodactyl untuk game server
- VPS dari berbagai provider (DigitalOcean, Vultr, dll)
- Admin panel dengan dashboard dan monitoring
- Notifikasi real-time dan maintenance system

## 🏗️ Architecture & Technology Stack

### Backend (Node.js + Express)
- **Framework**: Express.js dengan middleware security
- **Database**: MongoDB dengan Mongoose ODM
- **Authentication**: JWT dengan bcrypt untuk password hashing
- **Real-time**: Socket.io untuk notifikasi dan update status
- **Payment**: Midtrans client untuk gateway pembayaran
- **File Upload**: Multer untuk handling upload bukti pembayaran

### Frontend (React.js + Vite)
- **Framework**: React 18 dengan hooks dan context API
- **Routing**: React Router DOM untuk navigation
- **Styling**: Tailwind CSS dengan custom animations
- **State Management**: React Query untuk data fetching
- **Forms**: React Hook Form untuk validation
- **Animations**: Framer Motion untuk smooth transitions
- **Icons**: Heroicons untuk consistent iconography

## 📁 Project Structure

```
dryhost/
├── backend/
│   ├── controllers/     # Business logic for each feature
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── transactionController.js
│   │   ├── paymentController.js
│   │   ├── serverController.js
│   │   ├── adminController.js
│   │   └── notificationController.js
│   ├── middleware/      # Authentication & validation
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/         # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Transaction.js
│   │   ├── Server.js
│   │   ├── PaymentMethod.js
│   │   └── Notification.js
│   ├── routes/         # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── transactions.js
│   │   ├── payments.js
│   │   ├── servers.js
│   │   ├── admin.js
│   │   └── notifications.js
│   ├── server.js       # Express server setup
│   └── .env.example    # Environment configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── NotificationBanner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/   # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── layouts/    # Page layouts
│   │   │   ├── MainLayout.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   ├── pages/      # Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Products.jsx
│   │   │       ├── Transactions.jsx
│   │   │       ├── Users.jsx
│   │   │       ├── Servers.jsx
│   │   │       ├── Notifications.jsx
│   │   │       └── Settings.jsx
│   │   ├── services/   # API services
│   │   │   └── authService.js
│   │   ├── App.jsx     # Main application
│   │   └── main.jsx    # React entry point
│   ├── index.html      # HTML template
│   └── vite.config.js  # Vite configuration
├── uploads/            # File uploads directory
└── README.md          # Documentation
```

## ✨ Key Features Implemented

### 1. User Authentication System
- ✅ Registration with email validation
- ✅ Login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Admin authentication separate from users
- ✅ Protected routes with role-based access

### 2. Product Management
- ✅ Two product types: VPS and Pterodactyl Panel
- ✅ Detailed specifications (RAM, CPU, Disk, etc.)
- ✅ Provider information for VPS
- ✅ Runtime information for Pterodactyl
- ✅ Active/inactive product status

### 3. Payment System
- ✅ Midtrans integration for automatic payments
- ✅ Manual payment with upload proof
- ✅ Multiple payment methods (bank transfer, e-wallet)
- ✅ Payment verification system
- ✅ Transaction status tracking

### 4. Server Management
- ✅ VPS creation with provider API
- ✅ Pterodactyl panel account creation
- ✅ Server specifications tracking
- ✅ Status monitoring (active, suspended, terminated)
- ✅ Provider and runtime management

### 5. Admin Panel
- ✅ Comprehensive dashboard with statistics
- ✅ Charts for orders and server trends
- ✅ User management with status toggle
- ✅ Transaction verification system
- ✅ Product CRUD operations
- ✅ Server monitoring and control
- ✅ Notification management system

### 6. Real-time Features
- ✅ WebSocket connection for live updates
- ✅ Payment status notifications
- ✅ Server creation notifications
- ✅ Maintenance/trouble notifications
- ✅ Admin-to-user messaging

### 7. UI/UX Features
- ✅ Modern design with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design for all devices
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Scroll reveal animations

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #1E40AF)
- **Secondary**: Slate gray (#64748B to #1E293B)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (700-900)
- **Body**: Regular weights (400-500)
- **UI Elements**: Semibold weights (600)

### Components
- **Buttons**: Primary, Secondary, Danger variants
- **Cards**: Elevated with hover effects
- **Forms**: Validated with real-time feedback
- **Modals**: Smooth transitions and backdrop blur

## 🔧 Configuration

### Environment Variables
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

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- NPM or Yarn

### Installation Steps
1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Configure environment variables
5. Start backend: `npm run dev`
6. Start frontend: `npm run dev`

### Default Credentials
- **Admin**: Username: `admin`, Password: `admin123`
- **Demo User**: Email: `user@example.com`, Password: `password123`

## 📊 Database Schema

### User Schema
```javascript
{
  fullName: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  isActive: Boolean,
  timestamps: true
}
```

### Product Schema
```javascript
{
  name: String,
  type: String (vps/pterodactyl),
  price: Number,
  ram: String,
  disk: String,
  cpu: String,
  provider: String, // VPS only
  egg: String, // Pterodactyl only
  runtime: String, // Pterodactyl only
  subdomain: String, // Pterodactyl only
  isActive: Boolean,
  timestamps: true
}
```

### Transaction Schema
```javascript
{
  user: ObjectId (ref: User),
  product: ObjectId (ref: Product),
  amount: Number,
  paymentMethod: String (midtrans/manual),
  status: String (pending/waiting_verification/verified/cancelled),
  orderId: String (unique),
  accountCreated: Boolean,
  timestamps: true
}
```

## 🔒 Security Features

### Authentication
- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based access control
- Session management

### Input Validation
- Form validation on both client and server
- SQL injection prevention
- XSS protection
- File upload restrictions

### API Security
- CORS configuration
- Rate limiting
- Request validation
- Error handling without data exposure

## 🎯 Future Enhancements

### Planned Features
1. **Email Integration**: Automated email notifications
2. **SMS Gateway**: OTP and transaction alerts
3. **Advanced Analytics**: Detailed reporting and insights
4. **API Documentation**: Swagger/OpenAPI integration
5. **Mobile App**: React Native mobile application
6. **Multi-language**: Support for multiple languages
7. **Advanced Security**: 2FA and advanced monitoring

### Performance Optimizations
1. **Caching**: Redis for frequently accessed data
2. **CDN**: Static asset delivery optimization
3. **Database Indexing**: Query performance improvements
4. **Lazy Loading**: Component and image lazy loading
5. **Code Splitting**: Bundle optimization

## 🤝 Contributing

### Development Guidelines
1. Follow the established code style
2. Write clear commit messages
3. Test changes thoroughly
4. Update documentation when needed
5. Submit pull requests to the development branch

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Consistent naming conventions
- Proper component composition

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in README.md
- Review the code comments and structure

---

**Built with ❤️ for the Indonesian hosting community** 🇮🇩

*This project represents a complete, production-ready hosting platform with modern architecture and comprehensive features.*
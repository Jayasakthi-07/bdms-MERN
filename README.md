# 🩸 Blood Donation Management System (BDMS) - MERN Stack

<div align="center">

![BDMS](https://img.shields.io/badge/BDMS-Blood%20Donation%20Management-blue?style=for-the-badge)
![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A comprehensive web application for managing blood donation requests, donor profiles, inventory, and administrative operations.**

**ஒரு comprehensive web application blood donation requests, donor profiles, inventory, மற்றும் administrative operations manage பண்ணுவதற்கு.**

</div>

---

## 📋 Table of Contents / உள்ளடக்கம்

- [About / பற்றி](#about--பற்றி)
- [Features / வசதிகள்](#features--வசதிகள்)
- [Tech Stack / தொழில்நுட்பம்](#tech-stack--தொழில்நுட்பம்)
- [Prerequisites / முன்நிபந்தனைகள்](#prerequisites--முன்நிபந்தனைகள்)
- [Installation / நிறுவுதல்](#installation--நிறுவுதல்)
- [Configuration / கட்டமைப்பு](#configuration--கட்டமைப்பு)
- [Usage / பயன்பாடு](#usage--பயன்பாடு)
- [Project Structure / திட்ட அமைப்பு](#project-structure--திட்ட-அமைப்பு)
- [API Documentation / API ஆவணம்](#api-documentation--api-ஆவணம்)
- [Docker Deployment / Docker பயன்பாடு](#docker-deployment--docker-பயன்பாடு)
- [Contributing / பங்களிப்பு](#contributing--பங்களிப்பு)
- [License / உரிமம்](#license--உரிமம்)

---

## 🎯 About / பற்றி

**English:**
BDMS is a full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a complete solution for managing blood donation operations, including donor registration, appointment scheduling, inventory management, and real-time notifications. The system ensures efficient coordination between donors and administrators while maintaining comprehensive audit logs and analytics.

**Thanglish:**
BDMS ஒரு full-stack web application, MERN (MongoDB, Express.js, React, Node.js) stack use பண்ணி build பண்ணப்பட்டது. இது blood donation operations manage பண்ண complete solution provide பண்ணுது, including donor registration, appointment scheduling, inventory management, மற்றும் real-time notifications. System efficient coordination ensure பண்ணுது donors மற்றும் administrators இடையே, comprehensive audit logs மற்றும் analytics maintain பண்ணி.

---

## ✨ Features / வசதிகள்

### For Donors / Donors க்கு

- ✅ **User Registration & Authentication** / **User Registration மற்றும் Authentication**
  - Secure signup and login with JWT tokens
  - Password reset functionality
  - Profile management

- ✅ **Eligibility Checker** / **Eligibility Checker**
  - Automatic eligibility verification based on:
    - Age requirements (18-65 years)
    - Minimum weight (45kg)
    - Donation interval (90 days between donations)
    - Health status

- ✅ **Donation Request Management** / **Donation Request Management**
  - Create new donation requests
  - View request status (Pending, Approved, Rejected, Completed)
  - Track donation history
  - Cancel requests if needed

- ✅ **Real-time Notifications** / **Real-time Notifications**
  - Socket.io powered instant notifications
  - Email notifications for important updates
  - Notification bell with unread count

- ✅ **Dashboard & Analytics** / **Dashboard மற்றும் Analytics**
  - Personal donation statistics
  - Badge system for achievements
  - Donation history with detailed records

### For Administrators / Administrators க்கு

- ✅ **Donor Management** / **Donor Management**
  - View all registered donors
  - Search and filter donors by blood group, status, etc.
  - Activate/deactivate donor accounts
  - View detailed donor profiles

- ✅ **Request Approval Queue** / **Request Approval Queue**
  - Review pending donation requests
  - Approve or reject requests with notes
  - Schedule appointments
  - Mark requests as completed

- ✅ **Inventory Management** / **Inventory Management**
  - Track blood stock by blood group
  - Low stock alerts
  - Add, update, and delete inventory records
  - View inventory summary and statistics

- ✅ **Analytics & Metrics** / **Analytics மற்றும் Metrics**
  - Dashboard with key metrics
  - Blood group distribution charts
  - Monthly donation trends
  - Request status overview
  - Fulfillment rate analysis

- ✅ **Audit Logs** / **Audit Logs**
  - Complete activity tracking
  - User action history
  - System event logs

- ✅ **Settings Management** / **Settings Management**
  - Update admin profile
  - Change password
  - Account information

---

## 🛠️ Tech Stack / தொழில்நுட்பம்

### Frontend / Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

### Backend / Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Socket.io** - Real-time communication
- **Nodemailer** - Email service
- **Swagger** - API documentation
- **Zod** - Schema validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting

### DevOps / DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control

---

## 📦 Prerequisites / முன்நிபந்தனைகள்

Before you begin, ensure you have the following installed:

**English:**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (v7 or higher) or use Docker
- Git

**Thanglish:**
- Node.js (v18 அல்லது higher)
- npm அல்லது yarn
- MongoDB (v7 அல்லது higher) அல்லது Docker use பண்ணலாம்
- Git

---

## 🚀 Installation / நிறுவுதல்

### Step 1: Clone the Repository / Repository Clone பண்ண

```bash
git clone https://github.com/Jayasakthi-07/bdms-MERN.git
cd bdms-MERN
```

### Step 2: Install Dependencies / Dependencies Install பண்ண

**Option 1: Install All at Once (Recommended) / Option 1: எல்லாம் ஒரேயடியாக Install பண்ண (Recommended)**

```bash
npm run install:all
```

**Option 2: Install Separately / Option 2: தனித்தனியாக Install பண்ண**

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### Step 3: Environment Setup / Environment Setup பண்ண

**Server Environment / Server Environment:**

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bdms

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@bdms.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Client Environment / Client Environment:**

Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## ⚙️ Configuration / கட்டமைப்பு

### MongoDB Setup / MongoDB Setup

**Option 1: Local MongoDB / Option 1: Local MongoDB**

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

**Option 2: Docker MongoDB / Option 2: Docker MongoDB**

Use the provided `docker-compose.yml`:

```bash
docker-compose up -d mongodb
```

---

## 🎮 Usage / பயன்பாடு

### Development Mode / Development Mode

**Run Both Client and Server / Client மற்றும் Server இரண்டையும் Run பண்ண:**

```bash
npm run dev
```

This will start:
- **Server** on `http://localhost:5000`
- **Client** on `http://localhost:5173`

**Run Separately / தனித்தனியாக Run பண்ண:**

```bash
# Server only
npm run server:dev

# Client only
npm run client:dev
```

### Seed Database / Database Seed பண்ண

To populate the database with sample data:

```bash
npm run seed
```

For Tamil donor names:

```bash
cd server
npm run seed:tamil
```

### Production Build / Production Build

```bash
# Build both client and server
npm run build

# Build client only
npm run client:build

# Build server only
npm run server:build
```

### Start Production Server / Production Server Start பண்ண

```bash
npm run start:prod
```

---

## 📁 Project Structure / திட்ட அமைப்பு

```
bdms-MERN/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # React components
│   │   │   ├── admin/     # Admin-specific components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── common/    # Shared components
│   │   │   ├── donor/     # Donor-specific components
│   │   │   └── notifications/ # Notification components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── store/         # Context providers
│   │   ├── styles/        # Global styles
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # Node.js backend application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── scripts/       # Database seeding scripts
│   │   ├── services/      # Business logic services
│   │   ├── utils/         # Utility functions
│   │   ├── validators/    # Request validators
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Root Dockerfile
├── package.json            # Root package.json
└── README.md               # This file
```

---

## 📚 API Documentation / API ஆவணம்

Once the server is running, you can access the Swagger API documentation at:

**English:**
- **Swagger UI:** `http://localhost:5000/api-docs`
- **API Base URL:** `http://localhost:5000/api`

**Thanglish:**
- **Swagger UI:** `http://localhost:5000/api-docs`
- **API Base URL:** `http://localhost:5000/api`

### Main API Endpoints / Main API Endpoints

#### Authentication / Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### User / User
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `PATCH /api/users/me/change-password` - Change password
- `GET /api/users/me/history` - Get donation history
- `GET /api/users/me/eligibility` - Check eligibility

#### Donation Requests / Donation Requests
- `POST /api/requests` - Create donation request
- `GET /api/requests` - Get user's requests
- `GET /api/requests/:id` - Get request by ID
- `PATCH /api/requests/:id/cancel` - Cancel request

#### Admin / Admin
- `GET /api/admin/donors` - Get all donors
- `GET /api/admin/donors/:id` - Get donor by ID
- `PATCH /api/admin/donors/:id/toggle-status` - Toggle donor status
- `GET /api/admin/requests` - Get all requests
- `PATCH /api/admin/requests/:id/approve` - Approve request
- `PATCH /api/admin/requests/:id/reject` - Reject request
- `PATCH /api/admin/requests/:id/complete` - Complete request
- `GET /api/admin/audit-logs` - Get audit logs

#### Inventory / Inventory
- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Create inventory record
- `PUT /api/inventory/:id` - Update inventory
- `DELETE /api/inventory/:id` - Delete inventory
- `GET /api/inventory/summary` - Get inventory summary
- `GET /api/inventory/low-stock` - Get low stock alerts

#### Metrics / Metrics
- `GET /api/metrics/summary` - Get dashboard summary
- `GET /api/metrics/blood-group-distribution` - Blood group stats
- `GET /api/metrics/monthly-donations` - Monthly trends
- `GET /api/metrics/request-status` - Request status overview

#### Notifications / Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

---

## 🐳 Docker Deployment / Docker பயன்பாடு

### Using Docker Compose / Docker Compose Use பண்ண

**English:**
The easiest way to run the entire application is using Docker Compose:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# View logs
docker-compose logs -f
```

**Thanglish:**
Entire application run பண்ண easiest way Docker Compose use பண்ண:

```bash
# எல்லா services start பண்ண
docker-compose up -d

# எல்லா services stop பண்ண
docker-compose down

# Rebuild பண்ணி start பண்ண
docker-compose up -d --build

# Logs பாரு
docker-compose logs -f
```

### Services / Services

- **MongoDB:** `localhost:27017`
- **Server:** `localhost:5000`
- **Client:** `localhost:3000`

---

## 🤝 Contributing / பங்களிப்பு

**English:**
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

**Thanglish:**
Contributions welcome! Pull Request submit பண்ணலாம். Major changes க்கு, first issue open பண்ணி discuss பண்ணலாம்.

### Contribution Guidelines / Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License / உரிமம்

This project is licensed under the MIT License - see the LICENSE file for details.

**MIT License** - இந்த project MIT License கீழ் licensed. Details க்கு LICENSE file பாரு.

---

## 👥 Authors / ஆசிரியர்கள்

**BDMS Team**

- **Jayasakthi-07** - [GitHub](https://github.com/Jayasakthi-07)

---

## 🙏 Acknowledgments / நன்றிகள்

**English:**
- Thanks to all contributors who have helped improve this project
- Special thanks to the open-source community for the amazing tools and libraries

**Thanglish:**
- இந்த project improve பண்ண help பண்ண contributors க்கு thanks
- Amazing tools மற்றும் libraries க்கு open-source community க்கு special thanks

---

## 📞 Support / ஆதரவு

**English:**
If you encounter any issues or have questions, please open an issue on GitHub.

**Thanglish:**
எந்த issues அல்லது questions இருந்தா, GitHub இல் issue open பண்ணலாம்.

---

## 🎯 Roadmap / Roadmap

**English:**
Future enhancements planned:
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blood bank location finder
- [ ] Integration with hospital systems

**Thanglish:**
Future enhancements planned:
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blood bank location finder
- [ ] Hospital systems integration

---

<div align="center">

**Made with ❤️ for saving lives / உயிர்களை காப்பாற்றுவதற்காக ❤️ உடன் செய்யப்பட்டது**

⭐ Star this repo if you find it helpful! / Helpful ஆனா இந்த repo-வை ⭐ star பண்ண!

</div>

# 🩸 Blood Donation Management System (BDMS) - MERN Stack

<div align="center">

![BDMS](https://img.shields.io/badge/BDMS-Blood%20Donation%20Management-blue?style=for-the-badge)
![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A comprehensive web application for managing blood donation requests, donor profiles, inventory, and administrative operations.**

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

BDMS is a full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a complete solution for managing blood donation operations, including donor registration, appointment scheduling, inventory management, and real-time notifications. The system ensures efficient coordination between donors and administrators while maintaining comprehensive audit logs and analytics.

---

## ✨ Features

### For Donors

- ✅ **User Registration & Authentication**
  - Secure signup and login with JWT tokens
  - Password reset functionality
  - Profile management

- ✅ **Eligibility Checker**
  - Automatic eligibility verification based on:
    - Age requirements (18-65 years)
    - Minimum weight (45kg)
    - Donation interval (90 days between donations)
    - Health status

- ✅ **Donation Request Management**
  - Create new donation requests
  - View request status (Pending, Approved, Rejected, Completed)
  - Track donation history
  - Cancel requests if needed

- ✅ **Real-time Notifications**
  - Socket.io powered instant notifications
  - Email notifications for important updates
  - Notification bell with unread count

- ✅ **Dashboard & Analytics**
  - Personal donation statistics
  - Badge system for achievements
  - Donation history with detailed records

### For Administrators

- ✅ **Donor Management**
  - View all registered donors
  - Search and filter donors by blood group, status, etc.
  - Activate/deactivate donor accounts
  - View detailed donor profiles

- ✅ **Request Approval Queue**
  - Review pending donation requests
  - Approve or reject requests with notes
  - Schedule appointments
  - Mark requests as completed

- ✅ **Inventory Management**
  - Track blood stock by blood group
  - Low stock alerts
  - Add, update, and delete inventory records
  - View inventory summary and statistics

- ✅ **Analytics & Metrics**
  - Dashboard with key metrics
  - Blood group distribution charts
  - Monthly donation trends
  - Request status overview
  - Fulfillment rate analysis

- ✅ **Audit Logs**
  - Complete activity tracking
  - User action history
  - System event logs

- ✅ **Settings Management**
  - Update admin profile
  - Change password
  - Account information

---

## 🛠️ Tech Stack

### Frontend

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

### Backend

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

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (v7 or higher) or use Docker
- Git

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Jayasakthi-07/bdms-MERN.git
cd bdms-MERN
```

### Step 2: Install Dependencies

**Option 1: Install All at Once (Recommended)**

```bash
npm run install:all
```

**Option 2: Install Separately**

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

### Step 3: Environment Setup

**Server Environment:**

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

**Client Environment:**

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

## ⚙️ Configuration

### MongoDB Setup

**Option 1: Local MongoDB**

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

**Option 2: Docker MongoDB**

Use the provided `docker-compose.yml`:

```bash
docker-compose up -d mongodb
```

---

## 🎮 Usage

### Development Mode

**Run Both Client and Server:**

```bash
npm run dev
```

This will start:
- **Server** on `http://localhost:5000`
- **Client** on `http://localhost:5173`

**Run Separately:**

```bash
# Server only
npm run server:dev

# Client only
npm run client:dev
```

### Seed Database

To populate the database with sample data:

```bash
npm run seed
```

For Tamil donor names:

```bash
cd server
npm run seed:tamil
```

### Production Build

```bash
# Build both client and server
npm run build

# Build client only
npm run client:build

# Build server only
npm run server:build
```

### Start Production Server

```bash
npm run start:prod
```

---

## 📁 Project Structure

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

## 📚 API Documentation

Once the server is running, you can access the Swagger API documentation at:

- **Swagger UI:** `http://localhost:5000/api-docs`
- **API Base URL:** `http://localhost:5000/api`

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### User
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `PATCH /api/users/me/change-password` - Change password
- `GET /api/users/me/history` - Get donation history
- `GET /api/users/me/eligibility` - Check eligibility

#### Donation Requests
- `POST /api/requests` - Create donation request
- `GET /api/requests` - Get user's requests
- `GET /api/requests/:id` - Get request by ID
- `PATCH /api/requests/:id/cancel` - Cancel request

#### Admin
- `GET /api/admin/donors` - Get all donors
- `GET /api/admin/donors/:id` - Get donor by ID
- `PATCH /api/admin/donors/:id/toggle-status` - Toggle donor status
- `GET /api/admin/requests` - Get all requests
- `PATCH /api/admin/requests/:id/approve` - Approve request
- `PATCH /api/admin/requests/:id/reject` - Reject request
- `PATCH /api/admin/requests/:id/complete` - Complete request
- `GET /api/admin/audit-logs` - Get audit logs

#### Inventory
- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Create inventory record
- `PUT /api/inventory/:id` - Update inventory
- `DELETE /api/inventory/:id` - Delete inventory
- `GET /api/inventory/summary` - Get inventory summary
- `GET /api/inventory/low-stock` - Get low stock alerts

#### Metrics
- `GET /api/metrics/summary` - Get dashboard summary
- `GET /api/metrics/blood-group-distribution` - Blood group stats
- `GET /api/metrics/monthly-donations` - Monthly trends
- `GET /api/metrics/request-status` - Request status overview

#### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

---

## 🐳 Docker Deployment

### Using Docker Compose

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

### Services

- **MongoDB:** `localhost:27017`
- **Server:** `localhost:5000`
- **Client:** `localhost:3000`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contribution Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

**BDMS Team**

- **Jayasakthi-07** - [GitHub](https://github.com/Jayasakthi-07)

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Special thanks to the open-source community for the amazing tools and libraries

---

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

## 🎯 Roadmap

Future enhancements planned:
- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blood bank location finder
- [ ] Integration with hospital systems

---

<div align="center">

**Made with ❤️ for saving lives**

⭐ Star this repo if you find it helpful!

</div>

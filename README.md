# 🩸 Blood Donation Management System (BDMS)

<div align="center">

![BDMS](https://img.shields.io/badge/BDMS-Blood%20Donation%20Management-red?style=for-the-badge&logo=heart&logoColor=white)
![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Jayasakthi-07/bdms-MERN?style=social)](https://github.com/Jayasakthi-07/bdms-MERN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Jayasakthi-07/bdms-MERN?style=social)](https://github.com/Jayasakthi-07/bdms-MERN/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Jayasakthi-07/bdms-MERN)](https://github.com/Jayasakthi-07/bdms-MERN/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Jayasakthi-07/bdms-MERN)](https://github.com/Jayasakthi-07/bdms-MERN/pulls)

**A comprehensive full-stack web application for managing blood donation operations, built with modern technologies to save lives efficiently.**

[⭐ Star this repo](https://github.com/Jayasakthi-07/bdms-MERN) • [🐛 Report Bug](https://github.com/Jayasakthi-07/bdms-MERN/issues) • [💡 Request Feature](https://github.com/Jayasakthi-07/bdms-MERN/issues) • [📖 Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🎮 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [📚 API Documentation](#-api-documentation)
- [🐳 Docker Deployment](#-docker-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Features

### 👥 For Donors

- 🔐 **Secure Authentication** - JWT-based authentication with password reset
- ✅ **Eligibility Checker** - Automatic verification based on age, weight, donation interval
- 📅 **Request Management** - Create, track, and manage donation requests
- 🔔 **Real-time Notifications** - Instant updates via Socket.io and email
- 📊 **Personal Dashboard** - View donation history, statistics, and achievements
- 🏆 **Badge System** - Earn badges for your contributions

### 👨‍💼 For Administrators

- 👥 **Donor Management** - Comprehensive donor database with search and filters
- ✅ **Request Approval Queue** - Review and manage donation requests
- 📦 **Inventory Management** - Track blood stock with low-stock alerts
- 📈 **Analytics Dashboard** - Visual charts and metrics for insights
- 📋 **Audit Logs** - Complete activity tracking and history
- ⚙️ **Settings Management** - Profile and account management

### 🎯 Key Highlights

- ⚡ **Real-time Updates** - Socket.io for instant notifications
- 🔒 **Secure** - JWT authentication, password hashing, rate limiting
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Material-UI with Tailwind CSS
- 📊 **Analytics** - Comprehensive metrics and reporting
- 🐳 **Docker Ready** - Easy deployment with Docker Compose
- 📖 **API Documentation** - Swagger/OpenAPI documentation

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-007ACC?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.11-646CFF?logo=vite)
![Material-UI](https://img.shields.io/badge/MUI-5.15.3-007FFF?logo=mui)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI** - Beautiful components
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching & caching
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.6.1-010101?logo=socket.io)

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Swagger** - API documentation
- **Nodemailer** - Email service

### DevOps
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git)

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (v7 or higher) or Docker

### Local Development

```bash
# Clone the repository
git clone https://github.com/Jayasakthi-07/bdms-MERN.git
cd bdms-MERN

# Install all dependencies
npm run install:all

# Setup environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development servers
npm run dev
```

Visit `http://localhost:5173` to see the application! 🎉

### 🌐 Deploy Online (Free)

Want to host your app online for free? Check out our **[Deployment Guide](DEPLOYMENT.md)**!

Deploy to:
- **Frontend:** Vercel (Free)
- **Backend:** Render (Free)
- **Database:** MongoDB Atlas (Free)

Get your public link in minutes! 🚀

---

## 📦 Installation

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
npm install                    # Root dependencies
cd client && npm install && cd ..  # Client dependencies
cd server && npm install && cd ..  # Server dependencies
```

### Step 3: Environment Setup

**Server Environment (`server/.env`):**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bdms
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@bdms.com
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Client Environment (`client/.env`):**

```env
VITE_API_URL=http://localhost:5000
```

---

## ⚙️ Configuration

### MongoDB Setup

**Option 1: Local MongoDB**

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

**Option 2: Docker MongoDB**

```bash
docker-compose up -d mongodb
```

---

## 🎮 Usage

### Development Mode

```bash
# Run both client and server
npm run dev

# Run separately
npm run server:dev  # Server only (port 5000)
npm run client:dev  # Client only (port 5173)
```

### Seed Database

```bash
# Populate with sample data
npm run seed

# Tamil donor names
cd server && npm run seed:tamil
```

### Production Build

```bash
npm run build           # Build both
npm run client:build    # Client only
npm run server:build    # Server only
npm run start:prod      # Start production server
```

---

## 📁 Project Structure

```
bdms-MERN/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API services
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route config
│   │   ├── store/         # Context providers
│   │   └── utils/         # Utilities
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utilities
│   └── package.json
│
├── docker-compose.yml      # Docker config
└── README.md
```

---

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI:** `http://localhost:5000/api-docs`
- **API Base URL:** `http://localhost:5000/api`

### Main Endpoints

<details>
<summary><b>Authentication</b></summary>

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
</details>

<details>
<summary><b>User</b></summary>

- `GET /api/users/me` - Get profile
- `PUT /api/users/me` - Update profile
- `PATCH /api/users/me/change-password` - Change password
- `GET /api/users/me/history` - Donation history
- `GET /api/users/me/eligibility` - Check eligibility
</details>

<details>
<summary><b>Donation Requests</b></summary>

- `POST /api/requests` - Create request
- `GET /api/requests` - Get user's requests
- `GET /api/requests/:id` - Get by ID
- `PATCH /api/requests/:id/cancel` - Cancel request
</details>

<details>
<summary><b>Admin</b></summary>

- `GET /api/admin/donors` - Get all donors
- `PATCH /api/admin/donors/:id/toggle-status` - Toggle status
- `GET /api/admin/requests` - Get all requests
- `PATCH /api/admin/requests/:id/approve` - Approve request
- `PATCH /api/admin/requests/:id/reject` - Reject request
- `GET /api/admin/audit-logs` - Get audit logs
</details>

<details>
<summary><b>Inventory</b></summary>

- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Create record
- `PUT /api/inventory/:id` - Update record
- `DELETE /api/inventory/:id` - Delete record
- `GET /api/inventory/summary` - Get summary
- `GET /api/inventory/low-stock` - Low stock alerts
</details>

---

## 🐳 Docker Deployment

### Using Docker Compose

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

**Services:**
- MongoDB: `localhost:27017`
- Server: `localhost:5000`
- Client: `localhost:3000`

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**BDMS Team**

- **Jayasakthi-07** - [GitHub](https://github.com/Jayasakthi-07)

---

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Special thanks to the open-source community for amazing tools and libraries
- Built with ❤️ to help save lives

---

## 📞 Support

- 🐛 [Report a Bug](https://github.com/Jayasakthi-07/bdms-MERN/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/Jayasakthi-07/bdms-MERN/issues/new?template=feature_request.md)
- 💬 [Ask a Question](https://github.com/Jayasakthi-07/bdms-MERN/issues)

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blood bank location finder
- [ ] Integration with hospital systems
- [ ] PWA support
- [ ] Dark mode enhancements

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ for saving lives**

[⬆ Back to Top](#-blood-donation-management-system-bdms)

</div>

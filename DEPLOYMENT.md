# 🚀 Deployment Guide

This guide will help you deploy the BDMS application for free using Vercel (Frontend) and Render (Backend).

## 📋 Prerequisites

1. GitHub account (your code is already on GitHub)
2. Vercel account (free) - [Sign up here](https://vercel.com/signup)
3. Render account (free) - [Sign up here](https://render.com/signup)
4. MongoDB Atlas account (free) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Username: `bdms_user`
   - Password: Generate a strong password (save it!)
5. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0) for development
6. Get your connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://bdms_user:yourpassword@cluster0.xxxxx.mongodb.net/bdms?retryWrites=true&w=majority`

---

## 🔧 Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `Jayasakthi-07/bdms-MERN`
4. Configure the service:
   - **Name:** `bdms-server`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLIENT_URL=https://your-frontend-url.vercel.app
   JWT_ACCESS_SECRET=your-super-secret-jwt-access-key-minimum-32-characters-long
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your-refresh-secret-key-minimum-32-characters-long
   JWT_REFRESH_EXPIRES_IN=7d
   SOCKET_CORS_ORIGIN=https://your-frontend-url.vercel.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@bdms.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```
6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://bdms-server.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository: `Jayasakthi-07/bdms-MERN`
4. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Use the backend URL from Step 2)
6. Click **Deploy**
7. Wait for deployment (2-3 minutes)
8. Copy your frontend URL (e.g., `https://bdms-mern.vercel.app`)

---

## 🔄 Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Edit your backend service
3. Update the `CLIENT_URL` environment variable with your Vercel URL
4. Update the `SOCKET_CORS_ORIGIN` environment variable with your Vercel URL
5. Redeploy the service

---

## ✅ Step 5: Verify Deployment

1. Visit your frontend URL
2. Try to register a new user
3. Check if the API is working
4. Test the login functionality

---

## 🔐 Gmail App Password Setup (for Email)

If you want email notifications to work:

1. Go to your Google Account settings
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS` environment variable

---

## 📝 Quick Reference

### Backend URL (Render)
```
https://bdms-server.onrender.com
```

### Frontend URL (Vercel)
```
https://bdms-mern.vercel.app
```

### API Documentation
```
https://bdms-server.onrender.com/api-docs
```

---

## 🐛 Troubleshooting

### Backend not starting?
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB Atlas connection string is correct

### Frontend can't connect to backend?
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend URL is accessible

### Database connection issues?
- Verify MongoDB Atlas IP whitelist includes Render IPs
- Check connection string format
- Check database user credentials

---

## 🎉 Success!

Your application should now be live! Share your frontend URL with others.

**Frontend:** https://your-app.vercel.app
**Backend API:** https://your-backend.onrender.com
**API Docs:** https://your-backend.onrender.com/api-docs


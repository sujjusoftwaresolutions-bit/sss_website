# Deployment Guide

This guide provides step-by-step instructions for deploying the entire SUJJU Software Solutions platform.

## 1. Database Deployment (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster.
3. Under "Database Access", create a database user with a secure password.
4. Under "Network Access", add `0.0.0.0/0` to allow connections from anywhere (or restrict to your Render IP).
5. Click "Connect" -> "Connect your application" and copy the Connection String.
6. Replace `<password>` with your database user password.

## 2. Backend Deployment (Render)
1. Push the entire codebase to GitHub.
2. Go to [Render](https://render.com/) and click "New Web Service".
3. Connect your GitHub repository.
4. Set the following details:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server.js`)
5. Add the following Environment Variables (`.env`):
   - `PORT`: `10000`
   - `MONGODB_URI`: (Your MongoDB Atlas connection string)
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_EMAIL`: (Your professional email)
   - `SMTP_PASSWORD`: (Your App Password)
6. Click "Create Web Service". Copy the generated backend URL (e.g., `https://sujju-backend.onrender.com`).

## 3. AI Service Deployment (Render)
1. On Render, click "New Web Service".
2. Set the following details:
   - **Root Directory**: `ai-service`
   - **Build Command**: `pip install -r requirements.txt` (Make sure you generate a requirements.txt file)
   - **Start Command**: `gunicorn app:app`
3. Click "Create Web Service".

## 4. Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com/) and click "Add New Project".
2. Import your GitHub repository.
3. Set the **Framework Preset** to `Vite`.
4. Set the **Root Directory** to `frontend`.
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: (Your backend URL from step 2, e.g., `https://sujju-backend.onrender.com/api`)
6. Click "Deploy".

Your platform is now live!

# 🚀 Complete Namecheap Deployment Guide
## SUJJU Software Solutions Platform

This comprehensive guide covers how to deploy the **SUJJU Software Solutions** full-stack website (React Vite Frontend + Express Node.js Backend + MongoDB Atlas Database) on **Namecheap Hosting**.

---

## 📋 Architecture Overview on Namecheap

| Component | Technology | Namecheap Deployment Target |
| :--- | :--- | :--- |
| **Frontend** | React (Vite, TailwindCSS, GSAP) | Namecheap `public_html` (Static Web Hosting + Apache `.htaccess`) |
| **Backend** | Node.js (Express, REST API) | Namecheap cPanel **"Setup Node.js App"** (Phusion Passenger) or Subdomain |
| **Database** | MongoDB | Cloud-hosted **MongoDB Atlas** (Free Tier cluster) |
| **SSL / HTTPS** | SSL / TLS Certificate | Namecheap **AutoSSL** / Let's Encrypt (Free in cPanel) |

---

## ⚡ STEP 1: Set Up MongoDB Atlas (Cloud Database)

Since Namecheap Shared Hosting natively runs MySQL/PostgreSQL, Node.js applications use **MongoDB Atlas** (official cloud MongoDB service).

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up / sign in.
2. Click **Create a Deployment** -> Choose **M0 Free Shared Cluster**.
3. Under **Database Access**:
   - Create a database user (e.g., username: `sujju_admin`, password: generate a secure password).
4. Under **Network Access**:
   - Click **Add IP Address** -> Select **Allow Access from Anywhere (`0.0.0.0/0`)** so Namecheap servers can connect.
5. Click **Database** -> **Connect** -> **Drivers**:
   - Copy the MongoDB connection string. It will look like this:
     ```text
     mongodb+srv://sujju_admin:<password>@cluster0.abcde.mongodb.net/sujju_software?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual database user password.

---

## 🛠️ STEP 2: Deploy Backend on Namecheap cPanel

Namecheap cPanel includes built-in support for running Node.js apps.

### 2.1 Prepare Backend Code locally
1. Ensure your backend folder contains:
   - `server.js`
   - `passenger.js`
   - `package.json`
   - `routes/`, `controllers/`, `models/`, `middleware/`, `config/` folders
2. Create a `.zip` archive of the `backend` folder (excluding `node_modules`).

### 2.2 Create Node.js Application in Namecheap cPanel
1. Log into your **Namecheap Account** -> Go to **cPanel**.
2. Scroll down to **Software** -> Click **Setup Node.js App**.
3. Click **Create Application**:
   - **Node.js version**: Choose **18.x** or **20.x** (or latest available).
   - **Application mode**: Select `Production`.
   - **Application root**: Type `backend` (or `api.sujjusoftware.com`).
   - **Application URL**: Choose your domain or subdomain (e.g., `api.yourdomain.com` or `yourdomain.com/api`).
   - **Application startup file**: Type `passenger.js` (or `server.js`).
4. Click **Create**.

### 2.3 Upload Backend Files & Install Dependencies
1. In cPanel, open **File Manager**.
2. Navigate to the application root folder created by cPanel (e.g., `/home/username/backend`).
3. Upload your `backend.zip` file and click **Extract**.
4. Return to **cPanel** -> **Setup Node.js App**.
5. Click the **Edit (Pencil Icon)** on your application.
6. Scroll to **Environment variables** -> Click **Add Variable** and enter the following:

   | Key | Example Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `FRONTEND_URL` | `https://yourdomain.com` |
   | `MONGODB_URI` | `mongodb+srv://sujju_admin:YourPass@cluster0.abcde.mongodb.net/sujju_software?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `sujju_production_jwt_secret_key_2026` |
   | `SMTP_HOST` | `mail.yourdomain.com` (or `smtp.gmail.com`) |
   | `SMTP_PORT` | `465` (or `587`) |
   | `SMTP_EMAIL` | `contact@yourdomain.com` |
   | `SMTP_PASSWORD` | `your_email_password` |

7. Click **Save**.
8. At the top of the Node.js App page, click **Run NPM Install**.
9. Click **Restart Application**.
10. Test your backend live endpoint in browser: `https://yourdomain.com/api/health` or `https://api.yourdomain.com/health`. You should see:
    ```json
    { "status": "ok", "message": "SUJJU Software Solutions API is running" }
    ```

---

## 🎨 STEP 3: Deploy Frontend on Namecheap (`public_html`)

### 3.1 Build Frontend Locally
1. In your local terminal, navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Open or create `.env.production` in `frontend/`:
   ```env
   VITE_API_URL=https://yourdomain.com/api
   ```
   *(Or `https://api.yourdomain.com/api` if you created a backend subdomain)*
3. Run the production build command:
   ```bash
   npm run build
   ```
4. This generates a `dist` folder containing the optimized static website files along with `.htaccess`.

### 3.2 Upload Frontend to Namecheap
1. Open cPanel -> **File Manager**.
2. Go to `public_html` (the root directory for your primary domain).
3. If there are default files (like `index.php` or `default.html`), remove them.
4. Upload all contents inside your local `frontend/dist/` directory into `public_html`.
5. Ensure `.htaccess` is uploaded into `public_html`. (In cPanel File Manager, click **Settings** at top-right -> check **Show Hidden Files (dotfiles)** to see `.htaccess`).

---

## 🔒 STEP 4: Enable SSL (HTTPS) on Namecheap

1. In cPanel, search for **SSL/TLS Status** or **AutoSSL**.
2. Click **Run AutoSSL** (Namecheap provides free SSL for all domains hosted on their cPanel).
3. Once completed, your domain `https://yourdomain.com` will display a secure padlock SSL badge automatically.

---

## 🌐 STEP 5: Namecheap DNS Setup

If your domain is registered on Namecheap:
1. Log into your **Namecheap Dashboard** -> Go to **Domain List**.
2. Click **Manage** next to your domain.
3. Under **Nameservers**:
   - If using Namecheap Web Hosting: Select **Namecheap Web Hosting DNS**.
   - If using Custom DNS: Point A Record `@` to your Namecheap cPanel Server IP address.
4. Changes save automatically and propagate globally in a few minutes.

---

## 🐧 ALTERNATIVE: Deploying on Namecheap VPS (Ubuntu Linux)

If you purchased a **Namecheap VPS** (Virtual Private Server) with SSH access:

### 1. SSH into Server
```bash
ssh root@your-vps-ip
```

### 2. Install Node.js, PM2, and Nginx
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
```

### 3. Clone & Setup Backend
```bash
cd /var/www
git clone <your-repository-url> sss_website
cd sss_website/backend
npm install
pm2 start server.js --name "sujju-backend"
pm2 save
pm2 startup
```

### 4. Build Frontend
```bash
cd /var/www/sss_website/frontend
npm install
npm run build
```

### 5. Configure Nginx (`/etc/nginx/sites-available/default`)
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend Static Distribution
    location / {
        root /var/www/sss_website/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Enable SSL with Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ✅ Deployment Verification Checklist

- [ ] Backend status check returns `{ "status": "ok" }` on live URL.
- [ ] MongoDB Atlas connection successfully creates/updates documents.
- [ ] Frontend routes work on refresh (verified by `.htaccess` SPA fallback).
- [ ] Contact form emails sent via SMTP.
- [ ] SSL padlock displays active HTTPS connection on domain.

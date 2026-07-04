# SUJJU Software Solutions — Deployment Checklist

Use this checklist for a first-time production deployment. Check off each step as you complete it.

---

## Phase 1 — Database (MongoDB Atlas)

- [ ] Create a free [MongoDB Atlas](https://mongodb.com/cloud/atlas) account.
- [ ] Create a new **Shared** cluster (M0 Free tier).
- [ ] Under **Database Access**: Create a user with username + password. Note them down.
- [ ] Under **Network Access**: Add `0.0.0.0/0` (allows all IPs — required for Render).
- [ ] Click **Connect → Connect your application**.
- [ ] Copy the connection string. Replace `<password>` with your database user password.
- [ ] Confirm the URI looks like: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/sujju_software`

---

## Phase 2 — Backend (Render)

- [ ] Push the full project to a GitHub repository.
- [ ] Go to [Render](https://render.com) → **New → Web Service**.
- [ ] Connect your GitHub repository.
- [ ] Set **Root Directory** to `backend`.
- [ ] Set **Build Command** to `npm install`.
- [ ] Set **Start Command** to `node server.js`.
- [ ] Under **Environment Variables**, add:
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `10000`
  - [ ] `MONGODB_URI` = *(your Atlas connection string)*
  - [ ] `FRONTEND_URL` = *(your Vercel URL — add after Step 4)*
  - [ ] `SMTP_HOST` = `smtp.gmail.com`
  - [ ] `SMTP_PORT` = `587`
  - [ ] `SMTP_EMAIL` = *(your Gmail address)*
  - [ ] `SMTP_PASSWORD` = *(your 16-char Gmail App Password)*
- [ ] Click **Create Web Service**.
- [ ] Wait for deploy to complete. Test: `https://your-backend.onrender.com/health`
- [ ] Copy the backend URL.

---

## Phase 3 — AI Service (Render)

- [ ] On Render → **New → Web Service**.
- [ ] Connect the same GitHub repository.
- [ ] Set **Root Directory** to `ai-service`.
- [ ] Set **Build Command** to `pip install -r requirements.txt`.
- [ ] Set **Start Command** to `gunicorn app:app`.
- [ ] Under **Environment Variables**, add:
  - [ ] `FLASK_ENV` = `production`
- [ ] Click **Create Web Service**.
- [ ] Test: `https://your-ai-service.onrender.com/health`

---

## Phase 4 — Frontend (Vercel)

- [ ] Go to [Vercel](https://vercel.com) → **Add New Project**.
- [ ] Import your GitHub repository.
- [ ] Set **Framework Preset** to `Vite`.
- [ ] Set **Root Directory** to `frontend`.
- [ ] Under **Environment Variables**, add:
  - [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`
- [ ] Click **Deploy**.
- [ ] Wait for the build to complete.
- [ ] Copy your Vercel URL (e.g., `https://sujjusoftware.vercel.app`).

---

## Phase 5 — Post-Deployment

- [ ] Go back to **Render → Backend service → Environment**.
- [ ] Update `FRONTEND_URL` to your Vercel URL.
- [ ] Click **Save Changes** (this triggers a redeploy for the CORS fix).
- [ ] Test the contact form end-to-end:
  - [ ] Submit a message from the live site.
  - [ ] Confirm it appears in MongoDB Atlas (Browse Collections → `contactmessages`).
  - [ ] Confirm the email arrives at your SMTP inbox.
- [ ] Test all navigation links.
- [ ] Test the AI validation demo on the CivicSense AI page.
- [ ] Verify all galleries load correctly.
- [ ] Check the site on mobile (375px) and desktop (1440px).

---

## Phase 6 — (Optional) Custom Domain

- [ ] Purchase a domain (e.g., via GoDaddy or Namecheap).
- [ ] In Vercel: **Project Settings → Domains → Add Domain**.
- [ ] Point your domain's DNS to Vercel as instructed.
- [ ] In Render: **Custom Domains** → add your API subdomain (e.g., `api.sujjusoftware.com`).
- [ ] Update `VITE_API_URL` and `FRONTEND_URL` to use the custom domains.
- [ ] Redeploy both services.

---

## 🎉 You're Live!

Your SUJJU Software Solutions website is now running on:
- **Frontend**: Vercel (CDN-distributed globally)
- **Backend**: Render (auto-scaled)
- **Database**: MongoDB Atlas (cloud-managed)

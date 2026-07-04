# SUJJU Software Solutions — MERN Stack Website

A world-class, production-ready company website for **SUJJU Software Solutions**, built with the MERN stack and featuring premium GSAP/Framer Motion animations, the CivicSense AI flagship product showcase, and a secure Express backend with Nodemailer integration.

---

## 🏗 Tech Stack

| Layer       | Technology                                             |
|-------------|--------------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS v4, Framer Motion, GSAP  |
| Backend     | Node.js, Express 5, MongoDB/Mongoose, Nodemailer       |
| AI Service  | Flask 3, Python 3.9+ (YOLOv8 placeholder)             |
| Security    | Helmet, express-rate-limit, express-mongo-sanitize     |
| Deployment  | Vercel (FE) · Render (BE + AI) · MongoDB Atlas (DB)   |

---

## 📁 Project Structure

```
SSS_Website/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Shared components (Navbar, Footer, SEO)
│   │   │   ├── home/          # Home page section components
│   │   │   └── civicsense/    # CivicSense AI page components
│   │   ├── layouts/           # MainLayout wrapper
│   │   ├── pages/             # Route-level pages (Home, About, Services, CivicSenseAI, Contact)
│   │   └── utils/             # Axios API utility
│   ├── .env.example
│   └── vite.config.js
│
├── backend/                   # Express API server
│   ├── controllers/           # Business logic (contactController)
│   ├── models/                # Mongoose schemas (ContactMessage)
│   ├── routes/                # Express routers (contact, services, gallery, ai)
│   ├── server.js              # Entry point with security middleware
│   └── .env.example
│
├── ai-service/                # Flask YOLOv8 microservice (mock)
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
├── README.md
├── DEPLOYMENT_GUIDE.md
└── API_DOCUMENTATION.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB running locally or a MongoDB Atlas account

### 1. Clone & Setup

```bash
git clone https://github.com/your-org/sss-website.git
cd SSS_Website
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and SMTP credentials
npm start
# → API running at http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: set VITE_API_URL=http://localhost:5000/api
npm run dev
# → App running at http://localhost:5173
```

### 4. AI Service (Optional — mock works without it)

```bash
cd ai-service
pip install -r requirements.txt
python app.py
# → Mock AI service at http://localhost:5001
```

---

## 🔐 Environment Variables

| File                       | Key Variables                                                                 |
|----------------------------|-------------------------------------------------------------------------------|
| `backend/.env`             | `MONGODB_URI`, `SMTP_*`, `PORT`, `NODE_ENV`, `FRONTEND_URL`                   |
| `frontend/.env`            | `VITE_API_URL`                                                                |
| `ai-service/.env`          | `FLASK_PORT`, `MODEL_WEIGHTS_PATH` (when real model is integrated)            |

**Never commit `.env` files.** Use `.env.example` as the template.

---

## 🧪 Testing the Contact Form

1. Start both backend and frontend.
2. Navigate to `/contact`.
3. Fill in all required fields and submit.
4. The backend will:
   - Validate and sanitize all inputs.
   - Store the message in MongoDB.
   - Send an email via Nodemailer (if SMTP is configured).
5. A success/error toast will appear on the frontend.

---

## 🚀 Deployment

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for full step-by-step instructions:

- Frontend → **Vercel**
- Backend → **Render**
- AI Service → **Render**
- Database → **MongoDB Atlas**

---

## 🛡 Security Features

- **Helmet** — Secure HTTP headers
- **Rate Limiting** — Global 100 req/15 min; Contact form 10 req/hr
- **Mongo Sanitize** — NoSQL injection prevention
- **Input Validation** — Server-side regex validation on all contact fields
- **XSS Sanitization** — HTML tags stripped from all user inputs
- **CORS** — Locked to specific allowed origins
- **Payload Limits** — Request body capped at 10KB

---

## 🔌 API Reference

See **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** for the complete API reference.

---

## 🏆 CivicSense AI

The CivicSense AI page is the flagship product showcase. It features:
- Interactive mock YOLOv8 AI validation demo
- System architecture visualization
- Live animated workflow diagram
- Awards timeline with all competition results
- Full image galleries with lightbox

The `/ai/validate` endpoint is a mock that mirrors the interface of the real YOLOv8 Flask microservice. To integrate the real model, replace `ai-service/app.py` with the actual YOLOv8 inference code — no frontend changes required.

---

## 📞 Contact

**Chandrasekhar Uppu** — Founder, SUJJU Software Solutions  
📍 2nd Floor, Mahalakshmi Complex-2, Near Apsara Theatre, Vijayawada, Andhra Pradesh  
📞 +91 9440420820 | WhatsApp: +91 8885856060  
✉️ info@sujjusoftware.com

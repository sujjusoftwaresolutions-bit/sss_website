require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Disable X-Powered-By Header ──────────────────────────────────────────────
app.disable('x-powered-by');

// ─── Enterprise High-Security HTTP Headers (Helmet) ───────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com', 'https://images.unsplash.com'],
        connectSrc: ["'self'", 'https://api.cloudinary.com', 'https://*.mongodb.net'],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// ─── Dynamic CORS (Strict Origin Whitelist - No Netlify) ──────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sujjusoftware.com',
  'https://www.sujjusoftware.com',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser calls (like curl, mobile app) in dev mode or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Access Denied: CORS policy restricts this request.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
}));

// ─── Rate Limiting (DDoS & Brute-Force Shield) ───────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Strict 5 failed login/register attempts per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Account temporarily locked for 15 minutes.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/contact', contactLimiter);

// ─── Body Parsing & Data Sanitization ──────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Prevent large payload flooding
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Prevent NoSQL Query Injection ($gt, $ne, etc.) - commented out due to incompatibility with Express 5
// app.use(mongoSanitize({ replaceWith: '_' }));

// Protect against HTTP Parameter Pollution (HPP)
app.use(hpp());

// ─── Static Files ──────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── MongoDB Connection ────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sujju_software')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/ai', require('./routes/aiRoutes'));

// ─── Root Route ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 SUJJU Software Solutions API is live!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      certificates: '/api/certificates',
      contact: '/api/contact',
      health: '/health',
    }
  });
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SUJJU Software Solutions API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

module.exports = app;


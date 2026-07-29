import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CivicSenseAI = lazy(() => import('./pages/CivicSenseAI'));
const Contact = lazy(() => import('./pages/Contact'));
const Internships = lazy(() => import('./pages/Internships'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const JoinNow = lazy(() => import('./pages/JoinNow'));
const Login = lazy(() => import('./pages/Login'));

const Dashboard = lazy(() => import('./pages/Dashboard'));

// AnimatePresence requires the Routes to have the location object and key
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/civicsense-ai" element={<CivicSenseAI />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/join-now" element={<JoinNow />} />
        <Route path="/login" element={<Login />} />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/verify" element={<VerifyCertificate />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout>
            <AnimatedRoutes />
          </MainLayout>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;

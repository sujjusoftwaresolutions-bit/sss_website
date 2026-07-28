import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CivicSenseAI = lazy(() => import('./pages/CivicSenseAI'));
const Contact = lazy(() => import('./pages/Contact'));
const Internships = lazy(() => import('./pages/Internships'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const JoinNow = lazy(() => import('./pages/JoinNow'));

// AnimatePresence requires the Routes to have the location object and key
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/civicsense-ai" element={<CivicSenseAI />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/join-now" element={<JoinNow />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </Suspense>
    </Router>
  );
}

export default App;

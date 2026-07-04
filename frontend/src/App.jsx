import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CivicSenseAI = lazy(() => import('./pages/CivicSenseAI'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/civicsense-ai" element={<CivicSenseAI />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </MainLayout>
      </Suspense>
    </Router>
  );
}

export default App;

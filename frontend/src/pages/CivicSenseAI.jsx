import React from 'react';
import CivicHero from '../components/civicsense/CivicHero';
import ProjectOverview from '../components/civicsense/ProjectOverview';
import SystemArchitecture from '../components/civicsense/SystemArchitecture';
import AchievementsTimeline from '../components/civicsense/AchievementsTimeline';
import ImageGalleries from '../components/civicsense/ImageGalleries';
import FutureScope from '../components/civicsense/FutureScope';

const CivicSenseAI = () => {
  return (
    <div className="w-full bg-brand-bg">
      <CivicHero />
      <ProjectOverview />
      <SystemArchitecture />
      <AchievementsTimeline />
      <ImageGalleries />
      <FutureScope />
    </div>
  );
};

export default CivicSenseAI;

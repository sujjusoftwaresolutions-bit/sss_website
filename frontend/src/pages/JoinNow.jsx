import React, { useEffect } from 'react';
import SEO from '../components/SEO';

const JoinNow = () => {
  useEffect(() => {
    // Redirect to the Google Form
    window.location.href = 'https://forms.gle/A8MHtY21MTPKnkLDA';
  }, []);

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center text-white font-outfit px-4 text-center">
      <SEO 
        title="Redirecting... | SUJJU Software Solutions"
        description="Redirecting to the registration form..."
      />
      
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold mb-6 mx-auto"></div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Redirecting to Registration Form...
      </h2>
      <p className="text-gray-400 text-lg">
        Please wait while we transfer you to the secure Google Form.
      </p>
      <p className="text-gray-500 mt-6">
        If you are not redirected automatically within a few seconds,{' '}
        <a 
          href="https://forms.gle/A8MHtY21MTPKnkLDA" 
          className="text-brand-gold hover:underline font-semibold"
        >
          click here
        </a>.
      </p>
    </div>
  );
};

export default JoinNow;

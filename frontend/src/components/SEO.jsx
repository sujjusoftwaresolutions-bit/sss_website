import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = 'SUJJU Software Solutions | Transforming Ideas into Intelligent Digital Solutions';
  const fullTitle = title ? `${title} | SUJJU Software Solutions` : siteTitle;
  
  const defaultDescription = 'An innovative software company delivering modern digital solutions, AI-powered applications, and industry-level technical training.';
  const metaDesc = description || defaultDescription;
  
  const defaultKeywords = 'Software Development, AI Solutions, MERN Stack, Tech Internship, Web Development, CivicSense AI, Vijayawada Software Company';
  const metaKeywords = keywords || defaultKeywords;
  
  const defaultImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
  const metaImage = image || defaultImage;
  
  const siteUrl = url || 'https://sujjusoftware.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDesc} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;

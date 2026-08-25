import React from 'react';

export default function NoWebGL() {
  return (
    <div style={{
      background: '#111',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      padding: '2rem',
      textAlign: 'center',
    }}>
      Your browser does not support WebGL, which is required for the 3D animation.
      Please use a modern browser (Chrome, Edge, Firefox, Safari) to view the site.
    </div>
  );
}

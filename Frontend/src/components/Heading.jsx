// src/components/Heading.jsx
import React from 'react';

export const Heading = ({ text }) => {
  return (
    <h1 style={styles.heading}>{text}</h1>
  );
};

const styles = {
  heading: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#00FF7', // Neon pink
    textShadow: '0 0 5px rgba(0, 255, 127, 0.8), 0 0 10px rgba(0, 255, 127, 0.6), 0 0 20px rgba(0, 255, 127, 0.4)', // Glowing neon effect
    marginBottom: '20px',
    textTransform: 'uppercase',
    fontFamily: '"Orbitron", sans-serif', // Cyberpunk style font
    letterSpacing: '2px',
  },
};


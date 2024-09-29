
import React from 'react';

export const SubHeading = ({ text }) => {
  return (
    <h2 style={styles.subHeading}>{text}</h2>
  );
};

const styles = {
  subHeading: {
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#666',
    marginBottom: '20px',
  },
};

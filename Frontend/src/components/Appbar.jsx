// src/components/Appbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import './Appbar.css'; // Make sure to import the CSS file for additional styles

export const Appbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logoText}>BankIt</h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          {/* <li style={styles.navItem}>
            <Link to="/signin" style={styles.navLink}>Sign In</Link>
          </li> */}
          <li style={styles.navItem}>
            <Link to="/signup" style={styles.navLink}>Sign Up</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#02a95c',
    color: '#fefefe',  
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,  
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    flex: '1',
  },
  logoText: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fefefe', // Logo text color
    margin: 0,
  },
  nav: {
    flex: '2',
  },
  navList: {
    display: 'flex',
    justifyContent: 'flex-end',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '30px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fefefe', // Nav link color
    fontSize: '18px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
};

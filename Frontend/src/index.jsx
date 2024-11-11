import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx'; // Make sure App is correctly exported as a named or default export
import './index.css';

// Get the root element where your React app will be rendered
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = createRoot(rootElement); // Use createRoot for React 18+
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Signin} from './pages/Signin';
import {Signup} from './pages/Signup';
import {Dashboard} from './pages/Dashboard';
import {SendMoney} from './pages/SendMoney';
import {WelcomePage} from './pages/WelcomePage';
// import {Appbar} from './components/AppBar';
import {SuccessPage} from './pages/SuccessPage';

export const App = () => {
  return (
    <Router>
      <div >
        
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
};



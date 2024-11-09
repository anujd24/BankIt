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
<style>
@import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>


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



import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { WelcomePage } from './pages/WelcomePage';
import { SuccessPage } from './pages/SuccessPage';


const router = createBrowserRouter(
  [
    { path: "/", element: <WelcomePage /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/send", element: <SendMoney /> },
    { path: "/success", element: <SuccessPage /> },
  ],
  {
    future: { v7_startTransition: true }, 
  }
);

export const App = () => {
  return <RouterProvider router={router} />;
};

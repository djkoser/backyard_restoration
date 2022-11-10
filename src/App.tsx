import { Amplify } from 'aws-amplify';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import awsconfig from './aws-exports';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import NativeSelector from './components/NativeSelector';
import NOAAHangupPage from './components/NOAAHangupPage';
import Register from './components/Register';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import Stripe from './components/Stripe';
import StripeThankYou from './components/StripeThankYou';
import WeedPage from './components/WeedPage';
import WeedSearch from './components/WeedSearch';

Amplify.configure(awsconfig);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'requestReset',
    element: <RequestPasswordReset />
  },
  {
    path: 'resetPassword/:token',
    element: <ResetPassword />
  },
  {
    path: 'dash',
    element: <Dashboard />
  },
  {
    path: 'account',
    element: <MyAccount />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'weed/:id',
    element: <WeedPage />
  },
  {
    path: 'search/:vegType',
    element: <WeedSearch />
  },
  {
    path: 'donation',
    element: <Stripe />
  },
  {
    path: 'donation/success',
    element: <StripeThankYou />
  },
  {
    path: 'manualEntry',
    element: <NOAAHangupPage />
  },
  {
    path: 'nativesSelector',
    element: <NativeSelector />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

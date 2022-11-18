import { Amplify } from 'aws-amplify';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import awsconfig from './aws-exports';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import NativeSelector from './components/NativeSelector';
import NOAAHangupPage from './components/NOAAHangupPage';
import ProtectedRoute from './components/ProtectedRoute';
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
    element: (
      <ProtectedRoute forwardingRoute="/dash">
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: 'requestReset',
    element: <RequestPasswordReset />
  },
  {
    path: 'resetPassword',
    element: <ResetPassword />
  },
  {
    path: 'dash',
    element: (
      <ProtectedRoute redirectRoute="/">
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: 'account',
    element: (
      <ProtectedRoute redirectRoute="/">
        <MyAccount />
      </ProtectedRoute>
    )
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'weed/:id',
    element: (
      <ProtectedRoute redirectRoute="/">
        <WeedPage />
      </ProtectedRoute>
    )
  },
  {
    path: 'search/:vegType',
    element: (
      <ProtectedRoute redirectRoute="/">
        <WeedSearch />
      </ProtectedRoute>
    )
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
    element: (
      <ProtectedRoute redirectRoute="/">
        <NativeSelector />
      </ProtectedRoute>
    )
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

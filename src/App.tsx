import React from 'react';
import { Amplify } from 'aws-amplify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import awsconfig from './aws-exports';
import {
  Dashboard,
  EmailConfirmation,
  Login,
  MyAccount,
  NativeSelector,
  NOAAHangupPage,
  ProtectedRoute,
  Register,
  RequestPasswordReset,
  ResetPassword,
  Stripe,
  StripeThankYou,
  WeedPage,
  WeedSearch
} from './components';

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
    path: 'emailConfirmation/:email',
    element: <EmailConfirmation />
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

function App(): JSX.Element {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

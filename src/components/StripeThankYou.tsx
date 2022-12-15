import React from 'react';
import { Link } from 'react-router-dom';

const StripeThankYou: React.FC = () => {
  return (
    <>
      <h1>Thank You for Your Donation!</h1>
      <Link to="/dash">To Dashboard</Link>
    </>
  );
};

export default StripeThankYou;

import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer>
      <Link id="donationLink" to="/donation">
        Donate
      </Link>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <Link id="donationLink" to="/donation">
        Donate
      </Link>
    </footer>
  );
};

export default Footer;

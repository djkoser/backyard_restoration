import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { NavProps } from '../types';

export const Nav: React.FC<NavProps> = (props) => {
  const navigate = useNavigate();
  const { invertColors } = props;
  const [mobileOpenClose, setMobileOpenClose] = useState(false);
  const [weedOpenClose, setWeedOpenClose] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const logout = () => {
    Auth.signOut()
      .then(() => {
        void dispatch({ type: 'RESET_STORE' });
        navigate('/');
      })
      .catch(() => navigate('/'));
  };
  return (
    <nav className={invertColors ? 'greenYellowBackground' : undefined}>
      <div
        className={`linkBox ${
          mobileOpenClose ? 'linkBoxOpened' : 'linkBoxClosed'
        }`}
      >
        <Link
          onClick={() => {
            setWeedOpenClose(false);
            setMobileOpenClose(false);
          }}
          to="/dash"
        >
          {' '}
          <strong>Dashboard</strong>{' '}
        </Link>
        <Link
          onClick={() => {
            setWeedOpenClose(false);
            setMobileOpenClose(false);
          }}
          to="/account"
        >
          <strong>My Account</strong>
        </Link>
        <Link
          onClick={() => {
            setWeedOpenClose(false);
            setMobileOpenClose(false);
          }}
          to="/nativesSelector"
        >
          Native Plant Selector
        </Link>
        <div id="weedsMenu">
          <h4 id="weedInfo" onClick={() => setWeedOpenClose(!weedOpenClose)}>
            <strong style={{ cursor: 'pointer' }}>Weeds Information</strong>
          </h4>
          <div
            className={`weedLinkBox ${
              weedOpenClose ? 'weedLinkBoxOpened' : 'weedLinkBoxClosed'
            }`}
          >
            <Link
              onClick={() => {
                setWeedOpenClose(false);
                setMobileOpenClose(false);
              }}
              to="/search/f"
            >
              <strong>Forbs</strong>
            </Link>
            <Link
              onClick={() => {
                setWeedOpenClose(false);
                setMobileOpenClose(false);
              }}
              to="/search/w"
            >
              <strong>Woody Species</strong>
            </Link>
            <Link
              onClick={() => {
                setWeedOpenClose(false);
                setMobileOpenClose(false);
              }}
              to="/search/g"
            >
              <strong>Graminoids</strong>
            </Link>
          </div>
        </div>
        <span className="logoutLink" onClick={() => logout()}>
          <strong style={{ cursor: 'pointer' }}>Logout</strong>
        </span>
      </div>
      <div
        className="hamburger"
        onClick={() => setMobileOpenClose(!mobileOpenClose)}
      >
        <div
          className={`${invertColors ? 'invertColors' : 'hamburgerPatties'} `}
        ></div>
        <div
          className={`${invertColors ? 'invertColors' : 'hamburgerPatties'} `}
        ></div>
        <div
          className={`${invertColors ? 'invertColors' : 'hamburgerPatties'} `}
        ></div>
      </div>
    </nav>
  );
};

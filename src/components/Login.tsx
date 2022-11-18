import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    Auth.signIn(email, password)
      .then(() => {
        navigate('/dash');
      })
      .catch(() => {
        setPassword('');
        setEmail('');
        toast.error(
          'Incorrect username or password, please try again or register for an account.'
        );
      });
  };
  const register = () => {
    navigate('/register');
  };
  return (
    <div id="loginComponent">
      <article id="loginWelcomeTextBox">
        <h1 className="loginWelcomeText">Welcome to Our Community!</h1>
        <h4 className="loginWelcomeText">
          {' '}
          BackyardRestoration.net is dedicated to providing you with the
          resources necessary to complete your own backyard ecological
          restorations.
        </h4>
        <h4 className="loginWelcomeText">
          This site is predominantly geared-toward prairie restorations in the
          upper midwest, but will be expanding to include other regions and
          ecosystems in the future.
        </h4>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h4 className="loginWelcomeText">
          Simply click the {'"'}Register{'"'} Button to begin, or log in with
          your email and password.
        </h4>
      </article>
      <div id="loginContainer">
        <ToastContainer />
        <div id="siteTitleBorder">
          <h1>
            <strong>Backyard Restoration.net</strong>
          </h1>
        </div>
        <form id="loginBox">
          <label htmlFor="emailLoginInput">Email</label>
          <input
            id="emailLoginInput"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="passwordLoginInput">Password</label>
          <input
            id="passwordLoginInput"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <Link id="forgotPwdLink" to="./requestReset" state={email}>
            <strong style={{ cursor: 'pointer' }}>Forgot Password</strong>
          </Link>
          <div className="buttonBox">
            <button
              id="loginButton"
              onClick={(e) => {
                e.preventDefault();
                if (email && password) {
                  login();
                } else {
                  toast.error(
                    'Please enter a username and password or click below to register for an account.'
                  );
                }
              }}
            >
              Login
            </button>
            <button
              id="registerButton"
              onClick={(e) => {
                e.preventDefault();
                register();
              }}
            >
              Register
            </button>
          </div>
        </form>
        <h1 id="mobileWelcomeText">
          <strong>Welcome</strong>
        </h1>
      </div>
    </div>
  );
};
export default Login;

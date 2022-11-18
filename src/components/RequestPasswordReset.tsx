/* eslint-disable react/no-unescaped-entities */

import { Auth } from 'aws-amplify';
import type * as CSS from 'csstype';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const RequestPasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState(state.email);
  const [failureMessage, setFailureMessage] = useState<CSS.Properties>({
    visibility: 'hidden'
  });

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Auth.forgotPassword(email)
      .then(() => {
        setEmail('');
        toast.success('Password Reset Request Submitted Successfully');
        setFailureMessage({ visibility: 'hidden' });
        navigate('/resetPassword', { state: { email } });
      })
      .catch(() => {
        setEmail('');
        toast.error('Password Reset Request Failed, Please Try Again');
        setFailureMessage({ visibility: 'visible' });
      });
  };

  return (
    <div id="resetReqBox">
      <ToastContainer />
      <h1 id="resetTitle">
        <strong>Password Reset</strong>
      </h1>
      <h3>
        Please Enter the Email you Used to Register with BackyardRestoration.net
      </h3>
      <form id="resetRequestForm" onSubmit={(e) => submitRequest(e)}>
        <input
          type="text"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          id="resetPwdEmailInput"
          value={email}
        ></input>
        <button id="resetReqButton">Request Reset</button>
      </form>
      <Link to={'/'}>Back to Login</Link>
      <article style={failureMessage}>
        <h4>
          {' '}
          We did not find an account under the email address provided. Please
          try again or register for a new account using the "Register" button on
          our login page.
        </h4>
      </article>
    </div>
  );
};

export default RequestPasswordReset;

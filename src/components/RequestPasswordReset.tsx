/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import type * as CSS from 'csstype';

const RequestPasswordReset: React.FC= () => {
  const { state } = useLocation(); 
  const [email, setEmail] = useState(state.email);
  const [successMessage, setSuccessMessage] = useState<CSS.Properties>({ visibility: 'hidden' });
  const [failureMessage, setFailureMessage] = useState<CSS.Properties>({ visibility: 'hidden' });

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put<void>('/api/pwdResetReq', { email })

      .then(() => {
        setEmail('');
        toast.success('Password Reset Request Submitted Successfully');
        setSuccessMessage({ visibility: 'visible' });
        setFailureMessage({ visibility: 'hidden' });
      })

      .catch(() => {
        setEmail('');
        toast.error('Password Reset Request Failed.');
        setSuccessMessage({ visibility: 'hidden' });
        setFailureMessage({ visibility: 'visible' });
      });
  };

  return (
    <div id="resetReqBox">
      <ToastContainer />
      <h1 id="resetTitle"><strong>Password Reset</strong></h1>
      <h3>Please Enter the Email you Used to Register with BackyardRestoration.net</h3>
      <form id="resetRequestForm" onSubmit={e => submitRequest(e)}>
        <input
          type="text"
          placeholder="Your Email"
          onChange={e => setEmail(e.target.value)}
          id='resetPwdEmailInput'
          value={email}
        ></input>
        <button id="resetReqButton">Request Reset</button>
      </form>
      <Link to={'/'}>Back to Login</Link>
      <article
        style={successMessage}>
        <h4> Your password reset request has been submitted successfully! Please check your email for a link to reset your password. (These often end up in SPAM, so please check there if you're having trouble finding it).</h4>

      </article>
      <article
        style={failureMessage}>
        <h4> We did not find an account under the email address provided. Please try again or register for a new account using the "Register" button on our login page.</h4>
      </article>
    </div>
  );
};

export default RequestPasswordReset;
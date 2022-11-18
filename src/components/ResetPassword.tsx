/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import type * as CSS from 'csstype';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [failureMessage, setFailureMessage] = useState<CSS.Properties>({
    visibility: 'hidden'
  });
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const { state } = useLocation();
  const submitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Auth.forgotPasswordSubmit(state.email as string, resetCode, password)
      .then(() => {
        const tempPassword = password;
        setPassword('');
        toast.success('Password Reset Successful! Logging you in...');
        void Auth.signIn(state.email, tempPassword).then(() => {
          setFailureMessage({ visibility: 'hidden' });
          navigate('/dash');
        });
      })
      .catch(() => {
        setPassword('');
        toast.error(
          'Your password reset request has expired. Please try again using the "Forgot Password" link on the login page.'
        );
        setFailureMessage({ visibility: 'visible' });
        navigate('/');
      });
  };

  return (
    <main id="submitResetBody">
      <ToastContainer />
      <h1>Change Password</h1>
      <article>
        <h4>
          {' '}
          Your password reset request has been submitted successfully! Please
          check your email for a link to reset your password. (These often end
          up in SPAM, so please check there if you're having trouble finding
          it).
        </h4>
      </article>
      <br />
      <br />
      <h4>Please Enter a New Password for Your Account Below</h4>
      <form id="submitResetForm" onSubmit={(e) => submitChange(e)}>
        <input
          type="text"
          placeholder="Password Reset Code"
          onChange={(e) => setResetCode(e.target.value)}
          id="resetPasswordCodeInput"
        ></input>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          id="resetPwdPasswordInput"
        ></input>
        <button>Change Password</button>
      </form>
      <article style={failureMessage}>
        <h4>
          'Your password reset request has expired. Please try again using the
          "Forgot Password" link on our login page.'
        </h4>
        <Link to={'/'}>Back to Login</Link>
      </article>
    </main>
  );
};

export default ResetPassword;

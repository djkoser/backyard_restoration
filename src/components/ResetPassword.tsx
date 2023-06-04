/* eslint-disable react/no-unescaped-entities */

import { Auth } from 'aws-amplify';
import type * as CSS from 'csstype';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [failureMessage, setFailureMessage] = useState<CSS.Properties>({
    visibility: 'hidden'
  });
  const [failureMessageContents, setFailureMessageContents] =
    useState<string>('');
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
      .catch(({ __type, message }: { __type: string; message: string }) => {
        let failureMessageContents;

        switch (__type) {
          case 'InvalidPasswordException':
            failureMessageContents = message;
            break;
          default:
            failureMessageContents =
              'An unknown error occurred. Please try again.';
            break;
        }

        setFailureMessageContents(failureMessageContents);
        setFailureMessage({ visibility: 'visible' });
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
          check your email for a verification code to reset your password.
          (These often end up in SPAM, so please check there if you're having
          trouble finding it).
        </h4>
      </article>
      <br />
      <br />
      <h4>
        Please Enter the Validation Code you Received and New Password Below
      </h4>
      <form id="submitResetForm" onSubmit={(e) => submitChange(e)}>
        <input
          type="text"
          placeholder="Password Reset Code"
          onChange={(e) => setResetCode(e.target.value)}
          id="resetPasswordCodeInput"
          value={resetCode}
        ></input>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="resetPwdPasswordInput"
        ></input>
        <button>Change Password</button>
      </form>
      <article style={failureMessage}>
        <h4>{failureMessageContents}</h4>
      </article>
      <Link to={'/'}>Back to Login</Link>
    </main>
  );
};

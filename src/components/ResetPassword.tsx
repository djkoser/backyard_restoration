/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import type * as CSS from 'csstype';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate(); 
  const routeParams = useParams<{ token: string }>(); 
  const [failureMessage, setFailureMessage] = useState<CSS.Properties>({
    visibility: 'hidden'
  });
  const [password, setPassword] = useState('');

  const submitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .put(`/api/pwdRS/${routeParams.token}`, { newPassword: password })

      .then(() => {
        setPassword('');
        toast.success('Password Reset Successful! Logging you in...');
        setFailureMessage({ visibility: 'hidden' });
        navigate('/dash');
      })

      .catch(() => {
        setPassword('');
        toast.error(
          'Your password reset request has expired. Please try again using the "Forgot Password" link on our login page.'
        );
        setFailureMessage({ visibility: 'visible' });
      });
  };

  return (
    <main id="submitResetBody">
      <ToastContainer />
      <h1>Change Password</h1>
      <h4>Please Enter a New Password for Your Account Below</h4>
      <form id="submitResetForm" onSubmit={(e) => submitChange(e)}>
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

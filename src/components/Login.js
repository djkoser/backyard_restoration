import React, { useState } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios.post('/api/login', { email, password })
      .then(() => {
        props.history.push('/dash')
      })
      .catch(() => {
        setPassword("");
        setEmail("");
        toast.error("Incorrect username or password, please try again or register for an account.")
      })
  };
  const register = () => { };
  return (
    <>
      <ToastContainer />
      <h1>The Backyard Restorationist</h1>
      <form>
        <label htmlFor="emailLoginInput">Email</label>
        <input id="emailLoginInput" placeholder='Email' type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
        <label htmlFor="passwordLoginInput">Password</label>
        <input id="passwordLoginInput" placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
        <Link to={{
          pathname: './requestReset',
          state: {
            email
          }
        }}>Forgot Password</Link>
        <button id="loginButton" onClick={(e) => {
          e.preventDefault();
          if (email && password) {
            login();
          } else {
            toast.error("Please enter a username and password or click below to register for an account.");
          }

        }}>Login</button>
        <button id="registerButton" onClick={(e) => {
          e.preventDefault();
          register();
        }}>Register</button>
      </form>
      <h1>Welcome</h1>
    </>
  )
}
export default withRouter(Login)
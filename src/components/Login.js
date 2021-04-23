import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addRetrievedInfo } from '../redux/userInfoReducer';
import { getMethods } from '../redux/mgmtMethodReducer'

const Login = (props) => {

  const dispatch = useDispatch();
  // @ts-ignore

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios.post('/api/login', { email, password })
      .then((res) => {
        dispatch(getMethods())
        dispatch(addRetrievedInfo(res.data));
        props.history.push("/dash")
      })
      .catch((err) => {
        setPassword("");
        setEmail("");
        toast.error("Incorrect username or password, please try again or register for an account.")
      })
  };
  const register = () => {
    props.history.push('/register')
  };
  return (
    <div id="loginComponent">
      <article id="loginWelcomeTextBox">
        <h1 className="loginWelcomeText">Welcome to Our Community!</h1>
        <h4 className="loginWelcomeText"> BackyardRestoration.net is dedicated to providing you with the resources necessary to complete your own backyard ecological restorations.</h4>
        <h4 className="loginWelcomeText">This site is predominantly geared-toward prairie restorations in the upper midwest, but will be expanding to include other regions and ecosystems in the future.</h4>
        <h4 className="loginWelcomeText">Simply click the "Register" Button to begin, or log in with your email and password.</h4>
      </article>
      <div id="loginContainer">
        <ToastContainer />
        <div id="siteTitleBorder">
          <h1><strong>Backyard Restoration.net</strong></h1>
        </div>
        <form id="loginBox" >
          <label htmlFor="emailLoginInput">Email</label>
          <input id="emailLoginInput" placeholder='Email' type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
          <label htmlFor="passwordLoginInput">Password</label>
          <input id="passwordLoginInput" placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
          <Link id="forgotPwdLink" to={{
            pathname: './requestReset',
            state: {
              email
            }
          }}><strong>Forgot Password</strong></Link>
          <div className="buttonBox">
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
          </div>
        </form>
        <h1 id="mobileWelcomeText" ><strong>Welcome</strong></h1>
      </div>
    </div>
  )
}
export default Login
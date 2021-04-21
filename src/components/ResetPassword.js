import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// @ts-ignore
import { Link } from 'react-router-dom';


const ResetPassword = (props) => {

  // @ts-ignore
  const [failureMessage, setFailureMessage] = useState({ visibility: "hidden" })
  const [password, setPassword] = useState("")


  const submitChange = (event) => {
    event.preventDefault()

    axios.put(`/api/pwdRS/${props.match.params.token}`, { newPassword: password })
      // @ts-ignore
      .then(res => {
        setPassword("")
        toast.success("Password Reset Successful! Logging you in...")
        setFailureMessage({ visibility: "hidden" })
        setTimeout(() => {
          props.history.push('/dash')
        }, 2000)
      })
      // @ts-ignore
      .catch(err => {
        setPassword("")
        toast.error('Your password reset request has expired. Please try again using the "Forgot Password" link on our login page.')
        setFailureMessage({ visibility: "visible" })
      })
  }

  return (
    <main id="submitResetBody">
      <ToastContainer />
      <h1>Change Password</h1>
      <h4>Please Enter a New Password for Your Account Below</h4>
      <form id="submitResetForm" onSubmit={e => submitChange(e)}>
        <input
          type="password"
          placeholder="New Password"
          onChange={e => setPassword(e.target.value)}
          id='resetPwdPasswordInput'
        ></input>
        <button>Change Password</button>
      </form>
      <article
        // @ts-ignore
        style={failureMessage}>
        <h4 >'Your password reset request has expired. Please try again using the "Forgot Password" link on our login page.'</h4>
        <Link to={"/"}>Back to Login</Link>
      </article>
    </main>
  )
}

// @ts-ignore
export default ResetPassword
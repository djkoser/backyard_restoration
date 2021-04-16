import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const RequestPasswordReset = (props) => {
  const [email, setEmail] = useState(props.location.state.email)
  const [successMessage, setSuccessMessage] = useState({ visibility: "hidden" })
  const [failureMessage, setFailureMessage] = useState({ visibility: "hidden" })

  const submitRequest = (event) => {
    event.preventDefault()
    axios.put("/api/pwdResetReq", { email })
      // @ts-ignore
      .then(res => {
        setEmail("");
        toast.success('Password Reset Request Submitted Successfully')
        setSuccessMessage({ visibility: "visible" })
        setFailureMessage({ visibility: "hidden" })
      })
      // @ts-ignore
      .catch(err => {
        setEmail("");
        toast.error('Password Reset Request Failed.')
        setSuccessMessage({ visibility: "hidden" })
        setFailureMessage({ visibility: "visible" })
      })
  }

  return (
    <>
      <ToastContainer />
      <h1>Password Reset</h1>
      <p>Please Enter the Email you Used to Register with TheBackyardRestorationist.net</p>
      <form onSubmit={e => submitRequest(e)}>
        <label htmlFor="resetPwdEmailInput">Email </label>
        <input
          type="text"
          placeholder="Your Email"
          onChange={e => setEmail(e.target.value)}
          id='resetPwdEmailInput'
          value={email}
        ></input>
        <button>Request Reset</button>
      </form>
      <article
        // @ts-ignore
        style={successMessage}>
        <h4> Your password reset request has been submitted successfully! Please check your email for a link to reset your password. (These often end up in SPAM, so please check there if you're having trouble finding it).</h4>
        <Link to={"/"}>Back to Login</Link>
      </article>
      <article
        // @ts-ignore
        style={failureMessage}>
        <h4> We did not find an account under the email address provided. Please try again or register for a new account using the "Register" button on our login page.</h4>
        <Link to={"/"}>Back to Login</Link>
      </article>
    </>
  )
}

export default RequestPasswordReset
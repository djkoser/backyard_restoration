import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const RequestPasswordReset = (props) => {


  const submitChange = () => {
    axios.put("/api/pwdResetReq")
      .then(res => { })
      .catch((err) => toast.error(''))
  }

  return (
    <>
      <ToastContainer />
    </>
  )
}

export default RequestPasswordReset
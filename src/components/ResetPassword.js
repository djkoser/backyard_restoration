import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = (props) => {

  const submitChange = () => {
    axios.put(`/api/pwdRS/${props.match.params.token}`)
      .then(res => { })
      .catch((err) => toast.error(''))
  }

  return (
    <>
      <ToastContainer />
    </>
  )
}

export default ResetPassword
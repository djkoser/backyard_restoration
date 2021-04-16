import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const logout = () => {
    axios.delete('/api/logout')
      .then(res => {
        console.log(res)
        props.history.push('/')
      })
      .catch(err => { console.log(err) })
  }
  return (
    <>
      <nav style={{ width: '100vw' }}>
        <Link to='./account'> </Link>
        <span>Weed ID Pages</span>
        <Link to='./search/f' ></Link>
        <Link to='./search/w' ></Link>
        <Link to='./search/g' ></Link>
        <button onClick={() => logout()}>Logout</button>
      </nav>
    </>
  )
}
export default Nav
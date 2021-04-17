import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const logout = () => {
    axios.delete('/api/logout')
      .then(res => {
        props.history.push('/')
      })
      .catch(err => { console.log(err) })
  }
  return (
    <>
      <nav >
        <Link to='/account'> My Account </Link>
        <span>Weed ID Pages</span>
        <Link to='/search/f' > Forbs </Link>
        <Link to='/search/w' > Woody Species </Link>
        <Link to='/search/g' > Graminoids </Link>
        <span onClick={() => logout()}>Logout</span>
      </nav>
    </>
  )
}
export default withRouter(Nav)
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const { invertColors } = props;
  const [openClose, setOpenClose] = useState(false)
  const logout = () => {
    axios.delete('/api/logout')
      .then(res => {
        props.history.push('/')
      })
      .catch(err => props.history.push('/'))
  }
  return (
    <nav>
      <div className={`linkBox ${openClose ? "linkBoxOpened" : "linkBoxClosed"}`} >
        <Link to='/dash'> <strong>Dashboard</strong> </Link>
        <Link to='/account'><strong>My Account</strong></Link>
        <Link to='/search/f' ><strong>Forbs</strong></Link>
        <Link to='/search/w' ><strong>Woody Species</strong></Link>
        <Link to='/search/g' ><strong>Graminoids</strong></Link>
        <span className="logoutLink" onClick={() => logout()}><strong>Logout</strong></span>
      </div>
      <div className="hamburger" onClick={() => setOpenClose(!openClose)}>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
      </div>
    </nav >
  )
}
export default withRouter(Nav)
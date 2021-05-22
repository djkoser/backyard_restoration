import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const { invertColors } = props;
  const [mobileOpenClose, setMobileOpenClose] = useState(false);
  const [weedOpenClose, setWeedOpenClose] = useState(false);

  const logout = () => {
    axios.delete('/api/logout')
      .then(res => {
        props.history.push('/')
      })
      .catch(err => props.history.push('/'))
  }
  return (
    <nav className={invertColors ? 'greenYellowBackground' : null}>
      <div className={`linkBox ${mobileOpenClose ? "linkBoxOpened" : "linkBoxClosed"}`} >
        <Link onClick={() => {
          setWeedOpenClose(false);
          setMobileOpenClose(false);
        }} to='/dash'> <strong>Dashboard</strong> </Link>
        <Link onClick={() => {
          setWeedOpenClose(false);
          setMobileOpenClose(false);
        }} to='/account'><strong>My Account</strong></Link>
        <Link onClick={() => {
          setWeedOpenClose(false);
          setMobileOpenClose(false);
        }} to='/nativesSelector'>Native Plant Selector</Link>
        <div id='weedsMenu'>
          <h4 id='weedInfo' onClick={() => setWeedOpenClose(!weedOpenClose)}><strong style={{ cursor: "pointer" }}>Weeds Information</strong></h4>
          <div className={`weedLinkBox ${weedOpenClose ? "weedLinkBoxOpened" : "weedLinkBoxClosed"}`}>
            <Link onClick={() => {
              setWeedOpenClose(false);
              setMobileOpenClose(false);
            }} to='/search/f' ><strong >Forbs</strong></Link>
            <Link onClick={() => {
              setWeedOpenClose(false);
              setMobileOpenClose(false);
            }} to='/search/w' ><strong>Woody Species</strong></Link>
            <Link onClick={() => {
              setWeedOpenClose(false);
              setMobileOpenClose(false);
            }} to='/search/g' ><strong>Graminoids</strong></Link>
          </div>
        </div>
        <span className="logoutLink" onClick={() => logout()}><strong style={{ cursor: "pointer" }}>Logout</strong></span>
      </div>
      <div className="hamburger" onClick={() => setMobileOpenClose(!mobileOpenClose)}>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
        <div className={`${invertColors ? "invertColors" : "hamburgerPatties"} `}></div>
      </div>
    </nav >
  )
}
export default withRouter(Nav)
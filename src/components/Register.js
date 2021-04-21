import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addRetrievedInfo } from '../redux/userInfoReducer';
import Nav from './Nav';
import WeatherLoader from './WeatherLoader'

// props from Login email, password

const Register = (props) => {

  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [loading, setLoading] = useState(false);

  const createNewUser = (e) => {
    e.preventDefault()
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
    setLoading(true)
    axios.post("/api/register", { email, password, first_name, last_name, street, city, state, zipcode })
      .then(async (res) => {
        dispatch(addRetrievedInfo(res.data));
        toast.success('Registration Successful! Logging you in to your new dashboard...')
        // delay to push avoids strange error from NOAA Server ->  The proxy server received an invalid response from an upstream server.'The proxy server could not handle the request Reason: Error reading from remote server. Additionally, a 502 Bad Gateway  'error was encountered while trying to use an ErrorDocument. End Quote.  It is possible that the quick turnaround to push was causing some sort of timeout condition. 3 seconds allows for registration susccess message so this ends up being dual purpose. 
        setTimeout(() => props.history.push('./dash'), 3000);
      })
      .catch((err) => {
        setLoading(false)
        toast.error('A user with the email you provided is already present within our database. Please log in using your email and password or reset your password using the "Forgot Password" link.')
      })
  };
  return (
    <>
      <ToastContainer />
      <section id="registerBody" style={loading ? { visibility: "hidden" } : { visibility: "visible" }}>
        <form id="registerForm" onSubmit={e => { createNewUser(e) }}>
          <section className="registerSections">
            <h3 className="registerSectionText">Name</h3>
            <input placeholder="First Name" type="text" value={first_name} onChange={e => { setFirstName(e.target.value) }} ></input>
            <input placeholder="Last Name" type="text" value={last_name} onChange={e => { setLastName(e.target.value) }} ></input>
          </section>
          <section className="registerSections">
            <h3 className="registerSectionText">Email</h3>
            <input placeholder="Email" type="text" value={email} onChange={e => { setEmail(e.target.value) }} ></input>
          </section>
          <section className="registerSections">
            <h3 className="registerSectionText">Password</h3>
            <input placeholder="Password" type="password" value={password} onChange={e => { setPassword(e.target.value) }}></input>
          </section>
          <section className="registerSections">
            <h3 className="registerSectionText">Address</h3>
            <input placeholder="Street" type="text" value={street} onChange={e => { setStreet(e.target.value) }} ></input>
            <input placeholder="City" type="text" value={city} onChange={e => { setCity(e.target.value) }} ></input>
            <input placeholder="State" type="text" value={state} onChange={e => { setState(e.target.value) }} ></input>
            <input placeholder="Zipcode" type="text" value={zipcode} onChange={e => { setZipcode(e.target.value) }} ></input>
          </section>
          <button>Register</button>
        </form >
        <article className="registerWelcomeText">
          <h1 >Welcome to Our Community!</h1>
          <h4 > Registering for an account with BackyardRestoration.net will provide you with access to a series of free tools designed to help you plan and complete your own backyard ecological restorations. </h4>
          <h4 >Your address will be used to calculate growing parameters for your local area using historical weather data.</h4>
          <h4 >If you have any privacy concerns or questions regarding the site, please contact us at BackyardRestorationNet@gmail.com.</h4>
        </article>
      </section>
      <Link id="backToLoginLink" to={'/'}>Back to Login</Link>
      <WeatherLoader loading={loading} />
    </>
  )
}
export default Register
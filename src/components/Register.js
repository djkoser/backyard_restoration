// @ts-nocheck
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addRetrievedInfo } from "../redux/userInfoReducer";
import WeatherLoader from "./WeatherLoader";

// props from Login email, password

const Register = (props) => {

  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);

  const createNewUser = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setStreet("");
    setCity("");
    setState("");
    setZipcode("");
    setLoading(true);
    axios.post("/api/register", { email, password, first_name, last_name, street, city, state, zipcode })
      .then(async (res) => {
        dispatch(addRetrievedInfo(res.data));
        toast.success("Registration Successful! Logging you in to your new dashboard...");
        await setTimeout(() => props.history.push("./dash"), 3000);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data === "Manual Entry") {
          toast.warning("NOAA failed to return weather data for your location. In order to complete your registration, you will now be redirected to a page where you will be able to manually enter growing parameters for your area.");
          setTimeout(() => props.history.push("/manualEntry"), 5000);
        } else {
          toast.error("A user with the email you provided is already present within our database. Please log in using your email and password or reset your password using the \"Forgot Password\" link.");
        }
      });
  };
  return loading
    ? <WeatherLoader />
    : (
      <>
        <ToastContainer />
        <section id="registerBody" style={loading ? { visibility: "hidden" } : { visibility: "visible" }}>
          <form id="registerForm" onSubmit={e => { createNewUser(e); }}>
            <section className="registerSections">
              <h3 className="registerSectionText">Name</h3>
              <input placeholder="First Name" type="text" value={first_name} onChange={e => { setFirstName(e.target.value); }} ></input>
              <input placeholder="Last Name" type="text" value={last_name} onChange={e => { setLastName(e.target.value); }} ></input>
            </section>
            <section className="registerSections">
              <h3 className="registerSectionText">Email</h3>
              <input placeholder="Email" type="text" value={email} onChange={e => { setEmail(e.target.value); }} ></input>
            </section>
            <section className="registerSections">
              <h3 className="registerSectionText">Password</h3>
              <input placeholder="Password" type="password" value={password} onChange={e => { setPassword(e.target.value); }}></input>
            </section>
            <section className="registerSections">
              <h3 className="registerSectionText">Address</h3>
              <input placeholder="Street" type="text" value={street} onChange={e => { setStreet(e.target.value); }} ></input>
              <input placeholder="City" type="text" value={city} onChange={e => { setCity(e.target.value); }} ></input>
              <input placeholder="State" type="text" value={state} onChange={e => { setState(e.target.value); }} ></input>
              <input placeholder="Zipcode" type="text" value={zipcode} onChange={e => { setZipcode(e.target.value); }} ></input>
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
        <Link id="backToLoginLink" to={"/"}>Back to Login</Link>
      </>
    );
};
export default Register;
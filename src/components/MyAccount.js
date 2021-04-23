// @ts-ignore
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// @ts-ignore
import { addRetrievedInfo, getUserInfo } from '../redux/userInfoReducer';
import Nav from './Nav';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import WeatherLoader from './WeatherLoader';


// props from store user_id, email, first_name, last_name, street, city, state, zipcode, getUserInfo()

// @ts-ignore
const MyAccount = (props) => {


  const dispatch = useDispatch()
  // @ts-ignore
  const emailRedux = useSelector(state => state.userInfoReducer.email);
  // @ts-ignore
  const firstNameRedux = useSelector(state => state.userInfoReducer.first_name);
  // @ts-ignore
  const lastNameRedux = useSelector(state => state.userInfoReducer.last_name);
  // @ts-ignore
  const streetRedux = useSelector(state => state.userInfoReducer.street);
  // @ts-ignore
  const cityRedux = useSelector(state => state.userInfoReducer.city);
  // @ts-ignore
  const stateRedux = useSelector(state => state.userInfoReducer.state);
  // @ts-ignore
  const zipcodeRedux = useSelector(state => state.userInfoReducer.zipcode);

  // @ts-ignore
  const [firstName, setFirstName] = useState(firstNameRedux);
  // @ts-ignore
  const [lastName, setLastName] = useState(lastNameRedux);
  // @ts-ignore
  const [email, setEmail] = useState(emailRedux);
  // @ts-ignore
  const [password, setPassword] = useState("This is a fake password");
  // @ts-ignore
  const [street, setStreet] = useState(streetRedux);
  // @ts-ignore
  const [city, setCity] = useState(cityRedux);
  // @ts-ignore
  const [state, setState] = useState(stateRedux);
  // @ts-ignore
  const [zipcode, setZipcode] = useState(zipcodeRedux);
  // @ts-ignore
  const [editToggleName, setEditToggleName] = useState(true);
  // @ts-ignore
  const [editToggleEmail, setEditToggleEmail] = useState(true);
  // @ts-ignore
  const [editTogglePassword, setEditTogglePassword] = useState(true);
  // @ts-ignore
  const [editToggleAddress, setEditToggleAddress] = useState(true);

  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setFirstName(firstNameRedux)
    setLastName(lastNameRedux)
    setEmail(emailRedux)
    setStreet(streetRedux)
    setCity(cityRedux)
    setState(stateRedux)
    setZipcode(zipcodeRedux)
  }

  const onError = () => {
    dispatch(getUserInfo())
    if (emailRedux && firstNameRedux && lastNameRedux && streetRedux && cityRedux && stateRedux && zipcodeRedux) {
      toast.error("There was an error while attempting to change your credentials. If you are attempting to change your email, it is possible that you have an account with us under the email you're attempting to switch to. Otherwise, please notify us of this problem at BackyardRestorationNet@gmail.com and we will work to find a solution as quickly as possilble.")
    } else { props.history.push('/') }
  }

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch]);

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailRedux, firstNameRedux, lastNameRedux, streetRedux, cityRedux, stateRedux, zipcodeRedux])

  const toggleEdit = (type) => {
    switch (type) {
      case "name":
        if (editToggleName) {
          setEditToggleName(false);
        } else {
          setEditToggleName(true);
          axios.put(`/api/user/name`, { first_name: firstName, last_name: lastName })
            .then(res => {
              dispatch(addRetrievedInfo(res.data))
              setPassword("This is a fake password")
              toast.success("Your name has been updated successfully.")
            })
            .catch(err => onError())
        };
        return
      case "email":
        if (editToggleEmail) {
          setEditToggleEmail(false);
        } else {
          setEditToggleEmail(true);
          axios.put(`/api/user/email`, { email })
            .then(res => {
              dispatch(addRetrievedInfo(res.data))
              setPassword("This is a fake password")
              toast.success("Your email has been updated successfully.")

            })
            .catch(err => onError())
        };
        return
      case "password":
        if (editTogglePassword) {
          setEditTogglePassword(false);
          setPassword("")
        } else {
          setEditTogglePassword(true);
          axios.put(`/api/user/password`, { password })
            .then(res => {
              dispatch(addRetrievedInfo(res.data))
              setPassword("This is a fake password")
              toast.success("Your password has been updated successfully.")
            })
            .catch(err => onError())
        }
        return
      case "address":
        if (editToggleAddress) {
          setEditToggleAddress(false);
        } else {
          setLoading(true)
          setEditToggleAddress(true);
          axios.put(`/api/user/address`, { street, city, state, zipcode })
            .then(res => {
              dispatch(addRetrievedInfo(res.data));
              setPassword("This is a fake password");
              setLoading(false);
              toast.success("Your address has been updated successfully.");
            })
            .catch(err => {
              setLoading(false);
              onError();
            })
        }
        return
      default:
        break
    }
  };
  // @ts-ignore

  return (
    <div id="myAccountBkgd">
      <Nav invertColors={true} />
      <ToastContainer />
      <h1 id="myAccountHeader">My Account</h1>
      <main className="myAccountForm" style={!loading ? { display: "inline-flex" } : { display: "none" }}>
        <div id="nameEmailPassword">
          <fieldset className=" editBoxes" >
            <h2 className="accountPageText">Name</h2>
            <input className={`${editToggleName ? "disabledTheme" : null}`} disabled={editToggleName} type='text' value={firstName} onChange={e => { setFirstName(e.target.value) }} />
            <input className={`${editToggleName ? "disabledTheme" : null}`} disabled={editToggleName} type='text' value={lastName} onChange={e => { setLastName(e.target.value) }} />
          </fieldset>
          <button onClick={() => toggleEdit("name")}>{editToggleName ? "Edit" : "Submit"}</button>
          <fieldset className="editBoxes" >
            <h2 className="accountPageText">Email</h2>
            <input className={`${editToggleEmail ? "disabledTheme" : null}`} disabled={editToggleEmail} type='text' value={email} onChange={e => { setEmail(e.target.value) }} />
          </fieldset>
          <button onClick={() => toggleEdit("email")}>{editToggleEmail ? "Edit" : "Submit"}</button>
        </div>
        <div id="address">
          <fieldset className="editBoxes" >
            <h2 className="accountPageText">Password</h2>
            <input className={`${editTogglePassword ? "disabledTheme" : null}`} disabled={editTogglePassword} type='password' value={password} onChange={e => { setPassword(e.target.value) }} />
          </fieldset>
          <button onClick={() => toggleEdit("password")}>{editTogglePassword ? "Edit" : "Submit"}</button>
          <fieldset className="editBoxes" >
            <h2 className="accountPageText">Address</h2>
            <input className={`${editToggleAddress ? "disabledTheme" : null}`} disabled={editToggleAddress} type='text' value={street} onChange={e => { setStreet(e.target.value) }} />
            <input className={`${editToggleAddress ? "disabledTheme" : null}`} disabled={editToggleAddress} type='text' value={city} onChange={e => { setCity(e.target.value) }} />
            <input className={`${editToggleAddress ? "disabledTheme" : null}`} disabled={editToggleAddress} type='text' value={state} onChange={e => { setState(e.target.value) }} />
            <input className={`${editToggleAddress ? "disabledTheme" : null}`} disabled={editToggleAddress} type='text' value={zipcode} onChange={e => { setZipcode(e.target.value) }} />
          </fieldset>
          <button onClick={() => toggleEdit("address")}>{editToggleAddress ? "Edit" : "Submit"}</button>
        </div>
      </main>
      <WeatherLoader loading={loading} />
      <Footer />
    </div>
  )
}
export default MyAccount

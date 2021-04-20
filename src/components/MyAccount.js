// @ts-ignore
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// @ts-ignore
import { addRetrievedInfo } from '../redux/userInfoReducer';
import Nav from './Nav';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';

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
              const { email, first_name, last_name, street, city, state, zipcode } = res.data;
              setFirstName(first_name)
              setLastName(last_name)
              setEmail(email)
              setPassword("This is a fake password")
              setStreet(street)
              setCity(city)
              setState(state)
              setZipcode(zipcode)
              toast.success("Your name has been updated successfully.")
            })
            .catch(err => toast.error("There was an error while attempting to change your credentials, please notify us of this problem at TheBackyardRestorationist@gmail.com and we will work to find a solution as quickly as possilble."))
        }
        return
      case "email":
        if (editToggleEmail) {
          setEditToggleEmail(false);
        } else {
          setEditToggleEmail(true);
          axios.put(`/api/user/email`, { email })
            .then(res => {
              dispatch(addRetrievedInfo(res.data))
              const { email, first_name, last_name, street, city, state, zipcode } = res.data;
              setFirstName(first_name)
              setLastName(last_name)
              setEmail(email)
              setPassword("This is a fake password")
              setStreet(street)
              setCity(city)
              setState(state)
              setZipcode(zipcode)
              toast.success("Your email has been updated successfully.")

            })
            .catch(err => toast.error("There was an error while attempting to change your credentials, please notify us of this problem at TheBackyardRestorationist@gmail.com and we will work to find a solution as quickly as possilble."))

        }
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
              const { email, first_name, last_name, street, city, state, zipcode } = res.data;
              setFirstName(first_name)
              setLastName(last_name)
              setEmail(email)
              setPassword("This is a fake password")
              setStreet(street)
              setCity(city)
              setState(state)
              setZipcode(zipcode)
              toast.success("Your password has been updated successfully.")

            })
            .catch(err => toast.error("There was an error while attempting to change your credentials, please notify us of this problem at TheBackyardRestorationist@gmail.com and we will work to find a solution as quickly as possilble."))

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
              dispatch(addRetrievedInfo(res.data))
              const { email, first_name, last_name, street, city, state, zipcode } = res.data;
              setFirstName(first_name)
              setLastName(last_name)
              setEmail(email)
              setPassword("This is a fake password")
              setStreet(street)
              setCity(city)
              setState(state)
              setZipcode(zipcode)
              setLoading(false)
              toast.success("Your address has been updated successfully.")

            })
            .catch(err => toast.error("There was an error while attempting to change your credentials, please notify us of this problem at TheBackyardRestorationist@gmail.com and we will work to find a solution as quickly as possilble."))
        }
        return
      default:
        break
    }
  };
  // @ts-ignore


  return (
    <>
      <Nav />
      <ToastContainer />
      <main style={!loading ? { visibility: "visible" } : { visibility: "hidden" }}>
        <fieldset>
          <input disabled={editToggleName} type='text' value={firstName} onChange={e => { setFirstName(e.target.value) }} />
          <input disabled={editToggleName} type='text' value={lastName} onChange={e => { setLastName(e.target.value) }} />
          <button onClick={() => toggleEdit("name")}>Edit</button>

        </fieldset>
        <fieldset>
          <input disabled={editToggleEmail} type='text' value={email} onChange={e => { setEmail(e.target.value) }} />
          <button onClick={() => toggleEdit("email")}>Edit</button>

        </fieldset>
        <fieldset>
          <input disabled={editTogglePassword} type='password' value={password} onChange={e => { setPassword(e.target.value) }} />
          <button onClick={() => toggleEdit("password")}>Edit</button>

        </fieldset>
        <fieldset>
          <input disabled={editToggleAddress} type='text' value={street} onChange={e => { setStreet(e.target.value) }} />
          <input disabled={editToggleAddress} type='text' value={city} onChange={e => { setCity(e.target.value) }} />
          <input disabled={editToggleAddress} type='text' value={state} onChange={e => { setState(e.target.value) }} />
          <input disabled={editToggleAddress} type='text' value={zipcode} onChange={e => { setZipcode(e.target.value) }} />
          <button onClick={() => toggleEdit("address")}>Edit</button>
        </fieldset>
      </main>
      {/* Weather-Themed Loading SVG Adapted from Tim Holman's Work as Listed on Codepen - I thought this particularly lengthy loading screen deserved a solid weather-themed loading graphic. Much time spent reconfiguring CSS to be more for mobile view (retained relative positions of SVGs) by turning animation into a series of nested SVGs. Also added animateTransform element for rotation to account for coordinate system difference in SVG as opposed to CSS keyfrmames */}
      <div style={loading ? { visibility: "visible" } : { visibility: "hidden" }}>
        <div className="loaderText">
          Calculating growing parameters for your location based upon 5 years of local weather data, courtesy of the National Oceanic and Atmospheric Administration (NOAA). This could take several minutes depending on their server traffic.
      </div >
        <svg className="registrationLoader" width="900" height="900" viewBox="0 0 900 900" preserveAspectRatio="xMinYMin meet">
          <svg x="310" y="80" id="sun" width="275" viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet" >
            <g transform-origin="5 5">
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="20s"
                type="rotate"
                from="0"
                to="360"
                repeatCount="indefinite"
              />
              <path fill="none" d="M6.942,3.876c-0.4-0.692-1.146-1.123-1.946-1.123c-0.392,0-0.779,0.104-1.121,0.301c-1.072,0.619-1.44,1.994-0.821,3.067C3.454,6.815,4.2,7.245,5,7.245c0.392,0,0.779-0.104,1.121-0.301C6.64,6.644,7.013,6.159,7.167,5.581C7.321,5,7.243,4.396,6.942,3.876z M6.88,5.505C6.745,6.007,6.423,6.427,5.973,6.688C5.676,6.858,5.34,6.948,5,6.948c-0.695,0-1.343-0.373-1.69-0.975C2.774,5.043,3.093,3.849,4.024,3.312C4.32,3.14,4.656,3.05,4.996,3.05c0.695,0,1.342,0.374,1.69,0.975C6.946,4.476,7.015,5,6.88,5.505z"></path>
              <path fill="none" d="M8.759,2.828C8.718,2.757,8.626,2.732,8.556,2.774L7.345,3.473c-0.07,0.041-0.094,0.132-0.053,0.202C7.319,3.723,7.368,3.75,7.419,3.75c0.025,0,0.053-0.007,0.074-0.02l1.211-0.699C8.774,2.989,8.8,2.899,8.759,2.828z"></path>
              <path fill="none" d="M1.238,7.171c0.027,0.047,0.077,0.074,0.128,0.074c0.025,0,0.051-0.008,0.074-0.02l1.211-0.699c0.071-0.041,0.095-0.133,0.054-0.203S2.574,6.228,2.503,6.269l-1.21,0.699C1.221,7.009,1.197,7.101,1.238,7.171z"></path>
              <path fill="none" d="M6.396,2.726c0.052,0,0.102-0.026,0.13-0.075l0.349-0.605C6.915,1.976,6.89,1.885,6.819,1.844c-0.07-0.042-0.162-0.017-0.202,0.054L6.269,2.503C6.228,2.574,6.251,2.666,6.322,2.706C6.346,2.719,6.371,2.726,6.396,2.726z"></path>
              <path fill="none" d="M3.472,7.347L3.123,7.952c-0.041,0.07-0.017,0.162,0.054,0.203C3.2,8.169,3.226,8.175,3.25,8.175c0.052,0,0.102-0.027,0.129-0.074l0.349-0.605c0.041-0.07,0.017-0.16-0.054-0.203C3.603,7.251,3.513,7.276,3.472,7.347z"></path>
              <path fill="none" d="M3.601,2.726c0.025,0,0.051-0.007,0.074-0.02C3.746,2.666,3.77,2.574,3.729,2.503l-0.35-0.604C3.338,1.828,3.248,1.804,3.177,1.844C3.106,1.886,3.082,1.976,3.123,2.047l0.35,0.604C3.5,2.7,3.549,2.726,3.601,2.726z"></path>
              <path fill="none" d="M6.321,7.292c-0.07,0.043-0.094,0.133-0.054,0.203l0.351,0.605c0.026,0.047,0.076,0.074,0.127,0.074c0.025,0,0.051-0.006,0.074-0.02c0.072-0.041,0.096-0.133,0.055-0.203l-0.35-0.605C6.483,7.276,6.393,7.253,6.321,7.292z"></path>
              <path fill="none" d="M2.202,5.146c0.082,0,0.149-0.065,0.149-0.147S2.284,4.851,2.202,4.851H1.503c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147H2.202z"></path>
              <path fill="none" d="M8.493,4.851H7.794c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147l0,0h0.699c0.082,0,0.148-0.065,0.148-0.147S8.575,4.851,8.493,4.851L8.493,4.851z"></path>
              <path fill="none" d="M5.146,2.203V0.805c0-0.082-0.066-0.148-0.148-0.148c-0.082,0-0.148,0.066-0.148,0.148v1.398c0,0.082,0.066,0.149,0.148,0.149C5.08,2.352,5.146,2.285,5.146,2.203z"></path>
              <path fill="none" d="M4.85,7.796v1.396c0,0.082,0.066,0.15,0.148,0.15c0.082,0,0.148-0.068,0.148-0.15V7.796c0-0.082-0.066-0.148-0.148-0.148C4.917,7.647,4.85,7.714,4.85,7.796z"></path>
              <path fill="none" d="M2.651,3.473L1.44,2.774C1.369,2.732,1.279,2.757,1.238,2.828C1.197,2.899,1.221,2.989,1.292,3.031l1.21,0.699c0.023,0.013,0.049,0.02,0.074,0.02c0.051,0,0.101-0.026,0.129-0.075C2.747,3.604,2.722,3.514,2.651,3.473z"></path>
              <path fill="none" d="M8.704,6.968L7.493,6.269c-0.07-0.041-0.162-0.016-0.201,0.055c-0.041,0.07-0.018,0.162,0.053,0.203l1.211,0.699c0.023,0.012,0.049,0.02,0.074,0.02c0.051,0,0.102-0.027,0.129-0.074C8.8,7.101,8.776,7.009,8.704,6.968z"></path>
            </g>
          </svg>

          <svg version="1.1" x="20" height="600" id="cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet">
            <path fill="none" d="M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z"></path>
          </svg>

          <svg x="90" width="500" viewBox="0 0 200 1" className="rain">
            <rect x="0" className="drop">
            </rect >
            <rect x="20" className="drop">
            </rect >
            <rect x="40" className="drop">
            </rect >
            <rect x="60" className="drop">
            </rect >
            <rect x="80" className="drop">
            </rect >
            <rect x="100" className="drop">
            </rect >
            <rect x="120" className="drop">
            </rect >
            <rect x="140" className="drop">
            </rect >
            <rect x="160" className="drop">
            </rect >
            <rect x="180" className="drop">
            </rect >
          </svg>
        </svg>
      </div>
      <Footer />
    </>
  )
}
export default MyAccount

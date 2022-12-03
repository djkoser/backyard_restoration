import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AppDispatch, AppStore } from '../redux/store';
import { getUserInfo } from '../redux/userSlice';
import Footer from './Footer';
import Nav from './Nav';
import WeatherLoader from './WeatherLoader';

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const emailRedux = useSelector<AppStore, string>((state) => state.email);

  const firstNameRedux = useSelector<AppStore, string>(
    (state) => state.firstName
  );

  const lastNameRedux = useSelector<AppStore, string>(
    (state) => state.lastName
  );

  const streetRedux = useSelector<AppStore, string>((state) => state.street);

  const cityRedux = useSelector<AppStore, string>((state) => state.city);

  const stateRedux = useSelector<AppStore, string>((state) => state.state);

  const zipcodeRedux = useSelector<AppStore, string>((state) => state.zipcode);

  const firstGDD35Redux = useSelector<AppStore, string>(
    (state) => state.firstGdd45
  );

  const lastGDD35Redux = useSelector<AppStore, string>(
    (state) => state.lastGdd45
  );

  const hardinessZoneRedux = useSelector<AppStore, string>(
    (state) => state.hardinessZone
  );

  const [firstName, setFirstName] = useState(firstNameRedux);

  const [lastName, setLastName] = useState(lastNameRedux);

  const [email, setEmail] = useState(emailRedux);

  const [password, setPassword] = useState('This is a fake password');

  const [street, setStreet] = useState(streetRedux);

  const [city, setCity] = useState(cityRedux);

  const [state, setState] = useState(stateRedux);

  const [zipcode, setZipcode] = useState(zipcodeRedux);

  const [firstGdd45, setFirstGDD35] = useState(firstGDD35Redux);

  const [lastGdd45, setLastGDD35] = useState(lastGDD35Redux);

  const [hardinessZone, setHardinessZone] = useState(hardinessZoneRedux);

  const [editToggleName, setEditToggleName] = useState(true);

  const [editToggleEmail, setEditToggleEmail] = useState(true);

  const [editTogglePassword, setEditTogglePassword] = useState(true);

  const [editToggleAddress, setEditToggleAddress] = useState(true);

  const [editToggleGrwParams, setEditToggleGrwParams] = useState(true);

  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setFirstName(firstNameRedux);
    setLastName(lastNameRedux);
    setEmail(emailRedux);
    setStreet(streetRedux);
    setCity(cityRedux);
    setState(stateRedux);
    setZipcode(zipcodeRedux);
    setFirstGDD35(firstGDD35Redux);
    setLastGDD35(lastGDD35Redux);
    setHardinessZone(hardinessZoneRedux);
  };

  const onError = () => {
    dispatch(getUserInfo());
    if (
      emailRedux &&
      firstNameRedux &&
      lastNameRedux &&
      streetRedux &&
      cityRedux &&
      stateRedux &&
      zipcodeRedux &&
      firstGDD35Redux &&
      lastGDD35Redux &&
      hardinessZoneRedux
    ) {
      toast.error(
        'There was an error while attempting to change your credentials.'
      );
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    refresh();
  }, [
    emailRedux,
    firstNameRedux,
    lastNameRedux,
    streetRedux,
    cityRedux,
    stateRedux,
    zipcodeRedux,
    firstGDD35Redux,
    lastGDD35Redux,
    hardinessZoneRedux
  ]);

  const toggleEdit = (type: string) => {
    switch (type) {
      case 'name':
        if (editToggleName) {
          setEditToggleName(false);
        } else {
          setEditToggleName(true);
          axios
            .put('/api/user/name', {
              firstName: firstName,
              lastName: lastName
            })
            .then((res) => {
              dispatch({ type: 'ADD_RETRIEVED_INFO', payload: res.data });
              setPassword('This is a fake password');
              toast.success('Your name has been updated successfully.');
            })
            .catch(() => onError());
        }
        return;
      case 'email':
        if (editToggleEmail) {
          setEditToggleEmail(false);
        } else {
          setEditToggleEmail(true);
          axios
            .put('/api/user/email', { email })
            .then((res) => {
              dispatch({ type: 'ADD_RETRIEVED_INFO', payload: res.data });
              setPassword('This is a fake password');
              toast.success('Your email has been updated successfully.');
            })
            .catch(() => {
              onError();
              toast.error(
                "It is possible that you have an account with us under the email you're attempting to switch to."
              );
            });
        }
        return;
      case 'password':
        if (editTogglePassword) {
          setEditTogglePassword(false);
          setPassword('');
        } else {
          setEditTogglePassword(true);
          axios
            .put('/api/user/password', { password })
            .then((res) => {
              dispatch({ type: 'ADD_RETRIEVED_INFO', payload: res.data });
              setPassword('This is a fake password');
              toast.success('Your password has been updated successfully.');
            })
            .catch(() => onError());
        }
        return;
      case 'address':
        if (editToggleAddress) {
          setEditToggleAddress(false);
        } else {
          setLoading(true);
          setEditToggleAddress(true);
          const digitChecker = zipcode.match(/\D/g);
          if (zipcode.length <= 5 && !digitChecker) {
            axios
              .put('/api/user/address', { street, city, state, zipcode })
              .then((res) => {
                dispatch({ type: 'ADD_RETRIEVED_INFO', payload: res.data });
                setPassword('This is a fake password');
                toast.success('Your address has been updated successfully.');
                setTimeout(() => setLoading(false), 5000);
              })
              .catch((err) => {
                if (err.response.data === 'Manual Entry') {
                  toast.warning(
                    'NOAA failed to return weather data for your location. In order to complete your address change, you will now be redirected to a page where you will be able to manually enter growing parameters for your area.'
                  );
                  setTimeout(() => navigate('/manualEntry'), 5000);
                } else {
                  onError();
                  setTimeout(() => setLoading(false), 5000);
                }
              });
          } else {
            setLoading(false);
            toast.error('Please enter a 5 digit zipcode, thank you');
          }
        }
        return;
      case 'growingParams':
        if (editToggleGrwParams) {
          setEditToggleGrwParams(false);
        } else {
          setEditToggleGrwParams(true);
          axios
            .put('/api/user/growingInfo', {
              firstGdd45,
              lastGdd45,
              hardinessZone
            })
            .then((res) => {
              dispatch({ type: 'ADD_RETRIEVED_INFO', payload: res.data });
              setPassword('This is a fake password');
              toast.success(
                'Your growing parameters have been updated successfully.'
              );
            })
            .catch(() => {
              onError();
              toast.error(
                'You may have used the incorrect date format (MM-DD).'
              );
            });
        }
        return;
      default:
        break;
    }
  };

  const deleteAccount = () => {
    axios
      .delete('/api/deleteUser')
      .then(() => {
        toast.success(
          'Your account and all associated records have been successfully deleted. Thank you for using Backyard Restoration.net, we are sad to see you go.'
        );
        setTimeout(() => {
          navigate('/');
        }, 5000);
      })
      .catch(() =>
        toast.error(
          'An error occured while attempting to delete your account. Please contact us at BackyardResotrationNet@gmail.com and wel will remove your information from our system manually. Thank you for using Backyard Restoration.net and we apologize for this inconvenience.'
        )
      );
  };

  return loading ? (
    <>
      <WeatherLoader noText={false} />
      <ToastContainer />
    </>
  ) : (
    <>
      <ToastContainer />
      <div id="myAccountBkgd">
        <Nav invertColors={true} />
        <h1 id="myAccountHeader">My Account</h1>
        <main
          className="myAccountForm"
          style={!loading ? { display: 'inline-flex' } : { display: 'none' }}
        >
          <div id="startHardiness">
            <fieldset className=" editBoxes">
              <h3 className="accountPageText">Season Start and End Dates</h3>
              <h4 className="accountPageText">(MM-DD)</h4>
              <input
                className="myAccountInput"
                disabled={editToggleGrwParams}
                type="text"
                value={firstGdd45}
                onChange={(e) => {
                  setFirstGDD35(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleGrwParams}
                type="text"
                value={lastGdd45}
                onChange={(e) => {
                  setLastGDD35(e.target.value);
                }}
              />
              <h3 className="accountPageText"> USDA Hardiness Zone.</h3>
              <br />
              <h4>
                <a
                  href="https://planthardiness.ars.usda.gov/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Need Help? Click Here
                </a>
              </h4>
              <select
                className="myAccountInput"
                disabled={editToggleGrwParams}
                value={hardinessZone}
                onChange={(e) => {
                  setHardinessZone(e.target.value);
                }}
              >
                <option value="1a">Zone 1a: -60F - -55F </option>
                <option value="1b">Zone 1b: -55F - -50F </option>
                <option value="2a">Zone 2a: -50F - -45F </option>
                <option value="2b">Zone 2b: -45F - -40F </option>
                <option value="3a">Zone 3a: -40F - -35F </option>
                <option value="3b">Zone 3b: -35F - -30F </option>
                <option value="4a">Zone 4a: -30F - -25F </option>
                <option value="4b">Zone 4b: -25F - -20F </option>
                <option value="5a">Zone 5a: -20F - -15F </option>
                <option value="5b">Zone 5b: -15F - -10F </option>
                <option value="6a">Zone 6a: -10F - -5F </option>
                <option value="6b">Zone 6b: -5F - 0F </option>
                <option value="7a">Zone 7a: 0F - 5F </option>
                <option value="7b">Zone 7b: 5F - 10F </option>
                <option value="8a">Zone 8a: 10F - 15F </option>
                <option value="8b">Zone 8b: 15F - 20F </option>
                <option value="9a">Zone 9a: 20F - 25F </option>
                <option value="9b">Zone 9b: 25F - 30F </option>
                <option value="10a">Zone 10a: 30F - 35F </option>
                <option value="10b">Zone 10b: 35F - 40F </option>
                <option value="11a">Zone 11a: 40F - 45F </option>
                <option value="11b">Zone 11b: 45F - 50F </option>
                <option value="12a">Zone 12a: 50F - 55F </option>
                <option value="12b">Zone 12b: 55F - 60F </option>
                <option value="13a">Zone 13a: 60F - 65F </option>
                <option value="13b">Zone 13b: 65F - 70F </option>
              </select>
            </fieldset>
            <button onClick={() => toggleEdit('growingParams')}>
              {editToggleGrwParams ? 'Edit' : 'Submit'}
            </button>
          </div>
          <div id="address">
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Password</h3>
              <input
                className="myAccountInput"
                disabled={editTogglePassword}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('password')}>
              {editTogglePassword ? 'Edit' : 'Submit'}
            </button>
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Address</h3>
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('address')}>
              {editToggleAddress ? 'Edit' : 'Submit'}
            </button>
          </div>
          <div id="nameEmailPassword">
            <fieldset className=" editBoxes">
              <h3 className="accountPageText">Name</h3>
              <input
                className="myAccountInput"
                disabled={editToggleName}
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleName}
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('name')}>
              {editToggleName ? 'Edit' : 'Submit'}
            </button>
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Email</h3>
              <input
                className="myAccountInput"
                disabled={editToggleEmail}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('email')}>
              {editToggleEmail ? 'Edit' : 'Submit'}
            </button>
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Delete My Account</h3>
              <button onClick={() => deleteAccount()}>Delete Account</button>
            </fieldset>
          </div>
          <br />
        </main>
      </div>
      <Footer />
    </>
  );
};
export default MyAccount;

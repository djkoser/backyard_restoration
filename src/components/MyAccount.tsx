import { Auth } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateUserInput } from '../API';
import { AppDispatch, AppStore } from '../redux/store';
import { deleteUser, getUserInfo, updateUser } from '../redux/userSlice';
import { getGrowingParams, passwordChecker } from '../utilities';
import { Footer, Nav, WeatherLoader } from './';

enum ChangeCases {
  growingParams = 'growingParams',
  deleteUser = 'deleteUser',
  name = 'name',
  password = 'password',
  address = 'address',
  none = 'none'
}

export const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const emailRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.email
  );

  const firstNameRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.firstName || ''
  );

  const lastNameRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.lastName || ''
  );

  const streetRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.street || ''
  );

  const cityRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.city || ''
  );

  const stateRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.state || ''
  );

  const zipcodeRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.zipcode || ''
  );

  const firstGDD35Redux = useSelector<AppStore, string>(
    (state) => state.userInfo.firstGdd45
  );

  const lastGDD35Redux = useSelector<AppStore, string>(
    (state) => state.userInfo.lastGdd45
  );

  const hardinessZoneRedux = useSelector<AppStore, string>(
    (state) => state.userInfo.hardinessZone
  );

  const failedRedux = useSelector<AppStore, boolean>(
    (state) => state.userInfo.failed
  );

  const loadingRedux = useSelector<AppStore, boolean>(
    (state) => state.userInfo.loading
  );

  const [lastChanged, setLastChanged] = useState<ChangeCases>(ChangeCases.none);

  const [firstName, setFirstName] = useState(firstNameRedux || '');

  const [lastName, setLastName] = useState(lastNameRedux || '');

  const [currentPassword, setCurrentPassword] = useState(
    'This is a fake password'
  );

  const [newPassword, setNewPassword] = useState('This is a fake password');

  const [street, setStreet] = useState(streetRedux || '');

  const [city, setCity] = useState(cityRedux || '');

  const [state, setState] = useState(stateRedux || '');

  const [zipcode, setZipcode] = useState(zipcodeRedux || '');

  const [firstGdd45, setFirstGDD35] = useState(firstGDD35Redux || '');

  const [lastGdd45, setLastGDD35] = useState(lastGDD35Redux || '');

  const [hardinessZone, setHardinessZone] = useState(hardinessZoneRedux || '');

  const [editToggleName, setEditToggleName] = useState(true);

  const [editTogglePassword, setEditTogglePassword] = useState(true);

  const [editToggleAddress, setEditToggleAddress] = useState(true);

  const [editToggleGrwParams, setEditToggleGrwParams] = useState(true);

  const [loadingGrowingParams, setLoadingGrowingParams] = useState(false);

  const refresh = () => {
    setFirstName(firstNameRedux || '');
    setLastName(lastNameRedux || '');
    setStreet(streetRedux || '');
    setCity(cityRedux || '');
    setState(stateRedux || '');
    setZipcode(zipcodeRedux || '');
    setFirstGDD35(firstGDD35Redux || '');
    setLastGDD35(lastGDD35Redux || '');
    setHardinessZone(hardinessZoneRedux || '');
  };

  const onError = () => {
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
      switch (lastChanged) {
        case ChangeCases.growingParams:
          toast.error(
            'There was an error while attempting to change your growing parameters. Please make sure you are using the correct date format -> "MM-DD".'
          );
          break;
        case ChangeCases.deleteUser:
          toast.error(
            'An error occurred while attempting to delete your account. Please contact us at BackyardResotrationNet@gmail.com and wel will remove your information from our system manually. Thank you for using Backyard Restoration.net and we apologize for this inconvenience.'
          );
          break;
        default:
          toast.error(
            `There was an error while attempting to change your ${lastChanged}. Please try again.`
          );
      }
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

  const loadingPreviously = useRef(false);
  useEffect(() => {
    if (loadingPreviously.current && failedRedux) {
      onError();
    } else if (
      loadingPreviously.current &&
      lastChanged === ChangeCases.deleteUser
    ) {
      toast.success(
        'Your account and all associated records have been successfully deleted. Thank you for using Backyard Restoration.net, we are sad to see you go.'
      ),
        setTimeout(() => navigate('/'), 2000);
    } else if (loadingPreviously.current && lastChanged) {
      setTimeout(
        () => toast.success(`Your ${lastChanged} was updated successfully.`),
        250
      );
    }
    loadingPreviously.current = loadingRedux;
  }, [failedRedux, lastChanged, loadingRedux]);

  const toggleEdit = async (type: string) => {
    switch (type) {
      case ChangeCases.name:
        if (editToggleName) {
          setEditToggleName(false);
        } else {
          setLastChanged(ChangeCases.name);
          setEditToggleName(true);
          dispatch(updateUser({ firstName, lastName }));
          setCurrentPassword('This is a fake password');
          setNewPassword('This is a fake password');
        }
        return;
      case ChangeCases.password:
        if (editTogglePassword) {
          setEditTogglePassword(false);
          setCurrentPassword('');
          setNewPassword('');
        } else {
          if (passwordChecker.test(newPassword)) {
            setEditTogglePassword(true);
            Auth.currentAuthenticatedUser({ bypassCache: true })
              .then((user) =>
                Auth.changePassword(user, currentPassword, newPassword).then(
                  () => {
                    toast.success(
                      'Your password has been updated successfully.'
                    );
                  }
                )
              )
              .catch(() => onError());
          } else {
            toast.warning(
              'The password you created does not meet our requirements: minimum of 8 characters, at least one uppercase and lowercase letter, one number and one special character: @,$,!,%,*,? or &. Please create a new password and try again.'
            );
          }
        }
        return;
      case ChangeCases.address:
        if (editToggleAddress) {
          setEditToggleAddress(false);
        } else {
          setLastChanged(ChangeCases.address);
          setEditToggleAddress(true);
          const paramsToUpdate: Omit<UpdateUserInput, 'email'> = {};
          if (street) paramsToUpdate.street = street;
          if (city) paramsToUpdate.city = city;
          if (state) paramsToUpdate.state = state;
          if (zipcode) paramsToUpdate.zipcode = zipcode;
          dispatch(updateUser(paramsToUpdate));
          if (zipcode && street && city && state) {
            const digitChecker = zipcode.match(/\d\d\d\d\d/g);
            if (digitChecker) {
              try {
                setLoadingGrowingParams(true);
                const {
                  hardinessZone,
                  firstGdd45,
                  lastGdd45,
                  growingSeasonLength
                } = await getGrowingParams(zipcode, street, city, state);
                setLoadingGrowingParams(false);
                setLastChanged(ChangeCases.growingParams);
                dispatch(
                  updateUser({
                    hardinessZone,
                    firstGdd45,
                    lastGdd45,
                    growingSeasonLength
                  })
                );
              } catch (err) {
                setLoadingGrowingParams(false);
                toast.warn(
                  'We were unable to compute growing parameters for your new address, please update them within the appropriate "My Account" section. Thank you'
                );
              }
            } else {
              toast.error('Please enter a 5 digit zipcode, thank you');
            }
          }
        }
        return;
      case ChangeCases.growingParams:
        if (editToggleGrwParams) {
          setEditToggleGrwParams(false);
        } else {
          setLastChanged(ChangeCases.growingParams);
          setEditToggleGrwParams(true);
          dispatch(updateUser({ firstGdd45, lastGdd45, hardinessZone }));
        }
        return;
      default:
        break;
    }
  };

  return loadingRedux || loadingGrowingParams ? (
    <>
      <WeatherLoader noText={loadingGrowingParams ? false : true} />
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
          style={
            !loadingRedux ? { display: 'inline-flex' } : { display: 'none' }
          }
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
          <div id="nameAddress">
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
              <h3 className="accountPageText">Address</h3>
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={street}
                placeholder="Street"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={state}
                placeholder="State"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={zipcode}
                placeholder="Zipcode"
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('address')}>
              {editToggleAddress ? 'Edit' : 'Submit'}
            </button>
          </div>
          <div id="emailPassword">
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Email</h3>
              <br />
              <h3 style={{ fontWeight: 'bold' }} className="myAccountInput">
                {emailRedux}
              </h3>
            </fieldset>
            <br />
            <br />
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Current Password</h3>
              <input
                className="myAccountInput"
                disabled={editTogglePassword}
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
              <h3 className="accountPageText">New Password</h3>
              <input
                className="myAccountInput"
                disabled={editTogglePassword}
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </fieldset>
            <button onClick={() => toggleEdit('password')}>
              {editTogglePassword ? 'Edit' : 'Submit'}
            </button>
            <fieldset className="editBoxes">
              <h3 className="accountPageText">Delete My Account</h3>
              <button
                onClick={() => {
                  setLastChanged(ChangeCases.deleteUser);
                  dispatch(deleteUser());
                }}
              >
                Delete Account
              </button>
            </fieldset>
            <br />
            <br />
          </div>
          <br />
        </main>
      </div>
      <Footer />
    </>
  );
};

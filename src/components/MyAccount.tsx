import { Auth } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateUserInput } from '../API';
import { AppDispatch, AppStore } from '../redux/store';
import { deleteUser, getUserInfo, updateUser } from '../redux/userSlice';
import { ReduxConverter, UserState } from '../types';
import {
  daysBetween,
  getGrowingParams,
  getLocalStateHelper,
  passwordChecker
} from '../utilities';
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

  const {
    emailRedux,
    firstNameRedux,
    lastNameRedux,
    streetRedux,
    cityRedux,
    stateRedux,
    zipcodeRedux,
    firstGdd45Redux,
    lastGdd45Redux,
    hardinessZoneRedux,
    failedRedux,
    loadingRedux
  } = useSelector<
    AppStore,
    Omit<ReduxConverter<UserState>, 'growingSeasonLengthRedux'>
  >((reduxState) => {
    const {
      email,
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
      firstGdd45,
      lastGdd45,
      hardinessZone,
      failed,
      loading
    } = reduxState.userInfo;
    return {
      emailRedux: email || '',
      firstNameRedux: firstName || '',
      lastNameRedux: lastName || '',
      streetRedux: street || '',
      cityRedux: city || '',
      stateRedux: state || '',
      zipcodeRedux: zipcode || '',
      firstGdd45Redux: firstGdd45 || '',
      lastGdd45Redux: lastGdd45 || '',
      hardinessZoneRedux: hardinessZone || '',
      failedRedux: failed,
      loadingRedux: loading
    };
  });

  const [localState, setLocalState] = useState({
    lastChanged: ChangeCases.none,
    firstName: firstNameRedux || '',
    lastName: lastNameRedux || '',
    currentPassword: 'This is a fake password',
    newPassword: 'This is a fake password',
    street: streetRedux || '',
    city: cityRedux || '',
    state: stateRedux || '',
    zipcode: zipcodeRedux || '',
    firstGdd45: firstGdd45Redux || '',
    lastGdd45: lastGdd45Redux || '',
    hardinessZone: hardinessZoneRedux || '',
    editToggleName: true,
    editTogglePassword: true,
    editToggleAddress: true,
    editToggleGrwParams: true,
    loadingGrowingParams: false
  });

  const {
    lastChanged,
    firstName,
    lastName,
    currentPassword,
    newPassword,
    street,
    city,
    state,
    zipcode,
    firstGdd45,
    lastGdd45,
    hardinessZone,
    editToggleName,
    editTogglePassword,
    editToggleAddress,
    editToggleGrwParams,
    loadingGrowingParams
  } = localState;

  const localStateHelper =
    getLocalStateHelper<typeof localState>(setLocalState);

  const refresh = () => {
    localStateHelper({
      firstName: firstNameRedux || '',
      lastName: lastNameRedux || '',
      street: streetRedux || '',
      city: cityRedux || '',
      state: stateRedux || '',
      zipcode: zipcodeRedux || '',
      firstGdd45: firstGdd45Redux || '',
      lastGdd45: lastGdd45Redux || '',
      hardinessZone: hardinessZoneRedux || ''
    });
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
      firstGdd45Redux &&
      lastGdd45Redux &&
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
    firstGdd45Redux,
    lastGdd45Redux,
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
    } else if (loadingPreviously.current && lastChanged !== ChangeCases.none) {
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
          localStateHelper({ editToggleName: false });
        } else {
          localStateHelper({
            lastChanged: ChangeCases.name,
            editToggleName: true
          });
          dispatch(updateUser({ firstName, lastName }));
        }
        return;
      case ChangeCases.password:
        if (editTogglePassword) {
          localStateHelper({
            editTogglePassword: false,
            currentPassword: 'This is a fake password',
            newPassword: 'This is a fake password'
          });
        } else {
          if (passwordChecker.test(newPassword)) {
            localStateHelper({ editTogglePassword: true });
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
          localStateHelper({ editToggleAddress: false });
        } else {
          localStateHelper({
            lastChanged: ChangeCases.address,
            editToggleAddress: true
          });

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
                localStateHelper({ loadingGrowingParams: true });
                const {
                  hardinessZone,
                  firstGdd45,
                  lastGdd45,
                  growingSeasonLength
                } = await getGrowingParams(zipcode, street, city, state);
                localStateHelper({
                  loadingGrowingParams: false,
                  lastChanged: ChangeCases.growingParams
                });
                dispatch(
                  updateUser({
                    hardinessZone,
                    firstGdd45,
                    lastGdd45,
                    growingSeasonLength
                  })
                );
              } catch (err) {
                localStateHelper({ loadingGrowingParams: false });
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
          localStateHelper({ editToggleGrwParams: false });
        } else {
          localStateHelper({
            lastChanged: ChangeCases.growingParams,
            editToggleGrwParams: true
          });
          const growingSeasonLength = daysBetween(firstGdd45, lastGdd45);
          dispatch(
            updateUser({
              firstGdd45,
              lastGdd45,
              hardinessZone,
              growingSeasonLength
            })
          );
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
                  localStateHelper({
                    firstGdd45: e.target.value
                  });
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleGrwParams}
                type="text"
                value={lastGdd45}
                onChange={(e) => {
                  localStateHelper({ lastGdd45: e.target.value });
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
                  localStateHelper({ hardinessZone: e.target.value });
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
                  localStateHelper({ firstName: e.target.value });
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleName}
                type="text"
                value={lastName}
                onChange={(e) => {
                  localStateHelper({ lastName: e.target.value });
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
                  localStateHelper({ street: e.target.value });
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => {
                  localStateHelper({ city: e.target.value });
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={state}
                placeholder="State"
                onChange={(e) => {
                  localStateHelper({ state: e.target.value });
                }}
              />
              <input
                className="myAccountInput"
                disabled={editToggleAddress}
                type="text"
                value={zipcode}
                placeholder="Zipcode"
                onChange={(e) => {
                  localStateHelper({ zipcode: e.target.value });
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
                  localStateHelper({ currentPassword: e.target.value });
                }}
              />
              <h3 className="accountPageText">New Password</h3>
              <input
                className="myAccountInput"
                disabled={editTogglePassword}
                type="password"
                value={newPassword}
                onChange={(e) => {
                  localStateHelper({ newPassword: e.target.value });
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
                  localStateHelper({ lastChanged: ChangeCases.deleteUser });
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

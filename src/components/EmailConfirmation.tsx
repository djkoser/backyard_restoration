import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  CreateUserCMutationVariables,
  UpdateUserCMutationVariables
} from '../API';
import { createUserC, updateUserC } from '../graphql/customMutations';
import { getGrowingParams, getLocalStateHelper } from '../utilities';
import { WeatherLoader } from './';

export const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, firstName, lastName } = location.state;

  const [localState, setState] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    confirmationCode: '',
    loading: false
  });

  const { street, city, state, zipcode, confirmationCode, loading } =
    localState;

  const localStateHelper = getLocalStateHelper<typeof localState>(setState);

  const handleManualEntry = () => {
    toast.warning(
      'We are unable to acquire weather data for your location! In order to complete your registration, you will now be redirected to a page where you will be able to  manually enter your: season start date, season end date and hardiness zone.'
    );
    setTimeout(() => navigate('/manualEntry'), 5000);
  };

  const confirmUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      location.state.password = '';
      localStateHelper({ loading: true });
      const paramsToAdd: CreateUserCMutationVariables = {
        input: {
          email,
          growingSeasonLength: 0,
          firstGdd45: '',
          lastGdd45: '',
          hardinessZone: ''
        }
      };
      const { input } = paramsToAdd;
      if (firstName) input.firstName = firstName;
      if (lastName) input.lastName = lastName;
      if (street) input.street = street;
      if (city) input.city = city;
      if (state) input.state = state;
      if (zipcode) input.zipcode = zipcode;
      await API.graphql(graphqlOperation(createUserC, paramsToAdd));

      if (zipcode && street && city && state) {
        const digitChecker = zipcode.match(/\d\d\d\d\d/g);
        if (digitChecker) {
          try {
            const updateParams = await getGrowingParams(
              zipcode,
              street,
              city,
              state
            );
            const input: UpdateUserCMutationVariables = {
              input: { email, ...updateParams }
            };
            location.state.email = '';
            await API.graphql(graphqlOperation(updateUserC, input));
            toast.success(
              'Registration Successful! Logging you into your new dashboard!'
            );
            setTimeout(() => navigate('/dash'), 3000);
          } catch (err) {
            handleManualEntry();
          }
        } else {
          localStateHelper({ loading: false });
          toast.error('Please enter a 5 digit zipcode, thank you');
        }
      } else {
        handleManualEntry();
      }
    } catch (err) {
      const errParsed =
        err instanceof Error ? err : new Error(JSON.stringify(err));
      console.log(errParsed.message);
      localStateHelper({ loading: false });
      toast.error(
        'User registration failed, please check your confirmation code and try again, or email us at BackyardRestorationNet@gmail.com'
      );
      setTimeout(() => navigate('/'), 5000);
    }
  };

  const cancelRegistration = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const { REACT_APP_ADMIN_USERNAME, REACT_APP_ADMIN_PASSWORD } =
        process.env;
      await Auth.signIn(
        REACT_APP_ADMIN_USERNAME || '',
        REACT_APP_ADMIN_PASSWORD
      );
      toast.warn('Canceling your registration...');

      const apiInput = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`
        },
        body: {
          username: email
        }
      };
      const response = await API.del(
        'AdminQueries',
        '/deleteUserIfUnconfirmed',
        apiInput
      );

      await Auth.signOut();
      toast.success(
        `Successfully removed user ${response.Username} and associated data from our records`
      );
      setTimeout(() => navigate('/'), 5000);
    } catch {
      await Auth.signOut();
      toast.error(
        'Unable to cancel your registration, please contact us at BackyardRestorationNet@gmail.com so that we can manually remove your email from our user list, Thank you'
      );
      setTimeout(() => navigate('/'), 10000);
    }
  };

  return (
    <>
      <ToastContainer />
      <section id="registerBody">
        <WeatherLoader
          loadingOverride={loading}
          text={`Calculating growing parameters for your location based upon 10 years of
        local weather data, courtesy of the National Oceanic and Atmospheric
        Administration (NOAA). This could take several minutes depending on
        server traffic.`}
          invertColors={true}
        />
        {loading ? null : (
          <>
            <form id="registerForm">
              <section className="registerSections">
                <h3 className="registerSectionText">Confirmation Code</h3>
                <br />
                <h4 style={{ color: 'black' }}>
                  Please enter the confirmation we sent you here
                </h4>
                <br />
                <input
                  placeholder="Confirmation Code"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => {
                    localStateHelper({ confirmationCode: e.target.value });
                  }}
                ></input>
              </section>
              <section className="registerSections">
                <h3 className="registerSectionText">Address</h3>
                <input
                  placeholder="Street"
                  type="text"
                  value={street}
                  onChange={(e) => {
                    localStateHelper({ street: e.target.value });
                  }}
                ></input>
                <input
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    localStateHelper({ city: e.target.value });
                  }}
                ></input>
                <input
                  placeholder="State"
                  type="text"
                  value={state}
                  onChange={(e) => {
                    localStateHelper({ state: e.target.value });
                  }}
                ></input>
                <input
                  placeholder="Zipcode"
                  type="text"
                  value={zipcode}
                  onChange={(e) => {
                    localStateHelper({ zipcode: e.target.value });
                  }}
                ></input>
              </section>
              <button
                onClick={(e) => {
                  void confirmUser(e);
                }}
              >
                Complete Registration
              </button>
              <button
                onClick={(e) => {
                  void cancelRegistration(e);
                }}
              >
                Cancel Registration
              </button>
            </form>
            <article className="registerWelcomeText">
              <h1>Welcome to Our Community!</h1>
              <h4>
                Your address will be used to calculate growing parameters for
                your local area using historical weather data.
              </h4>
              <h4>
                BackyardRestoration.net was built with modern security
                protocols, but if you have any privacy concerns with providing
                your address, please leave this information blank and you will
                be prompted to manually enter your: season start-date, season
                end-date and hardiness zone on the next page.
              </h4>
            </article>
          </>
        )}
      </section>
      <Link id="backToLoginLink" to={'/'}>
        Back to Login
      </Link>
    </>
  );
};

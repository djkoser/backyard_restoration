import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  CreateUserCMutationVariables,
  UpdateUserCMutationVariables
} from '../API';
import { createUserC, updateUserC } from '../graphql/customMutations';
import { getGrowingParams } from '../utilities';
import { WeatherLoader } from './';

export const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, firstName, lastName } = location.state;

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const paramsToAdd: CreateUserCMutationVariables = {
        input: {
          email,
          growingSeasonLength: 0,
          firstGdd45: '',
          lastGdd45: '',
          hardinessZone: ''
        }
      };
      if (firstName) paramsToAdd.input.firstName = firstName;
      if (lastName) paramsToAdd.input.lastName = lastName;
      if (street) paramsToAdd.input.street = street;
      if (city) paramsToAdd.input.city = city;
      if (state) paramsToAdd.input.state = state;
      if (zipcode) paramsToAdd.input.zipcode = zipcode;
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
          setLoading(false);
          toast.error('Please enter a 5 digit zipcode, thank you');
        }
      } else {
        handleManualEntry();
      }
    } catch (err) {
      const errParsed =
        err instanceof Error ? err : new Error(JSON.stringify(err));
      console.log(errParsed.message);
      setLoading(false);
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
      await Auth.signIn(REACT_APP_ADMIN_USERNAME!, REACT_APP_ADMIN_PASSWORD);
      toast.warn('Canceling your registration...');
      const response = await fetch(
        encodeURI(
          `${process.env.REACT_APP_ADMIN_ENDPOINT}/deleteUserIfUnconfirmed`
        ),
        {
          method: 'DELETE',
          body: JSON.stringify({ username: email })
        }
      );
      const responseParsed = await response.json();
      await Auth.signOut();
      toast.success(
        `Successfully removed user ${responseParsed.Username} and associated data from our records`
      );
      setTimeout(() => navigate('/'), 5000);
    } catch {
      toast.error(
        'Unable to cancel your registration, please contact us at BackyardRestorationNet@gmail.com so that we can manually remove your email from our user list, Thank you'
      );
      setTimeout(() => navigate('/'), 10000);
    }
  };

  return loading ? (
    <>
      <ToastContainer />
      <WeatherLoader noText={false} />
    </>
  ) : (
    <>
      <ToastContainer />
      <section
        id="registerBody"
        style={loading ? { visibility: 'hidden' } : { visibility: 'visible' }}
      >
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
                setConfirmationCode(e.target.value);
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
                setStreet(e.target.value);
              }}
            ></input>
            <input
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></input>
            <input
              placeholder="State"
              type="text"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            ></input>
            <input
              placeholder="Zipcode"
              type="text"
              value={zipcode}
              onChange={(e) => {
                setZipcode(e.target.value);
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
            Your address will be used to calculate growing parameters for your
            local area using historical weather data.
          </h4>
          <h4>
            BackyardRestoration.net was built with modern security protocols,
            but if you have any privacy concerns with providing your address,
            please leave this information blank and you will be prompted to
            manually enter your: season start-date, season end-date and
            hardiness zone on the next page.
          </h4>
        </article>
      </section>
      <Link id="backToLoginLink" to={'/'}>
        Back to Login
      </Link>
    </>
  );
};

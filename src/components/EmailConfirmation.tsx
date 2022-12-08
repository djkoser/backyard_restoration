import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateUserCMutation, UpdateUserCMutationVariables } from '../API';
import { updateUserC } from '../graphql/customMutations';
import { GrowingCalculations } from '../utilities/GrowingCalculations';
import { WeatherLoader } from './';

export const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  const dispatch = useDispatch();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualEntry = () => {
    toast.warning(
      'NOAA failed to return weather data for your location. In order to complete your registration, you will now be redirected to a page where you will be able to  manually enter your: season start date, season end date and hardiness zone.'
    );
    setTimeout(() => navigate('/manualEntry'), 5000);
  };

  const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      location.state.password = '';
      const digitChecker = zipcode.match(/\D/g);
      if (zipcode.length <= 5 && !digitChecker) {
        setLoading(true);
        if (zipcode && street && city && state) {
          const { hardinessZone, firstGdd45, lastGdd45, growingSeasonLength } =
            await new GrowingCalculations(
              zipcode,
              street,
              city,
              state
            ).calculateGrowingParams();

          const input: UpdateUserCMutationVariables = {
            input: {
              email,
              street,
              city,
              state,
              zipcode,
              growingSeasonLength,
              firstGdd45,
              lastGdd45,
              hardinessZone
            }
          };
          location.state.email = '';
          const graphQLResult = (await API.graphql(
            graphqlOperation(updateUserC, input)
          )) as GraphQLResult<UpdateUserCMutation>;
          const { __typename, ...omitTypename } =
            graphQLResult?.data?.updateUser || {};
          dispatch({
            type: 'ADD_RETRIEVED_INFO',
            payload: omitTypename
          });
          toast.success(
            'Registration Successful! Logging you into your new dashboard!'
          );
          setTimeout(() => navigate('/dash'), 3000);
        } else {
          handleManualEntry();
        }
      } else {
        setLoading(false);
        toast.error('Please enter a 5 digit zipcode, thank you');
      }
    } catch (err) {
      setLoading(false);
      if (
        err instanceof Error &&
        err.message === 'Growing Param Calculation Failed'
      ) {
        handleManualEntry();
      } else {
        toast.error(
          'User registration failed, please check your confirmation code and try again, or email us at BackyardRestorationNet@gmail.com'
        );
      }
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
        <form
          id="registerForm"
          onSubmit={(e) => {
            void createNewUser(e);
          }}
        >
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
          <button>Complete Registration</button>
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

import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CreateUserCMutation, CreateUserCMutationVariables } from '../API';
import { createUserC } from '../graphql/customMutations';
import { GrowingCalculations } from '../utilities/GrowingCalculations';
import { WeatherLoader } from './';

export const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, firstName, lastName } = location.state;
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

  const confirmUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      location.state.password = '';
      setLoading(true);
      let hardinessZone = '';
      let firstGdd45 = '';
      let lastGdd45 = '';
      let growingSeasonLength = 0;
      if (zipcode && street && city && state) {
        const digitChecker = zipcode.match(/\d\d\d\d\d/g);
        if (digitChecker) {
          try {
            ({ hardinessZone, firstGdd45, lastGdd45, growingSeasonLength } =
              await new GrowingCalculations(
                zipcode,
                street,
                city,
                state
              ).calculateGrowingParams());
          } catch (err) {
            const errParsed =
              err instanceof Error ? err : new Error(JSON.stringify(err));
            console.log(errParsed.message);
          }
        } else {
          setLoading(false);
          toast.error('Please enter a 5 digit zipcode, thank you');
        }
      }

      const input: CreateUserCMutationVariables = {
        input: {
          firstName: firstName || '',
          lastName: lastName || '',
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
        graphqlOperation(createUserC, input)
      )) as GraphQLResult<CreateUserCMutation>;
      const { __typename, ...omitTypename } =
        graphQLResult?.data?.createUser || {};
      dispatch({
        type: 'ADD_RETRIEVED_INFO',
        payload: omitTypename
      });

      if (
        hardinessZone === '' ||
        firstGdd45 === '' ||
        lastGdd45 === '' ||
        growingSeasonLength === 0
      ) {
        handleManualEntry();
      } else {
        toast.success(
          'Registration Successful! Logging you into your new dashboard!'
        );
        setTimeout(() => navigate('/dash'), 3000);
      }
    } catch (err) {
      const errParsed =
        err instanceof Error ? err : new Error(JSON.stringify(err));
      console.log(errParsed.message);
      setLoading(false);
      toast.error(
        'User registration failed, please check your confirmation code and try again, or email us at BackyardRestorationNet@gmail.com'
      );
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
            void confirmUser(e);
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

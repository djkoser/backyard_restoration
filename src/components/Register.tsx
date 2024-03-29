import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { WeatherLoader } from './';
import { getLocalStateHelper, passwordChecker } from '../utilities';

// props from Login email, password

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [localState, setLocalState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    loading: false
  });
  const { firstName, lastName, email, password, loading } = localState;

  const localStateHelper =
    getLocalStateHelper<typeof localState>(setLocalState);

  const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (passwordChecker.test(password)) {
        localStateHelper({ loading: true });
        await Auth.signUp({
          username: email,
          password,
          attributes: { email }
        });
        toast.success(
          `Account Creation Successful! Please confirm your email address by entering the code we sent to ${email} on the next page...`
        );
        setTimeout(
          () =>
            navigate('/emailConfirmation', {
              state: { firstName, lastName, email, password }
            }),
          5000
        );
      } else {
        localStateHelper({ loading: false });
        toast.warning(
          'The password you created does not meet our requirements: minimum of 8 characters, at least one uppercase and lowercase letter, one number and one special character: @,$,!,%,*,? or &. Please create a new password and try again.'
        );
      }
    } catch (err) {
      localStateHelper({ loading: false });
      toast.error(
        'There was an error while attempting to create your use account and validate your email address, if you already have an account with us, please log in using your email and password, or reset your password using the "Forgot Password" link..'
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <section id="registerBody">
        <WeatherLoader invertColors={true} loadingOverride={loading}>
          <form
            id="registerForm"
            onSubmit={(e) => {
              void createNewUser(e);
            }}
          >
            <section className="registerSections">
              <h3 className="registerSectionText">Name</h3>
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) =>
                  localStateHelper({ firstName: e.target.value })
                }
              ></input>
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => localStateHelper({ lastName: e.target.value })}
              ></input>
            </section>
            <section className="registerSections">
              <h3 className="registerSectionText">Email</h3>
              <input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => localStateHelper({ email: e.target.value })}
              ></input>
            </section>
            <section className="registerSections">
              <h3 className="registerSectionText">Password</h3>
              <br />
              <h4 style={{ color: 'black' }}>
                Your password must be a minimum of 8 characters and contain at
                least one: uppercase letter, lowercase letter, number and
                special character
                <br />
                (@ $ ! % * ? &)
              </h4>
              <br />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => localStateHelper({ password: e.target.value })}
              ></input>
            </section>
            <button>Confirm Email</button>
          </form>
          <article className="registerWelcomeText">
            <h1>Welcome to Our Community!</h1>
            <h4>
              {' '}
              Registering for an account with BackyardRestoration.net will
              provide you with access to a series of free tools designed to help
              you plan and complete your own backyard ecological restoration
              projects.{' '}
            </h4>
          </article>
        </WeatherLoader>
      </section>
      <Link id="backToLoginLink" to={'/'}>
        Back to Login
      </Link>
    </>
  );
};

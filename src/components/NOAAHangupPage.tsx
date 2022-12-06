import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AppStore } from '../redux/store';
import { updateUser } from '../redux/userSlice';

const NOAAHangupPage: React.FC = () => {
  const navigate = useNavigate();
  const [firstGdd45, setFirstGDD35] = useState('MM-DD');
  const [lastGdd45, setLastGDD35] = useState('MM-DD');
  const [hardinessZone, setHardinessZone] = useState('');
  const dispatch = useDispatch();

  const reduxLoading = useSelector<AppStore, boolean>(
    (state) => state.userInfo.loading
  );

  const reduxFailed = useSelector<AppStore, boolean>(
    (state) => state.userInfo.failed
  );

  useEffect(() => {
    if (!reduxFailed && !reduxLoading) {
      toast.success(
        'Your growing parameters have been updated succcessfully. You will now be navigated to your dashboard.'
      );
      setTimeout(() => navigate('/dash'), 3000);
    } else if (reduxFailed && !reduxLoading) {
      toast.error(
        'An error occured while attempting to add your growing information to your account. Please unsure that you have used the correct formatting within the start and end dates boxes (MM-DD). Thank you.'
      );
    }
  }, [reduxLoading, reduxFailed]);

  return (
    <main id="NOAAHangupBody">
      <ToastContainer />
      <div id="growingParamsUpdate">
        <fieldset id="NOAAHangupForm">
          <h2 className="NOAAHangupText">
            Season Start and End Dates (MM-DD).
          </h2>
          <h4>
            These dates represent the first and last dates of the season when
            average daily temperatures are just above freezing.
          </h4>
          <br />
          <h4>
            {' '}
            Note: these are not traditional growing season start and end dates.
          </h4>
          <input
            onFocus={() => setFirstGDD35('')}
            type="text"
            value={firstGdd45}
            onChange={(e) => {
              setFirstGDD35(e.target.value);
            }}
          />
          <input
            onFocus={() => setLastGDD35('')}
            type="text"
            value={lastGdd45}
            onChange={(e) => {
              setLastGDD35(e.target.value);
            }}
          />
          <h2 className="accountPageText">
            {' '}
            Please select your USDA Hardiness Zone.
          </h2>
          <br />
          <h4> (Can be found via the following link)</h4>
          <h4>
            <a
              href="https://planthardiness.ars.usda.gov/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Click Here
            </a>
          </h4>
          <select
            value={hardinessZone}
            onChange={(e) => {
              setHardinessZone(e.target.value);
            }}
            className="zoneSelector"
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
        <button
          onClick={() =>
            dispatch(updateUser({ firstGdd45, lastGdd45, hardinessZone }))
          }
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default NOAAHangupPage;

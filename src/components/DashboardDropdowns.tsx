import React, { useState, useEffect } from 'react';
import SwitchMaker from './SwitchMaker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ManagementMethod, Weed } from '../types';

const DashboardDropdowns: React.FC = () => {
  const navigate = useNavigate(); 
  const [weedOptions, setWeedOptions] = useState<JSX.Element[]>([]);
  const [switches, setSwitches] = useState<JSX.Element[]>([]);

  const getWeedsByVegType = (vegType: string) => {
    axios
      .get<Weed[]>(`/api/weeds?vegType=${vegType}`)
      .then((res) => {
        setWeedOptions(
          res.data.map((el) => (
            <option key={`weed${el.weed_id}`} value={el.weed_id}>
              {el.common_name}
            </option>
          ))
        );
      })
      .catch(() => navigate('/'));
  };

  const getWeedMethodsByID = (weedID: string) => {
    axios
      .get<ManagementMethod[]>(`/api/weeds/methods/${weedID}`)
      .then((res) => {
        setSwitches(
          res.data.map((el) => (
            <SwitchMaker key={`method${el.method_id}`} weedMethod={el} />
          ))
        );
      })
      .catch(() => navigate('/'));
  };
  useEffect(() => {
    getWeedsByVegType('f');
  }, []);

  return (
    <>
      <fieldset className="dropdownBox">
        <h4 id="dropdownLegend">Select Management Options</h4>
        <select onChange={(e) => getWeedsByVegType(e.target.value)}>
          <option value="f">Forbs</option>
          <option value="w">Woody Species</option>
          <option value="g">Graminoids</option>
        </select>
        <select
          onChange={(e) => getWeedMethodsByID(e.target.value)}
          disabled={weedOptions.length <= 0 ? true : false}
        >
          {weedOptions}
        </select>
        <br />
        {switches}
      </fieldset>
    </>
  );
};

export default DashboardDropdowns;

import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetWeedQuery,
  GetWeedQueryVariables,
  WeedByVegetationTypeQuery,
  WeedByVegetationTypeQueryVariables
} from '../API';
import { getWeed, weedByVegetationType } from '../graphql/queries';
import { ManagementMethod } from '../types';
import SwitchMaker from './SwitchMaker';

const DashboardDropdowns: React.FC = () => {
  const navigate = useNavigate();
  const [weedOptions, setWeedOptions] = useState<JSX.Element[]>([]);
  const [switches, setSwitches] = useState<JSX.Element[]>([]);

  const getWeedsByVegType = async (vegetationType: string) => {
    try {
      const query: WeedByVegetationTypeQueryVariables = { vegetationType };
      const weeds = (await API.graphql(
        graphqlOperation(weedByVegetationType, query)
      )) as GraphQLResult<WeedByVegetationTypeQuery>;

      const weedOptions: JSX.Element[] = weeds.data?.weedByVegetationType?.items
        ?.map
        ? weeds.data.weedByVegetationType.items.map((el) => (
            <option key={`weed${el?.weedId}`} value={el?.weedId}>
              {el?.commonName}
            </option>
          ))
        : [];

      setWeedOptions(weedOptions);
    } catch {
      navigate('/');
    }
  };

  const getWeedMethodsByID = async (weedId: string) => {
    try {
      const query: GetWeedQueryVariables = { weedId };

      const weed = (await API.graphql(
        graphqlOperation(getWeed, query)
      )) as GraphQLResult<GetWeedQuery>;

      if (weed.data?.getWeed?.managementMethods?.items.map) {
        const methodsCleaned = (
          weed.data.getWeed.managementMethods.items.filter(
            (el) => el
          ) as unknown as ManagementMethod[]
        ).map((el) => {
          return {
            ...el,
            weedCommonName: weed?.data?.getWeed?.commonName as string
          };
        });

        setSwitches(
          methodsCleaned.map((el) => (
            <SwitchMaker key={`method${el.methodId}`} weedMethod={el} />
          ))
        );
      }
    } catch {
      navigate('/');
    }
  };
  useEffect(() => {
    void getWeedsByVegType('f');
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

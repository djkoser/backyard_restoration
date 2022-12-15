import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetWeedCQuery,
  GetWeedCQueryVariables,
  WeedByVegetationTypeCQuery,
  WeedByVegetationTypeCQueryVariables
} from '../API';
import { getWeedC, weedByVegetationTypeC } from '../graphql/customQueries';
import { ManagementMethodStateVersion } from '../types';
import { MethodSwitch } from './';

export const DashboardDropdowns: React.FC = () => {
  const navigate = useNavigate();
  const [weedOptions, setWeedOptions] = useState<JSX.Element[]>([]);
  const [switches, setSwitches] = useState<JSX.Element[]>([]);

  const getWeedsByVegType = async (vegetationType: string) => {
    try {
      const query: WeedByVegetationTypeCQueryVariables = { vegetationType };
      const weeds = (await API.graphql(
        graphqlOperation(weedByVegetationTypeC, query)
      )) as GraphQLResult<WeedByVegetationTypeCQuery>;

      const weedOptions: JSX.Element[] = weeds.data?.weedByVegetationType?.items
        ?.map
        ? weeds.data.weedByVegetationType.items.map((el) => (
            <option key={`weedOption${el?.weedId}`} value={el?.weedId}>
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
      const query: GetWeedCQueryVariables = { weedId };

      const weed = (await API.graphql(
        graphqlOperation(getWeedC, query)
      )) as GraphQLResult<GetWeedCQuery>;

      if (weed.data?.getWeed?.managementMethods?.items.map) {
        const methodsCleaned = (
          weed.data.getWeed.managementMethods.items.filter(
            (el) => el
          ) as unknown as ManagementMethodStateVersion[]
        ).map((el) => {
          return {
            ...el,
            weedCommonName: weed?.data?.getWeed?.commonName || ''
          };
        });

        setSwitches(
          methodsCleaned.map((el) => (
            <MethodSwitch key={`method${el.methodId}`} weedMethod={el} />
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

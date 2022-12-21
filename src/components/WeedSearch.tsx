import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  WeedByVegetationTypeCQuery,
  WeedByVegetationTypeCQueryVariables
} from '../API';
import { weedByVegetationTypeC } from '../graphql/customQueries';
import { Weed } from '../types';
import { getLocalStateHelper } from '../utilities';
import { Footer, Nav, Thumbnail, WeatherLoader } from './';

// props vegType
export const WeedSearch: React.FC = () => {
  const navigate = useNavigate();
  const { vegType } = useParams<{ vegType: string }>();

  const [localState, setLocalState] = useState({
    searchText: '',
    weedList: [] as Weed[],
    apbInput: '',
    loading: true
  });
  const { searchText, weedList, apbInput, loading } = localState;

  const localStateHelper =
    getLocalStateHelper<typeof localState>(setLocalState);

  const getWeedsByType = async (e?: React.FormEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    try {
      localStateHelper({ loading: true });
      const getWeedsByTypeInput: WeedByVegetationTypeCQueryVariables = {
        vegetationType: vegType || ''
      };
      const weedResults = (await API.graphql(
        graphqlOperation(weedByVegetationTypeC, getWeedsByTypeInput)
      )) as GraphQLResult<WeedByVegetationTypeCQuery>;
      console.dir(weedResults);
      const weedsParsed =
        weedResults.data?.weedByVegetationType?.items.reduce(
          (weedsParsed, weed) => {
            if (weed) {
              const { __typename, ...omitTypename } = weed;
              if (omitTypename) weedsParsed.push(omitTypename);
            }
            return weedsParsed;
          },
          [] as Weed[]
        ) || [];
      localStateHelper({
        weedList: weedsParsed,
        loading: false
      });
    } catch {
      navigate('/');
    }
  };
  const searchWeedsByKeyword = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      localStateHelper({ loading: true });
      if (searchText || apbInput) {
        const getWeedsByKeywordInputs: WeedByVegetationTypeCQueryVariables = {
          vegetationType: vegType || '',
          filter: {
            and: []
          }
        };

        const { and } = getWeedsByKeywordInputs.filter!;
        if (and && searchText)
          and.push({
            or: [
              { commonName: { contains: searchText } },
              { botanicalName: { contains: searchText } }
            ]
          });
        if (and && apbInput)
          and.push({ annualPerennialBiennial: { eq: apbInput } });
        const botanicalNameResults = (await API.graphql(
          graphqlOperation(weedByVegetationTypeC, getWeedsByKeywordInputs)
        )) as GraphQLResult<WeedByVegetationTypeCQuery>;
        localStateHelper({
          weedList:
            botanicalNameResults.data?.weedByVegetationType?.items.reduce(
              (weedsParsed, weed) => {
                if (weed) {
                  const { __typename, ...omitTypename } = weed;
                  if (omitTypename) weedsParsed.push(omitTypename);
                }
                return weedsParsed;
              },
              [] as Weed[]
            ) || [],
          loading: false,
          searchText: ''
        });
      } else {
        await getWeedsByType();
      }
    } catch (err) {
      localStateHelper({ loading: false });
      navigate('/');
    }
  };
  useEffect(() => {
    void getWeedsByType();
  }, [vegType]);

  const searchResults = weedList.map((el) => (
    <Thumbnail key={el.weedId} weedInfo={el} />
  ));

  const output = (
    <>
      <Nav invertColors={true} />
      <main id="weedSearchBody">
        <form id="weedSearchForm">
          <input
            type="text"
            placeholder="Weed Name"
            value={searchText}
            onChange={(e) => localStateHelper({ searchText: e.target.value })}
          ></input>
          <label id="apbLabel" htmlFor="apbDropdown">
            Annual/Perennial/Biennial:
          </label>
          <select
            id="apbDropdown"
            onChange={(e) => localStateHelper({ apbInput: e.target.value })}
            value={apbInput}
          >
            <option value=""></option>
            <option value="a">Annual</option>
            <option value="p">Perennial</option>
            <option value="b">Biennial</option>
          </select>
          <button onClick={(e) => searchWeedsByKeyword(e)}>Search</button>
          <button id="showAllSpeciesButton" onClick={(e) => getWeedsByType(e)}>
            Show All{' '}
            {vegType === 'f' ? 'Forb' : vegType === 'g' ? 'Graminoid' : 'Woody'}{' '}
            Species
          </button>
        </form>
        <div id="searchResultsBox">{searchResults}</div>
      </main>
      <Footer />
    </>
  );

  return loading ? (
    <>
      <WeatherLoader noText={true} />
      <h3>Loading, Please Wait</h3>
    </>
  ) : (
    output
  );
};

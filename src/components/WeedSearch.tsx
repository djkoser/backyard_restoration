import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  WeedByBotanicalNameCQuery,
  WeedByBotanicalNameCQueryVariables,
  WeedByCommonNameCQuery,
  WeedByCommonNameCQueryVariables,
  WeedByVegetationTypeCQuery,
  WeedByVegetationTypeCQueryVariables
} from '../API';
import {
  weedByBotanicalNameC,
  weedByCommonNameC,
  weedByVegetationTypeC
} from '../graphql/customQueries';
import { Weed } from '../types';
import { Footer, Nav, Thumbnail, WeatherLoader } from './';

// props vegType
export const WeedSearch: React.FC = () => {
  const navigate = useNavigate();
  const { vegType } = useParams<{ vegType: string }>();
  const [searchText, setSearchText] = useState('');
  const [weedList, setWeedList] = useState<Weed[]>([]);

  const [loading, setLoading] = useState(true);

  const getWeedsByType = async () => {
    try {
      setLoading(true);
      const query: WeedByVegetationTypeCQueryVariables = {
        vegetationType: vegType || ''
      };
      const weeds = (await API.graphql(
        graphqlOperation(weedByVegetationTypeC, query)
      )) as WeedByVegetationTypeCQuery;
      setWeedList(
        weeds?.weedByVegetationType?.items.reduce((weedsParsed, weed) => {
          if (weed) {
            const { __typename, ...omitTypename } = weed;
            weedsParsed.push(omitTypename);
          }
          return weedsParsed;
        }, [] as Weed[]) || []
      );
      setLoading(false);
    } catch {
      navigate('/');
    }
  };
  const searchWeedsByKeyword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const weedsMap = new Map<string, Weed>();
      const getWeedsCommonNameInput: WeedByCommonNameCQueryVariables = {
        commonName: searchText,
        filter: { vegetationType: { eq: vegType } }
      };
      const getWeedsBotanicalNameInput: WeedByBotanicalNameCQueryVariables = {
        botanicalName: searchText,
        filter: { vegetationType: { eq: vegType } }
      };

      const commonNameResults = (await API.graphql(
        graphqlOperation(weedByCommonNameC, getWeedsCommonNameInput)
      )) as GraphQLResult<WeedByCommonNameCQuery>;
      const botanicalNameResults = (await API.graphql(
        graphqlOperation(weedByBotanicalNameC, getWeedsBotanicalNameInput)
      )) as GraphQLResult<WeedByBotanicalNameCQuery>;

      commonNameResults.data?.weedByCommonName?.items.forEach((weed) => {
        if (weed) {
          const { __typename, ...omitTypename } = weed;
          weedsMap.set(weed?.weedId || '', omitTypename);
        }
      });
      botanicalNameResults.data?.weedByBotanicalName?.items.forEach((weed) => {
        if (weed) {
          const { __typename, ...omitTypename } = weed;
          weedsMap.set(weed?.weedId || '', omitTypename);
        }
      });

      setSearchText('');
      setWeedList(Array.from(weedsMap.values()));
      setLoading(false);
    } catch {
      setLoading(false);
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
        <form id="weedSearchForm" onSubmit={(e) => searchWeedsByKeyword(e)}>
          <input
            type="text"
            placeholder="Weed Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button>Search</button>
          <button>
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

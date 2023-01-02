import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetWeedCQuery,
  GetWeedCQueryVariables,
  ManagementMethod
} from '../API';
import { getWeedC } from '../graphql/customQueries';
import { AppDispatch } from '../redux/store';
import { getUserMethods } from '../redux/userMethodSlice';
import { getLocalStateHelper } from '../utilities';
import { Footer, MethodSwitch, Nav, WeatherLoader } from './';

export const WeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [localState, setLocalState] = useState({
    src: '',
    commonName: '',
    botanicalName: '',
    annualPerennialBiennial: '',
    vegType: '',
    description: '',
    switches: [] as JSX.Element[],
    loading: true
  });

  const {
    src,
    commonName,
    botanicalName,
    annualPerennialBiennial,
    vegType,
    description,
    switches,
    loading
  } = localState;

  const localStateHelper =
    getLocalStateHelper<typeof localState>(setLocalState);

  // Creates local state to avoid lagging and render errors caused by adding/removing methods on switch toggle
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(getUserMethods());
  }, []);
  useEffect(() => {
    if (id) {
      void getWeedDetails();
    }
  }, [id]);

  const getWeedDetails = async () => {
    try {
      const input: GetWeedCQueryVariables = { weedId: id || '' };
      const result = (await API.graphql(
        graphqlOperation(getWeedC, input)
      )) as GraphQLResult<GetWeedCQuery>;
      const {
        src,
        commonName,
        botanicalName,
        annualPerennialBiennial,
        vegetationType,
        description,
        managementMethods
      } = result.data?.getWeed || {};
      localStateHelper({
        src: src || '',
        commonName: commonName || '',
        botanicalName: botanicalName || '',
        annualPerennialBiennial: annualPerennialBiennial || '',
        vegType: vegetationType || '',
        description: description || '',
        loading: false,
        switches: (
          managementMethods?.items.reduce((methodsParsed, method) => {
            if (method) {
              const { __typename, ...omitTypename } = method;
              methodsParsed.push(omitTypename);
            }
            return methodsParsed;
          }, [] as Omit<ManagementMethod, '__typename' | 'weed' | 'createdAt' | 'updatedAt'>[]) ||
          []
        ).map((el) => (
          <MethodSwitch key={`methodSwitch${el.methodId}`} weedMethod={el} />
        ))
      });
    } catch {
      localStateHelper({ loading: false });
      navigate('/');
    }
  };

  const output = (
    <>
      <Nav invertColors={false} />
      <section className="weedDescriptionBox">
        <h2>{commonName}</h2>
        <h2>
          <em>{botanicalName}</em>
        </h2>
        <h3>
          {annualPerennialBiennial === 'a'
            ? 'Annual'
            : annualPerennialBiennial === 'p'
            ? 'Perennial'
            : 'Biennial'}{' '}
          {vegType === 'f' ? 'Forb' : vegType === 'g' ? 'Graminoid' : 'Woody'}
        </h3>
        <img
          id="descImage"
          alt={`${botanicalName} commonly known as ${commonName}`}
          src={src}
        />
        <section id="descParagraph">
          <h4>Description</h4>
          <article>
            <h4>{description}</h4>
          </article>
        </section>
      </section>
      <fieldset className="dropdownBox">
        <h3 id="manageDescLegend">Management Options</h3>
        <br />
        <div>{switches}</div>
      </fieldset>
      <Footer />
    </>
  );

  return (
    <>
      <WeatherLoader loadingOverride={loading}>{output}</WeatherLoader>
    </>
  );
};

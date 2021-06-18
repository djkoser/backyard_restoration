// @ts-nocheck 
/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import AddedNatives from '../components/AddedNatives';
import { Provider } from 'react-redux';
import { rootReducer } from '../redux/store';
import { createStore } from 'redux';

describe('Test NativesAdded', () => {
  const initialState = {
    mgmtMethodReducer: { failed: false, loading: false, userMethods: [] }, userInfoReducer: { city: '', email: '', failed: false, first_gdd35: '', first_name: '', growing_season_length: 0, hardiness_zone: '', last_name: '', loading: false, state: '', street: '', user_id: 0, zipcode: '' }, userNativesReducer: {
      failed: false, loading: false, userNatives: [{
        native_id: 1,
        botanical_name: 'botNameTest',
        common_name: 'comNameTest',
        moisture: 'moistTest',
        sun: 'sunTest',
        height: 'heightTest',
        src: 'srcTest',
        project_notes: 'projectNotesTest',
        bloom_time: 'Late Spring'
      }]
    }
  };
  const store = createStore(rootReducer, initialState);


  it('Renders added natives present within store', () => {
    const { getAllByText, getByText, getByRole } = render(
      <Provider store={store}>
        <AddedNatives />
      </Provider>,
    );
    expect(getByText(/(botNameTest)+/i)).toBeInTheDocument();
    expect(getByText(/(comNameTest)+/i)).toBeInTheDocument();
    expect(getByText(/(moistTest)/i)).toBeInTheDocument();
    expect(getByText(/(sunTest)+/i)).toBeInTheDocument();
    expect(getByText(/(heightTest)+/i)).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'srcTest');
    expect(getByRole('img')).toHaveAttribute('alt', 'botNameTest, commonly known as comNameTest.');
    expect(getAllByText(/(projectNotesTest)+/i)).toHaveLength(2);
  });
});


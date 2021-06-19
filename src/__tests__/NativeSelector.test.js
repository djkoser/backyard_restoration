// @ts-nocheck 
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import NativesSelector from '../components/NativeSelector';
import { Provider } from 'react-redux';
import { rootReducer } from '../redux/store';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

describe('Test Natives Selector Functionality', () => {
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
  const mockPlant = [
    {
      native_id: 1,
      common_name: 'Yarrow',
      botanical_name: 'Achillea millefolium',
      moisture: 'Any',
      sun: 'Full, Partial',
      height: 21,
      bloom_time: 'Late Spring',
      src: 'https://www.minnesotawildflowers.info/udata/r9ndp23q/white/common-yarrow_0619_083615a-t.jpg'
    }];

  test('Returns exactly one search result for "Achillea"', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPlant }).mockResolvedValueOnce({ data: mockPlant });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <NativesSelector />
        </Provider>
      </MemoryRouter>);
    // Search for yarrow

    const searchBar = screen.getByPlaceholderText('Botanical/Common Name');
    await act(async () => { await fireEvent.change(searchBar, { target: { value: 'Achillea millefolium' } }); });
    expect(searchBar.value).toBe('Achillea millefolium');

    await act(async () => { await fireEvent.keyPress(searchBar, { key: 'Enter', code: 'Enter' }); });

    // Check for search result
    const searchResult = screen.getAllByText(/Achillea millefolium/i);
    expect(searchResult).toHaveLength(1);
  });
});
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

//Props from app.js -myPlantsList addToMyPlants
const NativeSearchBar = (props) => {

  const [botanicalCommonNameInput, setBotanicalCommonNameInput] = useState('');
  const [sunInput, setSunInput] = useState('');
  const [bloomTimeInput, setBloomTimeInput] = useState('');
  const [minHeightInput, setMinHeightInput] = useState('');
  const [maxHeightInput, setMaxHeightInput] = useState('');
  const [moistureInput, setMoistureInput] = useState('');

  const { setSearchResults, setLoadingParent } = props;

  useEffect(() => {
    searchPlants();
  }, []);

  const clearSearch = () => {
    setBotanicalCommonNameInput('');
    setSunInput('');
    setBloomTimeInput('');
    setMinHeightInput('');
    setMaxHeightInput('');
    setMoistureInput('');
    searchPlants();
  };

  const searchPlants = (botanicalCommonNameInput,
    sunInput,
    bloomTimeInput,
    minHeightInput,
    maxHeightInput,
    moistureInput) => {

    setLoadingParent(true);

    axios.get(`/api/native?${botanicalCommonNameInput ? `name=${botanicalCommonNameInput}` : ''}${sunInput ? '&' : ''}${sunInput ? `sun=${sunInput}` : ''}${bloomTimeInput ? '&' : ''}${bloomTimeInput ? `bloomTime=${bloomTimeInput}` : ''}${minHeightInput ? '&' : ''}${minHeightInput ? `minHeight=${minHeightInput}` : ''}${maxHeightInput ? '&' : ''}${maxHeightInput ? `maxHeight=${maxHeightInput}` : ''}${moistureInput ? '&' : ''}${moistureInput ? `moisture=${moistureInput}` : ''}`)
      .then(res => {
        setSearchResults(res.data);
        setLoadingParent(false);
      })
      .catch(() => {
        setLoadingParent(false);
        toast.error('Search failed, please try again');
      });
  };

  return (
    <div className={props.searchAdded ? 'searchOpen' : 'searchClosed'} id='searchContainer'>
      <form className={props.searchAdded ? 'searchOpen' : 'searchClosed'} id="searchInputs">
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='botNameInput'>Botanical/Common Name </label>
          <input id='botNameInput' type='text' onChange={e => { setBotanicalCommonNameInput(e.target.value); }} value={botanicalCommonNameInput} placeholder={'Botanical/Common Name'}></input>
        </div>
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='sunDropdown'>Sun</label>
          <select id='sunDropdown' onChange={e => { setSunInput(e.target.value); }} value={sunInput}>
            <option value={''}></option>
            <option value={'Full'}>Full</option>
            <option value={'Full, Partial'}>Full, Partial</option>
            <option value={'Partial'}>Partial</option>
            <option value={'Partial, Full Shade'}>Partial, Full Shade</option>
            <option value={'Full Shade'}>Full Shade</option>
            <option value={'Full, Partial, Full Shade'}>Full, Partial, Full Shade</option>
          </select>
        </div>
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='blmTmDropdown'>Bloom Time</label>
          <select id='blmTmDropdown' onChange={e => setBloomTimeInput(e.target.value)} value={bloomTimeInput}>
            <option value={''}></option>
            <option value={'Early Spring'}>Early Spring</option>
            <option value={'Late Spring'}>Late Spring</option>
            <option value={'Summer'}>Summer</option>
            <option value={'Fall'}>Fall</option>
          </select>
        </div>
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='minHt'>Height: Min (in) </label>
          <input id='minHt' type='text' onChange={e => { setMinHeightInput(e.target.value); }} value={minHeightInput} placeholder={'Min'}></input>
        </div>
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='maxHt'>Max (in)</label>
          <input id='maxHt' type='text' onChange={e => { setMaxHeightInput(e.target.value); }} value={maxHeightInput} placeholder={'Max'}></input>
        </div>
        <div className="searchInputAndLabel">
          <label className="searchLabels" htmlFor='moistLvl'>Moisture</label>
          <select id='moistLvl' onChange={e => { setMoistureInput(e.target.value); }} value={moistureInput}>
            <option value={''}></option>
            <option value={'Dry'}>Dry</option>
            <option value={'Dry, Mesic'}>Dry Mesic</option>
            <option value={'Mesic'}>Mesic</option>
            <option value={'Mesic, Wet'}>Mesic, Wet</option>
            <option value={'Wet'}>Wet</option>
            <option value={'Wet, Emergent'}>Wet, Emergent</option>
            <option value={'Emergent'}>Emergent</option>
          </select>
        </div>
        <button className={'searchButton'} onClick={e => {
          e.preventDefault();
          searchPlants(botanicalCommonNameInput,
            sunInput,
            bloomTimeInput,
            minHeightInput,
            maxHeightInput,
            moistureInput);
        }}>Search</button>
        <button className={'searchButton'} onClick={event => {
          event.preventDefault();
          clearSearch();
        }}>Clear Search</button>
        <button className="nativeSelectorVis" onClick={event => {
          event.preventDefault();
          props.setSearchAdded(!props.searchAdded);
        }}>To Added</button>
      </form>
    </div>
  );
};

export default NativeSearchBar;
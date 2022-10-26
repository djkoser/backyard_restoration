
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Nav from './Nav';
import NativeThumbnail from './NativeThumbnail';
import NativesSearchBar from './NativesSearchBar';
import { ToastContainer } from 'react-toastify';
import AddedNatives from './AddedNatives';
import { getUserNatives } from '../redux/userNativesSlice';
import WeatherLoader from './WeatherLoader';
import { UserNative } from '../types';


const NativeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<UserNative[]>([]);
  const [searchResultsJSX, setSearchResultsJSX] = useState<JSX.Element[]>([]);
  const [searchAdded, setSearchAdded] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserNatives());
  }, []);

  useEffect(() => {
    if (searchResults) {
      setSearchResultsJSX(searchResults.map(el => <NativeThumbnail key={`${el.botanical_name}ID${el.native_id}`} native_id={el.native_id} common_name={el.common_name} botanical_name={el.botanical_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} />));
    }
  }, [searchResults]);

  return (
    <>
      <ToastContainer />
      <Nav invertColors={false} />
      <NativesSearchBar setLoadingParent={setLoading} setSearchResults={setSearchResults} setSearchAdded={setSearchAdded} searchAdded={searchAdded} />
      <AddedNatives setSearchAdded={setSearchAdded} searchAdded={searchAdded} />
      <main className={searchAdded ? 'searchOpen ' : 'searchClosed'} id="nativeSearchResults">
        {
          loading ?
            (
              <>
                <WeatherLoader noText={true} />
                <h3>Loading, Please Wait</h3>
              </>
            ) : searchResultsJSX
        }
      </main>
    </>
  );
};



export default NativeSelector;
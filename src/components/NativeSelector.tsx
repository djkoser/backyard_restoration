import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getUserInfo } from '../redux/userSlice';
import { UserNative } from '../types';
import AddedNatives from './AddedNatives';
import NativesSearchBar from './NativesSearchBar';
import NativeThumbnail from './NativeThumbnail';
import Nav from './Nav';
import WeatherLoader from './WeatherLoader';

const NativeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<UserNative[]>([]);
  const [searchResultsJSX, setSearchResultsJSX] = useState<JSX.Element[]>([]);
  const [searchAdded, setSearchAdded] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (searchResults) {
      setSearchResultsJSX(
        searchResults.map((el) => (
          <NativeThumbnail
            key={`${el.botanicalName}ID${el.nativeId}`}
            nativeId={el.nativeId}
            commonName={el.commonName}
            botanicalName={el.botanicalName}
            moisture={el.moisture}
            sun={el.sun}
            height={el.height}
            bloomTime={el.bloomTime}
            src={el.src}
          />
        ))
      );
    }
  }, [searchResults]);

  return (
    <>
      <ToastContainer />
      <Nav invertColors={false} />
      <NativesSearchBar
        setLoadingParent={setLoading}
        setSearchResults={setSearchResults}
        setSearchAdded={setSearchAdded}
        searchAdded={searchAdded}
      />
      <AddedNatives setSearchAdded={setSearchAdded} searchAdded={searchAdded} />
      <main
        className={searchAdded ? 'searchOpen ' : 'searchClosed'}
        id="nativeSearchResults"
      >
        {loading ? (
          <>
            <WeatherLoader noText={true} />
            <h3>Loading, Please Wait</h3>
          </>
        ) : (
          searchResultsJSX
        )}
      </main>
    </>
  );
};

export default NativeSelector;

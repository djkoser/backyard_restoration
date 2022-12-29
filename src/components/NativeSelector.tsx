import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AppDispatch } from '../redux/store';
import { getUserNatives } from '../redux/userNativePlantsSlice';
import { UserNativeStateVersion } from '../types';
import {
  AddedNatives,
  NativeSearchBar,
  NativeThumbnail,
  Nav,
  WeatherLoader
} from './';

export const NativeSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchResults, setSearchResults] = useState<UserNativeStateVersion[]>(
    []
  );
  const [searchResultsJSX, setSearchResultsJSX] = useState<JSX.Element[]>([]);
  const [searchAdded, setSearchAdded] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void dispatch(getUserNatives());
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
      <NativeSearchBar
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

// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import NativeThumbnail from "./NativeThumbnail";
import NativesSearchBar from "./NativesSearchBar";
import { ToastContainer } from "react-toastify";
import AddedNatives from "./AddedNatives";
import { getUserNatives } from "../redux/userNativesReducer";


const NativeSelector = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState();
  const [searchResultsJSX, setSearchResultsJSX] = useState([]);
  const [searchAdded, setSearchAdded] = useState(true);

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
      <Nav />
      <NativesSearchBar setSearchResults={setSearchResults} setSearchAdded={setSearchAdded} searchAdded={searchAdded} />
      <AddedNatives setSearchAdded={setSearchAdded} searchAdded={searchAdded} />
      <main className={searchAdded ? "searchOpen " : "searchClosed"} id="nativeSearchResults">
        {searchResultsJSX}
      </main>
    </>
  );
};

export default NativeSelector;
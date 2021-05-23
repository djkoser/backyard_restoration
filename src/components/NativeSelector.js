// @ts-nocheck
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import NativeThumbnail from "./NativeThumbnail";
import NativesSearchBar from "./NativesSearchBar";

const NativeSelector = () => {
  const [searchResults, setSearchResults] = useState([{}]);
  const [searchResultsJSX, setSearchResultsJSX] = useState([]);

  useEffect(() => {
    setSearchResultsJSX(searchResults.map(el => <NativeThumbnail key={`${el.botanical_name}ID${el.native_id}`} native_id={el.native_id} common_name={el.common_name} botanical_name={el.botanical_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} />));
  }, [searchResults]);

  return (
    <>
      <Nav />
      <NativesSearchBar setSearchResults={setSearchResults} />
      <main>
        {searchResultsJSX}
      </main>
    </>
  );
};

export default NativeSelector;
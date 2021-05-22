// @ts-nocheck
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import NativeThumbnail from '../components/NativeThumbnail';

const NativeSelector = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([<></>]);

  const userNatives = useSelector(state => state.userNativesReducer.userNatives);



  useEffect(() => {

  }, [userNatives])


    < NativeThumbnail />
  return (
    <>
      <Nav />

    </>
  )
}

export default NativeSelector;
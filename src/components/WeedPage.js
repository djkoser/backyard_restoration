import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMethods, addMethod, removeMethod } from '../redux/mgmtMethodReducer';
import axios from 'axios';

// From Store userMethods[], getMethods(), addMethod() removeMethod()

const WeedPage = (props) => {

  const dispatch = useDispatch();

  const [src, setSrc] = useState("");
  const [commonName, setCommonName] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [annualPerennialBiennial, setAnnualPerennialBiennial] = useState("");
  const [vegType, setVegType] = useState("");
  const [description, setDescription] = useState("");
  const [mgmtOptions, setMgmtOptions] = useState("");

  // @ts-ignore
  useSelector(state => state.mgmtMethodReducer.userMethods);

  const getWeedDetails = () => { };

  return (
    <>
    </>
  )

};

export default WeedPage
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMethods, addMethod, removeMethod } from '../redux/mgmtMethodReducer';
import axios from 'axios';
import Nav from './Nav';

// From Store userMethods[], getMethods(), addMethod() removeMethod()

const WeedPage = (props) => {

  const { weed_id } = props.location.state
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

  const getWeedDetails = async () => {
    await axios.get(`/api/weeds/${weed_id}`)
      .then(res => {
        const { src, common_name, botanical_name, annual_perennial_biennial, veg_type, description } = res.data;
        setSrc(src);
        setCommonName(common_name);
        setBotanicalName(botanical_name);
        setAnnualPerennialBiennial(annual_perennial_biennial);
        setVegType(veg_type);
        setDescription(description)
      })
      .catch(err => console.log(err))
    await axios.get(`/api/weeds/methods/${weed_id}`)
      .then(res => {
        const methods = res.data;
        setMgmtOptions(methods);

      })
      .catch(err => console.log(err))
  };

  return (
    <>
      <Nav />
    </>
  )

};

export default WeedPage
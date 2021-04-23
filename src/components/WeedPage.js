import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';
import SwitchMaker from './SwitchMaker';
// From Store userMethods[], getMethods(), addMethod() removeMethod()

const WeedPage = (props) => {
  const { weed_id } = props.location.state

  const [src, setSrc] = useState("");
  const [commonName, setCommonName] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [annualPerennialBiennial, setAnnualPerennialBiennial] = useState("");
  const [vegType, setVegType] = useState("");
  const [description, setDescription] = useState("");
  const [mgmtOptions, setMgmtOptions] = useState([]);

  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);
  // Creates local state to avoid lagginess and render errors caused by adding/removing methods on switch toggle
  const [loading, setLoading] = useState(true);

  // @ts-ignore

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
      .catch(err => props.history.push('/'))
    await axios.get(`/api/weeds/methods/${weed_id}`)
      .then(res => {
        setMgmtOptions(res.data);
      })
      .catch(err => props.history.push('/'))
    setLoading(false)
  };

  useEffect(() => {
    getWeedDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const switches = mgmtOptions.map(el => (<SwitchMaker key={`method${el.method_id}`} userMethods={userMethods} weedMethod={el} />))
  const output = (
    <>
      <Nav />
      <section className="weedDescriptionBox">
        <h2>{commonName}</h2>
        <h2><em>{botanicalName}</em></h2>
        <h3>{annualPerennialBiennial === "a" ? "Annual" : annualPerennialBiennial === "p" ? "Perennial" : "Biennial"} {vegType === "f" ? "Forb" : vegType === "g" ? "Graminoid" : "Woody"}</h3>
        <img id="descImage" alt={`${botanicalName} commonly known as ${commonName}`} src={src} />
        <section>
          <h4>Description</h4>
          <article>
            <h4 >{description}</h4>
          </article>
        </section>
      </section>
      <fieldset className="dropdownBox">
        <h3 id="manageDescLegend">Management Options</h3>
        <br />
        <div>
          {switches}
        </div>
      </fieldset>
    </>
  )

  return (
    <>
      { loading ? <></> : output}
      <Footer />
    </>
  )
};

export default WeedPage
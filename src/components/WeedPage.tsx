import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';
import SwitchMaker from './MethodSwitch';
import WeatherLoader from './WeatherLoader';
import { getUserMethods } from '../redux/userMethodSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { UserManagementMethodStateVersion } from '../types';
import { AppStore } from '../redux/store';

const WeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [src, setSrc] = useState('');
  const [commonName, setCommonName] = useState('');
  const [botanicalName, setBotanicalName] = useState('');
  const [annualPerennialBiennial, setAnnualPerennialBiennial] = useState('');
  const [vegType, setVegType] = useState('');
  const [description, setDescription] = useState('');
  const [mgmtOptions, setMgmtOptions] = useState<
    UserManagementMethodStateVersion[]
  >([]);
  const [switches, setSwitches] = useState([<></>]);

  const userMethods = useSelector<AppStore, UserManagementMethodStateVersion[]>(
    (state) => state.userMethod.userMethods
  );
  // Creates local state to avoid lagginess and render errors caused by adding/removing methods on switch toggle
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserMethods());
  }, []);
  useEffect(() => {
    if (id) {
      void getWeedDetails();
    }
  }, [id]);

  useEffect(() => {
    setSwitches(
      mgmtOptions.map((el) => (
        <SwitchMaker key={`method${el.methodId}`} weedMethod={el} />
      ))
    );
  }, [mgmtOptions, userMethods]);

  const getWeedDetails = async () => {
    await axios
      .get(`/api/weeds/${id}`)
      .then((res) => {
        const {
          src,
          commonName,
          botanicalName,
          annual_perennial_biennial,
          veg_type,
          description
        } = res.data;
        setSrc(src);
        setCommonName(commonName);
        setBotanicalName(botanicalName);
        setAnnualPerennialBiennial(annual_perennial_biennial);
        setVegType(veg_type);
        setDescription(description);
      })
      .catch(() => navigate('/'));
    await axios
      .get(`/api/weeds/methods/${id}`)
      .then((res) => {
        setMgmtOptions(res.data);
      })
      .catch(() => navigate('/'));
    setLoading(false);
  };

  const output = (
    <>
      <Nav invertColors={false} />
      <section className="weedDescriptionBox">
        <h2>{commonName}</h2>
        <h2>
          <em>{botanicalName}</em>
        </h2>
        <h3>
          {annualPerennialBiennial === 'a'
            ? 'Annual'
            : annualPerennialBiennial === 'p'
            ? 'Perennial'
            : 'Biennial'}{' '}
          {vegType === 'f' ? 'Forb' : vegType === 'g' ? 'Graminoid' : 'Woody'}
        </h3>
        <img
          id="descImage"
          alt={`${botanicalName} commonly known as ${commonName}`}
          src={src}
        />
        <section id="descParagraph">
          <h4>Description</h4>
          <article>
            <h4>{description}</h4>
          </article>
        </section>
      </section>
      <fieldset className="dropdownBox">
        <h3 id="manageDescLegend">Management Options</h3>
        <br />
        <div>{switches}</div>
      </fieldset>
      <Footer />
    </>
  );

  return loading ? (
    <>
      <WeatherLoader noText={true} />
      <h3>Loading, Please Wait</h3>
    </>
  ) : (
    output
  );
};

export default WeedPage;

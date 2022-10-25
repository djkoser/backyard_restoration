
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import Thumbnail from './Thumbnail';
import WeatherLoader from './WeatherLoader';
import { useParams, useNavigate } from 'react-router-dom';
import { Weed } from '../types';

// props vegType
const WeedSearch: React.FC = () => {
  const navigate = useNavigate(); 
  const { vegType } = useParams<{ vegType: string }>();
  const [searchText, setSearchText] = useState('');
  const [weedList, setWeedList] = useState<Weed[]>([]);

  const [loading, setLoading] = useState(true);

  const getWeedsByType = () => {
    axios
      .get(`/api/weeds?vegType=${vegType}`)
      .then((res) => {
        setWeedList(res.data);
        setLoading(false);
      })
      .catch(() => navigate('/'));
  };
  const searchWeedsByKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .get(`/api/weeds?vegType=${vegType}&keyword=${encodeURI(searchText)}`)
      .then((res) => {
        setSearchText('');
        setWeedList(res.data);
        setLoading(false);
      })
      .catch(() => navigate('/'));
  };
  useEffect(() => {
    getWeedsByType();
  }, [vegType]);

  const searchResults = weedList.map((el) => (
    <Thumbnail key={el.weed_id} weedInfo={el} />
  ));

  const output = (
    <>
      <Nav invertColors={true} />
      <main id="weedSearchBody">
        <form id="weedSearchForm" onSubmit={(e) => searchWeedsByKeyword(e)}>
          <input
            type="text"
            placeholder="Weed Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button>Search</button>
          <button>
            Show All{' '}
            {vegType === 'f'
              ? 'Forb'
              : vegType === 'g'
              ? 'Graminoid'
              : 'Woody'}{' '}
            Species
          </button>
        </form>
        <div id="searchResultsBox">{searchResults}</div>
      </main>
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
export default WeedSearch;

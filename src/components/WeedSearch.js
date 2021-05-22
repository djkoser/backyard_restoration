import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import Thumbnail from './Thumbnail';
import WeatherLoader from './WeatherLoader';

// props vegType 
const WeedSearch = (props) => {
  const [searchText, setSearchText] = useState("");
  const [weedList, setWeedList] = useState([]);
  const weedType = props.match.params.vegType

  const [loading, setLoading] = useState(true);


  const getWeedsByType = () => {
    axios.get(`/api/weeds?vegType=${weedType}`)
      .then(res => {
        setWeedList(res.data);
        setLoading(false)
      })
      .catch(err => props.history.push('/'))
  };
  const searchWeedsByKeyword = (e) => {
    setLoading(true);
    e.preventDefault()
    axios.get(`/api/weeds?vegType=${weedType}&keyword=${encodeURI(searchText)}`)
      .then(res => {
        setSearchText("")
        setWeedList(res.data)
        setLoading(false);
      })
      .catch(err => props.history.push('/'))
  };
  useEffect(() => {
    getWeedsByType();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weedType])

  const searchResults = weedList.map(el => <Thumbnail key={el.weed_id} weedInfo={el} />)

  const output = (<>
    <Nav invertColors={true} />
    <main id="weedSearchBody">
      <form id="weedSearchForm" onSubmit={(e) => searchWeedsByKeyword(e)}>
        <input type="text" placeholder="Weed Name" value={searchText} onChange={e => setSearchText(e.target.value)}></input>
        <button >Search</button>
        <button >Show All {weedType === "f" ? "Forb" : weedType === "g" ? "Graminoid" : "Woody"} Species</button>
      </form>
      <div id="searchResultsBox">
        {searchResults}
      </div>
    </main>
    <Footer />
  </>)

  return (loading ? <>
    <WeatherLoader loading='true' noText="true" />
    <h3>Loading, Please Wait</h3>
  </> : output)
}
export default WeedSearch
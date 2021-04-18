import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import Thumbnail from './Thumbnail';



// props vegType 
const WeedSearch = (props) => {
  const [searchText, setSearchText] = useState("");
  const [weedList, setWeedList] = useState([]);
  const weedType = props.match.params.vegType

  const getWeedsByType = () => {
    axios.get(`/api/weeds?vegType=${weedType}`)
      .then(res => setWeedList(res.data))
      .catch(err => console.log(err))
  };
  const searchWeedsByKeyword = (e) => {
    e.preventDefault()
    axios.get(`/api/weeds?vegType=${weedType}&keyword=${encodeURI(searchText)}`)
      .then(res => {
        setSearchText("")
        setWeedList(res.data)
      })
      .catch(err => console.log(err))
  };
  useEffect(() => {
    getWeedsByType();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weedType])

  const searchResults = weedList.map(el => <Thumbnail key={el.weed_id} weedInfo={el} />)

  return (
    <>
      <Nav />
      <form onSubmit={(e) => searchWeedsByKeyword(e)}>
        <input type="text" placeholder="Botanical or Common Name" value={searchText} onChange={e => setSearchText(e.target.value)}></input>
        <button>Search</button>
        <button>Show All {weedType === "f" ? "Forb" : weedType === "g" ? "Graminoid" : "Woody"} Species</button>
      </form>
      {searchResults}
      <Footer />
    </>
  )
}
export default WeedSearch
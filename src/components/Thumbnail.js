import React from 'react';
import { Link } from 'react-router-dom';

// props commonName, botanicalName from WeedSearch
const Thumbnail = (props) => {
  const { weed_id, common_name, botanical_name, src } = props.weedInfo
  return (
    <>
      <Link to={{
        pathname: `/api/weeds/${weed_id}`,
        state: {
          weed_id
        }
      }}>
        <figure className='searchFigures' key={weed_id}>
          <img className='searchImages' alt={`${botanical_name} commonly known as ${common_name}`} src={src} />
          <figcaption><strong>Botanical Name: </strong><em>{`${botanical_name}`}</em></figcaption>
          <figcaption><strong>Common Name: </strong><em>{`${common_name}`}</em></figcaption>
        </figure>
      </Link>
    </>
  )
}
export default Thumbnail
// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

// props commonName, botanicalName from WeedSearch
const Thumbnail = (props) => {
  const { weed_id, common_name, botanical_name, src } = props.weedInfo
  return (
    <figure className='searchFigures'>
      <Link className='searchLinks' to={`/weed/${weed_id}`}>
        <img className='searchImages' alt={`${botanical_name} commonly known as ${common_name}`} src={src} />
        <figcaption>
          <br />
          <strong>Botanical Name: </strong>
          <br />
          <em>{`${botanical_name}`}</em>
          <br />
          <br />
          <strong>Common Name: </strong>
          <br />
          {`${common_name}`}
        </figcaption>

      </Link>
    </figure >
  )
}
export default Thumbnail
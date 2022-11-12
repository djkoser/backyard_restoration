import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbnailProps } from '../types';

// props commonName, botanicalName from WeedSearch
const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  const { weed_id, commonName, botanicalName, src } = props.weedInfo;
  return (
    <figure className="searchFigures">
      <Link className="searchLinks" to={`/weed/${weed_id}`}>
        <img
          className="searchImages"
          alt={`${botanicalName} commonly known as ${commonName}`}
          src={src}
        />
        <figcaption>
          <br />
          <strong>Botanical Name: </strong>
          <br />
          <em>{`${botanicalName}`}</em>
          <br />
          <br />
          <strong>Common Name: </strong>
          <br />
          {`${commonName}`}
        </figcaption>
      </Link>
    </figure>
  );
};
export default Thumbnail;

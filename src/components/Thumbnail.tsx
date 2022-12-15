import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbnailProps } from '../types';

// props commonName, botanicalName from WeedSearch
export const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  const { weedId, commonName, botanicalName, src } = props.weedInfo;
  return (
    <figure className="searchFigures">
      <Link className="searchLinks" to={`/weed/${weedId}`}>
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

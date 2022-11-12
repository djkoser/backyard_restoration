import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppStore } from '../redux/store';
import { addUserNative } from '../redux/userNativesSlice';
import type { NativeThumbnailProps, UserNative } from '../types';

const NativeThumbnail: React.FC<NativeThumbnailProps> = (props) => {
  const dispatch = useDispatch();
  const {
    nativeId,
    commonName,
    botanicalName,
    moisture,
    sun,
    height,
    bloomTime,
    src
  } = props;
  const userNatives = useSelector<AppStore, UserNative[]>(
    (state) => state.userNativesReducer.userNatives
  );

  return (
    <>
      <figure
        onClick={() => {
          if (
            !userNatives.reduce(
              (acc, el) => (el.nativeId === nativeId ? ++acc : acc),
              0
            ) ||
            userNatives.length === 0
          ) {
            dispatch(addUserNative(nativeId));
          } else {
            toast.warning(
              'This plant has already been added to your list, please select another'
            );
          }
        }}
        className="nativeThumbnail"
      >
        <img
          className="searchResultImage"
          src={src}
          alt={`${botanicalName}, commonly known as ${commonName}`}
        />
        <h5>(Click to Add)</h5>
        <figcaption>
          <h5>
            <strong>Botanical Name: </strong>
            <br />
            <em>{botanicalName}</em>
          </h5>
          <h5>
            <strong>Common Name: </strong>
            <br />
            {commonName}
          </h5>
          <h5>
            <strong>Moisture: </strong>
            {moisture}
          </h5>
          <h5>
            <strong>Sun: </strong>
            {sun}
          </h5>
          <h5>
            <strong>Height: </strong>
            {height}
          </h5>
          <h5>
            <strong>Bloom Time: </strong>
            {bloomTime}
          </h5>
        </figcaption>
      </figure>
    </>
  );
};

export default NativeThumbnail;

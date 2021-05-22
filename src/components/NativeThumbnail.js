// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import { addUserNative } from '../redux/userNativesReducer';

const NativeThumbnail = (props) => {
  const dispatch = useDispatch();
  const { native_id, common_name, botanical_name, moisture, sun, height, bloom_time, src } = props;

  return (
    <figure onClick={() => dispatch(addUserNative(native_id))} key={`${botanical_name}ID${native_id}`} className='nativeThumbnail'>
      <img src={src} alt={`${botanical_name}, commonly known as ${common_name}`} />
      <figcaption>
        <h5><strong>Botanical Name: </strong>{botanical_name}</h5>
        <h5><strong>Common Name: </strong>{common_name}</h5>
        <h5><strong>Moisture: </strong>{moisture}</h5>
        <h5><strong>Sun: </strong>{sun}</h5>
        <h5><strong>Height: </strong>{height}</h5>
        <h5><strong>Bloom Time: </strong>{bloom_time}</h5>
      </figcaption>
    </figure>
  )
}

export default NativeThumbnail
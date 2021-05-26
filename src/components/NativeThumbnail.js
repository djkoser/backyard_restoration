// @ts-nocheck
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserNative } from "../redux/userNativesReducer";
import { toast } from "react-toastify";


const NativeThumbnail = (props) => {
  const dispatch = useDispatch();
  const { native_id, common_name, botanical_name, moisture, sun, height, bloom_time, src } = props;
  const userNatives = useSelector(state => state.userNativesReducer.userNatives);

  return (
    <>
      <figure onClick={() => {

        if (userNatives.reduce((acc, el) => el.native_id !== native_id ? acc = true : acc = false, false) || userNatives.length === 0) {
          dispatch(addUserNative(native_id));
        } else {
          toast.warning("This plant has already been added to your list, please select another");
        }
      }} className="nativeThumbnail">
        <img className="searchResultImage" src={src} alt={`${botanical_name}, commonly known as ${common_name}`} />
        <figcaption>
          <h5><strong>Botanical Name: </strong><em>{botanical_name}</em></h5>
          <h5><strong>Common Name: </strong>{common_name}</h5>
          <h5><strong>Moisture: </strong>{moisture}</h5>
          <h5><strong>Sun: </strong>{sun}</h5>
          <h5><strong>Height: </strong>{height}</h5>
          <h5><strong>Bloom Time: </strong>{bloom_time}</h5>
        </figcaption>
      </figure>
    </>
  );
};

export default NativeThumbnail;
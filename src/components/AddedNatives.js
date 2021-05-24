// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NativeAdded from "./NativeAdded";
import { getUserNatives } from "../redux/userNativesReducer";


const AddedNatives = () => {
  const dispatch = useDispatch();
  const [eSpring, setESpring] = useState([]);
  const [lSpring, setLSpring] = useState([]);
  const [summer, setSummer] = useState([]);
  const [fall, setFall] = useState([]);

  const userNatives = useSelector(state => state.userNativesReducer.userNatives);
  useEffect(() => {
    dispatch(getUserNatives());
  }, []);

  useEffect(() => {
    if (userNatives.length > 0) {
      let eSpringTemp = [];
      let lSpringTemp = [];
      let summerTemp = [];
      let fallTemp = [];

      userNatives.forEach((el) => {
        switch (el.bloom_time) {
          case "Late Spring":
            return lSpringTemp.push(el);
          case "Summer":
            return summerTemp.push(el);
          case "Early Spring":
            return eSpringTemp.push(el);
          case "Fall":
            return fallTemp.push(el);
          default:
            break;
        }
      });

      lSpringTemp = lSpringTemp.map(el => <NativeAdded key={`addedNative${el.native_id}`} native_id={el.native_id} botanical_name={el.botanical_name} common_name={el.common_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} project_notes={el.project_notes} />);
      eSpringTemp = eSpringTemp.map(el => <NativeAdded key={`addedNative${el.native_id}`} native_id={el.native_id} botanical_name={el.botanical_name} common_name={el.common_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} project_notes={el.project_notes} />);
      summerTemp = summerTemp.map(el => <NativeAdded key={`addedNative${el.native_id}`} native_id={el.native_id} botanical_name={el.botanical_name} common_name={el.common_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} project_notes={el.project_notes} />);
      fallTemp = fallTemp.map(el => <NativeAdded key={`addedNative${el.native_id}`} native_id={el.native_id} botanical_name={el.botanical_name} common_name={el.common_name} moisture={el.moisture} sun={el.sun} height={el.height} bloom_time={el.bloom_time} src={el.src} project_notes={el.project_notes} />);

      setESpring(eSpringTemp);
      setLSpring(lSpringTemp);
      setSummer(summerTemp);
      setFall(fallTemp);
    }
  }, [userNatives]);

  return (
    <aside>
      <h1 className="toPrint ">Project Notes</h1>
      <section><h2 id='eSpringH'>Early Spring-<strong>{eSpring.length}</strong> in List</h2>
        <br />
        {eSpring}
      </section>
      <section><h2 id='lSpringH'>Late Spring-<strong>{lSpring.length}</strong> in List</h2>
        <br />
        {lSpring}
      </section>
      <section><h2 id='summerH'>Summer-<strong>{summer.length}</strong> in List</h2>
        <br />
        {summer}
      </section>
      <section><h2 id='fallH'>Fall-<strong>{fall.length}</strong> in List</h2>
        <br />
        {fall}
      </section>
      <div className='toPrint'>
        End of List
          <br />
        <br />
        <br />
      </div>
    </aside>
  );
};

export default AddedNatives;
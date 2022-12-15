import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NativeAdded from './NativeAdded';
import { AddedNativesProps, UserNative } from '../types';
import { AppStore } from '../redux/store';

const AddedNatives: React.FC<AddedNativesProps> = (props) => {
  const [eSpring, setESpring] = useState<JSX.Element[]>([]);
  const [lSpring, setLSpring] = useState<JSX.Element[]>([]);
  const [summer, setSummer] = useState<JSX.Element[]>([]);
  const [fall, setFall] = useState<JSX.Element[]>([]);

  const userNatives = useSelector<AppStore, UserNative[]>(
    (state) => state.userNativesReducer.userNatives
  );

  useEffect(() => {
    if (typeof userNatives === 'object') {
      const eSpringTempData: UserNative[] = [];
      const lSpringTempData: UserNative[] = [];
      const summerTempData: UserNative[] = [];
      const fallTempData: UserNative[] = [];

      userNatives.forEach((el) => {
        switch (el.bloom_time) {
          case 'Late Spring':
            return lSpringTempData.push(el);
          case 'Summer':
            return summerTempData.push(el);
          case 'Early Spring':
            return eSpringTempData.push(el);
          case 'Fall':
            return fallTempData.push(el);
          default:
            break;
        }
      });

      const lSpringTempElements = eSpringTempData.map((el) => (
        <NativeAdded
          key={`addedNative${el.native_id}`}
          native_id={el.native_id}
          botanical_name={el.botanical_name}
          common_name={el.common_name}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          project_notes={el.project_notes}
        />
      ));

      const eSpringTempElements = lSpringTempData.map((el) => (
        <NativeAdded
          key={`addedNative${el.native_id}`}
          native_id={el.native_id}
          botanical_name={el.botanical_name}
          common_name={el.common_name}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          project_notes={el.project_notes}
        />
      ));

      const summerTempElements = summerTempData.map((el) => (
        <NativeAdded
          key={`addedNative${el.native_id}`}
          native_id={el.native_id}
          botanical_name={el.botanical_name}
          common_name={el.common_name}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          project_notes={el.project_notes}
        />
      ));

      const fallTempElements = fallTempData.map((el) => (
        <NativeAdded
          key={`addedNative${el.native_id}`}
          native_id={el.native_id}
          botanical_name={el.botanical_name}
          common_name={el.common_name}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          project_notes={el.project_notes}
        />
      ));

      setESpring(lSpringTempElements);
      setLSpring(eSpringTempElements);
      setSummer(summerTempElements);
      setFall(fallTempElements);
    }
  }, [userNatives]);

  return (
    <aside
      id="addedNativesAside"
      className={props.searchAdded ? 'addedClosed' : 'addedOpen'}
    >
      <button
        className="nativeSelectorVis"
        onClick={() => props.setSearchAdded(!props.searchAdded)}
      >
        To Search
      </button>
      <button id="printButton" onClick={() => window.print()}>
        Print
      </button>
      <h1 className="addedHeaders">Project Notes</h1>
      <h4 className="addedHeaders">(Click Image to Remove from List)</h4>
      <section
        className={`bloomTimeBox ${
          eSpring.length === 0 ? 'hideInPrint' : undefined
        }`}
      >
        <h3 id="eSpringH">
          Early Spring-<strong>{eSpring.length}</strong> in List
        </h3>
        <br />
        <ul>{eSpring}</ul>
      </section>
      <section
        className={`bloomTimeBox ${
          lSpring.length === 0 ? 'hideInPrint' : undefined
        }`}
      >
        <h3 id="lSpringH">
          Late Spring-<strong>{lSpring.length}</strong> in List
        </h3>
        <br />
        <ul>{lSpring}</ul>
      </section>
      <section
        className={`bloomTimeBox ${
          summer.length === 0 ? 'hideInPrint' : undefined
        }`}
      >
        <h3 id="summerH">
          Summer-<strong>{summer.length}</strong> in List
        </h3>
        <br />
        {summer}
      </section>
      <section
        className={`bloomTimeBox ${
          fall.length === 0 ? 'hideInPrint' : undefined
        }`}
      >
        <h3 id="fallH">
          Fall-<strong>{fall.length}</strong> in List
        </h3>
        <br />
        <ul>{fall}</ul>
      </section>
      <div className="toPrint">
        End of List
        <br />
        <br />
        <br />
      </div>
    </aside>
  );
};

export default AddedNatives;

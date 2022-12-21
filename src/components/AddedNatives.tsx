import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { AddedNativesProps, UserNativeStateVersion } from '../types';
import { NativeAdded } from './';

export const AddedNatives: React.FC<AddedNativesProps> = (props) => {
  const [addedNatives, setAddedNatives] = useState<{
    eSpring: JSX.Element[];
    lSpring: JSX.Element[];
    summer: JSX.Element[];
    fall: JSX.Element[];
  }>({ eSpring: [], lSpring: [], summer: [], fall: [] });

  const userNatives = useSelector<AppStore, UserNativeStateVersion[]>(
    (state) => state.userNativePlant.nativePlants
  );

  const { eSpring, lSpring, summer, fall } = addedNatives;

  useEffect(() => {
    if (typeof userNatives === 'object') {
      const eSpringTempData: UserNativeStateVersion[] = [];
      const lSpringTempData: UserNativeStateVersion[] = [];
      const summerTempData: UserNativeStateVersion[] = [];
      const fallTempData: UserNativeStateVersion[] = [];

      userNatives.forEach((el) => {
        switch (el.bloomTime) {
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
          key={el.id}
          id={el.id}
          botanicalName={el.botanicalName}
          commonName={el.commonName}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          projectNotes={el.projectNotes}
        />
      ));

      const eSpringTempElements = lSpringTempData.map((el) => (
        <NativeAdded
          key={el.id}
          id={el.id}
          botanicalName={el.botanicalName}
          commonName={el.commonName}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          projectNotes={el.projectNotes}
        />
      ));

      const summerTempElements = summerTempData.map((el) => (
        <NativeAdded
          key={el.id}
          id={el.id}
          botanicalName={el.botanicalName}
          commonName={el.commonName}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          projectNotes={el.projectNotes}
        />
      ));

      const fallTempElements = fallTempData.map((el) => (
        <NativeAdded
          key={el.id}
          id={el.id}
          botanicalName={el.botanicalName}
          commonName={el.commonName}
          moisture={el.moisture}
          sun={el.sun}
          height={el.height}
          src={el.src}
          projectNotes={el.projectNotes}
        />
      ));

      setAddedNatives({
        eSpring: eSpringTempElements,
        lSpring: lSpringTempElements,
        summer: summerTempElements,
        fall: fallTempElements
      });
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

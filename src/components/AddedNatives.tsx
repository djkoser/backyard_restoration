import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { AddedNativesProps } from '../types';
import { NativeAdded } from './';

export const AddedNatives: React.FC<AddedNativesProps> = (props) => {
  const { eSpring, lSpring, summer, fall } = useSelector<
    AppStore,
    {
      eSpring: JSX.Element[];
      lSpring: JSX.Element[];
      summer: JSX.Element[];
      fall: JSX.Element[];
    }
  >((state) => {
    return state.userNativePlant.nativePlants.reduce(
      (jsxElement, el) => {
        const { eSpring, lSpring, summer, fall } = jsxElement;
        const elementParsed: JSX.Element = (
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
        );
        switch (el.bloomTime) {
          case 'Late Spring':
            lSpring.push(elementParsed);
            break;
          case 'Summer':
            summer.push(elementParsed);
            break;
          case 'Early Spring':
            eSpring.push(elementParsed);
            break;
          case 'Fall':
            fall.push(elementParsed);
            break;
          default:
            break;
        }
        return { eSpring, lSpring, summer, fall };
      },
      {
        eSpring: [] as JSX.Element[],
        lSpring: [] as JSX.Element[],
        summer: [] as JSX.Element[],
        fall: [] as JSX.Element[]
      }
    );
  });

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

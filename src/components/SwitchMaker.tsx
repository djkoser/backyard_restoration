import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserMethod } from '../redux/userInfoSlice';
import { AppStore } from '../redux/store';
import { ManagementMethod, SwitchMakerProps } from '../types';
import * as CSS from 'csstype';

const SwitchMaker: React.FC<SwitchMakerProps> = (props) => {
  const dispatch = useDispatch();
  // Determine if weed method is in user method list and check inputs accordingly

  const userMethods = useSelector<AppStore, ManagementMethod[]>(
    (state) => state.userMethods
  );

  const { weedMethod } = props;

  let checked = false;
  if (
    userMethods.reduce(
      (acc: number, el) => (weedMethod.methodId === el.methodId ? ++acc : acc),
      0
    )
  ) {
    checked = true;
  }
  return (
    <div className="switchBody">
      <div className="switchPara">
        <span>
          <strong>Name: </strong>
          {weedMethod.name}
        </span>
        <div className="switchFlexBox">
          <div
            style={
              checked
                ? undefined
                : ({ transform: 'translateY(15px)' } as CSS.Properties)
            }
            className="switch"
          >
            <h5
              style={
                checked
                  ? undefined
                  : ({ transform: 'translateY(-6px)' } as CSS.Properties)
              }
              className="switchLabel"
            >
              {checked ? 'Remove from Timeline' : 'Add to Timeline'}
            </h5>
            <input
              type="checkbox"
              id={`switch${weedMethod.methodId}`}
              checked={checked}
              onChange={() => {
                dispatch(toggleUserMethod(weedMethod.methodId));
              }}
            />
            <label htmlFor={`switch${weedMethod.methodId}`}>
              <span className="switchSpan"></span>
            </label>
          </div>
        </div>
      </div>
      <br />
      <p className="treatmentDesc">
        <strong>Description: </strong>
        {weedMethod.description}
      </p>
    </div>
  );
};

export default SwitchMaker;

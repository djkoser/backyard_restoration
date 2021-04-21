import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toggleMethod } from '../redux/mgmtMethodReducer';


const SwitchMaker = (props) => {
  const dispatch = useDispatch()
  // Determine if weed method is in user method list and check inputs accordingly

  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);

  const { weedMethod } = props;

  let checked = false
  if (userMethods.reduce((acc, el) => weedMethod.method_id === el.method_id ? ++acc : acc, 0)) {
    checked = true
  }
  return (
    <div className='switchBody'>
      <div className='switchPara'>
        <span><strong>Name: </strong>
          {weedMethod.name}</span>
        <div className='switchFlexBox'>
          <div style={checked ? null : { transform: "translateY(15px)" }} className="switch" >
            <h5 style={checked ? null : { transform: "translateY(-6px)" }} className="switchLabel">{checked ? "Remove from Timeline" : "Add to Timeline"}</h5>
            <input type="checkbox"
              id={`switch${weedMethod.method_id}`}
              checked={checked}
              onChange={() => {
                dispatch(toggleMethod(weedMethod.method_id));
              }} />
            <label htmlFor={`switch${weedMethod.method_id}`}>
              <span className="switchSpan"></span>
            </label>
          </div>
        </div>
      </div>
      <br />
      <p className="treatmentDesc">
        <strong>Description: </strong>{weedMethod.description}
      </p>
    </div>
  )
}

export default SwitchMaker
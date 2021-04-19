import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toggleMethod } from '../redux/mgmtMethodReducer';


const SwitchMaker = (props) => {
  console.log("rerender switchMaker")
  const dispatch = useDispatch()
  // Determine if weed method is in user method list and check inputs accordingly

  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);

  const { weedMethod } = props;


  if (weedMethod && userMethods.length > 0) {
    let checked = false
    if (userMethods.reduce((acc, el) => weedMethod.method_id === el.method_id ? ++acc : acc, 0)) {
      checked = true
    }
    return (
      <div>
        <p>
          <strong>Name: </strong>{weedMethod.name}
          <br />
          <strong>Description: </strong>{weedMethod.description}
        </p>
        <div className="switch" >
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
    )
  }
}

export default SwitchMaker
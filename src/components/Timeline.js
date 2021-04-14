import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMethods } from '../redux/mgmtMethodReducer';
// @ts-ignore
import * as d3 from 'd3';


// From store userMethods[], gSeasonLength, firstGDD35
// @ts-ignore
const Timeline = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMethods())
  }, [dispatch])

  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);
  // @ts-ignore
  const growing_season_length = useSelector(state => state.userInfoReducer.growing_season_length);
  // @ts-ignore
  const first_gdd35 = useSelector(state => state.userInfoReducer.first_gdd35);
  // @ts-ignore
  const last_gdd35 = useSelector(state => state.userInfoReducer.last_gdd35);

  return (
    <>
    </>
  )

  // createBars etc()
}

export default Timeline
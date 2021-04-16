import React from 'react';
import { useSelector } from 'react-redux';
import Timeline from './Timeline';

// props from store hZone, gSeasonLength firstGDD35

const Dashboard = () => {

  // @ts-ignore
  const hardiness_zone = useSelector(state => state.userInfoReducer.hardiness_zone)
  // @ts-ignore
  const growing_season_length = useSelector(state => state.userInfoReducer.growing_season_length)
  // @ts-ignore
  const first_gdd35 = useSelector(state => state.userInfoReducer.first_gdd35)
  // @ts-ignore
  const last_gdd35 = useSelector(state => state.userInfoReducer.last_gdd35)

  return (
    <>
      <h2>Site Preparation Timeline</h2>
      <h3><strong>Zone </strong>{hardiness_zone}</h3>
      <h3><strong>Average Growing Days (GDD35) </strong>{growing_season_length}</h3>
      <h3><strong>Average Season Start Date</strong>{first_gdd35}</h3>
      <h3><strong>Average Season End Date</strong>{last_gdd35}</h3>

      <Timeline />
    </>
  )
}
export default Dashboard
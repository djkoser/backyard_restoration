// @ts-nocheck
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';
import Nav from './Nav';
import Timeline from './Timeline';
import DashboardDropdowns from './DashboardDropdowns';
import { getUserInfo } from '../redux/userInfoReducer';
import { getMethods } from '../redux/mgmtMethodReducer';

// props from store hZone, gSeasonLength firstGDD35

const Dashboard = () => {

  const hardiness_zone = useSelector(state => state.userInfoReducer.hardiness_zone);

  const growing_season_length = useSelector(state => state.userInfoReducer.growing_season_length);

  const first_gdd35 = useSelector(state => state.userInfoReducer.first_gdd35);

  const last_gdd35 = useSelector(state => state.userInfoReducer.last_gdd35);


  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);

  const chartMargin = { top: 10, right: 10, bottom: 10, left: 10 };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMethods());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div id="dashboardDecoration">
        <div id="timelineHeaderBox">
          <section id="growingInfoBox">
            <h5><strong>Zone:    </strong>{hardiness_zone}</h5>
            <h5><strong>Average Growing Days (GDD35):    </strong>{growing_season_length}</h5>
            <h5><strong>Average Season Start Date:    </strong>{first_gdd35}</h5>
            <h5><strong>Average Season End Date:    </strong>{last_gdd35}</h5>
          </section>
          <h2 className='hidden' id="timelineHeader"><strong>Weed Management Timeline</strong></h2>
        </div>
        <div id="d3Container">
          <Timeline height={300} width={400} first_gdd35={first_gdd35} last_gdd35={last_gdd35} userMethods={userMethods} margin={chartMargin} />
        </div>
      </div>
      <DashboardDropdowns />
      <Footer />
    </>
  );
};
export default Dashboard;
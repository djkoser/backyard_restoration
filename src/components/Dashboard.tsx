import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';
import Nav from './Nav';
import Timeline from './Timeline';
import DashboardDropdowns from './DashboardDropdowns';
import { getUserInfo } from '../redux/userInfoSlice';
import { getMethods } from '../redux/mgmtMethodSlice';
import { AppStore } from '../redux/store';
import { ManagementMethod } from '../types';

// props from store hZone, gSeasonLength firstGDD35

const Dashboard: React.FC = () => {
  const hardinessZone = useSelector<AppStore, string>(
    (state) => state.userInfoReducer.hardinessZone
  );

  const growingSeasonLength = useSelector<AppStore, number>(
    (state) => state.userInfoReducer.growingSeasonLength
  );

  const firstGdd45 = useSelector<AppStore, string>(
    (state) => state.userInfoReducer.firstGdd45
  );

  const lastGdd45 = useSelector<AppStore, string>(
    (state) => state.userInfoReducer.lastGdd45
  );

  const userMethods = useSelector<AppStore, ManagementMethod[]>(
    (state) => state.mgmtMethodReducer.userMethods
  );

  const chartMargin = { top: 10, right: 10, bottom: 10, left: 10 };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMethods());
  }, [dispatch]);

  return (
    <>
      <Nav invertColors={false} />
      <div id="dashboardDecoration">
        <div id="timelineHeaderBox">
          <section id="growingInfoBox">
            <h5>
              <strong>Zone: </strong>
              {hardinessZone}
            </h5>
            <h5>
              <strong>Average Growing Days (GDD35): </strong>
              {growingSeasonLength}
            </h5>
            <h5>
              <strong>Average Season Start Date: </strong>
              {firstGdd45}
            </h5>
            <h5>
              <strong>Average Season End Date: </strong>
              {lastGdd45}
            </h5>
          </section>
          <h2 className="hidden" id="timelineHeader">
            <strong>Weed Management Timeline</strong>
          </h2>
        </div>
        <div id="d3Container">
          <Timeline
            height={300}
            width={400}
            firstGdd45={firstGdd45}
            lastGdd45={lastGdd45}
            userMethods={userMethods}
            margin={chartMargin}
          />
        </div>
      </div>
      <DashboardDropdowns />
      <Footer />
    </>
  );
};
export default Dashboard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { getUserInfo } from '../redux/userSlice';
import { UserManagementMethodStateVersion } from '../types';
import { DashboardDropdowns, Footer, Nav, Timeline } from './';

// props from store hZone, gSeasonLength firstGDD35

export const Dashboard: React.FC = () => {
  const hardinessZone = useSelector<AppStore, string>(
    (state) => state.userInfo.hardinessZone
  );

  const growingSeasonLength = useSelector<AppStore, number>(
    (state) => state.userInfo.growingSeasonLength
  );

  const firstGdd45 = useSelector<AppStore, string>(
    (state) => state.userInfo.firstGdd45
  );

  const lastGdd45 = useSelector<AppStore, string>(
    (state) => state.userInfo.lastGdd45
  );

  const userMethods = useSelector<AppStore, UserManagementMethodStateVersion[]>(
    (state) => state.userMethod.userMethods
  );

  const chartMargin = { top: 10, right: 10, bottom: 10, left: 10 };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

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

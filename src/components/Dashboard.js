import React from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Nav from './Nav';
import Timeline from './Timeline';
import DashboardDropdowns from './DashboardDropdowns';

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

  // @ts-ignore
  const userMethods = useSelector(state => state.mgmtMethodReducer.userMethods);


  const chartMargin = { top: 20, right: 10, bottom: 30, left: 10 };

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
          <h2 id="dashHeader"><strong>Weed Management Timeline</strong></h2>
        </div>
        <div id="d3Container">
          <Timeline height={300} width={400} first_gdd35={first_gdd35} last_gdd35={last_gdd35} userMethods={userMethods} margin={chartMargin} />
        </div>
      </div>
      <DashboardDropdowns />
      <Footer />
    </>
  )
}
export default Dashboard
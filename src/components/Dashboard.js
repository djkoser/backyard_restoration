import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import { getUserInfo } from '../redux/userInfoReducer';
import { getMethods } from '../redux/mgmtMethodReducer';


// props from store hZone, gSeasonLength firstGDD35

class Dashboard extends Component {

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <>
        <h2>Site Preparation Timeline</h2>
        <h3><strong>Zone </strong>{this.props.hardiness_zone}</h3>
        <h3><strong>Average Growing Days (GDD35) </strong>{this.props.growing_season_length}</h3>
        <h3><strong>Average Season Start Date</strong>{this.props.last_gdd35}</h3>
        <Timeline />
      </>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    hardiness_zone: state.userInfoReducer.hardiness_zone,
    growing_season_length: state.userInfoReducer.growing_season_length,
    first_gdd35: state.userInfoReducer.first_gdd35,
    last_gdd35: state.userInfoReducer.last_gdd35
  };
}

export default connect(mapStateToProps, { getUserInfo, getMethods })(Dashboard)
import React, { Component } from 'react';
import { connect } from 'react-redux';


// From store userMethods[], gSeasonLength, firstGDD35
class Timeline extends Component {
  componentDidMount() {
    this.props.getMethods();
  }
  render() {
    return (
      <>
      </>
    )
  };

  // createBars etc()
}
const mapStateToProps = (state) => {
  return {
    userMethods: state.mgmtMethodReducer.userMethods,
    growing_season_length: state.userInfoReducer.growing_season_length,
    first_gdd35: state.userInfoReducer.first_gdd35,
    last_gdd35: state.userInfoReducer.last_gdd35
  };
}
export default connect(mapStateToProps)(Timeline)
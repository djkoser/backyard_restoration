import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMethods, addMethod, removeMethod } from '../redux/mgmtMethodReducer';
import axios from 'axios';

// From Store userMethods[], getMethods(), addMethod() removeMethod()

class WeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      commonName: "",
      botanicalName: "",
      annualPerennialBiennial: "",
      vegType: "",
      description: "",
      mgmtOptions: ""
    };
  };
  getWeedDetails = () => { };
  render() {
    return (
      <>
      </>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    userMethods: state.mgmtMethodReducer.userMethods,
  };
}
export default connect(mapStateToProps, { getMethods, addMethod, removeMethod })(WeedPage)
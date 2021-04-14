import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../redux/userInfoReducer';


class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      editToggleName: false,
      editToggleEmail: false,
      editTogglePassword: false,
      editToggleAddress: false
    }

  }

  toggleEdit = (formName) => { };
  changeName = () => { };
  changePassword = () => { };
  changeAddress = () => { };
  handleChange = () => { };
  // props from store user_id, email, first_name, last_name, street, city, state, zipcode, getUserInfo()

  render() {
    return (
      <>
      </>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    userId: state.userInfoReducer.user_id,
    email: state.userInfoReducer.email,
    firstName: state.userInfoReducer.first_name,
    lastName: state.userInfoReducer.last_name,
    street: state.userInfoReducer.street,
    city: state.userInfoReducer.city,
    state: state.userInfoReducer.state,
    zipcode: state.userInfoReducer.zipcode
  };
}

export default connect(mapStateToProps, { getUserInfo })(MyAccount)
// @ts-ignore
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { getUserInfo } from '../redux/userInfoReducer';

// props from store user_id, email, first_name, last_name, street, city, state, zipcode, getUserInfo()

// @ts-ignore
const MyAccount = (props) => {

  // @ts-ignore
  const [userId, setUserId] = useState(0);
  // @ts-ignore
  const [firstName, setFirstName] = useState("");
  // @ts-ignore
  const [lastName, setLastName] = useState("");
  // @ts-ignore
  const [email, setEmail] = useState("");
  // @ts-ignore
  const [password, setPassword] = useState("");
  // @ts-ignore
  const [street, setStreet] = useState("");
  // @ts-ignore
  const [city, setCity] = useState("");
  // @ts-ignore
  const [state, setState] = useState("");
  // @ts-ignore
  const [zipcode, setZipcode] = useState("");
  // @ts-ignore
  const [editToggleName, setEditToggleName] = useState(false);
  // @ts-ignore
  const [editToggleEmail, setEditToggleEmail] = useState(false);
  // @ts-ignore
  const [editTogglePassword, setEditTogglePassword] = useState(false);
  // @ts-ignore
  const [editToggleAddress, setEditToggleAddress] = useState(false);

  // @ts-ignore
  const dispatch = useDispatch()
  // @ts-ignore
  const userIdRedux = useSelector(state => state.userInfoReducer.user_id);
  // @ts-ignore
  const emailRedux = useSelector(state => state.userInfoReducer.email);
  // @ts-ignore
  const firstNameRedux = useSelector(state => state.userInfoReducer.first_name);
  // @ts-ignore
  const lastNameRedux = useSelector(state => state.userInfoReducer.last_name);
  // @ts-ignore
  const streetRedux = useSelector(state => state.userInfoReducer.street);
  // @ts-ignore
  const cityRedux = useSelector(state => state.userInfoReducer.city);
  // @ts-ignore
  const stateRedux = useSelector(state => state.userInfoReducer.state);
  // @ts-ignore
  const zipcodeRedux = useSelector(state => state.userInfoReducer.zipcode);

  // @ts-ignore
  const changeName = () => { };
  // @ts-ignore
  const changePassword = () => { };
  // @ts-ignore
  const changeAddress = () => { };


}
export default MyAccount

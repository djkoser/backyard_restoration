import React, { useState } from 'react';

// props from Login email, password

const Register = (props) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode, setZipcode] = useState("")


  const createNewUser = () => { };

  return (
    <>
    </>
  )
}
export default Register
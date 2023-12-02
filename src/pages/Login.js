import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Defsignup from "./Defsignup";
import App from "../App";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignupTrue, setSup] = useState(false);

  
  // const history = useHistory(); // Access the history object

  function handleSubmit(event) {
    event.preventDefault();


    // Make a POST request to the server
    axios.post('http://localhost:8080/demo', {
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
        alert('Successfully Login and UserFound');
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        alert('User Not Found');
      });
  }

  function handleSignUp() {
    setSup(true);
  //  history.push('/Defsignup'); // Navigate to the Defsignup component

  }

  if(isSignupTrue)
  {
    return(<Defsignup/>);
  }

  if (isLoggedIn) {
    // Handle logged-in state
    return (
      <div>
        {/* Render the appropriate content for logged-in state */}
        <App mail={email}/>
      </div>
    );
  } else{
    // Handle logged-out state
    return (
      <div className="LoginForm">
        <form id="form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <span>Email</span>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
          <br />
          <span>Password</span>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
          <br />
          <input type="submit"></input>
        </form>
        <div className="login" style={
          {
            margin:'auto',
            width:'25%',
          }
        }>
        <h2  style={{ color: 'white', textAlign:'center', marginTop:'20px' }}>NEW TO FINANSYS?</h2>
        <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}

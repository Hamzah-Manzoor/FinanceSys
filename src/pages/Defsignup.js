import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import React, { useState } from 'react';
import Login from './Login';
import './Defsignup.css'

function Defsignup() {

  const [form,setForm] = useState('');
  const [value,setValue] =useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSignin=(e)=>{
      setIsLoggedIn(true);
  }
  const handleForm =(e)=>{
    console.log(e.target.value,e.target.name);
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const fun=(value)=>{
    setValue(value);
    console.log(value);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8080/signup',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    alert('SignUp Successful');
  }

  const getUsers =async()=>{
    const response = await fetch('http://localhost:8080/demo',{
      method:'GET'
    })
    const data = await response.json();
    console.log(data);
  }

if(isLoggedIn)
{
    return(<Login/>);

}
else{
  return (
    <div className='Signup'>
      <form id="my-form" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <span>Username</span>
        <input type='text' name='username' id='user' onChange={handleForm} required></input>
        <br/>
        <span>CNIC </span>
        <input type='text' name='cnic' id='cnic' onChange={handleForm} required></input>
        <br/>
        <span>Email</span>
        <input type='text' name='email' id='ema' onChange={handleForm} required></input>
        <br/>
        <span>Password</span>
        <input type='password' name='password' id='pass' onChange={handleForm} required></input>
        <br/>
        <PhoneInput country='us' value={value} onChange={fun}/>
        <br/><br/>
        <input type='submit' id='button'></input>
      </form>
      <div className='signUpbtn' style={
              {
                margin: 'auto',
                width:'25%'
              }
            } >
              <h2 style={{marginTop:'20px',textAlign:'center',color:'white'}}>Already a Member</h2>
      <button onClick={handleSignin}>Sign In</button>
      </div>
    </div>
  );
}
}

export default Defsignup;

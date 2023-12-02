import React,{useState} from "react";
import "../Styles/Transfer.css";
import axios from "axios";
import './Delete.css'
import Defsignup from "./Defsignup";

const Product = (props) => {
    const [reason, setReason] = useState('');
    const [password, setPassword] = useState('');
    const [isDel, setDel] = useState(false);

    const [email, setEmail]=  useState(props.mail);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

  function handleUserRemoval(event) {
    event.preventDefault();
    // Make a DELETE request to the server
    axios.delete(`http://localhost:8080/deleteUser?email=${email}&password=${password}`)
      .then(function (response) {
        console.log(response);
        alert('Successfully Deleted');
        setDel(true);

      })
      .catch(function (error) {
        console.log(error);
        alert('User Not Found');
      });
  }

  
  if(isDel){
     window.location.reload();
    window.location.href = 'http://localhost:3000';

  }

 
    else{
     return (
    <div className="freeze-container">
        <div className="freeze-form">
      <h2>Delete Account</h2>
      <label htmlFor="reason">Why do you want to Delete your account?</label>
        <br />
        <select id="reason" value={reason} onChange={handleReasonChange}>
          <option value="">-- Select an option --</option>
          <option value="Fraudulent activity">Fraudulent activity</option>
          <option value="Lost or stolen card">Lost or stolen card</option>
          <option value="Personal reasons">Personal reasons</option>
          <option value="Other">Other</option>
        </select>
        <br />
      <input type="password" placeholder="Enter user password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <br/>
      <button id="rembtn" onClick={handleUserRemoval}>Remove User</button>
      </div>
    </div>
     );}
 
};

export default Product;


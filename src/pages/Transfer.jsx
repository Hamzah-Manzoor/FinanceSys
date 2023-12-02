import React, { useState,useEffect } from "react";
import "../Styles/Transfer.css";
import axios from "axios";

const Transfer = (props) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [senderEmail, setsenderemail] = useState(props.mail);


  const handleClick = async () => {
   //const amount = 200; // the amount in cents
    try {
      const response = await axios.post(
        "http://localhost:8080/processPayment",
        { balance }
      );
      console.log(response.data);
    } 
    catch (error) 
    {
      console.error(error);
    }

    //const senderEmail = props.mail;
    //const senderEmail = 'junaidfasi@gmail.com'; // Hardcoded sender email

    try {
      //console.log(senderEmail);
      const response = await axios.post("http://localhost:8080/send-balance", {
        senderEmail,
        recipientEmail,
        balance,
      });
      console.log(response.data); // Handle response as desired

      // Reset form fields
      setRecipientEmail("");
      setBalance("");
    } catch (error) {
      console.error("Error sending balance:", error);
        // Reset form fields
       
      // Handle error as desired
    }
  
  };

  return (
    <div className="topup-container main">
      <div className="topup-form">
        <h2>Transfer Money</h2>
        <br />
        <br></br>
        <label htmlFor="email">Enter person's email:</label>
        <input
          type="text"
          id="cardNumber"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
        <label htmlFor="email">Enter Amount:</label>
        <input
          type="text"
          id="cardNumber"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <button type="submit">SEND </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;

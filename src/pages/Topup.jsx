import React, { useState } from 'react';
import './Topup.css'; // import CSS file for styling

function Topup() {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail]=useState('');
  const [expMonth, setExpMonth]=useState('');
  const [expYear, setYear]=useState('');

  const [amount, setAmount] = useState('');

  const handleCardNumberChange = (event) => {
    let value = event.target.value;

    // Remove all non-digit characters from the input
    value = value.replace(/\D/g, '');

    // Format the input with spaces every four digits
    value = value.slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();

    setCardNumber(value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConfirmTopup = async(e) => {
    console.log("send money called");
    const url = 'http://localhost:8080/processTopup';
    const data = {
      cardNumber: '5590490012628952',
      cvv: '075',
      expMonth: '08',
      expYear: '27',
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Process the response data as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };
  const handleExMchange = (event) => {
    setExpMonth(event.target.value);
  };
  const handleExDchange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="topup-container main"> {/* add a class for styling */}
      <div className="topup-form"> {/* add a class for styling */}
      <h2>Topup Account</h2><br /><br></br>
        <label htmlFor="cardNumber">Enter card number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
        <br />
        <label htmlFor="cvv">Enter CVV:</label>
        <input
          type="password"
          id="cvv"
          value={cvv}
          onChange={handleCvvChange}
          placeholder='Cvv hardcoded'
        />
        <br />
        <label htmlFor="amount">Enter amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount Hardcoded (60 euro cents)"
        />
        <br />
        <label htmlFor="expiry">Enter Expiry Month:</label>
        <input
          type="text"
          id="expiry"
          value={expMonth}
          onChange={handleExMchange}
          placeholder='Enter Expiry month'
        />
         <br />
         <label htmlFor="expiryyr">Enter Expiry Year:</label>
        <input
          type="text"
          id="expiryyr"
          value={expYear}
        onChange={handleExDchange}
          placeholder='Enter Expiry month'
        />
         <br />
        <div className="btn-div">
          <button onClick={handleConfirmTopup} className="confirm-topup-btn">Topup</button>
        </div>
      </div>
    </div>
  );
}

export default Topup;

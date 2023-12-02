import React, { useState } from 'react';
import '../Styles/Transfer.css';
import axios from 'axios';
import './Edit.css'

const ProductList = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    // Perform password update logic
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    // Make a PUT request to update the password
    axios.put('http://localhost:8080/updatePassword', {
        password,
        newPassword,
      })
      .then(function (response) {
        console.log(response);
        alert('Password updated successfully');
      })
      .catch(function (error) {
        console.log(error);
        alert('Error updating password');
      });

    // Clear the input fields
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="freeze-container">
      <div className="freeze-form">
        <h2>Edit User Account</h2>
        <br />
        <input
          type="password"
          placeholder="Enter current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button id="update" onClick={handleUpdatePassword}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ProductList;

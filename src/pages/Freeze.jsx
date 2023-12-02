    import React, { useState } from 'react';
    import './Freeze.css'; // import CSS file for styling

    function Freeze() {
    const [reason, setReason] = useState('');
    const [password, setPassword] = useState('');
    const [isSure, setIsSure] = useState(false);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFreezeAccount = () => {
        setIsSure(true);
    };

    const handleConfirmFreeze = (isSure) => {
        if (isSure) {
        // code to handle freezing account
        console.log('Account freezed with reason:', reason);
                 alert('Your account has been freezed.');
        } else {
             alert('Account freeze cancelled.');
        }
        setIsSure(false);

    };

    return (
        <div className="freeze-container"> {/* add a class for styling */}
        <div className="freeze-form"> {/* add a class for styling */}
            <h2>Freeze Account</h2>
            <label htmlFor="reason">Why do you want to freeze your account?</label>
        <br />
        <select id="reason" value={reason} onChange={handleReasonChange}>
          <option value="">-- Select an option --</option>
          <option value="Fraudulent activity">Fraudulent activity</option>
          <option value="Lost or stolen card">Lost or stolen card</option>
          <option value="Personal reasons">Personal reasons</option>
          <option value="Other">Other</option>
        </select>
        <br />
            <input
            type="password"
            id="password"
            placeholder="Enter password here"
            value={password}
            onChange={handlePasswordChange}
            />
            <div className="btn-div">
            <button onClick={handleFreezeAccount} className="freeze-account-btn">Freeze Account</button>
            </div>
            {isSure && (
            <div className="sure-div">
                <p>Are you sure you want to freeze your account?</p>
                <div className="btn-div">
                <button onClick={() => handleConfirmFreeze(true)} className="confirm-btn">Yes</button>
                <button onClick={() => handleConfirmFreeze(false)} className="confirm-btn">No</button>
                </div>
            </div>
            )}
        </div>
        </div>
    );
    }

    export default Freeze;

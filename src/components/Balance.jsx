import { useEffect,useState, React } from 'react'
import axios from 'axios';

export default function Balance(props) {
  const [balance, setBalance] = useState("0");

  const containerStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '290px',
    height: '80px',
    zIndex: '999',
    backgroundImage: 'linear-gradient(120deg, #006400 0%, #388e3c 50%, #000000 100%)'
  };

  const balanceStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0',
    color: 'white'
  };

  const iconStyle = {
    fontSize: '32px',
    color: 'white'
  };

  const mediaQuery = '@media (max-width: 768px)';

  const containerStyleSmall = {
    ...containerStyle,
    padding: '5px',
    width: '100%',
    height: '60px'
  };

  const balanceStyleSmall = {
    ...balanceStyle,
    fontSize: '20px'
  };

  const iconStyleSmall = {
    ...iconStyle,
    fontSize: '24px'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/balance?email=${props.mail}`);
        const data = response.data; // Assuming the response contains the balance value
        setBalance(data.balance); // Update the balance state with the fetched value
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    };

    fetchData(); // Fetch data initially

    const interval = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); // Empty dependency array to run the effect only once

  return (
    <div style={containerStyle}>
      <p style={balanceStyle}>
        <span style={iconStyle}>Balance: </span>
        {balance} $
      </p>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
      <style>
        {mediaQuery} {'{'}
          .containerStyle {'{'}
            padding: 5px;
            width: 100%;
            height: 60px;
          {'}'}
          .balanceStyle {'{'}
            font-size: 20px;
          {'}'}
          .iconStyle {'{'}
            font-size: 24px;
          {'}'}
        {'}'}
      </style>
    </div>
  )
}

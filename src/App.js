import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Transfer from './pages/Transfer.jsx';
import Topup from './pages/Topup.jsx';
import Freeze from './pages/Freeze.jsx';
import TransactionHis from './pages/TransactionHis.jsx';
import Delete from './pages/Delete.jsx';
import Edit from './pages/Edit.jsx';
import Balance from './components/Balance.jsx';
import SearchComponent from './pages/SearchComponent';

const App = (props) => {
  
  return (
    <>
      <Balance mail={props.mail}/>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Transfer mail={props.mail}/>}/>
          <Route path="/Transfer" element={<Transfer mail={props.mail}/>} />
          <Route path="/topup" element={<Topup />} />
          <Route path="/transaction" element={<TransactionHis />} />   
          <Route path="/freeze" element={<Freeze />} />
          <Route path="/delete" element={<Delete mail={props.mail}/>} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Sidebar>
   
    </BrowserRouter>
    </>
  
  );
};

export default App;
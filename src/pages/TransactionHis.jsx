import {React,useEffect, useState} from 'react';
import '../Styles/Transfer.css';
import SearchComponent from './SearchComponent';

const TransactionHis = () => {
    
    return (
        <div className='main' style={ {backgroundColor:'#2c3e50'}}>
            <SearchComponent/>
        </div>
    );
};

export default TransactionHis;
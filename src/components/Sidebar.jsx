import React, { useState } from 'react';
import {
    FaBars,
    FaRegChartBar,
    FaMoneyBill,
    FaExchangeAlt,
    FaLock ,
    FaTrashAlt,
    FaEdit 
}from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import AIfrontend from '../pages/AIfrontend';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Transfer",
            name:"Transfer Money",
            icon:<FaExchangeAlt />
        },
        {
            path:"/topup",
            name:"Topup",
            icon:<FaMoneyBill/>
        },
        {
            path:"/transaction",
            name:"Voice Assistant",
            icon:<FaRegChartBar/>
        },
        {
            path:"/freeze",
            name:"Freeze Account",
            icon:<FaLock />
        },
        {
            path:"/delete",
            name:"Delete Account",
            icon:<FaTrashAlt />
        },
        {
            path:"/edit",
            name:"Edit Profile",
            icon:<FaEdit />
        }
    ]
    return (
        <div className="container" >
           <div style={{width: isOpen ? "200px" : "50px",backgroundImage: 'linear-gradient( 120deg,  rgb(0, 0, 0) 0%, rgb(0, 60, 0) 100% )'
}} className="sidebar">
               <div className="top_section" style={{display:'flex', flexDirection:'column'}}>

                <div className="inner1" style={{display:'flex', alignItems:'center'}}>
                <img st style={{display: isOpen ? "block" : "none",}}
                                        src='company2.png'
                                        height='50'
                                        width='50'
                                        
                                       
                                    />
                          <div style={{marginLeft: isOpen ? "40px" : "0px"}} className="bars">
                                 <FaBars onClick={toggle}/>
                   
                            </div>       


                </div>
                         <br />
               <h2 style={{display: isOpen ? "block" : "none", color:'yellow'}}>FinanceSys</h2>
                
                 
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
                }
                <AIfrontend/>

           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
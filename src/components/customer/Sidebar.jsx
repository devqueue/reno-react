import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsClipboardCheck, BsBookmark, BsClipboard, BsPeople, BsQuestionCircle } from 'react-icons/bs'

const Sidebar = ({ isActive }) => {
  return (
    <div className={`customer-sidebar bg-darkBlue text-lightGray ${isActive ? 'active' : ''}`}>
        
        <Link to='/'>
            <img src={logoLight} className='logo' alt="" />
        </Link>

        <h6 className='fs-small mb-3 customer-sidebar-title'>Main Menu</h6>

        <ul style={{marginLeft : '-30px'}}>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/panel' style={{textDecoration : "none"}} >
                    <RiHomeLine />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/quotesReceived' style={{textDecoration : "none"}}>
                    <BsClipboard />
                    <span>Quotes Received</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/financeRequests' style={{textDecoration : "none"}}>
                    <BsBookmark />
                    <span>Finance Requests</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/paidFinanceQuotes' style={{textDecoration : "none"}}>
                    <BsClipboardCheck />
                    <span>Paid Finance Quotes</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/getAllTravelingQuotes' style={{textDecoration : "none"}}>
                    <BsClipboardCheck />
                    <span>All Partner Approved Quotes</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/customer-support' style={{textDecoration : "none"}}>
                    <BsClipboardCheck />
                    <span>Customer Support</span>
                </NavLink>
            </li>
        </ul>

        <h6 className='fs-small mb-3 mt-5 customer-sidebar-title'>SUPPORT</h6>

        <ul style={{marginLeft : '-30px'}}>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/community' style={{textDecoration : "none"}}>
                    <BsPeople />
                    <span>Community</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/help ' style={{textDecoration : "none"}}>
                    <BsQuestionCircle />
                    <span>Help & Support</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/settings' style={{textDecoration : "none"}}>
                    <IoSettingsOutline />
                    <span>Settings</span>
                </NavLink>
            </li>
        </ul>

    </div>
  )
}

export default Sidebar
import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsClipboardCheck, BsBookmark, BsClipboard, BsPeople, BsQuestionCircle } from 'react-icons/bs'

const Sidebar = ({ isActive }) => {
  return (
    <div className={`customer-sidebar bg-darkBlue text-lightGray ${isActive ? 'active' : ''}`}>
        
        <Link to='/customer/dashboard/panel'>
            <img src={logoLight} className='logo' alt="" />
        </Link>

        <h6 className='fs-small mb-3 customer-sidebar-title'>Main Menu</h6>

        <ul>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/panel'>
                    <RiHomeLine />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/quotesReceived'>
                    <BsClipboard />
                    <span>Quotes Received</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/financeRequests'>
                    <BsBookmark />
                    <span>Finance Requests</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/paidFinanceQuotes'>
                    <BsClipboardCheck />
                    <span>Paid Finance Quotes</span>
                </NavLink>
            </li>
        </ul>
        
        
        <h6 className='fs-small mb-3 mt-5 customer-sidebar-title'>SUPPORT</h6>

        <ul>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/community'>
                    <BsPeople />
                    <span>Community</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/help'>
                    <BsQuestionCircle />
                    <span>Help & Support</span>
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/settings'>
                    <IoSettingsOutline />
                    <span>Settings</span>
                </NavLink>
            </li>
        </ul>

    </div>
  )
}

export default Sidebar
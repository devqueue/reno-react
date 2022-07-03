import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsClipboardCheck, BsBookmark, BsClipboard, BsPeople, BsQuestionCircle } from 'react-icons/bs'

const Sidebar = () => {
  return (
    <div className='customer-sidebar bg-darkBlue text-lightGray'>
        
        <Link to='/customer/dashboard/panel'>
            <img src={logoLight} className='logo' alt="" />
        </Link>

        <h6 className='fs-small mb-3'>Main Menu</h6>

        <ul>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/panel'>
                    <RiHomeLine />
                    Dashboard
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/quotesReceived'>
                    <BsClipboard />
                    Quotes Received
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/financeRequests'>
                    <BsBookmark />
                    Finance Requests
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/customer/dashboard/paidFinanceQuotes'>
                    <BsClipboardCheck />
                    Paid Finance Quotes
                </NavLink>
            </li>
        </ul>
        
        
        <h6 className='fs-small mb-3 mt-5'>SUPPORT</h6>

        <ul>
            <li>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/community'>
                    <BsPeople />
                    Community
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/help'>
                    <BsQuestionCircle />
                    Help & Support
                </NavLink>
                <NavLink activeClassName='active' className='text-lightGray fs-small' to='/settings'>
                    <IoSettingsOutline />
                    Settings
                </NavLink>
            </li>
        </ul>

    </div>
  )
}

export default Sidebar
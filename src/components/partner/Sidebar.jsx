import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineAppstore, AiOutlineSend } from 'react-icons/ai'
import { BsClipboardCheck, BsBookmark, BsClipboard, BsPeople, BsQuestionCircle, BsChatLeftQuote } from 'react-icons/bs'
import { HiOutlineMenu } from 'react-icons/hi'

const Sidebar = ({ isActive }) => {
  return (
    <div className={`partner-sidebar bg-darkBlue text-lightGray ${isActive ? 'active' : ''}`}>
        
        <div style={{ flex: '1' }}>

            <Link to='/'>
                <img src={logoLight} className='logo' alt=""  />
            </Link>

            <h6 className='fs-small mb-3 partner-sidebar-title'>Main Menu</h6>

            <ul style={{marginLeft : '-30px'}}>
                <li>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/panel' style={{textDecoration: 'none'}} >
                        <RiHomeLine />
                        <span>Merchant Portal</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/dashboard' style={{textDecoration: 'none'}}>
                        <AiOutlineAppstore />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/applications' style={{textDecoration: 'none'}}>
                        <AiOutlineSend />
                        <span>Applications</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/manageQuotes' style={{textDecoration: 'none'}}>
                        <BsChatLeftQuote />
                        <span>Manage Quotes</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/quotes-approved-by-customers' style={{textDecoration: 'none'}}>
                        <BsChatLeftQuote />
                        <span>Quotes Approved By Customers</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/customer-support' style={{textDecoration: 'none'}}>
                        <BsChatLeftQuote />
                        <span>Customer Support</span>
                    </NavLink>
                </li>
            </ul>

        </div>

        <div>

            <h6 className='fs-small mb-3 mt-5 partner-sidebar-title'>SUPPORT</h6>

            <ul style={{marginLeft : '-30px'}}>
                <li>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/community' style={{textDecoration: 'none'}}>
                        <BsPeople />
                        <span>Community</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/help' style={{textDecoration: 'none'}}>
                        <BsQuestionCircle />
                        <span>Help & Support</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/settings' style={{textDecoration: 'none'}}>
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </NavLink>
                </li>
            </ul>

        </div>

    </div>
  )
}

export default Sidebar
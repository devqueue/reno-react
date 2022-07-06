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

            <Link to='/partner/dashboard/panel'>
                <img src={logoLight} className='logo' alt="" />
            </Link>

            <h6 className='fs-small mb-3 partner-sidebar-title'>Main Menu</h6>

            <ul>
                <li>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/panel'>
                        <RiHomeLine />
                        <span>Merchant Portal</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/dashboard'>
                        <AiOutlineAppstore />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/applications'>
                        <AiOutlineSend />
                        <span>Applications</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/manageQuotes'>
                        <BsChatLeftQuote />
                        <span>Manage Quotes</span>
                    </NavLink>
                </li>
            </ul>

        </div>
        
        
        <div>

            <h6 className='fs-small mb-3 mt-5 partner-sidebar-title'>SUPPORT</h6>

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

    </div>
  )
}

export default Sidebar
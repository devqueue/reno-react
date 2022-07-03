import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineAppstore, AiOutlineSend } from 'react-icons/ai'
import { BsClipboardCheck, BsBookmark, BsClipboard, BsPeople, BsQuestionCircle } from 'react-icons/bs'

const Sidebar = () => {
  return (
    <div className='partner-sidebar bg-darkBlue text-lightGray'>
        
        <div style={{ flex: '1' }}>

            <Link to='/customer/dashboard/panel'>
                <img src={logoLight} className='logo' alt="" />
            </Link>

            <h6 className='fs-small mb-3'>Main Menu</h6>

            <ul>
                <li>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/panel'>
                        <RiHomeLine />
                        Merchant Portal
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/dashboard'>
                        <AiOutlineAppstore />
                        Dashboard
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' to='/partner/dashboard/applications'>
                        <AiOutlineSend />
                        Applications
                    </NavLink>
                </li>
            </ul>

        </div>
        
        
        <div>

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

    </div>
  )
}

export default Sidebar
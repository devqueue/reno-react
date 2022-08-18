import React from 'react'
import logoLight from '../../assets/images/logoLight.png'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeLine } from 'react-icons/ri'
import { AiOutlineAppstore, AiOutlineSend } from 'react-icons/ai'

const Sidebar = ({ isActive }) => {
  return (
    <div className={`partner-sidebar bg-darkBlue text-lightGray ${isActive ? 'active' : ''}`}>
        <div >

            <Link to='/'>
                <img src={logoLight} className='logo' alt="" />
            </Link>

            <ul style={{marginLeft : '-30px'}}>
                <li>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/merchantsData'>
                        <RiHomeLine />
                        <span> Merchant</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/partner/dashboard/dashboard'>
                        <AiOutlineAppstore />
                        <span> Customers</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/partner/dashboard/applications'>
                        <AiOutlineSend />
                        <span> Quotes</span>
                    </NavLink>
                </li>
            </ul>

        </div>
    </div>
  )
}

export default Sidebar
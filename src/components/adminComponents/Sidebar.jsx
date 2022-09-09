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
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/customersData'>
                        <RiHomeLine />
                        <span> Customers</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/quotesData'>
                        <AiOutlineAppstore />
                        <span> Quotes</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/financialRequestsData'>
                        <AiOutlineSend />
                        <span> Financial Requests</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/customer-issues'>
                        <AiOutlineSend />
                        <span>Customer Issues</span>
                    </NavLink>
                    <NavLink activeClassName='active' className='text-lightGray fs-small' style={{textDecoration: 'none'}} to='/admin/profile'>
                        <AiOutlineSend />
                        <span>Profile</span>
                    </NavLink>
                </li>
            </ul>

        </div>
    </div>
  )
}

export default Sidebar
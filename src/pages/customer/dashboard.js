import React, { useState } from 'react'
import Sidebar from '../../components/customer/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Panel from '../../components/customer/Panel'
import QuotesReceived from '../../components/customer/QuotesReceived'
import RequestFinance from '../../components/customer/RequestFinance'
import FinanceRequests from '../../components/customer/FinanceRequests'
import PaidFinanceQuotes from '../../components/customer/PaidFinanceQuotes'
import AllTravelingQuotes from '../../components/customer/AllTravelingQuotes'
import UserTickets from '../../components/customer/UserTicksts'
import Header from '../../components/Header'
import { HiOutlineMenu } from 'react-icons/hi'

const CustomerDashboard = () => {

  document.title = 'Reno | Customer Portal'

  const [active, setActive] = useState(false)

  return (
    <div className='admin-panel-container'>
        <div className='menu-toggle-btn' onClick={() => {setActive(!active)}}>
          <HiOutlineMenu />
        </div>
        <Sidebar isActive={active} />
        <Routes>
            <Route path='/panel' element={<Panel />} />
            <Route path='/quotesReceived' element={<QuotesReceived />} />
            <Route path='/quotesReceived/requestFinance/:id' element={<RequestFinance />} />
            <Route path='/financeRequests' element={<FinanceRequests />} />
            <Route path='/paidFinanceQuotes' element={<PaidFinanceQuotes />} />
            <Route path='/getAllTravelingQuotes' element={<AllTravelingQuotes />} />
            <Route path='/customer-support' element={<UserTickets />} />
        </Routes>
    </div>
  )
}

export default CustomerDashboard
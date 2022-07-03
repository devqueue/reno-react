import React from 'react'
import Sidebar from '../../components/customer/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Panel from '../../components/customer/Panel'
import QuotesReceived from '../../components/customer/QuotesReceived'
import RequestFinance from '../../components/customer/RequestFinance'
import FinanceRequests from '../../components/customer/FinanceRequests'
import PaidFinanceQuotes from '../../components/customer/PaidFinanceQuotes'

const CustomerDashboard = () => {
  return (
    <div className='admin-panel-container'>
        <Sidebar />
        <Routes>
            <Route path='/panel' element={<Panel />} />
            <Route path='/quotesReceived' element={<QuotesReceived />} />
            <Route path='/quotesReceived/requestFinance' element={<RequestFinance />} />
            <Route path='/financeRequests' element={<FinanceRequests />} />
            <Route path='/paidFinanceQuotes' element={<PaidFinanceQuotes />} />
        </Routes>
    </div>
  )
}

export default CustomerDashboard
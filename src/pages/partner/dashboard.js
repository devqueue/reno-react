import React from 'react'
import Panel from '../../components/partner/Panel'
import Sidebar from '../../components/partner/Sidebar'
import { Routes, Route } from 'react-router-dom'
import NewApllication from './NewApplication'
import Dashboard from '../../components/partner/Dashboard'
import ManageQuotes from '../../components/partner/ManageQuotes'
import Applications from '../../components/partner/Applications'

const PartnerDashboard = () => {
  return (
    <div className='admin-panel-container'>
        <Sidebar />
        <Routes>
            <Route path='/panel' element={<Panel />} />
            <Route path='/panel/newApplication' element={<NewApllication />} />
            <Route path='/manageQuotes' element={<ManageQuotes />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/applications' element={<Applications />} />
        </Routes>
    </div>
  )
}

export default PartnerDashboard
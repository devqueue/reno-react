import React from 'react'
import DarkHeader from '../../components/DarkHeader'
import SignupForm from '../../components/partner/SignupForm'
import { Routes, Route } from "react-router-dom";
import LoginForm from '../../components/partner/LoginForm';

const PartnerAuth = () => {
  return (
    <div>
        <DarkHeader />
        <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
    </div>
  )
}

export default PartnerAuth
import React from 'react'
import DarkHeader from '../../components/DarkHeader'
import SignupForm from '../../components/partner/SignupForm'
import { Routes, Route } from "react-router-dom";
import LoginForm from '../../components/partner/LoginForm';
import SignInWithCode from '../../components/partner/SignInWoithCode'


const PartnerAuth = () => {
  return (
    <div>
        <DarkHeader />
        <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login-with-code" element={<SignInWithCode />} />
        </Routes>
    </div>
  )
}

export default PartnerAuth
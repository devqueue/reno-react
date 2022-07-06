import React from 'react'
import SignupForm from '../../components/customer/SignupForm'
import DarkHeader from '../../components/DarkHeader'
import { Routes, Route } from "react-router-dom";
import Verification from '../../components/customer/Verification';
import Password from '../../components/customer/Password';
import LoginForm from '../../components/customer/LoginForm';

const CustomerAuth = () => {

  return (
    <div>
        <DarkHeader />
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/password" element={<Password />} />
          </Routes>
    </div>
  )
}

export default CustomerAuth
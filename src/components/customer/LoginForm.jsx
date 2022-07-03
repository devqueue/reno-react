import React, { useState } from 'react'
import { Link } from "react-router-dom";
import eye from '../../assets/icons/eye.png'

const LoginForm = () => {

    const [pass1, setPass1] = useState(false)

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">
                <div className="auth-links-container">
                    <div className="auth-links">
                        <Link to="/customer/login" className='auth-link text-light active'>Login</Link>
                        <Link to="/customer/signup" className='auth-link text-light'>Sign up</Link>
                    </div>
                </div>

                <h3 className='my-3'>Customer Sign in</h3>

                <div className="form-group mb-4">
                    <label className='form-label'>National ID/Iqama Number</label>
                    <div className="auth-input-container">
                        <input type="text" className='form-control px-3' placeholder='Enter Your National ID or Iqama Number' />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label className='form-label'>Password</label>
                    <div className='pass-container'>
                        <div className="auth-input-container">
                            <input type={`${pass1 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Password' />
                        </div>
                        <img src={eye} onClick={() => setPass1(!pass1)} className='reveal-btn' alt="" />
                    </div>
                </div>
                <h6 className='text-end mb-4'>
                    <Link to='#' className='text-light fw-light'>Forgot Password?</Link>
                </h6>
                <div class="form-check d-flex align-items-center mb-4">
                    <input class="form-check-input auth-check me-3" type="checkbox" value="" id="remember" />
                    <label class="form-check-label fs-small" for="remember">
                        Remember me
                    </label>
                </div>
                
                <Link to='/customer/verification' className='auth-btn text-light'>Log in</Link>

                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/partner/login' className='text-light fs-small fw-light'>Login as Merchant</Link>
                </h6>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
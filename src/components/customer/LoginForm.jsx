import React, { useState } from 'react'
import { Link } from "react-router-dom";
import eye from '../../assets/icons/eye.png'
import lock from '../../assets/images/lock.png'
import tick from '../../assets/images/tick.png'

const LoginForm = () => {

    document.title = 'Reno | Customer Login'
    const [pass1, setPass1] = useState(false)

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">
                <div className="auth-links-container">
                    <div className="auth-links">
                        <Link to="/customer/auth/login" className='auth-link text-light active'>Login</Link>
                        <Link to="/customer/auth/signup" className='auth-link text-light'>Sign up</Link>
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
                    <Link to='#' className='text-light fw-light' data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot Password?</Link>
                </h6>
                <div class="form-check d-flex align-items-center mb-4">
                    <input class="form-check-input auth-check me-3" type="checkbox" value="" id="remember" />
                    <label class="form-check-label fs-small" for="remember">
                        Remember me
                    </label>
                </div>
                
                <Link to='/customer/dashboard/panel' className='auth-btn text-light'>Log in</Link>

                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/partner/auth/login' className='text-light fs-small fw-light'>Login as Merchant</Link>
                </h6>
            </div>
        </div>

        {/* Modals */}

        <div class="modal fade email-modal" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-body">
                        <div className="d-flex justify-content-center w-100">
                            <img src={lock} alt="" />
                        </div>
                        <h4 className='text-dark fw-600'>Forgot Password?</h4>
                        <p className='text-dark fs-small'>
                            Please enter the email address associated with your account.
                        </p>
                        <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' />
                        <button className="btn bg-darkBlue w-100 rounded-3 text-light mb-2" data-bs-toggle="modal" data-bs-target="#resetPasswordModal">Send Reset Link</button>
                        <button className="btn bg-light border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade reset-modal" id="resetPasswordModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-body">
                        <div className="d-flex justify-content-center w-100">
                            <img src={tick} alt="" />
                        </div>
                        <h4 className='text-dark text-center fw-600'>Password Reset</h4>
                        <p className='text-secondary text-center mb-4 fs-small'>
                            A password reset link has been sent to your email address. Please check your email and choose a new password.
                        </p>
                        <div className="w-100 d-flex justify-content-center">
                            <button className="btn bg-darkBlue rounded-3 text-light mb-2 px-5" data-bs-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modals */}

    </div>
  )
}

export default LoginForm
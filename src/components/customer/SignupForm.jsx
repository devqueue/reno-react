import React from 'react'
import { Link } from "react-router-dom";

const SignupForm = () => {

    document.title = 'Reno | Customer Signup'

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">
                <div className="auth-links-container">
                    <div className="auth-links">
                        <Link to="/customer/auth/login" className='auth-link text-light'>Login</Link>
                        <Link to="/customer/auth/signup" className='auth-link text-light active'>Sign up</Link>
                    </div>
                </div>

                <h3 className='my-3'>Customer Registration</h3>

                <div className="form-group mb-4">
                    <label className='form-label'>National ID/Iqama Number</label>
                    <div className="auth-input-container">
                        <input type="text" className='form-control px-3' placeholder='Enter Your National ID or Iqama Number' />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Mobile Number</label>
                    <div className="d-flex">
                        <select class="form-select shadow-none fs-small text-muted number-select me-2" aria-label="Default select example">
                            <option selected>+966</option>
                            <option>+212</option>
                        </select>
                        <div className="auth-input-container">
                            <input type="text" className='form-control px-3' placeholder='Enter Your Mobile Number' style={{ flex: '1' }} />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Date of Birth</label>
                    <div className="auth-input-container">
                        <input type="date" className='form-control px-3 text-muted' />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Email Address</label>
                    <div className="auth-input-container">
                        <input type="text" className='form-control px-3' placeholder='Enter Your Email Address' />
                    </div>
                </div>
                <div class="form-check d-flex align-items-center mb-4">
                    <input class="form-check-input auth-check me-3" type="checkbox" value="" id="termsConditions" />
                    <label class="form-check-label fs-small text-muted" for="termsConditions">
                        I’m over 18 years old and agree to <Link className='text-light text-decoration-underline' to='/termsAndConditions'>Terms & Conditions.</Link>.
                    </label>
                </div>
                <div class="form-check d-flex align-items-center mb-4">
                    <input class="form-check-input auth-check me-3" type="checkbox" value="" id="privacyPolicy" />
                    <label class="form-check-label fs-small text-muted" for="privacyPolicy">
                        I agree to <Link className='text-light text-decoration-underline' to='/privacyPolicy'>Privacy Policy</Link>.
                    </label>
                </div>
                <Link to='/customer/auth/verification' className='auth-btn text-light'>Continue</Link>
                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/partner/auth/signup' className='text-light fs-small fw-light'>Sign up as Merchant</Link>
                </h6>
            </div>
        </div>
    </div>
  )
}

export default SignupForm
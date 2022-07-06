import React from 'react'
import { Link } from "react-router-dom";

const SignupForm = () => {

    document.title = 'Reno | Partner Signup'

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">
                <div className="auth-links-container">
                    <div className="auth-links">
                        <Link to="/partner/auth/login" className='auth-link text-light'>Login</Link>
                        <Link to="/partner/auth/signup" className='auth-link text-light active'>Sign up</Link>
                    </div>
                </div>

                <h3 className='my-3'>Partner Registration</h3>

                <div className="row">
                    <div className="form-group col-lg-6 mb-4">
                        <label className='form-label'>First Name</label>
                        <div className="auth-input-container">
                            <input type="text" className='form-control px-3' placeholder='First Name' />
                        </div>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                        <label className='form-label'>Last Name</label>
                        <div className="auth-input-container">
                            <input type="text" className='form-control px-3' placeholder='Last Name' />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Email Address</label>
                    <div className="auth-input-container">
                        <input type="text" className='form-control px-3' placeholder='Enter Your Email Address' />
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
                <div className="row">
                    <div className="form-group col-lg-6 mb-4">
                        <label className='form-label'>Country</label>
                        <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example">
                            <option selected>Select Your Country</option>
                            <option>Saudi Arabia</option>
                            <option>United Emirates</option>
                            <option>United States</option>
                        </select>
                    </div>
                    <div className="form-group col-lg-6 mb-4">
                        <label className='form-label'>City</label>
                        <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example">
                            <option selected>Select Your City</option>
                            <option>New York</option>
                            <option>London</option>
                            <option>Paris</option>
                        </select>
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Category</label>
                    <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example">
                        <option selected>Select your category</option>
                        <option>Category 1</option>
                        <option>Category 2</option>
                        <option>Category 3</option>
                    </select>
                </div>

                <Link to='/partner/dashboard/panel' className='auth-btn text-light'>Continue</Link>

                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/customer/auth/signup' className='text-light fs-small fw-light'>Sign up as Customer</Link>
                </h6>
            </div>
        </div>
    </div>
  )
}

export default SignupForm
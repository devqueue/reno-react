import React from 'react'
import { Link } from "react-router-dom";

const Verification = () => {

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">

                <h3>Verify Number</h3>
                <p className='fs-small mb-5'>Please enter the sent 4-digit code.</p>

                <div className="form-group d-flex mb-4">
                    <input type="text" className='form-control px-3 me-3 fs-2 text-center' maxLength={1} />
                    <input type="text" className='form-control px-3 me-3 fs-2 text-center' maxLength={1} />
                    <input type="text" className='form-control px-3 me-3 fs-2 text-center' maxLength={1} />
                    <input type="text" className='form-control px-3 fs-2 text-center' maxLength={1} />
                </div>
                <Link to='/customer/auth/password' className='auth-btn text-light mb-4'>Verify</Link>
                <div className="auth-links-container mb-3">
                    <div className="auth-links d-flex align-items-center justify-content-center">
                        <p className="mb-0 text-muted">Resend in <span className='text-light ms-2'>04:59</span></p>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center verification-phone p-3">
                    <div>
                        <span className='text-muted fs-small'>Mobile Number:</span>
                        <p className="mb-0">+966553145314</p>
                    </div>
                    <Link to='#' className='fs-small text-light'>Change</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Verification
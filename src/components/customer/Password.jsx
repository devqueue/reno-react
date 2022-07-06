import React, { useState } from 'react'
import { Link } from "react-router-dom";
import eye from '../../assets/icons/eye.png'

const Password = () => {

    const [pass1, setPass1] = useState(false)
    const [pass2, setPass2] = useState(false)

  return (
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">

                <h3>Password</h3>
                <p className='fs-small mb-5'>Please create a password to register.</p>

                <div className="form-group mb-4">
                    <label className='form-label'>Password</label>
                    <div className='pass-container'>
                        <input type={`${pass1 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Password' />
                        <img src={eye} onClick={() => setPass1(!pass1)} className='reveal-btn' alt="" />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className='form-label'>Confirm Password</label>
                    <div className='pass-container'>
                        <input type={`${pass2 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Confirm Password' />
                        <img src={eye} onClick={() => setPass2(!pass2)} className='reveal-btn' alt="" />
                    </div>
                </div>
                <Link to='/customer/dashboard/panel' className='auth-btn text-light'>Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Password
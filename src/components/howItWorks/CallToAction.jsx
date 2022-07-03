import React from 'react'
import arrows from '../../assets/images/arrows.png'

const CallToAction = () => {
  return (
    <div className='container cta-container my-5'>
        <div className="row bg-darkBlue py-5 call-to-action-container">
            <div className="col-lg-3 d-flex align-items-center justify-content-center">
                <img src={arrows} className='arrows-img arrows1' alt="" />
            </div>
            <div className="col-lg-6 text-center text-light">
                <h1 className='fw-bold'>Ready To get started</h1>
                <p className='mb-4'>Submit your application with Reno and start saving today!</p>
                <button className="btn bg-color-primary shadow-primary text-light fs-small px-4">Get Started</button>
            </div>
            <div className="col-lg-3 d-flex align-items-center justify-content-center">
                <img src={arrows} className='arrows-img arrows2' alt="" />
            </div>
        </div>
    </div>
  )
}

export default CallToAction
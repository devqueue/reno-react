import React from 'react'
import step1 from '../../assets/images/step1.png'
import step2 from '../../assets/images/step2.png'
import step3 from '../../assets/images/step3.png'
import corner1 from '../../assets/images/corner1.png'
import corner2 from '../../assets/images/corner2.png'
import corner3 from '../../assets/images/corner3.png'
import corner4 from '../../assets/images/corner4.png'

const Steps = () => {
  return (
    <div className='container'>
        <div className="row align-items-center mb-5">
            <div className="col-lg-5">
                <h6 className='text-color-primary mb-0'>Step 01</h6>
                <h2 className='fw-bold text-darkBlue mb-3'>Get a Quote from one of our Trusted Partners</h2>
                <p className='text-gray'>
                    Find our trusted partner from the Partner location Pages and as for a quote to pay through Reno.
                </p>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-5">
                <div className="step-img-container d-flex align-items-center justify-content-center w-100 p-3">
                    <img src={step1} className='w-100' alt="" />
                    <img src={corner1} className='corner1' alt="" />
                    <img src={corner2} className='corner2' alt="" />
                    <div className="step-q q1 shadow">
                        <h4>?</h4>
                        <span>How much <br /> is solar?</span>
                    </div>
                    <div className="step-q q2 shadow">
                        <h4>?</h4>
                        <span>Don't want <br /> to dig into savings</span>
                    </div>
                    <div className="step-q q3 shadow">
                        <h4>?</h4>
                        <span>Could I <br /> get solar sooner?</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="row align-items-center mb-4">
            <div className="col-lg-5">
                <div className="step-img-container d-flex align-items-center justify-content-center w-100 p-3 mb-3">
                    <img src={step2} className='w-100' alt="" />
                    <img src={corner3} className='corner1' alt="" />
                    <img src={corner4} className='corner2' alt="" />
                </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-6">
                <h6 className='text-color-primary mb-0'>Step 02</h6>
                <h2 className='fw-bold text-darkBlue mb-3'>Submit you finance request online, its fast and paperless</h2>
                <p className='text-gray'>
                    Once you have a quote from one of trusted partners. Signup and access your quotes pages from the portal and submit your finance request and get approved fast! Once your approved and our partner completes the work, they will get paid by Reno and Your savings will start now!
                </p>
            </div>
        </div>
        <div className="row align-items-center mb-4">
            <div className="col-lg-7">
                <h6 className='text-color-primary mb-0'>Step 03</h6>
                <h2 className='fw-bold text-darkBlue mb-3'>
                    Start Saving Money! <br />
                    Your repayments starts and <br />
                    we will notify you before each payment. 
                </h2>
                <p className='text-gray'>
                    Your good to go, your monthly repayments kicks off and we will notify you before each payments. Many Reno customers save on their energy bills, and this can offset your payments in a big way!
                </p>
            </div>
            <div className="col-lg-5">
                <div className="step-img-container d-flex align-items-center justify-content-center w-100 p-3">
                    <img src={step3} className='w-100' alt="" />
                    <img src={corner3} className='corner1' alt="" />
                    <img src={corner4} className='corner2' alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Steps
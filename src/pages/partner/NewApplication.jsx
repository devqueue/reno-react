import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import pen from '../../assets/icons/pen.png'
import appStep1 from '../../assets/icons/appStep1.png'
import appStep2 from '../../assets/icons/appStep2.png'
import appStep3 from '../../assets/icons/appStep3.png'
import appStep4 from '../../assets/icons/appStep4.png'
import tick from '../../assets/images/tick.png'

const NewApllication = () => {

    document.title = 'Reno | Partner Portal'

    const [step, setStep] = useState(1)
    const [choice, setChoice] = useState(true)

  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>New Application</h5>
            <p className='text-muted mb-0 text-light fs-small'>
              Sunday, 29 May 2022
            </p>
          </div>

          <div className='d-flex align-items-center panel-right'>
            <Link to='#' className='notification-btn'>
              <AiFillBell />
              <span>5</span>
            </Link>

            <div class="dropdown profile-dropdown">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <div className='d-flex align-items-center fs-small me-3'>
                  <img src={user} alt="" />
                  Mohammed
                            </div>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link class="dropdown-item" to="#">Profile</Link></li>
                            <li><Link class="dropdown-item" to="#">Logout</Link></li>
                        </ul>
            </div>
          </div>
        </div>


        <div className="row mt-4">
            <div className="col-12">
                <div className="finance-steps">
                    <div className={`finance-step ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={appStep1} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Finance Details</p>
                    </div>
                    <div className={`finance-step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={appStep2} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Repayment Amount </p>
                    </div>
                    <div className={`finance-step ${step === 3 ? 'active' : step > 3 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={appStep3} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Customer & Product Details</p>
                    </div>
                    <div className={`finance-step ${step === 4 ? 'active' : step > 4 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={appStep4} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Review</p>
                    </div>
                </div>
            </div>
        </div>

        {
            step === 1 ? (
                <div className="row mt-5">
                    <div className="col-lg-6 m-auto">

                        <h5 className='text-center fw-600'>Finance Details</h5>
                        <h6 className='text-center text-muted fw-normal'>Please fill in the details below and continue.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Purchase Total</label>
                                <div className="sar-container">
                                    <input type="text" className='form-control' value={'1200'} />
                                    <h5 className='fs-small text-darkBlue'>SAR</h5>
                                </div>
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Deposit Amount</label>
                                <div className="sar-container">
                                    <input type="text" className='form-control' value={'0'} />
                                    <h5 className='fs-small text-darkBlue'>SAR</h5>
                                </div>
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Balance owning</label>
                                <div className="sar-container">
                                    <input type="text" className='form-control' value={'1200'} />
                                    <h5 className='fs-small text-darkBlue'>SAR</h5>
                                </div>
                            </div>
                            <div className="col-12 mb-4">
                                <label className='form-label text-muted fs-small'>Is Customer using reno for the first time</label>
                                <div className="yes-no-container">
                                    <button className={`btn ${choice ? 'active' : ''}`} onClick={() => setChoice(true)}>Yes</button>
                                    <button className={`btn ${!choice ? 'active' : ''}`} onClick={() => setChoice(false)}>No</button>
                                </div>
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/partner/dashboard/panel' className="btn finance-form-cancel me-3" style={{ flex: '1' }}>Cancel</Link>
                                <button className="btn bg-darkBlue text-light" style={{ flex: '1' }} onClick={() => setStep(2)}>Save and Continue</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : ''
        }
        
        {
            step === 2 ? (
                <div className="row mt-5">
                    <div className="col-lg-6 m-auto">

                        <h5 className='text-center fw-600'>Repayment Amount</h5>
                        <h6 className='text-center text-muted fw-normal'>Please select repayment amount and continue.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-12">
                                <div className='amount-card d-flex align-items-center justify-content-between'>
                                    <div>
                                        <h6 className='text-darkBlue fw-600'>300 SAR</h6>
                                        <span className='text-muted fs-small'>per month</span>
                                    </div>
                                        
                                    <h6 className='text-darkBlue mb-0 fw-600'>For</h6>

                                    <div className='text-end'>
                                        <h6 className='text-darkBlue fw-600'>04</h6>
                                        <span className='text-muted fs-small'>Months</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/partner/dashboard/panel' className="btn finance-form-cancel me-3" style={{ flex: '1' }}>Cancel</Link>
                                <button className="btn bg-darkBlue text-light" style={{ flex: '1' }} onClick={() => setStep(3)}>Save and Continue</button>
                            </div>
                            
                            <div className="col-12 mt-4 d-flex justify-content-center">
                                <button className="btn border border-color-darkBlue text-darkBlue" style={{ flex: '1' }} onClick={() => setStep(1)}>Go Back</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : ''
        }
        
        {
            step === 3 ? (
                <div className="row mt-5">
                    <div className="col-lg-6 m-auto">

                        <h5 className='text-center fw-600'>Customer & Product Details</h5>
                        <h6 className='text-center text-muted fw-normal'>Please fill in the details below and continue.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Customer Name</label>
                                <input type="text" className='form-control' placeholder='Enter your customer name' />
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Phone Number</label>
                                <div className='d-flex'>
                                    <select class="form-select me-3 text-muted" style={{ width: 'fit-content' }} aria-label="Default select example">
                                        <option selected>+966</option>
                                        <option>+966</option>
                                        <option>+966</option>
                                        <option>+966</option>
                                    </select>
                                    <input type="text" className='form-control' placeholder='Enter your customer’s phone number' />
                                </div>
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Email</label>
                                <input type="text" className='form-control' placeholder='Enter your customer’s email address' />
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Product Category</label>
                                <select class="form-select text-muted" aria-label="Default select example">
                                    <option selected>Select product category</option>
                                    <option>Category title</option>
                                    <option>Category title</option>
                                    <option>Category title</option>
                                </select>
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/partner/dashboard/panel' className="btn finance-form-cancel me-3" style={{ flex: '1' }}>Cancel</Link>
                                <button className="btn bg-darkBlue text-light" style={{ flex: '1' }} onClick={() => setStep(4)}>Save and Continue</button>
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center">
                                <button className="btn border border-color-darkBlue text-darkBlue" style={{ flex: '1' }} onClick={() => setStep(2)}>Go Back</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : ''
        }
        
        {
            step ===  4? (
                <div className="row mt-5">
                    <div className="col-12 m-auto">

                        <h5 className='text-center fw-600'>Review</h5>
                        <h6 className='text-center text-muted fw-normal'>Please review information and submit the new application.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Finance Details</h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Purchase Total</span>
                                            <span className='fw-600 text-end'>1200 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Deposit Amount</span>
                                            <span className='fw-600 text-end'>0 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Balance Owning</span>
                                            <span className='fw-600 text-end'>1200 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <span className='text-muted'>Is Customer using reno for the first time</span>
                                            <span className='fw-600 text-end'>Yes</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Repayment Amount</h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <h5 className='text-dark fw-600'>300 SAR <br /> <span className='fs-small text-muted fw-normal'>per XXXX</span></h5>
                                            <h5 className='fw-600 text-end'>04 <br /> <span className='text-muted fs-small fw-normal'> Months</span></h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Customer & Product Details </h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Customer Name</span>
                                            <span className='fw-600 text-end'>Zeshan Abid</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Phone</span>
                                            <span className='fw-600 text-end'>+923006997800</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Email</span>
                                            <span className='fw-600 text-end'>abc@gmail.com</span>
                                        </li>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <span className='text-muted'>Product Category</span>
                                            <span className='fw-600 text-end'>Solar & Battery System</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/partner/dashboard/panel' className="btn finance-form-cancel me-3">Cancel</Link>
                                <button className="btn bg-darkBlue text-light" data-bs-toggle="modal" data-bs-target="#requestModal">Send Quote</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : ''
        }

        {/* Modal */}
        <div class="modal fade reset-modal" id="requestModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-body">
                        <div className="d-flex justify-content-center w-100">
                            <img src={tick} alt="" />
                        </div>
                        <h4 className='text-dark text-center fw-600'>Quote Sent!</h4>
                        <p className='text-secondary text-center mb-4 fs-small'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis egestas tristique lectus in. Dignissim eget et rhoncus faucibus.
                        </p>
                        <div className="w-100 d-flex justify-content-center">
                            <button className="btn bg-darkBlue rounded-3 text-light mb-2 px-5" data-bs-dismiss="modal">That’s Great</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Modal */}

    </div>
  )
}

export default NewApllication
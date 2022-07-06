import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import pen from '../../assets/icons/pen.png'
import quoteStep1 from '../../assets/images/quoteStep1.png'
import quoteStep2 from '../../assets/images/quoteStep2.png'
import quoteStep3 from '../../assets/images/quoteStep3.png'
import quoteStep4 from '../../assets/images/quoteStep4.png'
import tick from '../../assets/images/tick.png'

const RequestFinance = () => {

    const [step, setStep] = useState(1)

  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Request Finance</h5>
            <p className='text-muted mb-0 text-light fs-small'>
              Sunday, 29 May 2022
            </p>
          </div>

          <div className='d-flex align-items-center panel-right'>

            <div class="dropdown profile-dropdown">
                <Link to='#' className='notification-btn' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiFillBell />
                    <span>5</span>
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe <br /> <span className='text-muted' style={{ fontSize: '12px' }}>6 june 2022, 12:00 AM</span></Link></li>
                                <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe <br /> <span className='text-muted' style={{ fontSize: '12px' }}>6 june 2022, 12:00 AM</span></Link></li>
                                <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe <br /> <span className='text-muted' style={{ fontSize: '12px' }}>6 june 2022, 12:00 AM</span></Link></li>
                </ul>
            </div>
            
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
                    <div className={`finance-step ${step == 1 ? 'active' : step > 1 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={quoteStep1} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Personal Information</p>
                    </div>
                    <div className={`finance-step ${step == 2 ? 'active' : step > 2 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={quoteStep2} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Monthly Income </p>
                    </div>
                    <div className={`finance-step ${step == 3 ? 'active' : step > 3 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={quoteStep3} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Expenses and obligations</p>
                    </div>
                    <div className={`finance-step ${step == 4 ? 'active' : step > 4 ? 'done' : ''}`}>
                        <div className="step-img">
                            <img src={quoteStep4} alt="" />
                        </div>
                        <p className='mb-0 text-muted fs-small'>Review</p>
                    </div>
                </div>
            </div>
        </div>

        {
            step == 1 ? (
                <div className="row mt-5">
                    <div className="col-lg-10 m-auto">

                        <h5 className='text-center fw-600'>Personal Information</h5>
                        <h6 className='text-center text-muted fw-normal'>Please fill in your personal information below.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Owned/Rented</label>
                                <select class="form-select text-muted" aria-label="Default select example">
                                    <option selected>Please select one</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Home Type</label>
                                <select class="form-select text-muted" aria-label="Default select example">
                                    <option selected>Apartment / Villa / Duplex / Floor</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Home Location</label>
                                <input type="text" className='form-control' placeholder='Enter your home location here' />
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Home Size</label>
                                <input type="text" className='form-control' placeholder='Enter your home size' />
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Marital status</label>
                                <input type="text" className='form-control' placeholder='Select your marital status' />
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Number of family Members</label>
                                <select class="form-select text-muted" aria-label="Default select example">
                                    <option selected>Select Number of family Members</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Family member education fees (SAR)</label>
                                <input type="text" className='form-control' placeholder='Enter your family member education fees' />
                            </div>
                            <div className="col-lg-6 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Working status</label>
                                <select class="form-select text-muted" aria-label="Default select example">
                                    <option selected>Select your working status</option>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                </select>
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3">Cancel</Link>
                                <button className="btn bg-darkBlue text-light" onClick={() => setStep(2)}>Save and Continue</button>
                            </div>

                        </div>

                    </div>
                </div>
            ) : ''
        }
        
        {
            step == 2 ? (
                <div className="row mt-5">
                    <div className="col-lg-6 m-auto">

                        <h5 className='text-center fw-600'>Monthly Income</h5>
                        <h6 className='text-center text-muted fw-normal'>Please fill in your monthly income below.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Basic Salary</label>
                                <input type="text" className='form-control' placeholder='Please your basic salary here (SAR)' />
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Housing Allowance</label>
                                <input type="text" className='form-control' placeholder='Please your housing allowance here (SAR)' />
                            </div>
                            <div className="col-12 form-group mb-4">
                                <label className='form-label text-muted fs-small'>Other Allowance(Optional)</label>
                                <input type="text" className='form-control' placeholder='Please your other allowance here (SAR)' />
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3" style={{ flex: '1' }}>Cancel</Link>
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
            step == 3 ? (
                <div className="row mt-5">
                    <div className="col-lg-10 m-auto">

                        <h5 className='text-center fw-600'>Expenses and obligations</h5>
                        <h6 className='text-center text-muted fw-normal'>Please fill in your expenses and obligations  below.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-12">
                                <div className="progress-container">
                                    <h6 className='text-light text-center mb-4'>Current Monthly Expenses</h6>
                                    <div className="progress-bar-container"><div className="progress-bar"></div></div>
                                    <div className="d-flex justify-content-between">
                                        <div className='text-light fs-small'>
                                            0.00 <span className='text-muted'> SAR/month</span>
                                        </div>
                                        <div className="text-light fs-small">
                                            <span className='text-color-primary me-2'>Total income</span>
                                            8570.00 
                                            <span className="text-muted"> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card">
                                    <h6 className='text-darkBlue fw-600 mb-4 text-center'>Housing</h6>

                                    <input type="range" class="form-range" id="customRange1" />

                                    <div className="d-flex fw-600 justify-content-between">
                                        <div className='text-darkBlue fs-small'>
                                            0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                        <div className='text-darkBlue fs-small'>
                                            30,000 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                           

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card">
                                    <h6 className='text-darkBlue fw-600 mb-4 text-center'>Homeworkers wage</h6>

                                    <input type="range" class="form-range" id="customRange1" />

                                    <div className="d-flex fw-600 justify-content-between">
                                        <div className='text-darkBlue fs-small'>
                                            0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                        <div className='text-darkBlue fs-small'>
                                            15,000 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                           

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card">
                                    <h6 className='text-darkBlue fw-600 mb-4 text-center'>Food & beverage expenses</h6>

                                    <input type="range" class="form-range" id="customRange1" />

                                    <div className="d-flex fw-600 justify-content-between">
                                        <div className='text-darkBlue fs-small'>
                                            0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                        <div className='text-darkBlue fs-small'>
                                            10,000 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                           

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card">
                                    <h6 className='text-darkBlue fw-600 mb-4 text-center'>Health Care & Insurance</h6>

                                    <input type="range" class="form-range" id="customRange1" />

                                    <div className="d-flex fw-600 justify-content-between">
                                        <div className='text-darkBlue fs-small'>
                                            0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                        <div className='text-darkBlue fs-small'>
                                            8,000 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                           

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card">
                                    <h6 className='text-darkBlue fw-600 mb-4 text-center'>Transportation & Communication</h6>

                                    <input type="range" class="form-range" id="customRange1" />

                                    <div className="d-flex fw-600 justify-content-between">
                                        <div className='text-darkBlue fs-small'>
                                            0.00 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                        <div className='text-darkBlue fs-small'>
                                            10,000 <span className='text-muted fw-normal'> SAR/month</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                           

                            <div className="col-lg-6 mt-4">
                                <div className="expense-card mb-4 p-3 d-flex align-items-center justify-content-between">
                                    <p className='mb-0 text-darkBlue fs-small'>Any addition monthly expense</p>
                                    <input type="checkbox" className='form-check-input' />
                                </div>
                                <div className="expense-card py-3 px-3 d-flex align-items-center justify-content-between">
                                    <p className='mb-0 text-darkBlue fs-small'>Any additional loans</p>
                                    <input type="checkbox" className='form-check-input' />
                                </div>
                            </div>                           

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3" style={{ flex: '1' }}>Cancel</Link>
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
            step ==  4? (
                <div className="row mt-5">
                    <div className="col-12 m-auto">

                        <h5 className='text-center fw-600'>Review</h5>
                        <h6 className='text-center text-muted fw-normal'>Please review your finance request.</h6>

                        <div className="row finance-form mt-4">

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Personal Information</h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Owned/Rented</span>
                                            <span className='fw-600 text-end'>Owned</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Home type</span>
                                            <span className='fw-600 text-end'>Apartment</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Home location</span>
                                            <span className='fw-600 text-end'>Dammam City, <br />
                                            P.O.Box : 8986, Bareed Dist.</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Home Size(Sqm) </span>
                                            <span className='fw-600 text-end'>XXXX</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Marital status</span>
                                            <span className='fw-600 text-end'>Married</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Number of family members</span>
                                            <span className='fw-600 text-end'>03</span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Family member education fees</span>
                                            <span className='fw-600 text-end'>2500 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <span className='text-muted'>Working status</span>
                                            <span className='fw-600 text-end'>Employed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Monthly Income</h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Basic Salary</span>
                                            <span className='fw-600 text-end'>8,000 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Housing Allowance</span>
                                            <span className='fw-600 text-end'>1,000 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <span className='text-muted'>Other Allowance</span>
                                            <span className='fw-600 text-end'>0,00 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-lg-4 my-2">
                                <div className="review-card">
                                    <div className="review-heading d-flex justify-content-between align-items-center p-3">
                                        <h6 className='mb-0'>Expenses and obligations </h6>
                                        <img src={pen} alt="" />
                                    </div>
                                    <ul className='fs-small mb-0 p-3'>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Current Monthly Expenses</span>
                                            <span className='fw-600 text-end'>8,570 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Housing</span>
                                            <span className='fw-600 text-end'>2,000 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Homeworkers wage</span>
                                            <span className='fw-600 text-end'>0,00 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Food & beverage expenses</span>
                                            <span className='fw-600 text-end'>0,00 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Health Care & Insurance</span>
                                            <span className='fw-600 text-end'>0,00 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Transportation & Communication</span>
                                            <span className='fw-600 text-end'>0,00 <span className='text-muted fw-normal'> SAR</span></span>
                                        </li>
                                        <li className='d-flex py-2 border-bottom align-items-center justify-content-between'>
                                            <span className='text-muted'>Any addition monthly expense </span>
                                            <span className='fw-600 text-end'>Yes</span>
                                        </li>
                                        <li className='d-flex py-2 align-items-center justify-content-between'>
                                            <span className='text-muted'>Any additional loans</span>
                                            <span className='fw-600 text-end'>No</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>      

                            <div className="col-12 mt-4 d-flex justify-content-center step-btns-container">
                                <Link to='/customer/dashboard/quotesReceived' className="btn finance-form-cancel me-3">Cancel</Link>
                                <button className="btn bg-darkBlue text-light" data-bs-toggle="modal" data-bs-target="#requestModal">Submit Request</button>
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
                        <h4 className='text-dark text-center fw-600'>Request Submitted!</h4>
                        <p className='text-secondary text-center mb-4 fs-small'>
                            Thank you! Your Finance Request has been submitted successfully. <br />
                            You’ll get confirmation notification soon.
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

export default RequestFinance
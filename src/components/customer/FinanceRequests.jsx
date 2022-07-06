import React, { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import deny from '../../assets/images/deny.png'
import quotesNull from '../../assets/images/quotesNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'
import success from '../../assets/icons/success.png'
import danger from '../../assets/icons/danger.png'
import paid from '../../assets/images/paid.png'

const FinanceRequests = () => {

    const [quotes, setQuotes]  = useState(true)

  return (
    <>
    {
        quotes ? (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                    <div className='panel-left'>
                        <h5 className='mb-0 fw-600'>Finance Requests </h5>
                        <p className='text-muted mb-0 text-light fs-small'>
                        Sunday, 29 May 2022
                        </p>
                    </div>

                    <div className='d-flex align-items-center panel-right'>

                        <div className="quotes-search me-3">
                            <img src={quotesSearch} alt="" />
                            <input type="text" className='text-muted' placeholder='Search' />
                        </div>

                        <div class="dropdown profile-dropdown">
                <Link to='#' className='notification-btn' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiFillBell />
                    <span>5</span>
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe</Link></li>
                    <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe</Link></li>
                    <li><Link class="dropdown-item" to="#">You have received a new quote from John Doe</Link></li>
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
                    <h6 className='text-darkBlue fw-600 mb-0'>Today</h6>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small request-card quote-card'>
                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Company</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Phone</span>
                                    +96655332156
                                </li>
                                <li>
                                    <span className='text-muted'>Reference#</span>
                                    XXXXXXXXX
                                </li>
                            </ul>

                            <img src={line} alt="" />

                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Product Category</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Financed Amount</span>
                                    500SAR
                                </li>
                                <li>
                                    <span className='text-muted'>First Installment</span>
                                    140SAR
                                </li>
                            </ul>
                            <div>
                                <br /><br />
                                <button className='btn text-light bg-darkBlue fs-small' data-bs-toggle="modal" data-bs-target="#payModal">Make First Payment</button>
                                {/* <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button> */}
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-green bg-soft-green">
                                    Approved
                                    <img src={success} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small request-card quote-card'>
                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Company</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Phone</span>
                                    +96655332156
                                </li>
                                <li>
                                    <span className='text-muted'>Reference#</span>
                                    XXXXXXXXX
                                </li>
                            </ul>

                            <img src={line} alt="" />

                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Product Category</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Financed Amount</span>
                                    500SAR
                                </li>
                                <li>
                                    <span className='text-muted'>First Installment</span>
                                    140SAR
                                </li>
                            </ul>
                            <div style={{ width: '175px' }}>
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-color-primary bg-soft-orange">
                                    Pending
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <h6 className='text-darkBlue fw-600 mb-0'>28 May 2022</h6>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small request-card quote-card'>
                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Company</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Phone</span>
                                    +96655332156
                                </li>
                                <li>
                                    <span className='text-muted'>Reference#</span>
                                    XXXXXXXXX
                                </li>
                            </ul>

                            <img src={line} alt="" />

                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Product Category</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Financed Amount</span>
                                    500SAR
                                </li>
                                <li>
                                    <span className='text-muted'>First Installment</span>
                                    140SAR
                                </li>
                            </ul>
                            <div style={{ width: '175px' }}>
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-danger bg-soft-danger">
                                    Denied
                                    <img src={danger} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small request-card quote-card'>
                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Company</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Phone</span>
                                    +96655332156
                                </li>
                                <li>
                                    <span className='text-muted'>Reference#</span>
                                    XXXXXXXXX
                                </li>
                            </ul>

                            <img src={line} alt="" />

                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Product Category</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Financed Amount</span>
                                    500SAR
                                </li>
                                <li>
                                    <span className='text-muted'>First Installment</span>
                                    140SAR
                                </li>
                            </ul>
                            <div>
                                <br /><br />
                                <button className='btn text-light bg-darkBlue fs-small' data-bs-toggle="modal" data-bs-target="#payModal">Make First Payment</button>
                                {/* <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button> */}
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-green bg-soft-green">
                                    Approved
                                    <img src={success} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small request-card quote-card'>
                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Company</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Phone</span>
                                    +96655332156
                                </li>
                                <li>
                                    <span className='text-muted'>Reference#</span>
                                    XXXXXXXXX
                                </li>
                            </ul>

                            <img src={line} alt="" />

                            <ul>
                                <li className='mb-3'>
                                    <span className='text-muted'>Product Category</span>
                                    XXXXX
                                </li>
                                <li className='mb-3'>
                                    <span className='text-muted'>Financed Amount</span>
                                    500SAR
                                </li>
                                <li>
                                    <span className='text-muted'>First Installment</span>
                                    140SAR
                                </li>
                            </ul>
                            <div style={{ width: '175px' }}>
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-color-primary bg-soft-orange">
                                    Pending
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 mt-3">
                    <div className='d-flex justify-content-between fs-small request-card quote-card'>
                        <ul>
                            <li className='mb-3'>
                                <span className='text-muted'>Company</span>
                                XXXXX
                            </li>
                            <li className='mb-3'>
                                <span className='text-muted'>Phone</span>
                                +96655332156
                            </li>
                            <li>
                                <span className='text-muted'>Reference#</span>
                                XXXXXXXXX
                            </li>
                        </ul>

                        <img src={line} alt="" />

                        <ul>
                            <li className='mb-3'>
                                <span className='text-muted'>Product Category</span>
                                XXXXX
                            </li>
                            <li className='mb-3'>
                                <span className='text-muted'>Financed Amount</span>
                                500SAR
                            </li>
                            <li>
                                <span className='text-muted'>First Installment</span>
                                140SAR
                            </li>
                        </ul>
                        <div style={{ width: '175px' }}>
                        </div>
                        <div className="request-status-container">
                            <div className="request-status text-danger bg-soft-danger">
                                Denied
                                <img src={danger} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        ) : (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                <div>
                    <h5 className='mb-0 fw-600'>Finance Requests</h5>
                    <p className='text-muted mb-0 text-light fs-small'>
                    Sunday, 29 May 2022
                    </p>
                </div>

                <div className='d-flex align-items-center'>
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
                        <li><Link class="dropdown-item" to="#">Action</Link></li>
                        <li><Link class="dropdown-item" to="#">Another action</Link></li>
                        <li><Link class="dropdown-item" to="#">Something else here</Link></li>
                    </ul>
                    </div>
                </div>
                </div>

                <div className="quotes-null">
                    <img src={quotesNull} alt="" />
                    <h5>Sorry we couldn’t found any quote for now</h5>
                    <p className='fs-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem dolor id enim a, accumsan.</p>
                </div>

            </div>
        )
    }

    {/* modals */}

    <div class="modal fade" id="paidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                
                    <img src={paid} alt="" />

                    <h5 className='my-3 fw-600 text-darkBlue'>Paid!</h5>

                    <p className='text-muted mb-4'>
                        Are you sure you want to confirm that “ I’ve received products and services from the merchant ”
                    </p>

                    <div className='d-flex'>
                        <button className="btn text-light bg-darkBlue me-3" data-bs-dismiss='modal'>Okay</button>
                    </div>
                
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="payModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body pay-form">
                
                <div className="d-flex justify-content-end">
                  <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                </div>

                <h5 className='text-center'>Make First Payment </h5>

                <div className="form-group mt-3">
                  <label className="form-label text-muted">Select a credit card type</label>
                  <select class="form-select text-muted" aria-label="Default select example">
                    <option selected>MADA</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label text-muted">Credit Card Number</label>
                  <input type="text" className='form-control' placeholder='XXXX-XXXX-XXXX-XXXX' />
                </div>

                <div className="form-group mt-4">
                  <label className="form-label text-muted">Name of Card Holder</label>
                  <input type="text" className='form-control' placeholder='Same as on credit card' />
                </div>

                <div className="row">
                  <div className="form-group mt-4 col-lg-6">
                    <label className="form-label text-muted">Expiry Date</label>
                    <input type="text" className='form-control' placeholder='MM / YYYY' />
                  </div>
                  <div className="form-group mt-4 col-lg-6">
                    <label className="form-label text-muted">Security Code</label>
                    <input type="text" className='form-control' placeholder='CVV' />
                  </div>
                </div>

                <div class="form-check d-flex align-items-center mt-4">
                    <input class="form-check-input pay-check me-3" style={{ border: '1.5px solid #3F3F3F', width: '25px', height: '25px', borderRadius: '30%' }} type="checkbox" value="" id="privacyPolicy" />
                    <label class="form-check-label fs-small text-muted" for="privacyPolicy">
                      I’ve read and accept the  <Link className='text-dark text-decoration-underline' to='/termsAndConditions'>Terms & Conditions</Link>.
                    </label>
                </div>

                <button className="btn bg-darkBlue text-light mt-4 w-100" style={{ height: '50px', borderRadius: '6px' }} data-bs-toggle="modal" data-bs-target="#paidModal">Pay Now</button>
                
              </div>
            </div>
          </div>
        </div>

    {/* modals */}

    </>
  )
}

export default FinanceRequests
import React, { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import deny from '../../assets/images/deny.png'
import financeNull from '../../assets/images/financeNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'
import success from '../../assets/icons/success.png'
import danger from '../../assets/icons/danger.png'
import confirmation from '../../assets/images/confirmation.png'

const PaidFinanceQuotes = () => {

    const [quotes, setQuotes]  = useState(true)

  return (
    <>
    {
        quotes ? (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                    <div className='panel-left'>
                        <h5 className='mb-0 fw-600'>Paid Finance Quotes</h5>
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
                    <div className="col-12 mt-3">
                        <div className="request-card quote-card">
                            
                            <div className='d-flex justify-content-between fs-small quote-card-container'>
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
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-green bg-soft-green">
                                    Paid
                                    <img src={success} alt="" />
                                </div>
                            </div>
                            <button className='btn text-darkBlue border border-color-darkBlue finance-btn hover-bg' data-bs-toggle="modal" data-bs-target="#paidModal">I confirm that I’ve received products and services from the merchant</button>
                        </div>
                    </div>
                    
                    <div className="col-12 mt-3">
                        <div className="request-card quote-card">
                            
                            <div className='d-flex justify-content-between fs-small quote-card-container'>
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
                            </div>
                            <div className="request-status-container">
                                <div className="request-status text-green bg-soft-green">
                                    Paid
                                    <img src={success} alt="" />
                                </div>
                                <div className="request-confirmed text-darkBlue bg-soft-darkBlue">
                                    Confirmed
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        ) : (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                <div>
                    <h5 className='mb-0 fw-600'>Paid Finance Quotes</h5>
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
                    <img src={financeNull} alt="" />
                    <h5>You don’t have any paid finance qoute yet!</h5>
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

                    <div className="w-100 d-flex justify-content-end">
                        <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                    </div>
                
                    <img src={confirmation} alt="" />

                    <h5 className='my-3 fw-600 text-darkBlue'>Confirmation</h5>

                    <p className='text-muted mb-4'>
                        Are you sure you want to confirm that “ I’ve received products and services from the merchant ”
                    </p>

                    <div className='d-flex'>
                        <button className="btn text-light bg-darkBlue me-3" data-bs-dismiss='modal'>Yes, Confirm</button>
                    </div>
                
                </div>
            </div>
        </div>
    </div>

    {/* modals */}

    </>
  )
}

export default PaidFinanceQuotes
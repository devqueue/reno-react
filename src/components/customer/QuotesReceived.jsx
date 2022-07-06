import React, { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import deny from '../../assets/images/deny.png'
import quotesNull from '../../assets/images/quotesNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'

const QuotesReceived = () => {

    const [quotes, setQuotes]  = useState(true)

  return (
    <>
    {
        quotes ? (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                    <div className='panel-left'>
                        <h5 className='mb-0 fw-600'>Quotes Received</h5>
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
                    <h6 className='text-darkBlue fw-600 mb-0'>Today</h6>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small quote-card'>
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
                                <Link className='btn text-light bg-darkBlue fs-small mb-2' to='/customer/dashboard/quotesReceived/requestFinance'>Make First Payment</Link>
                                <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small quote-card'>
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
                                <Link className='btn text-light bg-darkBlue fs-small mb-2' to='/customer/dashboard/quotesReceived/requestFinance'>Make First Payment</Link>
                                <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <h6 className='text-darkBlue fw-600 mb-0'>28 May 2022</h6>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small quote-card'>
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
                                <Link className='btn text-light bg-darkBlue fs-small mb-2' to='/customer/dashboard/quotesReceived/requestFinance'>Make First Payment</Link>
                                <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <div className='d-flex justify-content-between fs-small quote-card'>
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
                                <Link className='btn text-light bg-darkBlue fs-small mb-2' to='/customer/dashboard/quotesReceived/requestFinance'>Make First Payment</Link>
                                <button className='btn close-btn fs-small' data-bs-toggle="modal" data-bs-target="#denyModal">Deny </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        ) : (
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                <div>
                    <h5 className='mb-0 fw-600'>Quotes Received</h5>
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

    <div class="modal fade" id="denyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                
                    <img src={deny} alt="" />

                    <h5 className='my-3'>Deny Quote</h5>

                    <p className='text-muted mb-4'>
                        Are you sure you want to deny this quote?<br />
                        This process can’t be undone.
                    </p>

                    <div className='d-flex'>
                        <button className="btn deny-back me-3" data-bs-dismiss='modal'>No, Go Back</button>
                        <button className="btn deny-deny" data-bs-dismiss='modal'>Yes, Deny</button>
                    </div>
                
                </div>
            </div>
        </div>
    </div>

    {/* modals */}

    </>
  )
}

export default QuotesReceived
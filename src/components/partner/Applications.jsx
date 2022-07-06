import React from 'react'
import { AiFillBell } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import filter from '../../assets/icons/filter.png'
import upload from '../../assets/icons/upload.png'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

const Applications = () => {
  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Applications</h5>
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

        <div className="d-flex table-filters mt-4">
            <input type="text" className='text-muted fs-small' placeholder='Search Name' />
            <select class="text-muted fs-small" aria-label="Default select example">
                <option selected>Category - All</option>
                <option>Category Title</option>
                <option>Category Title</option>
                <option>Category Title</option>
                <option>Category Title</option>
            </select>
            <select class="text-muted fs-small" aria-label="Default select example">
                <option selected>Agent - All</option>
                <option>Agent Title</option>
                <option>Agent Title</option>
                <option>Agent Title</option>
                <option>Agent Title</option>
            </select>
            <input type="text" className='text-muted fs-small' placeholder='Search Amount' />
            <input type="text" className='text-muted fs-small' placeholder='Search Terms' />
            <select class="text-muted fs-small" aria-label="Default select example">
                <option selected>Date</option>
                <option>Date</option>
                <option>Date</option>
                <option>Date</option>
            </select>
            <select class="text-muted fs-small" aria-label="Default select example">
                <option selected>Showing - 10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
            </select>
        </div>

        <div className="table-responsive">
            <table className="table applications-table table-striped">
                <thead>
                    <tr className='text-light fs-small bg-darkBlue'>
                        <th><div className='th-content'>Customer Name <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Category <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Sale Agent <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Amount <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Terms <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Date <img src={filter} alt="" /></div></th>
                        <th><div className='th-content'>Status</div></th>
                        <th><div className='th-content'>Action</div></th>
                    </tr>
                </thead>
                <tbody className='fs-small'>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td>
                            <span className='text-green bg-soft-success rounded py-1 px-2'>Approved</span> <br /> <span className='text-decoration-underline' style={{ cursor: 'pointer' }}> Resend Request</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-darkBlue bg-soft-darkBlue rounded py-2 px-2'>Processing</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-danger bg-soft-danger rounded py-2 px-2'>Rejected</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-light bg-color-success rounded py-2 px-2'>Paid</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#refundModal">Request Refund</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td>
                            <span className='text-green bg-soft-success rounded py-1 px-2'>Approved</span> <br /> <span className='text-decoration-underline' style={{ cursor: 'pointer' }}> Resend Request</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-darkBlue bg-soft-darkBlue rounded py-2 px-2'>Processing</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-danger bg-soft-danger rounded py-2 px-2'>Rejected</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-light bg-color-success rounded py-2 px-2'>Paid</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#refundModal">Request Refund</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td>
                            <span className='text-green bg-soft-success rounded py-1 px-2'>Approved</span> <br /> <span className='text-decoration-underline' style={{ cursor: 'pointer' }}> Resend Request</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='pt-3'>Mohammed</td>
                        <td className='pt-3'>Lighting</td>
                        <td className='pt-3'>Khalid</td>
                        <td className='pt-3'>2,500</td>
                        <td className='pt-3'>4</td>
                        <td className='pt-3'>10/06/2022</td>
                        <td className='pt-3'>
                            <span className='text-darkBlue bg-soft-darkBlue rounded py-2 px-2'>Processing</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle rounded-3 bg-darkBlue text-light fs-small" style={{ width: 'fit-content' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Action
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link class="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#invoiceModal">Submit Invoice</Link></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="d-flex align-items-center justify-content-between table-paginations-container">
                <h6 className='fs-small mb-0'>Showing 10 of 100 entries</h6>
                <div className="table-paginations">
                    <span className='me-2'><BsChevronLeft /></span>
                    <span className='me-1 active'>1</span>
                    <span className='me-1'>2</span>
                    <span className='me-1'>3</span>
                    <span className='me-1'>4</span>
                    <span className='me-1'>5</span>
                    <span className='me-1'>...</span>
                    <span>10</span>
                    <span className='ms-2'><BsChevronRight /></span>
                </div>
            </div>
        </div>

        {/* Modal */}

        <div class="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div className="w-100 d-flex justify-content-end">
                            <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                        </div>
                        <h3 className='text-center fw-600'>Submit Invoice</h3>
                        <div className="upload-field">
                            <img src={upload} alt="" />
                            <div>
                                <h5>Upload Invoice</h5>
                                <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                            </div>
                            <input type="file" />
                        </div>
                        
                        <ul>
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Category
                                <span>Solar & Battery System</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Amount
                                <span>SAR<span className='text-dark'> 1200</span></span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Deposit amount
                                <span>SAR<span className='text-dark'> 0</span></span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Financed amount
                                <span>SAR<span className='text-dark'> 0</span></span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Amount to be paid to partner
                                <span>SAR<span className='text-dark'> 1080</span></span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer name
                                <span>Mohammed</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer phone number 
                                <span>+96655332156</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer Email
                                <span>abc@gmail.com</span>
                           </li> 
                        </ul>

                        <button className="btn text-light bg-darkBlue w-100 mt-3" style={{ borderRadius: '6px', height: '47px' }}>Request Payment</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="refundModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body p-4">
                        <div className="w-100 d-flex justify-content-end">
                            <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                        </div>
                        <h3 className='text-center fw-600' style={{ color: 'red' }}>Request Refund</h3>
                        <div className="upload-field">
                            <img src={upload} alt="" />
                            <div>
                                <h5>Upload Invoice</h5>
                                <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                            </div>
                            <input type="file" />
                        </div>
                        
                        <ul>
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Category
                                <span>Solar & Battery System</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Refund amount
                                <span>SAR<span className='text-dark'> 0</span></span>
                           </li>
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer name
                                <span>Mohammed</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer phone number 
                                <span>+96655332156</span>
                           </li> 
                           <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                Customer Email
                                <span>abc@gmail.com</span>
                           </li> 
                        </ul>

                        <button className="btn text-light w-100 mt-3" style={{ borderRadius: '6px', height: '47px', backgroundColor: 'red' }}>Request Refund</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal */}

    </div>
  )
}

export default Applications
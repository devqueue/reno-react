import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillBell } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import user from '../../assets/images/user.jpg'
import widget1 from '../../assets/icons/widget1.png'
import widget2 from '../../assets/icons/widget2.png'
import widget3 from '../../assets/icons/widget3.png'
import widget4 from '../../assets/icons/widget4.png'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import logoDark from '../../assets/images/logoDark.png'
import qr from '../../assets/images/qr.png'

const Panel = () => {

  const options = {
    maintainAspectRatio: false
  }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Due or late',
      data: [2.2, 0.5, 5, 8, 1.9, 2],
      backgroundColor: '#F18056',
      borderRadius: 5
    }, {
      label: 'Not issued',
      data: [3, 2, 4, 2, 4, 6],
      backgroundColor: '#F8C22D',
      borderRadius: 5
    }, {
      label: 'Issued',
      data: [0.5, 6, 3, 2, 6, 4],
      backgroundColor: '#9A42F2',
      borderRadius: 5
    }, {
      label: 'Paid',
      data: [3, 2, 6, 6, 4, 10],
      backgroundColor: '#67D832',
      borderRadius: 5
    }]
  }

  const [tab, setTab] = useState(1)

  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Customer Portal</h5>
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


        <div className="row mt-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="widget">
              <div className='widget-text'>
                <p className="text-gray fs-small mb-0">Quotes received</p>
                <h3 className='mb-0 fw-600'>01</h3>
              </div>
              <div className="widget-icon bg-soft-warning">
                <img src={widget1} alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="widget">
              <div className='widget-text'>
                <p className="text-gray mb-1 fs-small">financed amount <span className='text-muted'>(SAR)</span></p>
                <h3 className='mb-0 fw-600'>1456</h3>
              </div>
              <div className="widget-icon bg-soft-danger">
                <img src={widget2} alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="widget">
              <div className='widget-text'>
                <p className="text-gray mb-1 fs-small">Paid amount <span className='text-muted'>(SAR)</span></p>
                <h3 className='mb-0 fw-600'>856</h3>
              </div>
              <div className="widget-icon bg-soft-success">
                <img src={widget3} alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="widget">
              <div className='widget-text'>
                <p className="text-gray mb-1 fs-small">Remaining amount <span className='text-muted'>(SAR)</span></p>
                <h3 className='mb-0 fw-600'>600</h3>
              </div>
              <div className="widget-icon bg-soft-purple">
                <img src={widget4} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="bar-chart-card">

              <div className="bar-chart-heading">
                <h5 className='fw-600'>Monthly Payments</h5>

                <select class="form-select fs-small text-muted shadow-none" aria-label="Default select example">
                  <option selected>6 Months</option>
                  <option>6 Months</option>
                  <option>6 Months</option>
                  <option>6 Months</option>
                </select>
              </div>
              
                <Bar data={data} className='bar-chart' options={options} />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">

            <div className="table-container bg-color-light">
              <div className="row">
                <div className="col-lg-4">
                  <h5 className="fw-600">Quotes Status</h5>
                </div>
                <div className="col-lg-4 text-center">
                  <button className={`btn fs-small ${tab == 1 ? 'bg-darkBlue text-light' : 'text-muted'} me-3`} onClick={() => setTab(1)}>Current</button>
                  <button className={`btn fs-small ${tab == 2 ? 'bg-darkBlue text-light' : 'text-muted'}`} onClick={() => setTab(2)}>Past</button>
                </div>
              </div>

              <div className="table-responsive mt-3">
                {
                  tab == 1 ? (
                    <table class="table border-top">
                      <thead>
                        <tr className='text-muted'>
                          <th scope="col">Reference Number</th>
                          <th scope="col">Finance Product</th>
                          <th scope="col">Purchase Total</th>
                          <th scope="col">Deposit Amount</th>
                          <th scope="col">Monthly Payment</th>
                          <th scope="col">Payment Period</th>
                          <th scope="col">Product Category</th>
                          <th scope="col">Product Detail</th>
                          <th scope="col">Quote Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>XXXXX</td>
                          <td>0% interest payment plan</td>
                          <td>000</td>
                          <td>0000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                        </tr>
                        <tr>
                          <td>XXXXX</td>
                          <td>0% interest payment plan</td>
                          <td>000</td>
                          <td>0000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                        </tr>
                        <tr>
                          <td>XXXXX</td>
                          <td>0% interest payment plan</td>
                          <td>000</td>
                          <td>0000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                          <td>000</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table class="table border-top">
                      <thead>
                        <tr className='text-muted'>
                          <th scope="col">Reference Number</th>
                          <th scope="col">Finance Product</th>
                          <th scope="col">Purchase Total</th>
                          <th scope="col">Deposit Amount</th>
                          <th scope="col">Monthly Payment</th>
                          <th scope="col">Payment Period</th>
                          <th scope="col">Product Category</th>
                          <th scope="col">Product Detail</th>
                          <th scope="col">Quote Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>134123</td>
                          <td>0% interest payment plan</td>
                          <td>123</td>
                          <td>868</td>
                          <td>86786</td>
                          <td>3536</td>
                          <td>35345</td>
                          <td>7657</td>
                          <td>4654</td>
                        </tr>
                        <tr>
                          <td>1342134</td>
                          <td>0% interest payment plan</td>
                          <td>4324</td>
                          <td>8678</td>
                          <td>867868</td>
                          <td>678</td>
                          <td>67868</td>
                          <td>678678</td>
                          <td>678</td>
                        </tr>
                        <tr>
                          <td>131324</td>
                          <td>0% interest payment plan</td>
                          <td>3255</td>
                          <td>2345</td>
                          <td>000</td>
                          <td>546365</td>
                          <td>74</td>
                          <td>6788</td>
                          <td>678768</td>
                        </tr>
                      </tbody>
                    </table>
                  )
                }
              </div>
            </div>

          </div>
        </div>
        
        
        <div className="row mt-4">
          <div className="col-12">

            <div className="table-container bg-color-light">
                
              <h5 className="fw-600">Payment Due Date</h5>

              <div className="table-responsive mt-3">
                <table class="table border-top">
                  <thead>
                    <tr className='text-muted'>
                      <th scope="col">Bill Number</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount(SAR)</th>
                      <th scope="col">Paid Amount(SAR)</th>
                      <th scope="col">Status</th>
                      <th scope="col">Show Bill</th>
                      <th scope="col">Pay Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>XXXXX</td>
                      <td>20-05-2022</td>
                      <td>584</td>
                      <td>256</td>
                      <td className='text-color-primary'>Pending</td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#invoiceModal">Show</span></td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#payModal">Pay Now</span></td>
                    </tr>
                    <tr>
                      <td>XXXXX</td>
                      <td>20-05-2022</td>
                      <td>584</td>
                      <td>256</td>
                      <td className='text-success'>Paid</td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#invoiceModal">Show</span></td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#payModal">Pay Now</span></td>
                    </tr>
                    <tr>
                      <td>XXXXX</td>
                      <td>20-05-2022</td>
                      <td>584</td>
                      <td>256</td>
                      <td className='text-color-primary'>Pending</td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#invoiceModal">Show</span></td>
                      <td><span className='text-decoration-underline table-modal-btn' data-bs-toggle="modal" data-bs-target="#payModal">Pay Now</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Modals */}

        <div class="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div className="d-flex justify-content-between">
                  <img src={logoDark} className='logo' alt="" />
                  <ul className='fs-small'>
                    <li className='mb-2'><span className='text-muted'>Date</span> 01/06/2022</li>
                    <li className='mb-2'><span className='text-muted'>Due Date</span> 01/06/2022</li>
                    <li><span className='text-muted'>Bill Month</span> June 2022</li>
                  </ul>
                </div>
                <h3 className='fw-normal'>Invoice</h3>
                <div className="d-flex justify-content-between fs-small py-2 border-top border-bottom border-dark">
                  <div>
                    <span className='text-muted'>Bill Number</span> XXXXXXX
                  </div>
                  <div>
                    <span className='text-muted'>Order Number</span> XXXX
                  </div>
                </div>

                <div className="row mt-3 border-bottom border-dark">
                  <div className="col-lg-6">
                    <div>
                      <span className='text-color-primary fs-small'>Bill From</span>
                      <h5>RENO</h5>
                      <p className='text-muted fs-small'>
                        Dammam City, <br />
                        P.O.Box : 8986, Bareed Dist.
                      </p>
                      <p className='text-muted fs-small'>
                        +923006997800
                      </p>
                      <p className='text-muted fs-small'>
                        abc@domain.com
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <span className='text-color-purple fs-small'>Bill To</span>
                      <h5>Zeshan Abid</h5>
                      <p className='text-muted fs-small'>
                        Customer <br />
                        Address here
                      </p>
                      <p className='text-muted fs-small'>
                        Customer Phone Number
                      </p>
                      <p className='text-muted fs-small'>
                        Customer Email
                      </p>
                    </div>
                  </div>
                </div>

                <ul className='mt-3 pb-2 border-bottom border-dark'>
                  <li className='d-flex justify-content-between fs-small py-3 border-bottom'>
                    <span className='text-muted'>Payment Amount</span>
                    <span><span className='text-muted'>SAR</span> 850</span>
                  </li>
                  <li className='d-flex justify-content-between fs-small py-3 border-bottom'>
                    <span className='text-muted'>Total</span>
                    <span><span className='text-muted'>SAR</span> 850</span>
                  </li>
                  <li className='d-flex justify-content-between fs-small py-3 border-bottom'>
                    <span className='text-muted'>Tax</span>
                    <span>0</span>
                  </li>
                  <li className='d-flex justify-content-between fs-small py-3'>
                    <span>Total After Tax</span>
                    <span><span className='text-muted'>SAR</span> 850</span>
                  </li>
                </ul>

                <div className="d-flex align-items-center justify-content-between">
                  <img src={qr} height='130px' alt="" />
                  <div className='qr-btns'>
                    <button className='btn bg-darkBlue text-light fs-small mb-2'>Print Invoice</button> <br />
                    <button className='btn close-btn fs-small' data-bs-dismiss="modal">Close</button>
                  </div>
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

                <h5 className='text-center'>Pay Now</h5>

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

                <button className="btn bg-darkBlue text-light mt-4 w-100" style={{ height: '50px', borderRadius: '6px' }}>Pay Now</button>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Modals */}

    </div>
  )
}

export default Panel
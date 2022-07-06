import React from 'react'
import { AiFillBell } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import quotesSearch from '../../assets/icons/quotesSearch.png'

const ManageQuotes = () => {
  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between mb-4">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Manage Quotes</h5>
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
                    <li><Link class="dropdown-item" to="#">Lorem ipsum dolor sit amet.</Link></li>
                    <li><Link class="dropdown-item" to="#">Lorem ipsum dolor sit amet.</Link></li>
                    <li><Link class="dropdown-item" to="#">Lorem ipsum dolor sit amet.</Link></li>
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

        <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
          <div className="row">

            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
              <h6 className='text-darkBlue'>Zeshan Abid</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Date</h6>
              <h6 className='text-darkBlue'>09 Jun 2022</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Time</h6>
              <h6 className='text-darkBlue'>01:41 PM</h6>
            </div>
            <div className="col-lg-3"></div>

          </div>

          <div className="row mt-3">
            <div className="col-12 table-responsive">
              <table class="table table-bordered fs-small quotes-table mb-0">
                <tbody>
                  <tr>
                    <td className='text-muted'>Months</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>Monthly Payments</td>
                    <td>5040</td>
                    <td>2580</td>
                    <td>1786.667</td>
                    <td>1410</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="quote-status text-color-primary bg-soft-orange">Sent</div>
        </div>

        <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
          <div className="row">

            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
              <h6 className='text-darkBlue'>Zeshan Abid</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Date</h6>
              <h6 className='text-darkBlue'>09 Jun 2022</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Time</h6>
              <h6 className='text-darkBlue'>01:41 PM</h6>
            </div>
            <div className="col-lg-3"></div>

          </div>

          <div className="row mt-3">
            <div className="col-12 table-responsive">
              <table class="table table-bordered fs-small quotes-table mb-0">
                <tbody>
                  <tr>
                    <td className='text-muted'>Months</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>Monthly Payments</td>
                    <td>5040</td>
                    <td>2580</td>
                    <td>1786.667</td>
                    <td>1410</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="quote-status text-blue bg-soft-primary">Approved</div>
        </div>

        <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
          <div className="row">

            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
              <h6 className='text-darkBlue'>Zeshan Abid</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Date</h6>
              <h6 className='text-darkBlue'>09 Jun 2022</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Time</h6>
              <h6 className='text-darkBlue'>01:41 PM</h6>
            </div>
            <div className="col-lg-3"></div>

          </div>

          <div className="row mt-3">
            <div className="col-12 table-responsive">
              <table class="table table-bordered fs-small quotes-table mb-0">
                <tbody>
                  <tr>
                    <td className='text-muted'>Months</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>Monthly Payments</td>
                    <td>5040</td>
                    <td>2580</td>
                    <td>1786.667</td>
                    <td>1410</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="quote-status text-danger bg-soft-danger">Rejected</div>
        </div>

        <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
          <div className="row">

            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
              <h6 className='text-darkBlue'>Zeshan Abid</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Date</h6>
              <h6 className='text-darkBlue'>09 Jun 2022</h6>
            </div>
            <div className="col-lg-3">
              <h6 className='text-muted fs-small mb-1'>Time</h6>
              <h6 className='text-darkBlue'>01:41 PM</h6>
            </div>
            <div className="col-lg-3"></div>

          </div>

          <div className="row mt-3">
            <div className="col-12 table-responsive">
              <table class="table table-bordered fs-small quotes-table mb-0">
                <tbody>
                  <tr>
                    <td className='text-muted'>Months</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>Monthly Payments</td>
                    <td>5040</td>
                    <td>2580</td>
                    <td>1786.667</td>
                    <td>1410</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="quote-status text-success bg-soft-success">Completed</div>
        </div>

    </div>
  )
}

export default ManageQuotes
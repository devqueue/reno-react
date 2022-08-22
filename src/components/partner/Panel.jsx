import React from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import partner1 from '../../assets/images/partner1.png'
import partner2 from '../../assets/images/partner2.png'
import { Link ,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Panel = () => {
  const navigate = useNavigate()

    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-merchant-token")
        sessionStorage.removeItem('reno-merchant-token');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/');
    }
    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));
  return (
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Merchant Portal</h5>
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
                            <li><Link class="dropdown-item" to="" onClick={logout}>Logout</Link></li>
                        </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
            <div className="col-lg-4 col-md-6 mb-3">
                <div className="panel-card">
                    <div className="d-flex justify-content-center">
                        <img src={partner1} alt="" />
                    </div>
                    <p className='my-4 fs-small m-auto text-muted text-center'>Create a new application to send quotes to your customers.</p>
                    <Link className="btn text-dark bg-darkBlue border" to='/partner/dashboard/panel/newApplication' >New Application</Link>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
                <div className="panel-card">
                    <div className="d-flex justify-content-center">
                        <img src={partner2} alt="" />
                    </div>
                    <p className='my-4 fs-small m-auto text-muted text-center'>Create a new application to send quotes to your customers.</p>
                    <button className="btn text-darkBlue border border-color-darkBlue ">Application Status</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Panel
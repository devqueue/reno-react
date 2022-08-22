import React , {useState , useEffect} from 'react'
import { AiFillBell } from 'react-icons/ai'
import { ThreeDots } from  'react-loader-spinner'
import user from '../../assets/images/user.jpg'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import {getAllRecentSentQuotes} from '../../api/MerchentApi'
import moment from 'moment'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import monet from 'moment'

const ManageQuotes = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [ allData , setAllData ] = useState([]);

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
          setIsFetching(true)
          const {data} = await getAllRecentSentQuotes();
          console.log("all quotes : ", data);
          if(data?.success === true){
              setAllData(data?.AllQuotes);
          }else{
              toast.error(data?.message);
          }
          setIsFetching(false)
        }
        getAllRecord();
    },[])

    // return header of table
    const returnHeader = (length) => {
      let pp = []
      for(let p = 0; p !== length; p++){
              <td>{p + 1}</td>
            pp.push(
                <td>{p + 1}</td>
            );
        }
        return pp;
    }

    // return Body of table
    const returnBody = (length , value) => {
      let pp = [
        <td></td>
      ]
      for(let p = 0; p !== length; p++){
              <td>{p + 1}</td>
            pp.push(
                <td>{value}</td>
            );
        }
        return pp;
    }

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

    const location = useLocation();
    // checking if user is signed in or not
    useEffect(() =>{
        const customerToken = JSON.parse(localStorage.getItem('reno-merchant-token'))
        const isSessionFound = sessionStorage.getItem("reno-merchant-token");
        if(!customerToken && !isSessionFound){
            navigate("/partner/auth/login");
        }
    },[location])

  return (
    <>
        {
          isFetching === true ? (
                <div style={{display : 'flex' , justifyContent: 'center' , margin: 'auto'}}>
                    <ThreeDots
                        height = "60"
                        width = "60"
                        radius = "9"
                        color = 'green'
                        ariaLabel = 'three-dots-loading'
                        wrapperStyle
                        wrapperClass
                    />
                </div>
            ) : (
              <>
                <div className='container-fluid p-4 dashboard-content'>
                <div className="panel-top d-flex align-items-center justify-content-between mb-4">
                  <div className='panel-left'>
                    <h5 className='mb-0 fw-600'>Manage Quotes</h5>
                    <p className='text-muted mb-0 text-light fs-small'>
                      {moment().format('MMMM Do YYYY')}
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
                  {
                    allData?.length > 0 && (
                        allData?.map((item) => (
                          <>
                          <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
                            <div className="row">
        
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
                                <h6 className='text-darkBlue'>{item?.CustomerIDCardNo}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Date</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.CreatedAt).format('MMM Do YY')}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Time</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.CreatedAt).format('h:mm:ss a')}</h6>
                              </div>
                              <div className="col-lg-3"></div>
        
                            </div>
                            <div className="row mt-3">
                              <div className="col-12 table-responsive">
                                <table class="table table-bordered fs-small quotes-table mb-0">
                                  <tbody>
                                    <tr>
                                      <td className='text-muted'>Months</td>
                                      {returnHeader(item?.RepaymentAmount?.totalMonths)}
                                    </tr>
                                    <tr>
                                      {returnBody(item?.RepaymentAmount?.totalMonths , item?.RepaymentAmount?.amountPerMonth )}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                              {
                                item?.isAdminMerchantApproved === true ? (
                                  <>
                                    <div className="quote-status text-color-primary bg-soft-orange">Sent</div>
                                  </>
                                ) : (
                                  <>
                                    <div className="quote-status text-color-primary bg-soft-primary">Approved</div>
                                  </>
                                )
                              }
                          </div>
                          </>
                          ))
                    )
                  }
                </div>
                </>
              )
        }
    </>
  )
}

export default ManageQuotes
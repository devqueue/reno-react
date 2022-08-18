import React , {useState , useEffect} from 'react'
import { AiFillBell } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom";
import {signInMerchant} from '../../api/MerchentApi'
import { ThreeDots } from  'react-loader-spinner'
import user from '../../assets/images/user.jpg'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import {getAllRecentSentQuotes} from '../../api/MerchentApi'
import moment from 'moment'

const ManageQuotes = () => {
    const navigate = useNavigate();
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
                  {
                    allData?.length > 0 && (
                        allData?.map((item) => (
                          <>
                          <div className="quote-card manage-quote mb-3" style={{ position: 'relative' }}>
                            <div className="row">
        
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Customer Name</h6>
                                <h6 className='text-darkBlue'>{  item?.customerAndProductDetails?.IDCardNo}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Date</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.createdAt).format('MMM Do YY')}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Time</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.createdAt).format('h:mm:ss a')}</h6>
                              </div>
                              <div className="col-lg-3"></div>
        
                            </div>
        
                            <div className="row mt-3">
                              <div className="col-12 table-responsive">
                                {/* <table class="table table-bordered fs-small quotes-table mb-0">
                                  <tbody>
                                    <tr>
                                      <td className='text-muted'>Months</td>
                                      
                                      {
                                        item?.RepaymentAmount?.totalMonths?.map((item , index) => (
                                            <td>{index + 1}</td>
                                        ))
                                      }
                                    </tr>
                                    <tr>
                                      <td className='text-muted'>Monthly Payments</td>
                                      {
                                        item?.RepaymentAmount?.totalMonths?.map((item ) => (
                                            <td>{item?.RepaymentAmount?.amountPerMonth}</td>
                                        ))
                                      }
                                    </tr>
                                  </tbody>
                                </table> */}
                              </div>
                            </div>
                              {
                                item?.isAdminMerchantApproved === false ? (
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
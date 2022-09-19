import React , {useState , useEffect} from 'react'
import { AiFillBell } from 'react-icons/ai'
import { ThreeDots } from  'react-loader-spinner'
import user from '../../assets/images/user.jpg'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import {getAllRecentSentQuotes , getAllNotificationsOfMerchant ,markNotificationsOfMerchantRead } from '../../api/MerchentApi'
import moment from 'moment'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const ManageQuotes = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [ allData , setAllData ] = useState([]);
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
          setIsFetching(true)
          const {data} = await getAllRecentSentQuotes();
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
              // if(p == 0){
              //   pp.push(
              //       <td>{1}</td>
              //   );
              // }else{
                pp.push(
                    <td>{p + 1}</td>
                );
              //}
        }
        return pp;
    }

    // return Body of table
    const returnBody = (length , value) => {
      let pp = [
        <td>{length}</td>
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
        let name = JSON.parse(localStorage.getItem('reno-merchantName'))
        if(!name){
            name = JSON.parse(sessionStorage.getItem("reno-merchantName"));
        }
        setUserName(name)

        let pic = JSON.parse(localStorage.getItem('reno-merchantPic'))
        if(!pic){
            pic = JSON.parse(sessionStorage.getItem("reno-merchantPic"));
        }
        setUserPic(pic)
    },[location])

    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-merchant-token")
        sessionStorage.removeItem('reno-merchant-token');
        localStorage.removeItem("reno-merchantId")
        sessionStorage.removeItem('reno-merchantId');
        localStorage.removeItem("reno-merchantName")
        sessionStorage.removeItem('reno-merchantName');
        localStorage.removeItem("reno-merchantPic")
        sessionStorage.removeItem('reno-merchantPic');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/');
    }
    // sleeping

    const [ allNotifications , setAllNotifications ] = useState([])
    const [ allNotificationsCount , setAllNotificationsCount ] = useState([])
    // getting all notifications
    useEffect(() =>{
      const getAllNotifications = async () => {
          const {data} = await getAllNotificationsOfMerchant()
          if(data?.success === true){
            setAllNotifications(data?.Notifications)
            let count = 0;
            data?.Notifications?.map((item) => (
              item?.isRead === false && (
                count += 1
              )
            ))
            setAllNotificationsCount(count)
          }
        }
        getAllNotifications();
    },[])
    // marking notification as read
    const readNotification = async (id) => {
      const {data} = await markNotificationsOfMerchantRead(id);
      if(data?.success === true){
          let newArr = allNotifications;
          let isFound = newArr.find(item => item._id == id);
          if(isFound){
            isFound.isRead = true
            newArr.filter(item => item._id == id ? isFound : item)
            setAllNotifications(newArr)
            setAllNotificationsCount(prev => prev - 1)
          }
        }
    }

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
                    {/* <p className='text-muted mb-0 text-light fs-small'>
                      {moment().format('MMMM Do YYYY')}
                    </p> */}
                  </div>

                  <div className='d-flex align-items-center panel-right'>
                        <div class="dropdown profile-dropdown">
                            <Link to='#' className='notification-btn' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <AiFillBell />
                                <span>{allNotificationsCount}</span>
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {
                                    allNotifications?.length > 0 ? (
                                        allNotifications?.map((item) => (
                                            item?.isRead === false ? (
                                                <li style={{backgroundColor : '#ecf0f1'}} onClick={() => readNotification(item?._id)}>
                                                    <Link class="dropdown-item" to="">
                                                        <strong>{item?.message} </strong> <br />
                                                        <span style={{ fontSize: '12px' , color : '#34495e' }}>{moment(item?.createdAt).format('MMM Do, h:mm:ss a')}</span>
                                                    </Link>
                                                </li>
                                            ) : (
                                                <li style={{backgroundColor : 'transparent'}} >
                                                <Link class="dropdown-item" to="">
                                                        <strong>{item?.message} </strong> <br />
                                                        <span className='text-muted' style={{ fontSize: '12px' }}>{moment(item?.createdAt).format('MMM Do, h:mm:ss a')}</span>
                                                </Link>
                                                </li>
                                            )
                                        ))
                                    ) : (
                                        <li style={{marginLeft : '15px'}} >Empty</li>
                                    )
                                }
                            </ul>
                        </div>

                        <div className="dropdown profile-dropdown">
                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className='d-flex align-items-center fs-small me-3'>
                                    <img src={userPic} alt="" style={{maxWidth: '50px', maxheight : '50px', borderRadius : '50%' }} />
                                        {userName}
                                                </div>
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><Link className="dropdown-item" to="/customer/dashboard/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" to="" onClick={logout}>Logout</Link></li>
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
                                <h6 className='text-muted fs-small mb-1'>Customer ID Card No.</h6>
                                <h6 className='text-darkBlue'>{item?.CustomerIDCardNo}</h6>
                                <h6 className='text-darkBlue'>Email: {item?.CustomerAndProductDetails?.email}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Date</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.CreatedAt).format('MMM Do YY')}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1'>Time</h6>
                                <h6 className='text-darkBlue'>{ moment(item?.CreatedAt).format('h:mm:ss a')}</h6>
                              </div>
                              <div className="col-lg-3">
                                <h6 className='text-muted fs-small mb-1 '>User Email</h6>
                                <h6 className='text-darkBlue mt-3'>{item?.CustomerAndProductDetails?.email}</h6>
                              </div>
        
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
                                    <div className="quote-status text-color-primary bg-soft-orange">Approved</div>
                                  </>
                                ) : (
                                  <>
                                    <div className="quote-status text-color-primary bg-soft-primary">Pending</div>
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
import React , {useEffect , useState} from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import partner1 from '../../assets/images/partner1.png'
import partner2 from '../../assets/images/partner2.png'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import moment from 'moment'
import {getAllNotificationsOfMerchant ,markNotificationsOfMerchantRead} from '../../api/MerchentApi'

const Panel = () => {
  const navigate = useNavigate()
    const [ allNotifications , setAllNotifications ] = useState([])
    const [ allNotificationsCount , setAllNotificationsCount ] = useState([])

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
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Merchant Portal</h5>
            <p className='text-muted mb-0 text-light fs-small'>
              {moment().format('MMMM Do YYYY')}
            </p>
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
                                    <Link class="dropdown-item" to={item?.redirectId}>
                                          <strong>{item?.message} </strong> <br />
                                          <span style={{ fontSize: '12px' , color : '#34495e' }}>{moment(item?.createdAt).format('MMM Do, h:mm:ss a')}</span>
                                    </Link>
                                  </li>
                              ) : (
                                <li style={{backgroundColor : 'transparent'}} >
                                  <Link class="dropdown-item" to={item?.redirectId}>
                                        <strong>{item?.message} </strong> <br />
                                        <span className='text-muted' style={{ fontSize: '12px' }}>{moment(item?.createdAt).format('MMM Do, h:mm:ss a')}</span>
                                  </Link>
                                </li>
                              )
                          ))
                      ) : (
                          <li>No Notifications Found</li>
                      )
                    }
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
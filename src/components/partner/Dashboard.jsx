import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import horizontalLine from '../../assets/images/horizontalLine.png'
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import moment from 'moment'
import {getQuotesForHomeScreen ,getAllNotificationsOfMerchant ,markNotificationsOfMerchantRead} from '../../api/MerchentApi'

const Dashboard = () => {

  const navigate = useNavigate()
  const [ allSent , setSentCount ] = useState(0);
  const [ allPending , setPendingCount ] = useState(0);
  const [ allApproved , setApprovedCount ] = useState(0);
  

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

  const [time, setTime] = useState(1)

  // getting all count
  useEffect(() => {
      const getAllRecord = async () => {
        const {data} = await getQuotesForHomeScreen();
        if(data?.success === true){
            setSentCount(data?.TotalSent)
            setPendingCount(data?.TotalPending)
            setApprovedCount(data?.TotalApproved)
        }
      }
      getAllRecord()
  },[])

  const monthly = {
    labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun', '18 jun', '21 jun', '24 jun', '27 jun', '30 jun'],
    data: [1700, 1500, 1000, 1500, 2200, 1766, 2500, 1200, 1800, 1980, 1509, 1900, 0]
  }
  
  const annual = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [1000, 1500, 2000, 1500, 1800, 1766, 2200, 1600, 2200, 1980, 2400, 1000, 0]
  }
  
  const total = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    data: [1500, 1800, 2000, 1200, 1800, 1500, 2500, 2200, 1500, 1980, 2000, 1700, 0]
  }

  const [axis, setAxis] = useState(monthly)

  // console.log(axis.labels)

  const data = () => {
    return {
        labels: axis.labels,
        datasets: [{
          data: axis.data,
          borderColor: '#F18056',
          borderWidth: 1.5,
          fill: true,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "#F18056");
            gradient.addColorStop(1, "#fff");
            return gradient;
          },
          tension: .3,
        }]
    }
  }

  const options = {
    elements: {
        point:{
            radius: 0
        }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

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
    <div className='container-fluid p-4 dashboard-content'>
        <div className="panel-top d-flex align-items-center justify-content-between">
          <div className='panel-left'>
            <h5 className='mb-0 fw-600'>Dashboard</h5>
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
                            <img src={user} alt="" />
                            Mohammed
                                        </div>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="" onClick={logout}>Logout</Link></li>
                                    </ul>
                        </div>
                    </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="dashboard-top-card">
              <h6 className='text-center mb-0'>Quotes</h6>
              <img src={horizontalLine} className='w-100' alt="" />
              <ul className='mb-0'>
                <li className='d-flex align-items-center justify-content-between py-2 border-bottom fw-600'>
                  <span className='text-muted fw-normal'>Pending</span>{allPending}
                </li>
                <li className='d-flex align-items-center justify-content-between py-2 border-bottom text-success fw-600'>
                  <span className='text-muted fw-normal'>Approved</span>{allApproved}
                </li>
                <li className='d-flex align-items-center justify-content-between py-2 fw-600'>
                  <span className='text-muted fw-normal'>Total</span>{allSent}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="dashboard-top-card">
              <h6 className='text-center mb-0'>Amount</h6>
              <img src={horizontalLine} className='w-100' alt="" />
              <ul className='mb-0'>
                <li className='d-flex align-items-center justify-content-between py-3 border-bottom fw-600'>
                  <span className='text-muted fw-normal'>Paid</span><span><span className='text-muted fw-normal'>SAR</span>00</span>
                </li>
                <li className='d-flex align-items-center justify-content-between py-3 fw-600'>
                  <span className='text-muted fw-normal'>Total</span><span><span className='text-muted fw-normal'>SAR</span> 00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="dashboard-card">
              <div className='d-flex align-items-center justify-content-between line-heading'>
                <span className='fw-600 line-heading-title'>Applications</span>
                <div className='time-btns'>
                  <span className={`border-end border-color-darkBlue ${time == 1 ? 'active' : ''}`} onClick={() => {setTime(1); setAxis(monthly)}}>Monthly</span>
                  <span className={`border-end border-color-darkBlue ${time == 2 ? 'active' : ''}`} onClick={() => {setTime(2); setAxis(annual)}}>Annual</span>
                  <span className={`${time == 3 ? 'active' : ''}`} onClick={() => {setTime(3); setAxis(total)}}>Total</span>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 mb-4">
                  <div className="donught-card d-flex align-items-center justify-content-between">
                    <div className='donught-text'>
                      <h4>{allApproved}</h4>
                      <p className='mb-0 text-muted'>
                        Total number of approved
                        applications in this period
                      </p>
                    </div>

                    <div className='donught-container' style={{ backgroundImage: 'conic-gradient(#FF6F39 0deg, #FF6F39 45deg, #CFD8DC 45deg)' }}>
                      <div className="donught-content text-muted text-center">
                        {allApproved}/{allSent}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="donught-card d-flex align-items-center justify-content-between">
                    <div className='donught-text'>
                      <h4>11,200 SAR</h4>
                      <p className='mb-0 text-muted'>
                        Total number of approved 
                        applications in this period
                      </p>
                    </div>

                    <div className='donught-container' style={{ backgroundImage: 'conic-gradient(#FF6F39 0deg, #FF6F39 180deg, #CFD8DC 180deg)' }}>
                      <div className="donught-content text-muted text-center fs-small">
                        00/ <br />
                        00
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="chart-card">
                    <Line data={data()} options={options} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

    </div>
  )
}

export default Dashboard
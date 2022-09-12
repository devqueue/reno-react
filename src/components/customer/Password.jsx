import React, { useState , useEffect } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import eye from '../../assets/icons/eye.png'
import user from '../../assets/images/user.jpg'
import { AiFillBell } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import moment from 'moment'
import {getAllNotificationsOfCustomer ,markNotificationsOfMerchantRead , checkUserPassword , updateUserPassword } from '../../api/CustomerApi'


const Password = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [isMatched, setIsMatched] = useState(false)
    const [ oldPass , setOldPass ] = useState("")
    const [ newPass , setNewPass ] = useState("")
    const [msg , setMsg ] = useState("")
    const [pass1, setPass1] = useState(false)
    const [pass2, setPass2] = useState(false)
    const navigate = useNavigate()

    const [ allNotifications , setAllNotifications ] = useState([])
    const [ allNotificationsCount , setAllNotificationsCount ] = useState([])
    // getting all notifications
    useEffect(() =>{
        const getAllNotifications = async () => {
            const {data} = await getAllNotificationsOfCustomer()
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

    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-customer-token")
        sessionStorage.removeItem('reno-customer-token');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/');
    }
    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // checking password
    const checkCustomer = async (value) => {
        if(value == ""){
            setMsg("Old Password is Required")
            setIsMatched(false)
        }else{
            const {data} = await checkUserPassword(value);
            console.log("data got : ", data)
            if(data?.success == true){
                //toast.success(data?.message)
                setIsMatched(true)
                setMsg(data?.message)
            }else{
                toast.error(data?.message)
                setMsg(data?.message)
                setIsMatched(false)
            }
        }
    }

    // updating user password
    const updateMyPassword = async () => {
        setIsFetching(true)
        const {data} = await updateUserPassword(newPass);
        if(data?.success == true){
            toast.success(data?.message)
            setIsMatched(false)
            setMsg(data?.message)
            setOldPass("")
            setNewPass("")
        }else{
            toast.error(data?.message)
            setMsg(data?.message)
            setIsMatched(false)
        }
        setIsFetching(false)
    }

    return (
        <>
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>Profile Setting</h5>
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
                                                <li><Link className="dropdown-item" to="/customer/dashboard/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" to="" onClick={logout}>Logout</Link></li>
                                            </ul>
                                </div>
                            </div>
                </div>
                <div className='py-5'>
                    <div className="container">
                        <div className="col-lg-5 col-md-6 m-auto">

                            <h3 style={{marginBottom : '35px'}}>Update Password</h3>

                            <div className="form-group mb-4">
                                <label className='form-label' >Old Password</label>
                                <span style={{color : 'crimson', fontSize : '13px', marginLeft : '10px'}} >(Please enter Your old password first.)</span>
                                <div className='pass-container'  >
                                    <input type={`${pass1 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Enter Your Old Password' onChange={(e) => setOldPass(e.target.value)} value={oldPass} onBlur={(e) => checkCustomer(e.target.value)} />
                                    <img src={eye} onClick={() => setPass1(!pass1)} className='reveal-btn' alt="" />
                                </div>
                                {
                                    isMatched == true ? (
                                        <span style={{color : '#27ae60', fontSize : '13px', marginLeft : '10px'}} >{msg}</span>
                                    ) : (
                                        <span style={{color : 'crimson', fontSize : '13px', marginLeft : '10px'}} >{msg}</span>
                                    )
                                }
                            </div>
                            <div className="form-group mb-4">
                                <label className='form-label'>New Password</label>
                                <div className='pass-container'>
                                    <input type={`${pass2 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Confirm Password' disabled={!isMatched} onChange={(e) => setNewPass(e.target.value)} value={newPass} />
                                    <img src={eye} onClick={() => setPass2(!pass2)} className='reveal-btn' alt="" />
                                </div>
                            </div>
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
                                    isMatched === true && (
                                        <Link to='' className='auth-btn text-light' onClick={updateMyPassword}>Update Now</Link>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Password
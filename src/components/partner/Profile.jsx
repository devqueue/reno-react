import React, { useState , useEffect } from 'react'
import { Link ,useNavigate , useLocation } from "react-router-dom";
import eye from '../../assets/icons/eye.png'
import user from '../../assets/images/user.jpg'
import { AiFillBell } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import moment from 'moment'
import {getAllNotificationsOfCustomer ,markNotificationsOfMerchantRead , checkUserPassword , updateUserPassword , getMerchantDetails , updateMerchantPic ,updateMerchantDetails } from '../../api/MerchentApi'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Password = () => {
    const location = useLocation()
    const [ isFetching , setIsFetching ] = useState(false)
    const [isMatched, setIsMatched] = useState(false)
    const [ oldPass , setOldPass ] = useState("")
    const [ newPass , setNewPass ] = useState("")
    const [allowUpdate, setAllowUpdate ] = useState(false)
    const [msg , setMsg ] = useState("")
    const [pass1, setPass1] = useState(false)
    const [pass2, setPass2] = useState(false)
    const navigate = useNavigate()
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");
    const [ userDetails , setUserDetails ] = useState();
    const [ userDetailsOne , setUserDetailsOne ] = useState();
    const [ uploadImage , setUploadImage ] = useState("")

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

    // getting user details
    useEffect(() => {
        const getData = async () => {
            const {data} = await getMerchantDetails();
            if(data?.success === true){
                setUserDetails(data?.User)
                setUserDetailsOne(data?.User)
            }else{
                toast.error(data?.message)
            }
        }
        getData()
    },[location])

    // updating data of user
    const updateMyData = async () => {
        setIsFetching(true)
        let isChanged = JSON.stringify(userDetailsOne) === JSON.stringify(userDetails)
        // checking if any of details is changed
        if(isChanged == false){
            const {data} = await updateMerchantDetails(userDetails);
            if(data?.success === true){
                toast.success("Profile Details Updated SuccessFully")
                localStorage.setItem("reno-merchantName", JSON.stringify(`${userDetails?.firstName} ${userDetails?.lastName}`));
            }else{
                toast.error(data?.message)
            }
        }
        // checking if passowrd is changed
        // if(newPass !== ""){
        //     await updateMyPassword()
        // }
        // checking if image is changed
        if(uploadImage !== ""){
            let formData = new FormData();
            formData.append("merchantImage", uploadImage);
            const res = await updateMerchantPic(formData)
            if(res?.data?.success === true){
                toast.success("Profile Image Updated Successfully")
                localStorage.setItem("reno-merchantPic", JSON.stringify(process.env.REACT_APP_API_SERVER_URL + "/merchantsProfilePics/" + res?.data?.UpdatedImage));
                setIsFetching(false)
                await delay(1500);
                window.location.reload();
            }else{
                toast.error(res?.data?.message)
            }
        }
        setIsFetching(false)
        await delay(1500);
        window.location.reload();
    }

    // allowing to change password
    const changeBtn = (value) => {
        if(value?.length > 0){
            setAllowUpdate(true)
        }else{
            setAllowUpdate(false)
        }
    }

    return (
        <>
            <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>Profile Setting</h5>
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
                <div className='py-5'>
                    <div className="container">
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-between mb-4" >
                                <div className="form-group mb-4 col-lg-4">
                                    <img style={{maxWidth: '100px', maxHeight : '100px', borderRadius : '50%' }} alt="user image" src={process.env.REACT_APP_API_SERVER_URL + "/merchantsProfilePics/" + userDetails?.profilePic} />
                                </div>
                                <div className="form-group mb-4 col-lg-4">
                                    {
                                        uploadImage !== "" && (
                                            <img style={{maxWidth: '100px', maxHeight : '100px', borderRadius : '50%' }} alt="user image" src={URL.createObjectURL(uploadImage)} />
                                        )
                                    }
                                </div>
                                <div className="form-group mb-4 col-lg-4">
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Update Image</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={(e) => setUploadImage(e.target.files[0])} />
                                    </Form.Group>
                                    <div className='d-flex flex-column' >
                                        {/* <Button variant="dark" style={{maxHeight: '40px', minWidth: '120px'  }} >Update Now</Button> */}
                                        {
                                            uploadImage !== "" && (
                                                <Button variant="danger" style={{maxHeight: '40px', marginTop : '15px', minWidth: '120px'  }} onClick={() => setUploadImage("")} >Remove</Button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex' >
                                {/* <div className="form-group mb-4 col-lg-5">
                                    <label className='form-label' >Your Iqama Number</label>
                                    <div className='pass-container'  >
                                        <input type="number" className='form-control px-3' onChange={(e) => setUserDetails({...userDetails, IDCardNo : e.target.value})} value={userDetails?.IDCardNo} />
                                    </div>
                                </div> */}
                                <div className="form-group mb-4 col-lg-5"  >
                                    <label className='form-label' >Your Email</label>
                                    <div className='pass-container'  >
                                        <input type="email" className='form-control px-3' disabled={true} value={userDetails?.companyEmail} />
                                    </div>
                                </div>
                                <div className="form-group mb-4 col-lg-6" style={{marginLeft: '15px' }}>
                                    <label className='form-label' >Your Phone Number</label>
                                    <div className='pass-container'  >
                                        <input type="number" className='form-control px-3' onChange={(e) => setUserDetails({...userDetails, phoneNo : e.target.value})} value={userDetails?.phoneNo} />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex' >
                                <div className="form-group mb-4 col-lg-11"   >
                                    <label className='form-label' >Your Address</label>
                                    <div className='pass-container'  >
                                        <input type="text" style={{marginLeft : '15px'}} className='form-control px-3' onChange={(e) => setUserDetails({...userDetails, address : e.target.value})} value={userDetails?.address} />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex' >
                            <div className="form-group mb-4 col-lg-5" >
                                    <label className='form-label' >Your First Name</label>
                                    <div className='pass-container'  >
                                        <input type="text" className='form-control px-3' onChange={(e) => setUserDetails({...userDetails, firstName : e.target.value})} value={userDetails?.firstName} />
                                    </div>
                                </div>
                                <div className="form-group mb-4 col-lg-6" style={{marginLeft: '15px' }}>
                                    <label className='form-label' >Your Last Name</label>
                                    <div className='pass-container'  >
                                        <input type="text" className='form-control px-3' onChange={(e) => setUserDetails({...userDetails, lastName : e.target.value})} value={userDetails?.lastName} />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className='col-lg-3' >
                                </div>
                                <div className='col-lg-4' >
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
                                            <Link to='' className='auth-btn text-light' style={{marginTop : '15px'}} onClick={updateMyData}>Update Profile</Link>
                                        )
                                    }
                                </div>
                                <div className='col-lg-2' >
                                </div>
                            </div>

                            <h5 style={{marginBottom : '15px', marginTop : '20px'}}>Update Password</h5>
                            <div className="d-flex" >
                                <div className="form-group mb-4 col-lg-5">
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
                                <div className="form-group mb-4 col-lg-6" style={{marginLeft : '15px'}}>
                                    <label className='form-label'>New Password</label>
                                    <div className='pass-container' >
                                        <input type={`${pass2 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Confirm Password' disabled={!isMatched} onChange={(e) => setNewPass(e.target.value)} value={newPass} onBlur={(e) =>changeBtn(e.target.value)} />
                                        <img src={eye} onClick={() => setPass2(!pass2)} className='reveal-btn' alt="" />
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
                                            allowUpdate === true && (
                                                <Link to='' className='auth-btn text-light' style={{marginTop : '15px'}} onClick={updateMyPassword}>Update Now</Link>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Password
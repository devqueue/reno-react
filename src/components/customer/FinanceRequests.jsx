import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { Link , useNavigate , useLocation } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import {Button} from 'react-bootstrap'
import deny from '../../assets/images/deny.png'
import quotesNull from '../../assets/images/quotesNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'
import success from '../../assets/icons/success.png'
import danger from '../../assets/icons/danger.png'
import paid from '../../assets/images/paid.png'
import { ThreeDots } from  'react-loader-spinner'
import {getAllTodayFinancialRequestSent , getAllFinancialRequestSent} from '../../api/CustomerApi'
import moment from 'moment'
import {getAllNotificationsOfCustomer ,markNotificationsOfMerchantRead , makeNewPayment } from '../../api/CustomerApi'



const FinanceRequests = () => {
    const navigate = useNavigate();
    const [ isFetching , setIsFetching ] = useState(false)
    const [ allData , setAllData ] = useState([]);
    const [ allPreviousData , setAllPreviousData ] = useState([]);
    const [ selectedId , setSelectedId] = useState("");
    const [ cardDetails , setCardDetails ] = useState({
        cardNo : "",
        name : "",
        expiryDate : "",
        cvv : ""
    });
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");
    const [isAgreed , setIsAgreed] = useState(false)

    const location = useLocation();
    // checking if user is signed in or not
    useEffect(() =>{
        const customerToken = JSON.parse(localStorage.getItem('reno-customer-token'))
        const isSessionFound = sessionStorage.getItem("reno-customer-token");
        if(!customerToken && !isSessionFound){
            navigate("/partner/auth/login");
        }
        let name = JSON.parse(localStorage.getItem('reno-customerName'))
        if(!name){
            name = JSON.parse(sessionStorage.getItem("reno-customerName"));
        }
        setUserName(name)

        let pic = JSON.parse(localStorage.getItem('reno-customerPhoto'))
        if(!pic){
            pic = JSON.parse(sessionStorage.getItem("reno-customerPhoto"));
        }
        setUserPic(pic)
    },[location])

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
            setIsFetching(true)
            const {data} = await getAllTodayFinancialRequestSent();
            console.log("responsedata?.AllQuotes : ",data?.AllQuotes)
            if(data?.success === true){
                setAllData(data?.AllQuotes);
            }

            //getting previous finance requests
            const response = await getAllFinancialRequestSent();
            if(response?.data?.success === true){
                setAllPreviousData(response?.data?.AllQuotes);
            }

            setIsFetching(false)
        }
        getAllRecord();
    },[])

    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-customer-token")
        sessionStorage.removeItem('reno-customer-token');
        localStorage.removeItem("reno-customerName")
        sessionStorage.removeItem('reno-customerName');
        localStorage.removeItem("reno-customerPhoto")
        sessionStorage.removeItem('reno-customerPhoto');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/');
    }
    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));

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

    // making payment
    const makeMyPayment = async () => {
        // if(isAgreed == false){
        //     toast.warning("You must agree with terms and conditions.")
        //     return;
        // }
        if(cardDetails?.name == "" || cardDetails?.cardNo == "" || cardDetails?.cvv == ""){
            toast.warning("Please Fill All required Fields.")
            return;
        }
        const {data} = await makeNewPayment(selectedId)
        if(data?.success == true){
            toast.success(data?.message)
            setCardDetails({
                cardNo : "",
                name : "",
                expiryDate : "",
                cvv : ""
            })
            setSelectedId("")
            await delay(2000);
            window.location.reload();
        }else{
            toast.error(data?.message)
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
                    <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>All Finance Requests Sent</h5>
                                {/* <p className='text-muted mb-0 text-light fs-small'>
                                {moment().format('MMMM Do YYYY')}
                                </p> */}
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

                        {/* today quotes */}
                        <div className="row mt-4">
                            <h6 className='text-darkBlue fw-600 mb-0'>Today</h6>
                            {
                                allData.length > 0 ? (
                                    allData?.map((item) => (
                                        <div className="col-12 mt-3" key={item?._id} >
                                            <div className='d-flex justify-content-between fs-small quote-card'>
                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Company</span>
                                                        {item?.Partner}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Phone</span>
                                                        {item?.PhoneNo}
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>Reference#</span>
                                                        78445557
                                                    </li>
                                                </ul>

                                                <img src={line} alt="" />

                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Product Category</span>
                                                        {item?.ProductCategory?.productCategory}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Financed Amount</span>
                                                        {item?.FirstInstallment?.totalPurchaseAmt} SAR
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>First Installment</span>
                                                        {item?.FirstInstallment?.depositAmt} SAR
                                                    </li>
                                                </ul>

                                                <div>
                                                    {
                                                        item?.isAdminApproved === true ? (
                                                            <div className="request-status-container" style={{marginLeft : '25px'}} >
                                                                <div className="request-status text-green bg-soft-green" style={{maxWidth: '100px' , maxHeight : '30px' , backgroundColor : 'white' , marginLeft : '30px' , display: 'flex' , alignItems : 'center' ,  marginBottom : '25px', justifyContent : 'space-between'  }} >
                                                                    Approved
                                                                    <img src={success} alt=""  style={{maxWidth: '80px' , maxHeight : '30px'  }}  />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="request-status-container"  >
                                                                <div className="request-status text-green bg-soft-green" style={{maxWidth: '100px' , maxHeight : '30px' , backgroundColor : 'white' , marginLeft : '30px' , display: 'flex' , alignItems : 'center' ,  marginBottom : '25px', justifyContent : 'space-between'  }} >
                                                                    Pending
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        item?.isAdminApproved === true && (
                                                            <Button style={{color: 'white' }} variant="success" data-bs-toggle="modal" data-bs-target="#payModal" onClick={() => setSelectedId(item?._id)} >Make payment </Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="quotes-null">
                                        <img src={quotesNull} alt="" />
                                        <h5>Sorry we couldn’t find any Recent Financial Request for now</h5>
                                        <p className='fs-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem dolor id enim a, accumsan.</p>
                                    </div>
                                )
                            }
                        </div>

                        {/* previous quotes */}
                        <div className="row mt-4">
                            <h6 className='text-darkBlue fw-600 mb-0'>Older Quotes</h6>
                            {
                                allPreviousData?.length > 0 ? (
                                    allPreviousData?.map((item) => (
                                        <div className="col-12 mt-3" key={item?._id} >
                                            <div className='d-flex justify-content-between fs-small quote-card'>
                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Company</span>
                                                        {item?.Partner}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Phone</span>
                                                        {item?.PhoneNo}
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>Reference#</span>
                                                        9878458
                                                    </li>
                                                </ul>

                                                <img src={line} alt="" />

                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Product Category</span>
                                                        {item?.ProductCategory?.productCategory}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Financed Amount</span>
                                                        {item?.FirstInstallment?.totalPurchaseAmt} SAR
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>First Installment</span>
                                                        {item?.FirstInstallment?.depositAmt} SAR
                                                    </li>
                                                </ul>

                                                <div>
                                                    {
                                                        item?.isAdminApproved === true ? (
                                                            <div className="request-status-container" style={{marginLeft : '25px'}} >
                                                                <div className="request-status text-green bg-soft-green" style={{maxWidth: '100px' , maxHeight : '30px' , backgroundColor : 'white' , marginLeft : '30px' , display: 'flex' , alignItems : 'center' ,  marginBottom : '25px', justifyContent : 'space-between'  }} >
                                                                    Approved
                                                                    <img src={success} alt=""  style={{maxWidth: '80px' , maxHeight : '30px'  }}  />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="request-status-container">
                                                                <div className="request-status text-green bg-soft-green" style={{maxWidth: '100px' , maxHeight : '30px' , backgroundColor : 'white' , marginLeft : '30px' , display: 'flex' , alignItems : 'center' ,  marginBottom : '25px', justifyContent : 'space-between'  }} >
                                                                    Pending
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        item?.isAdminApproved === true && (
                                                                <Button style={{color: 'white' }} variant="success" data-bs-toggle="modal" data-bs-target="#payModal"  >Make payment </Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="quotes-null">
                                        <img src={quotesNull} alt="" />
                                        <h5>Sorry we couldn’t found any quote for now</h5>
                                        <p className='fs-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem dolor id enim a, accumsan.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            )
        }

        {/* modals */}

        <div class="modal fade" id="paidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                    
                        <img src={paid} alt="" />

                        <h5 className='my-3 fw-600 text-darkBlue'>Paid!</h5>

                        <p className='text-muted mb-4'>
                            Are you sure you want to confirm that “ I’ve received products and services from the merchant ”
                        </p>

                        <div className='d-flex'>
                            <button className="btn text-light bg-darkBlue me-3" data-bs-dismiss='modal'>Okay</button>
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

                    <h5 className='text-center'>Make Payment </h5>

                    <div className="form-group mt-3">
                    <label className="form-label text-muted">Select a credit card type</label>
                    <select class="form-select text-muted" aria-label="Default select example">
                        <option selected>MADA</option>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </select>
                    </div>

                    <div className="form-group mt-4">
                    <label className="form-label text-muted">Credit Card Number</label>
                    <input type="number" className='form-control' placeholder='XXXX-XXXX-XXXX-XXXX' value={cardDetails?.cardNo} onChange={(e) => setCardDetails({...cardDetails , cardNo : e.target.value})} />
                    </div>

                    <div className="form-group mt-4">
                    <label className="form-label text-muted">Name of Card Holder</label>
                    <input type="text" className='form-control' placeholder='Same as on credit card' value={cardDetails?.name} onChange={(e) => setCardDetails({...cardDetails , name : e.target.value})} />
                    </div>

                    <div className="row">
                    <div className="form-group mt-4 col-lg-6">
                        <label className="form-label text-muted">Expiry Date</label>
                        <input type="text" className='form-control' placeholder='MM / YYYY' value={cardDetails?.expiryDate} onChange={(e) => setCardDetails({...cardDetails , expiryDate : e.target.value})} />
                    </div>
                    <div className="form-group mt-4 col-lg-6">
                        <label className="form-label text-muted">Security Code</label>
                        <input type="number" className='form-control' placeholder='CVV' value={cardDetails?.cvv} onChange={(e) => setCardDetails({...cardDetails , cvv : e.target.value})} />
                    </div>
                    </div>

                    {/* <div class="form-check d-flex align-items-center mt-4">
                        <input class="form-check-input pay-check me-3" style={{ border: '1.5px solid #3F3F3F', width: '25px', height: '25px', borderRadius: '30%' }} type="checkbox" value="" id="privacyPolicy" />
                        <label class="form-check-label fs-small text-muted" for="privacyPolicy">
                        I’ve read and accept the  <Link className='text-dark text-decoration-underline' to='' onClick={() => setIsAgreed(!isAgreed)} >Terms & Conditions</Link>.
                        </label>
                    </div> */}

                    <button className="btn btn-success mt-4 w-100" style={{ height: '50px', borderRadius: '6px' }}  onClick={makeMyPayment} >Pay Now</button>

                </div>
                </div>
            </div>
        </div>

        {/* modals */}

        </>
    )
}

export default FinanceRequests
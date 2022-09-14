import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import {Button} from 'react-bootstrap'
import user from '../../assets/images/user.jpg'
import deny from '../../assets/images/deny.png'
import quotesNull from '../../assets/images/quotesNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import {getTodayReceivedQuotes , getReceivedQuotesPrevious , denyAnyQuote , getAllNotificationsOfCustomer ,markNotificationsOfMerchantRead ,getSingleQuoteDetails } from '../../api/CustomerApi'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';

 
const QuotesReceived = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const navigate = useNavigate();
    const [ allData , setAllData ] = useState([]);
    const [ gotQuoteData , setGotQuoteData ] = useState({});
    const [ allPreviousData , setAllPreviousData ] = useState([]);
    const [ selectedId , setSelectedId ] = useState("");
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
            setIsFetching(true)
            const {data} = await getTodayReceivedQuotes();
            console.log("responsedata?.AllQuotes : ",data?.AllQuotes)
            if(data?.success === true){
                setAllData(data?.AllQuotes);
            }
            
            // getting previous quotes
            const response = await getReceivedQuotesPrevious();
            if(response?.data?.success === true){
                setAllPreviousData(response?.data?.AllQuotes);
            }

            setIsFetching(false)
        }
        getAllRecord();
    },[])

    // deny any previous quote
    const denyPreviousQuote = async () => {
        if(selectedId !== ""){
            const {data} = await denyAnyQuote(selectedId);
            if(data?.success === true){
                toast.success(data?.message)
                // making changes in front end
                let newArr = allPreviousData.filter(item => item._id !== selectedId);
                setAllPreviousData(newArr)
                setSelectedId("")
            }else{
                toast.error(data?.message)
            }
        }
    }

    // deny any today quote
    const denyTodayQuote = async () => {
        if(selectedId !== ""){
            let newArr = allData.filter(item => item._id !== selectedId);
            setAllData(newArr)
        }
        setSelectedId("")
    }

    // logging out
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

    const location = useLocation();
    // checking if user is signed in or not
    useEffect(() =>{
        const customerToken = JSON.parse(localStorage.getItem('reno-customer-token'))
        const isSessionFound = sessionStorage.getItem("reno-customer-token");
        if(!customerToken && !isSessionFound){
            navigate("/customer/auth/login");
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
    },[])

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

    // getting single quote details
    const getMyQuoteDetails = async (id) => {
        const {data} = await getSingleQuoteDetails(id);
        if(data?.success === true){
            setGotQuoteData(data?.Quote);
            handleShow()
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
                                <h5 className='mb-0 fw-600'>All Quotes Received</h5>
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
                                                        3654785
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
                                                    <Button className=' mb-2' variant="primary"  onClick={() => getMyQuoteDetails(item?._id)} >View Details</Button>
                                                    {
                                                        item?.isFinanceReqSent == false ? (
                                                            <Link className='btn text-light fs-small mb-2' style={{backgroundColor : '#130f40' , color : 'white'}} to={`/customer/dashboard/quotesReceived/requestFinance/${item?._id}`} >Send Finance Request</Link>
                                                        ) : (
                                                            <Button className='btn close-btn fs-small' variant="success"  > Finance Request Sent </Button>
                                                        )
                                                    }
                                                    {
                                                        item?.isFirstPaymentDone == false && (
                                                            <Button className='btn close-btn fs-small mt-2' variant="danger" data-bs-toggle="modal" data-bs-target="#denyModal1" onClick={() => setSelectedId(item?._id)} >Deny </Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{display : 'flex', justifyContent: 'center' , alignItems : 'center'}} >
                                        <img alt="no quotes found" src={quotesNull} style={{maxWidth : '200px', maxheight: '300px' }} />
                                    </div>
                                )
                            }
                        </div>

                        {/* previous quotes */}
                        <div className="row mt-4">
                            <h6 className='text-darkBlue fw-600 mb-0'>Older Quotes</h6>
                            {
                                allPreviousData?.length > 0. ? (
                                    allPreviousData?.map((item) => (
                                        <div className="col-12 mt-3" key={item?._id} >
                                            <div className='d-flex justify-content-between fs-small quote-card'>
                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Received On</span>
                                                        {moment(item?.CreatedAt).format('MMM Do YY, h:mm:ss a')}
                                                    </li>
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
                                                        885569985
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
                                                    <Button className=' mb-2' variant="primary"  onClick={() => getMyQuoteDetails(item?._id)} >View Details</Button>
                                                    {
                                                        item?.isFinanceReqSent == false ? (
                                                            <Link className='btn text-light fs-small mb-2' style={{backgroundColor : '#130f40' , color : 'white'}} to={`/customer/dashboard/quotesReceived/requestFinance/${item?._id}`} >Send Finance Request</Link>
                                                        ) : (
                                                            <Button className='btn close-btn fs-small' variant="success"  > Finance Request Sent </Button>
                                                        )
                                                    }
                                                    {
                                                        item?.isFirstPaymentDone == false && (
                                                            <Button className='btn close-btn fs-small mt-2' variant="danger" data-bs-toggle="modal" data-bs-target="#denyModal1" onClick={() => setSelectedId(item?._id)} >Deny </Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{display : 'flex', justifyContent: 'center' , alignItems : 'center'}} >
                                        <img alt="no quotes found" src={quotesNull} style={{maxWidth : '200px', maxheight: '300px' }} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            )
        }


        {/* modals */}

        <div class="modal fade" id="denyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">

                        <img src={deny} alt="" />

                        <h5 className='my-3'>Deny Quote</h5>

                        <p className='text-muted mb-4'>
                            Are you sure you want to deny this quote?<br />
                            This process can’t be undone.
                        </p>

                        <div className='d-flex'>
                            <button className="btn deny-back me-3" data-bs-dismiss='modal' onClick={() => setSelectedId("")} >No, Go Back</button>
                            <button className="btn deny-deny" data-bs-dismiss='modal' onClick={denyPreviousQuote} >Yes, Deny</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="denyModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">

                        <img src={deny} alt="" />

                        <h5 className='my-3'>Deny Quote</h5>

                        <p className='text-muted mb-4'>
                            Are you sure you want to deny this quote?<br />
                            This process can’t be undone.
                        </p>

                        <div className='d-flex'>
                            <button className="btn deny-back me-3" data-bs-dismiss='modal' onClick={() => setSelectedId("")} >No, Go Back</button>
                            <button className="btn deny-deny" data-bs-dismiss='modal' onClick={denyTodayQuote} >Yes, Deny</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

        {/*  quote details */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Quote Details</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{marginLeft : '20px' }} >
                        <div className='row col-lg-12 mb-3' >
                            <h6>Total Amount</h6>
                            <input value={gotQuoteData?.financeDetails?.totalPurchaseAmt} disabled style={{paddingLeft : '10px', minHeight : '35px' }} />
                        </div>
                        <div className='row col-lg-12 mb-3' >
                            <h6>Deposit Amount</h6>
                            <input value={gotQuoteData?.financeDetails?.depositAmt} disabled style={{paddingLeft : '10px' ,minHeight : '35px'  }} />
                        </div>
                        <div className='row col-lg-12 mb-3' >
                            <h6>Total Tenure</h6>
                            <input value={gotQuoteData?.RepaymentAmount?.totalMonths} disabled style={{paddingLeft : '10px' ,minHeight : '35px'  }} />
                        </div>
                        <div className='row col-lg-12 mb-3' >
                            <h6>Amount Per Month</h6>
                            <input value={gotQuoteData?.RepaymentAmount?.amountPerMonth} disabled style={{paddingLeft : '10px' ,minHeight : '35px'  }} />
                        </div>
                        <div className='row col-lg-12 mb-3' >
                            <h6>Total Balance Remaining</h6>
                            <input value={gotQuoteData?.financeDetails?.balanceOwning} disabled style={{paddingLeft : '10px' ,minHeight : '35px'  }} />
                        </div>
                        <div className='row col-lg-12 mb-3' >
                            <h6>Category</h6>
                            <input value={gotQuoteData?.customerAndProductDetails?.productCategory} disabled style={{paddingLeft : '10px' ,minHeight : '35px'  }} />
                        </div>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        {/* modals */}

        </>
    )
}

export default QuotesReceived
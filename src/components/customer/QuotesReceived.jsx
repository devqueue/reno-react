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
import {getTodayReceivedQuotes , getReceivedQuotesPrevious , denyAnyQuote} from '../../api/CustomerApi'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import moment from 'moment'


const QuotesReceived = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const navigate = useNavigate();
    const [ allData , setAllData ] = useState([]);
    const [ allPreviousData , setAllPreviousData ] = useState([]);
    const [ selectedId , setSelectedId ] = useState("");

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
            setIsFetching(true)
            const {data} = await getTodayReceivedQuotes();
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
    const logout = async () => {
        localStorage.removeItem("reno-customer-token")
        sessionStorage.removeItem('reno-customer-token');
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
                    <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>Quotes Received</h5>
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
                                    <li><Link class="dropdown-item" to="" onClick={logout}>Logout</Link></li>
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
                                                        XXXXXXXXX
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
                                                    <Link className='btn text-light fs-small mb-2' style={{backgroundColor : '#130f40' , color : 'white'}} to={`/customer/dashboard/quotesReceived/requestFinance/${item?._id}`} >Make First Payment</Link>
                                                    <Button className='btn close-btn fs-small' variant="danger" data-bs-toggle="modal" data-bs-target="#denyModal1" onClick={() => setSelectedId(item?._id)} >Deny </Button>
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
                                                        <span className='text-muted'>Company</span>
                                                        {item?.Partner}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Phone</span>
                                                        {item?.PhoneNo}
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>Reference#</span>
                                                        XXXXXXXXX
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
                                                    <Link className='btn text-light fs-small mb-2' style={{backgroundColor : '#130f40' , color : 'white'}} to={`/customer/dashboard/quotesReceived/requestFinance/${item?._id}`} >Make First Payment</Link>
                                                    <Button className='btn close-btn fs-small' variant="danger" data-bs-toggle="modal" data-bs-target="#denyModal" onClick={() => setSelectedId(item?._id)} >Deny </Button>
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

        {/* modals */}

        </>
    )
}

export default QuotesReceived
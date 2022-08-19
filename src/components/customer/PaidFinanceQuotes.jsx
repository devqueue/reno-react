import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import user from '../../assets/images/user.jpg'
import deny from '../../assets/images/deny.png'
import financeNull from '../../assets/images/financeNull.png'
import quotesSearch from '../../assets/icons/quotesSearch.png'
import line from '../../assets/icons/line.png'
import success from '../../assets/icons/success.png'
import danger from '../../assets/icons/danger.png'
import confirmation from '../../assets/images/confirmation.png'
import paid from '../../assets/images/paid.png'
import { ThreeDots } from  'react-loader-spinner'
import {getRecentQuotesDeliveredToACustomer , deliveryConfirmationOfAQuote} from '../../api/CustomerApi'
import {Button} from 'react-bootstrap'


const PaidFinanceQuotes = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [ allData , setAllData ] = useState([]);
    const [ itemId , setItemId ] = useState("")

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
            setIsFetching(true)
            const {data} = await getRecentQuotesDeliveredToACustomer();
            console.log("all received : ", data)
            if(data?.success === true){
                setAllData(data?.AllQuotes);
            }
            setIsFetching(false)
        }
        getAllRecord();
    },[])

    // confirming any quote delivery
    const confirmDelivery = async () => {
        setIsFetching(true)
        const {data} = await deliveryConfirmationOfAQuote(itemId);
        if(data?.success === true){
            toast.success("Order Delivery Confirmed by You SuccessFully.");
            await delay(1500)
            setIsFetching(false)
        }else{
            await delay(1500)
            setIsFetching(false)
            toast.error(data?.message);
        }
    }

    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));

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
                                <h5 className='mb-0 fw-600'>Paid Finance Quotes</h5>
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

                        {/* Paid Finance Quotes */}
                        <div className="row mt-4">
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
                                                    <div className="request-status-container">
                                                        <div className="request-status text-green bg-soft-green">
                                                            Paid
                                                            <img src={success} alt="" />
                                                        </div>
                                                    </div>
                                                    <button className='btn text-darkBlue border border-color-darkBlue finance-btn hover-bg' data-bs-toggle="modal" data-bs-target="#paidModal" onClick={() => setItemId(item?._id)} >I confirm that I’ve received products and services from the merchant</button>
                                                    </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="quotes-null">
                                        <img src={financeNull} alt="" />
                                        <h5>Sorry we couldn’t find any Recent Quotes Delivery Request for now</h5>
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

                        <div className="w-100 d-flex justify-content-end">
                            <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                        </div>
                        <img src={confirmation} alt="" />

                        <h5 className='my-3 fw-600 text-darkBlue'>Confirmation</h5>

                        <p className='text-muted mb-4'>
                            Are you sure you want to confirm that “ I’ve received products and services from the merchant ”
                        </p>

                        <div className='d-flex'>
                            <button className="btn text-light bg-darkBlue me-3" style={{backgroundColor : 'green' , color : 'white'}} data-bs-dismiss='modal' onClick={confirmDelivery} >Yes, Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* modals */}

        </>
    )
}

export default PaidFinanceQuotes
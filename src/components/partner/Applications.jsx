import React , {useEffect , useState ,useMemo } from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import { ThreeDots } from  'react-loader-spinner'
import filter from '../../assets/icons/filter.png'
import upload from '../../assets/icons/upload.png'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import {getAllRecentSentQuotes , getAllNotificationsOfMerchant ,markNotificationsOfMerchantRead } from '../../api/MerchentApi'
import { IoMdClose } from 'react-icons/io'
import moment from 'moment'
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Badge from 'react-bootstrap/Badge';


const Applications = () => {
    const navigate = useNavigate()
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");
    const [ filterData , setFilterData ] = useState({
        customerId : "",
        category : "",
        totalAmount : "",
        terms: "",
        date : ""
    })

    const [ merchantId , setMerchantId ] = useState("")

    // getting searched data
    const getFilteredResults = async () => {
        await axios.get(process.env.REACT_APP_API_SERVER_URL + `/api/v1/quotes/getAllFilteredRecords/${merchantId}?customerId=${filterData?.customerId}&category=${filterData?.category}&totalAmount=${filterData?.totalAmount}&terms=${filterData?.terms}&date=${filterData?.date}`)
        .then(function (response) {
            console.log("response : ",response);
            if(response?.data?.success === true){
                let newArr = response?.data?.AllQuotes
                let newarray = [];
                newArr?.map((event, idx) => {
                    return newarray.push([
                        `${event[0].CustomerAndProductDetails.IDCardNo} ${event[0].CustomerAndProductDetails.email}`,
                        event[0].CustomerAndProductDetails.productCategory,
                        event[0].FinanceDetails.totalPurchaseAmt,
                        event[0].RepaymentAmount.totalMonths,
                        moment(event[0].CreatedAt).format("MMM Do YY"),
                        event[0].quoteStatus,
                        event[0]._id,
                        event[0]._id,
                    ]);
                });
                setAllData(newarray);
            }else{
                setAllData([])
            }
        })
        .catch(function (error) {
            console.log("error : ", error);
        })
        .then(function () {
            // always executed
        });
        //console.log("data : ", data);
    }

    // clearing filter
    const clearFilters = async () => {
        setFilterData({
            customerId : "",
            category : "",
            totalAmount : "",
            terms: "",
            date : ""
        })
        setIsFetching(true)
        const {data} = await getAllRecentSentQuotes();
        if(data?.success === true){
            let newArr = data?.AllQuotes
            let newarray = [];
            newArr?.map((event, idx) => {
                return newarray.push([
                    event.CustomerAndProductDetails.IDCardNo,
                    event.CustomerAndProductDetails.productCategory,
                    event.FinanceDetails.totalPurchaseAmt,
                    event.RepaymentAmount.totalMonths,
                    moment(event.CreatedAt).format("MMM Do YY"),
                    event.quoteStatus,
                    event._id,
                    event._id,
                ]);
            });
            setAllData(newarray);
        }else{
            toast.error(data?.message);
        }
        setIsFetching(false)
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
        let id = JSON.parse(localStorage.getItem('reno-merchantId'))
        setMerchantId(id)
        let name = JSON.parse(localStorage.getItem('reno-merchantName'))
        if(!name){
            name = JSON.parse(sessionStorage.getItem("reno-merchantName"));
        }
        setUserName(name)

        let pic = JSON.parse(localStorage.getItem('reno-merchantPic'))
        if(!pic){
            pic = JSON.parse(sessionStorage.getItem("reno-merchantPic"));
        }
        setUserPic(process.env.REACT_APP_API_SERVER_URL + "/merchantsProfilePics/" + pic)
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

    const [ isFetching , setIsFetching ] = useState(false)
    const [ allData , setAllData ] = useState([]);

    const [invoice, setInvoice] = useState(false);
    const handleInvoiceClose = () => setInvoice(false);
    const handleInvoiceInvoice = () => setInvoice(true);

    const [refund, setRefund] = useState(false);
    const handleRefundClose = () => setRefund(false);
    const handleRefund = () => setRefund(true);

    //getting all data
    useEffect(() => {
        const getAllRecord = async () => {
            setIsFetching(true)
            const {data} = await getAllRecentSentQuotes();
            if(data?.success === true){
                let newArr = data?.AllQuotes
                let newarray = [];
                newArr?.map((event, idx) => {
                    return newarray.push([
                        `${event.CustomerAndProductDetails.IDCardNo} ${event.CustomerAndProductDetails.email}` ,
                        event.CustomerAndProductDetails.productCategory,
                        event.FinanceDetails.totalPurchaseAmt,
                        event.RepaymentAmount.totalMonths,
                        moment(event.CreatedAt).format("MMM Do YY"),
                        event.quoteStatus,
                        event._id,
                        event._id,
                    ]);
                });
                setAllData(newarray);
            }else{
                toast.error(data?.message);
            }
            setIsFetching(false)
        }
        getAllRecord();
    },[location])

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
                    <h5 className='mb-0 fw-600'>Applications</h5>
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
                                                <li><Link className="dropdown-item" to="/partner/dashboard/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" to="" onClick={logout}>Logout</Link></li>
                                            </ul>
                        </div>
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
                    <>
                    <div className="d-flex table-filters mt-4">
                        <input type="text" style={{maxWidth : "120px"}} className='text-muted fs-small' placeholder='Customer ID' value={filterData?.customerId} onChange={(e) => setFilterData({...filterData , customerId : e.target.value}) } />
                        <select className="form-select text-muted" aria-label="Default select example" onChange={(e) => setFilterData({...filterData , category : e.target.value}) } >
                            <option selected>select any category</option>
                            <option>Lighting</option>
                            <option >Cooling/Heating</option>
                            <option >Smart Home technology System</option>
                            <option >Solar & Battery System</option>
                            <option >Plumbing</option>
                            <option >Electrical </option>
                            <option >Blinds, curtains & Shutters</option>
                            <option >Flooring & Wallpaper</option>
                            <option >Garage Doors</option>
                        </select>
                        <input type="number" className='text-muted fs-small' placeholder='Enter Amount' value={filterData?.totalAmount} onChange={(e) => setFilterData({...filterData , totalAmount : e.target.value}) } />
                        <input type="number" className='text-muted fs-small' placeholder='Enter Terms' value={filterData?.terms} onChange={(e) => setFilterData({...filterData , terms : e.target.value}) } />
                        <input type="date" className='text-muted fs-small' placeholder='Enter Terms' value={filterData?.date} onChange={(e) => setFilterData({...filterData , date : e.target.value}) } />
                    </div>
                    <div style={{display : 'flex' , justifyContent: 'flex-end'}} >
                        <div style={{display : 'flex' , justifyContent: 'space-between' , minWidth : '200px'}} >
                            <Button variant="info" style={{color : 'white' , backgroundColor : '#0B0A31'}} onClick={getFilteredResults} >Search Now</Button>
                            <Button variant="info" style={{color : '#0B0A31' , backgroundColor : 'transparent' , border: 'none'}} onClick={clearFilters} >Clear</Button>
                        </div>
                    </div>

                    <div className="row" style={{minWidth : '100%' , marginTop : '25px', backgroundColor: 'transparent'}} >
                        <div className="col-12" >
                            <Grid
                                data={allData}
                                columns={[
                                    {
                                        name : "Custumer",
                                        minWidth : '150px',
                                    },
                                    {
                                        name : "Category",
                                        minWidth : '185px',
                                    },
                                    {
                                        name : "Amount",
                                        minWidth : '150px',
                                    },
                                    {
                                        name: "Terms",
                                        minWidth : '120px',
                                        formatter: (cell) =>
                                        _(
                                            <span className="badge badge-soft-secondary text-dark ">
                                            {cell}
                                            </span>
                                        ),
                                    },
                                    {
                                        name: "Date",
                                        minWidth : '150px',
                                        formatter: (cell) =>
                                        _(
                                            <span className="badge badge-soft-info text-dark ">
                                            {cell}
                                            </span>
                                        ),
                                    },
                                    {
                                        name: "Status",
                                        minWidth : '150px',
                                        formatter: (cell) =>
                                        _(
                                            <span className="badge badge-soft-info text-dark ">
                                            {cell}
                                            </span>
                                        ),
                                    },
                                    {
                                        name : "Payment status",
                                        formatter: (cell) =>
                                        _(
                                            <>
                                                <Badge bg="danger" text="light">Un Paid </Badge>
                                            </>
                                        ),
                                    },
                                    {
                                        name: "Action",
                                        minWidth : '150px',
                                        formatter: (cell) =>
                                        _(
                                            <>
                                                <Button variant="danger" size="sm" onClick={handleRefund} >View Invoice</Button>
                                            </>
                                        ),
                                    },
                                ]}
                                search={true}
                                sort={true}
                                resizable={true}
                                fixedHeader={true}
                                pagination={{ enabled: true, limit: 10 }}
                                style= {{
                                    th  : {
                                        backgroundColor : '#bdc3c7',
                                        color : '#2f3542',
                                        fontSize : '14px'
                                    },
                                    table  : {
                                        backgroundColor : 'white',
                                        minWidth : '100%'
                                    },
                                    td: {
                                            textAlign: 'center',
                                            fontSize : '14px'
                                        }
                                }}
                            />
                        </div>
                    </div>
                    </>
                )
            }


            {/* Modal */}
            <div className="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-0">
                            <div className="w-100 d-flex justify-content-end">
                                <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                            </div>
                            <h3 className='text-center fw-600'>Submit Invoice</h3>
                            <div className="upload-field">
                                <img src={upload} alt="" />
                                <div>
                                    <h5>Upload Invoice</h5>
                                    <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                                </div>
                                <input type="file" />
                            </div>
                            
                            <ul>
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Category
                                    <span>Solar & Battery System</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Amount
                                    <span>SAR<span className='text-dark'> 1200</span></span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Deposit amount
                                    <span>SAR<span className='text-dark'> 0</span></span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Financed amount
                                    <span>SAR<span className='text-dark'> 0</span></span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Amount to be paid to partner
                                    <span>SAR<span className='text-dark'> 1080</span></span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer name
                                    <span>Mohammed</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer phone number 
                                    <span>+96655332156</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer Email
                                    <span>abc@gmail.com</span>
                            </li> 
                            </ul>

                            <button className="btn text-light bg-darkBlue w-100 mt-3" style={{ borderRadius: '6px', height: '47px' }}>Request Payment</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="refundModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body p-4">
                            <div className="w-100 d-flex justify-content-end">
                                <span className='bg-soft-danger text-danger modal-close' data-bs-dismiss="modal"><IoMdClose /></span>
                            </div>
                            <h3 className='text-center fw-600' style={{ color: 'red' }}>Request Refund</h3>
                            <div className="upload-field">
                                <img src={upload} alt="" />
                                <div>
                                    <h5>Upload Invoice</h5>
                                    <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                                </div>
                                <input type="file" />
                            </div>
                            
                            <ul>
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Category
                                    <span>Solar & Battery System</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Refund amount
                                    <span>SAR<span className='text-dark'> 0</span></span>
                            </li>
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer name
                                    <span>Mohammed</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer phone number 
                                    <span>+96655332156</span>
                            </li> 
                            <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                    Customer Email
                                    <span>abc@gmail.com</span>
                            </li> 
                            </ul>

                            <button className="btn text-light w-100 mt-3" style={{ borderRadius: '6px', height: '47px', backgroundColor: 'red' }}>Request Refund</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}

            {/* Invoice modal */}
                <Modal
                    show={invoice}
                    onHide={handleInvoiceClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Your Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <h3 className='text-center fw-600'>Submit Invoice</h3>
                                <div className="upload-field">
                                    <img src={upload} alt="" />
                                    <div>
                                        <h5>Upload Invoice</h5>
                                        <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                                    </div>
                                    <input type="file" />
                                </div>
                                <ul style={{marginLeft : '-20px'}} >
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Category
                                            <span style={{marginRight : '15px'}} >Solar & Battery System</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 1200</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Deposit amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 0</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Financed amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 0</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Amount to be paid to partner
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 1080</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer name
                                            <span style={{marginRight : '15px'}} >Mohammed</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer phone number 
                                            <span style={{marginRight : '15px'}} >+96655332156</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer Email
                                            <span style={{marginRight : '15px'}} >abc@gmail.com</span>
                                    </li> 
                                </ul>

                                <button className="btn text-light bg-darkBlue w-100 mt-3" style={{ borderRadius: '6px', height: '47px' }}>Request Payment</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleInvoiceClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            {/* invoice modal end */}

            {/* Refund modal */}
                <Modal
                    show={refund}
                    onHide={handleRefundClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Refund Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <h3 className='text-center fw-600'>Submit Invoice</h3>
                                <div className="upload-field">
                                    <img src={upload} alt="" />
                                    <div>
                                        <h5>Upload Invoice</h5>
                                        <p className='text-muted fs-small mb-0'>Upload PDF file, Max size 10mb</p>
                                    </div>
                                    <input type="file" />
                                </div>
                                <ul style={{marginLeft : '-20px'}} >
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Category
                                            <span style={{marginRight : '15px'}} >Solar & Battery System</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 1200</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Deposit amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 0</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Financed amount
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 0</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Amount to be paid to partner
                                            <span style={{marginRight : '15px'}} >SAR<span className='text-dark'> 1080</span></span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer name
                                            <span style={{marginRight : '15px'}} >Mohammed</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer phone number 
                                            <span style={{marginRight : '15px'}} >+96655332156</span>
                                    </li> 
                                    <li className='d-flex align-items-center justify-content-between py-3 border-bottom fs-small text-muted'>
                                            Customer Email
                                            <span style={{marginRight : '15px'}} >abc@gmail.com</span>
                                    </li> 
                                </ul>

                                <button className="btn text-light bg-darkBlue w-100 mt-3" style={{ borderRadius: '6px', height: '47px' }}>Request Payment</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleRefundClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleRefundClose}>
                            Yes, Refund
                        </Button>
                    </Modal.Footer>
                </Modal>
            {/* Refund modal end */}

        </div>
    )
}

export default Applications
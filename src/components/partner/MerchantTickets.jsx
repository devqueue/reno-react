import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import { getAllNotificationsOfMerchant ,markNotificationsOfMerchantRead , addMerchantNewTicket , getAllTicketsOfAMerchant } from '../../api/MerchentApi'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import moment from 'moment'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const QuotesReceived = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const navigate = useNavigate();
    const [ allData , setAllData ] = useState([]);
    const [ ticketData , setTicketData ] = useState({
        title : "",
        desc : "",
    });

    //  adding new ticket
    const [addNewTicket, setAddNewTicket] = useState(false);
    const handleAddNewTicketClose = () => setAddNewTicket(false);
    const handleAddNewTicketShow = () => setAddNewTicket(true);

    //  view any ticket
    const [viewTicket, setViewTicket] = useState(false);
    const handleViewTicketClose = () => setViewTicket(false);
    const handleViewTicketShow = () => setViewTicket(true);

    //getting all data unresolved tickets
    useEffect(() => {
        const getAllData = async () => {
            setIsFetching(true)
            const {data} = await getAllTicketsOfAMerchant();
            if(data?.success === true){
                setAllData(data?.allTickets);
            }
            setIsFetching(false)
        }
        getAllData()
    },[])

    // sending new issue
    const sendMyNewIssue = async () => {
        if(ticketData?.title == "" || ticketData?.desc == ""){
            toast.warning("Title and Description are Required.");
        }else{
            setIsFetching(true)
            const {data} = await addMerchantNewTicket(ticketData);
            if(data?.success === true){
                toast.success("Issue Reported SuccessFully");
                const res = await getAllTicketsOfAMerchant();
                if(res?.data?.success === true){
                    setAllData(res?.data?.allTickets);
                }
                handleAddNewTicketClose()
            }else{
                toast.error(data?.message);
            }
            setIsFetching(false)
        }
    }

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
        localStorage.removeItem("reno-merchantId")
        sessionStorage.removeItem('reno-merchantId');
        if(!customerToken && !isSessionFound){
            navigate("/partner/auth/login");
            toast.error("Please login to Continue");
        }
    },[])

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
                    <div className='container-fluid p-4 dashboard-content' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>Customer Support</h5> 
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

                        <div className="row " >
                            <div className="col-12 d-flex justify-content-center " style={{marginTop : '20px'}} >
                                <button className="btn btn-light " style={{textDecoration : 'none' , border : '1px solid crimson' , fontWeight : 600 ,  color : 'crimson'}} onClick={handleAddNewTicketShow} >Need Help?</button>
                            </div>
                        </div>

                        {/* all Tickets */}
                        <div className="row mt-4">
                            {
                                allData.length > 0 ? (
                                    allData?.map((item) => (
                                        <div className="col-12 mt-3"  >
                                            <div className='d-flex justify-content-between fs-small quote-card'>
                                                <ul>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Title</span>
                                                        {item?.title}
                                                    </li>
                                                    <li className='mb-3'>
                                                        <span className='text-muted'>Status</span>
                                                        {item?.status == false ? (<span style={{color : 'crimson' , fontWeight : 600}} >Un Resolved</span>) : (<span style={{color : '#27ae60' , fontWeight : 600}} >Resolved</span>) }
                                                    </li>
                                                    <li>
                                                        <span className='text-muted'>Last Updated</span>
                                                        {moment(item?.updatedAt).format('MMM Do YYYY, h:mm:ss a')}
                                                    </li>
                                                </ul>
                                                <button className="btn btn-light " style={{textDecoration : 'none' , border : '1px solid #27ae60' , fontWeight : 600 ,  color : '#27ae60'}} onClick={handleViewTicketShow} >View Details</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{display : 'flex', justifyContent: 'center' , alignItems : 'center'}} >
                                        No Tickets Posted yet
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </>
            )
        }


        {/* add New Ticket */}
            <Modal
                show={addNewTicket}
                onHide={handleAddNewTicketClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Report A New Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 form-group mb-3">
                            <input type="text" className='form-control input-field' placeholder='Subject' value={ticketData?.title} onChange={(e) => setTicketData({...ticketData , title : e.target.value})} />
                        </div>
                        <div className="col-12 form-group mb-3">
                            <textarea className='form-control input-field contact-textarea' placeholder='Please write down your issue...' value={ticketData?.desc} onChange={(e) => setTicketData({...ticketData , desc : e.target.value})}></textarea>
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
                                <div className="col-12 d-flex justify-content-end">
                                    <button className='btn w-100 ' style={{fontWeight : 600 , backgroundColor : '#0B0A31' , color : 'white'}} onClick={sendMyNewIssue} >Report Now</button>
                                </div>
                            )
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleAddNewTicketClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        {/* add New Ticket */}

        {/* view Any Ticket */}
            <Modal
                show={viewTicket}
                onHide={handleViewTicketClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header >
                    <Modal.Title style={{minWidth : '100%'}}>
                        <div className='row d-flex justify-content-between' style={{minWidth : '100%'}} >
                            <div className='col-5' >
                                <h6>New Issue</h6>
                            </div>
                            <div className='col-4' >
                                <h6 style={{color : 'crimson' , fontWeight : 600}} >UnResolved</h6>
                            </div>
                            <div className='col-2' >
                                <h6 >last Updated: 26 Aug 2022</h6>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: 'calc(100vh - 210px)',overflowY: 'auto'}}>
                    <div className="row">
                        {/* Admin Response */}
                        <div className="row" style={{marginBottom : '20px'}} >
                            <div className='col-1' >
                                Reno
                            </div>
                            <div className='col-11' >
                                <span style={{fontWeight : 600 , fontSize : '12px'}} >20 Aug 2022 at 1.38.45 am</span>
                                <p style={{border: '1px solid #95a5a6', padding : '10px' , borderRadius : '10px'}} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed euismod nisi. In maximus facilisis tempor. Cras in cursus est, id feugiat mauris. Aenean sed sapien ligula. Fusce mattis, ipsum eu hendrerit sollicitudin, lectus lacus fermentum sapien, eu pretium orci est nec erat. Donec sit amet dictum magna. Ut vitae sem eu ligula consectetur volutpat vitae sit amet metus. Etiam imperdiet nec purus quis bibendum. Quisque aliquet diam aliquet lectus luctus molestie.
                                </p>
                            </div>
                        </div>
                        {/* Customer Response */}
                        <div className="row" style={{marginBottom : '20px' , }} >
                            <div className='col-11' style={{paddingLeft : '35px'}} >
                                <span style={{fontWeight : 600 , fontSize : '12px'}} >20 Aug 2022 at 1.38.45 am</span>
                                <p style={{border: '1px solid #95a5a6', padding : '10px' , borderRadius : '10px'}} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed euismod nisi. In maximus facilisis tempor. Cras in cursus est, id feugiat mauris. Aenean sed sapien ligula. Fusce mattis, ipsum eu hendrerit sollicitudin, lectus lacus fermentum sapien, eu pretium orci est nec erat. Donec sit amet dictum magna. Ut vitae sem eu ligula consectetur volutpat vitae sit amet metus. Etiam imperdiet nec purus quis bibendum. Quisque aliquet diam aliquet lectus luctus molestie.
                                </p>
                            </div>
                            <div className='col-1' >
                                <div className="d-flex flex-column justify-content-center align-content-center" >
                                    <span style={{fontWeight : 600}} >You</span>
                                    <img alt="user image" style={{maxWidth : '50px' , maxHeight : '50px' , borderRadius : '50%'}} src="https://svgsilh.com/svg_v2/659651.svg" />
                                </div>
                            </div>
                        </div>

                        <hr />
                        {/* Sending New Response */}
                        <div className="d-flex flex-column" style={{marginTop : '25px'}} >
                            <h5>Add New Response</h5>
                            <div className="col-12 form-group mb-3">
                                <textarea className='form-control input-field contact-textarea' placeholder='Please write down your issue...' value={ticketData?.desc} onChange={(e) => setTicketData({...ticketData , desc : e.target.value})}></textarea>
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
                                    <div className="col-12 d-flex justify-content-center">
                                        <button className='btn ' style={{fontWeight : 600 , backgroundColor : '#0B0A31' , color : 'white'}} onClick={sendMyNewIssue} >Send  Now</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleViewTicketClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        {/* view Any Ticket */}

        </>
    )
}

export default QuotesReceived
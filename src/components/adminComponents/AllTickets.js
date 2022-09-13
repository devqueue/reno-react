import React, { useState , useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import {getAllNotificationsOfAdmin , markNotificationsOfAdminRead , getAllTicketsForAdmin , addNewTicketResponse , getResponseOfAnyTicket ,changeStatusOfATicket } from '../../api/AdminApi'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import moment from 'moment'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';



const QuotesReceived = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [ isSending , setIsSending ] = useState(false)
    const [ isResFetching , setIsResFetching ] = useState(false)
    const [ userId , setUserId ] = useState("")
    const location = useLocation();
    const [ allResponses , setAllResponses ] = useState([]);
    const navigate = useNavigate();
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");
    const [ allData , setAllData ] = useState([]);
    const [ ticketData , setTicketData ] = useState({
        title : "",
        desc : "",
    });
    const [ responseData , setResponseData ] = useState({
        ticketId : "",
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
            const {data} = await getAllTicketsForAdmin();
            if(data?.success === true){
                setAllData(data?.allTickets);
            }
            setIsFetching(false)
        }
        getAllData()
    },[])

    // sedn new issue
    const sendMyNewIssue = async () => {
        if(ticketData?.title == "" || ticketData?.desc == ""){
            toast.warning("Title and Description are Required.");
        }else{
            toast.success("Issue Reported SuccessFully");
            handleAddNewTicketClose()
        }
    }

    // checking if user is signed in or not
    useEffect(() =>{
        const adminToken = JSON.parse(localStorage.getItem('reno-admin-token'))
        const isSessionFound = sessionStorage.getItem("reno-admin-token");
        if(!adminToken && !isSessionFound){
            navigate("/admin/login");
        }
        let name = JSON.parse(localStorage.getItem('reno-adminName'))
        if(!name){
            name = JSON.parse(sessionStorage.getItem("reno-adminName"));
        }
        setUserName(name)

        let pic = JSON.parse(localStorage.getItem('reno-adminPic'))
        if(!pic){
            pic = JSON.parse(sessionStorage.getItem("reno-adminPic"));
        }
        setUserPic(pic)
    },[location])
    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-admin-token")
        sessionStorage.removeItem('reno-admin-token');
        localStorage.removeItem("reno-adminName")
        sessionStorage.removeItem('reno-adminName');
        localStorage.removeItem("reno-adminPic")
        sessionStorage.removeItem('reno-adminPic');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/admin');
    }
    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));

    
    // checking if user is signed in or not
    useEffect(() =>{
        const customerToken = JSON.parse(localStorage.getItem('reno-admin-token'))
        const isSessionFound = sessionStorage.getItem("reno-admin-token");
        if(!customerToken && !isSessionFound){
            navigate("/customer/auth/login");
            toast.error("Please login to Continue");
        }
        let userId = JSON.parse(sessionStorage.getItem("reno-adminId"));
        if(!userId){
            userId = JSON.parse(localStorage.getItem("reno-adminId"));
        }
        setUserId(userId)
    },[])

    const [ allNotifications , setAllNotifications ] = useState([])
    const [ allNotificationsCount , setAllNotificationsCount ] = useState([])
    // getting all notifications
    useEffect(() =>{
        const getAllNotifications = async () => {
            const {data} = await getAllNotificationsOfAdmin()
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
        const {data} = await markNotificationsOfAdminRead(id);
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

    // custom toggle function
    function CustomToggle({ children, eventKey ,ticketId }) {
        // getting all responses
        const getData = useAccordionButton(eventKey, async () =>{
            setIsResFetching(true)
            const {data} = await getResponseOfAnyTicket(ticketId);
            if(data?.success === true){
                setAllResponses(data?.allResponses)
            }else{
                setAllResponses([])
            }
            setIsResFetching(false)
        }
        );

        const decoratedOnClick = useAccordionButton(eventKey, async () =>
                console.log('totally custom!' ,ticketId),
                //getData(ticketId)
        );

        return (
            <button className="btn btn-light " style={{textDecoration : 'none' , border : '1px solid #27ae60' , fontWeight : 600 ,  color : '#27ae60'}} onClick={() => {decoratedOnClick(); getData() }} >{children}</button>
        );
    }

    // sending new Response
    const sendMyResponse = async () => {
        setIsSending(true)
        const {data} = await addNewTicketResponse(responseData);
        if(data?.success === true){
            setIsResFetching(true)
            toast.success(data?.message);
            const res = await getResponseOfAnyTicket(responseData?.ticketId);
            if(res?.data?.success === true){
                setAllResponses(res?.data?.allResponses)

                // updating ticket last update time
                // let newArr = allData
                // let isFound = newArr.find(item => item?._id == responseData?.ticketId);
                // if(isFound){
                //     isFound.updatedAt = new Date();
                //     newArr.filter(item => item._id == responseData?.ticketId ? isFound : item)
                //     let myNewArr = newArr.sort(function(a, b){return new Date(b.updatedAt) - new Date(a.updatedAt)})
                //     console.log("myNewArr  ",myNewArr )
                //     setAllData(myNewArr)
                // }
            }
            setIsResFetching(false)
            setResponseData({
                ticketId : "",
                desc : "",
            })
        }else{
            toast.error(data?.message);
        }
        setIsResFetching(false)
        setIsSending(false)
    }

    // changing status of ticket
    const markStatusResolved = async (ticketId , status) => {
        const {data} = await changeStatusOfATicket(ticketId , status);
        if(data?.success === true){
            toast.success(data?.message);
            let newArr = allData;
            let isFound = newArr.find(item => item._id == ticketId);
            if(isFound){
                isFound.status = status
                let newMyArr = newArr.filter(item => item._id == ticketId ? isFound : item)
                setAllData(newMyArr)
            }
        }else{
            toast.error(data?.message);
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
                                <h5 className='mb-0 fw-600'>Support Tickets</h5> 
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

                        {/* all Tickets */}
                        <Accordion >
                                {
                                    allData.length > 0 ? (
                                        allData?.map((item, index) => (
                                            <Accordion.Item eventKey={index} style={{marginBottom : '20px'}} >
                                                <div className="col-12 d-flex justify-content-between fs-small quote-card" style={{minHeight : '100%' , padding : 'none', minWidth : '100%'}} >
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
                                                    <div className="d-flex flex-column" >
                                                        <CustomToggle eventKey={index} ticketId={item?._id} >View Details</CustomToggle>
                                                        {
                                                            item?.status == false ? (
                                                                <button className="btn btn-light " style={{textDecoration : 'none' , marginTop : '15px', fontSize : '12px', border : '1px solid #e74c3c' , fontWeight : 600 ,  color : '#e74c3c'}} onClick={() => markStatusResolved(item?._id , true)} >Mark As Resolved</button>
                                                            ) : (
                                                                <button className="btn btn-light " style={{textDecoration : 'none' , marginTop : '15px', fontSize : '12px', border : '1px solid #27ae60' , fontWeight : 600 ,  color : '#27ae60'}} onClick={() => markStatusResolved(item?._id , false)} >Mark As Un-Resolved</button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <Accordion.Body eventKey={index}>
                                                    {
                                                        isResFetching === true ? (
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
                                                            <div className="row" key={item?._id} style={{paddingTop : '30px'}} >
                                                                <div className="d-flex flex-column" style={{marginBottom : '20px'}} >
                                                                    <h6 style={{marginLeft : '15px', color : '#d35400'}} >Issue Description : </h6>
                                                                    <p style={{ padding : '10px' , borderRadius : '10px'}} >
                                                                        {item?.desc}
                                                                    </p>
                                                                </div>
                                                                <h4 style={{marginLeft : '15px', fontWeight : 600 , }} >Comments : </h4>
                                                                {
                                                                    allResponses?.length > 0 ? (
                                                                        allResponses?.map((item) => (
                                                                            <>
                                                                                <div className="d-flex flex-column" style={{marginBottom : '20px', paddingTop : '15px'}} >
                                                                                    <h6 style={{marginLeft : '15px'}} >By: &nbsp;
                                                                                        {
                                                                                            item?.MerchantName || item?.CustomerName || item?.AdminName
                                                                                        }
                                                                                        </h6>
                                                                                    <p style={{ padding : '10px' , borderRadius : '10px'}} >
                                                                                        {item?.Description}
                                                                                    </p>
                                                                                    <h6 style={{marginLeft : '15px', fontSize : '15px', color : '#636e72'}}>Posted On : <span style={{fontSize : '12px', marginLeft : '20px', color : '#2c3e50'}} >{moment(item?.createdAt).format('MMM Do YY, h:mm:ss a')}</span></h6>
                                                                                </div>
                                                                                <hr />
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <p style={{marginBottom : '25px', fontWeight : 600 , }} >No Comments Found</p>
                                                                    )
                                                                }

                                                                {/* Sending New Response */}
                                                                {
                                                                    item?.status == false ? (
                                                                        <div className="d-flex flex-column" style={{marginTop : '25px'}} >
                                                                            <h5>Add Your Response</h5>
                                                                            <div className="col-12 form-group mb-3">
                                                                                <textarea className='form-control input-field contact-textarea' placeholder='Please write down your issue...' value={responseData?.desc} onChange={(e) => setResponseData({...responseData , ticketId : item?._id ,  desc : e.target.value})}></textarea>
                                                                            </div>
                                                                            {
                                                                                isSending === true ? (
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
                                                                                        <button className='btn ' style={{fontWeight : 600 , backgroundColor : '#0B0A31' , color : 'white'}} onClick={sendMyResponse} >Send  Now</button>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    ) : (
                                                                        <p style={{fontWeight : 600}} >Issus is Marked as Resolved By You, Please mark this as Un-Resolved to start adding new responses.</p>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))
                                    ) : (
                                        <div style={{display : 'flex', justifyContent: 'center' , alignItems : 'center'}} >
                                            No Tickets Posted yet
                                        </div>
                                    )
                                }
                        </Accordion>

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
                            <div className='col-4' >
                                <h6>New Issue</h6>
                            </div>
                            <div className='col-4' >
                                <h6 style={{color : 'crimson' , marginLeft : '30px', fontWeight : 600}} >UnResolved</h6>
                                <button className="btn btn-light " style={{textDecoration : 'none' ,  fontWeight : 600 , backgroundColor: 'transparent' , color : '#27ae60' , border : 'none' }}  >Mark As Resolved</button>
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
                                <div className="d-flex flex-column justify-content-center align-content-center" style={{marginTop : '25px'}} >
                                    <span style={{fontWeight : 600 , fontSize : '12px'}} >Customer</span>
                                    <img alt="user image" style={{maxWidth : '50px' , maxHeight : '50px' , borderRadius : '50%'}} src="https://svgsilh.com/svg_v2/659651.svg" />
                                </div>
                            </div>
                            <div className='col-11' >
                                <span style={{fontWeight : 600 , fontSize : '12px'}} >20 Aug 2022 at 1.38.45 am</span>
                                <p style={{border: '1px solid #95a5a6', padding : '10px' , borderRadius : '10px'}} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed euismod nisi. In maximus facilisis tempor. Cras in cursus est, id feugiat mauris. Aenean sed sapien ligula. Fusce mattis, ipsum eu hendrerit sollicitudin, lectus lacus fermentum sapien, eu pretium orci est nec erat. Donec sit amet dictum magna. Ut vitae sem eu ligula consectetur volutpat vitae sit amet metus. Etiam imperdiet nec purus quis bibendum. Quisque aliquet diam aliquet lectus luctus molestie.
                                </p>
                            </div>
                        </div>
                        {/* Customer Response */}
                        <div className="row align-items-center" style={{marginBottom : '20px' , }} >
                            <div className='col-11' style={{paddingLeft : '35px'}} >
                                <span style={{fontWeight : 600 , fontSize : '12px'}} >20 Aug 2022 at 1.38.45 am</span>
                                <p style={{border: '1px solid #95a5a6', padding : '10px' , borderRadius : '10px'}} >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel mi ac felis aliquet finibus eu sit amet leo. Praesent sed euismod nisi. In maximus facilisis tempor. Cras in cursus est, id feugiat mauris. Aenean sed sapien ligula. Fusce mattis, ipsum eu hendrerit sollicitudin, lectus lacus fermentum sapien, eu pretium orci est nec erat. Donec sit amet dictum magna. Ut vitae sem eu ligula consectetur volutpat vitae sit amet metus. Etiam imperdiet nec purus quis bibendum. Quisque aliquet diam aliquet lectus luctus molestie.
                                </p>
                            </div>
                            <div className='col-1' style={{paddingTop : '15px'}} >
                                <span style={{fontWeight : 600 }}>You</span>
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
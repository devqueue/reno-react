import "bootstrap/dist/css/bootstrap.css";
import React , {useState , useEffect} from "react";
import { Col, Row, Table , Button } from "react-bootstrap";
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
} from "react-bs-datatable";
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'
import {getRecentFinancialRequests , approveAnyFinancialRequest } from '../../api/AdminApi'
import user from '../../assets/images/user.jpg'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate , Link , NavLink, useLocation} from 'react-router-dom'
import moment from 'moment'
import { AiFillBell } from 'react-icons/ai'
import {getAllNotificationsOfAdmin ,markNotificationsOfAdminRead} from '../../api/AdminApi'


const MainPage = () => {
    const location = useLocation()
    const [ allData , setData ] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false)
    const [ userName , setUserName ] = useState("");
    const [ userPic , setUserPic ] = useState("");

    // approving merchant request for quote
    const changeStatus = async (id , status) => {
        let isFound = allData.find(item => item.Id === id);
        if(isFound){
                isFound.isMerchantApproved = status
                let msg = ""
                if(status == false){
                    msg = "Request Denied By Reno SuccessFully"
                }else{
                    msg = "Request Approved and Sent to Merchant/Partner SuccessFully"
                }
                isFound.quoteStatus = msg;
                const {data} = await approveAnyFinancialRequest(id , status);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success(msg);
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }
    }

    const TABLE_HEADERS = [
        {
            prop: "customer",
            title: "Customer",
            cell: (prop) => {
                return (
                        <div className="d-flex flex-column" >
                            <span>{prop.customerId}</span>
                            <span>{prop.customerEmail}</span>
                        </div>
                    )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            prop: "quoteNo",
            title: "Quote No",
        },
        {
            prop: "martialStatus",
            title: "Partner"
        },
        {
            prop: "employeement",
            title: "Customer"
        },
        {
            prop: "View",
            title: "View Details",
            cell: (prop) => {
                return (
                        <NavLink activeClassName='active' className='text-darkGray fs-small' target="_blank" style={{textDecoration: 'none'}} to={`/view-finance-request/${prop.Id}`}>
                            <span>View Details</span>
                        </NavLink>
                    )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        // {
        //     prop: "martialStatus",
        //     title: "Martial Status "
        // },
        // {
        //     prop: "isWorking",
        //     title: "Employment"
        // },
        {
            prop : "_id",
            title: "Approve Request",
            name: "Actions",
            cell: (prop) => {
                return (
                        <Dropdown as={ButtonGroup}>
                            {
                                prop?.Status == false && (
                                    <Button size="sm" variant="danger" style={{fontSize : '11px' , fontWeight : 600}} >Declined</Button>
                                )
                            }
                            {
                                prop?.Status == true && (
                                    <Button size="sm" variant="success" style={{fontSize : '11px' , fontWeight : 600}} >Approved</Button>
                                )
                            }
                            <Dropdown.Toggle split size="sm" variant="primary" id="dropdown-split-basic" />
                            <Dropdown.Menu style={{backgroundColor : 'transparent'}} >
                                <Dropdown.Item onClick={() => changeStatus(prop?.Id , false)} style={{backgroundColor : '#c23616', color : 'white'}} >Declined</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeStatus(prop?.Id , true)} style={{backgroundColor : '#10ac84', color : 'white'}} >Approved</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    // getting all records
    useEffect(() => {
        const getAllRecords = async () => {
            setIsFetching(true)
            const {data} = await getRecentFinancialRequests();
            console.log("all records : ", data)
            let allDataArr = [];
            if(data?.success === true){
                for(let i = 0; i !== data?.AllQuotes.length; i++){
                    let newArr = {
                        customerId: data?.AllQuotes[i]?.ProductCategory?.IDCardNo,
                        customerEmail: data?.AllQuotes[i]?.ProductCategory?.email,
                        quoteNo: 8745885 + i,
                        //martialStatus: data?.AllQuotes[i]?.personalInfo?.martialStatus,
                        martialStatus: data?.AllQuotes[i]?.Partner,
                        Status: data?.AllQuotes[i]?.Status,
                        quoteStatus: data?.AllQuotes[i]?.quoteStatus,
                        //employeement: data?.AllQuotes[i]?.personalInfo?.workingStatus === "true" ? "Employed" : "UnEmployed",
                        employeement: data?.AllQuotes[i]?.Customer,
                        Id: data?.AllQuotes[i]?._id,
                    }
                    allDataArr.push(newArr)
                }
                setData(allDataArr)
            }
            setIsFetching(false)
        }
        getAllRecords();
    },[])

    const navigate = useNavigate()
    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));
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
        setUserPic( pic.indexOf("https") == 0 ? pic : process.env.REACT_APP_API_SERVER_URL + "/adminProfileImages/" + pic)
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
        navigate('/admin/login');
    }

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
                        <div className="container-fluid p-4 dashboard-content">
                            <div className="panel-top d-flex align-items-center justify-content-between">
                                <div className='panel-left'>
                                    <h5 className='mb-0 fw-600'>All Financial Requests</h5>
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
                                                <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" to="" onClick={logout}>Logout</Link></li>
                                            </ul>
                                    </div>
                                </div>
                            </div>
                            <Row style={{width : '100%'}} className="d-flex flex-col justify-content-center align-items-center border-top border-bottom">
                                <Col
                                    xs={24}
                                    xl={24}
                                    lg={24}
                                    className="p-4"
                                >
                                    <DatatableWrapper
                                        body={allData}
                                        headers={TABLE_HEADERS}
                                        paginationOptionsProps={{
                                            initialState: {
                                                rowsPerPage: 10,
                                                options: [5, 10, 15, 20]
                                            }
                                        }}
                                        >
                                        <Row className="mb-4 p-2">
                                            <Col
                                                xs={12}
                                                lg={4}
                                                className="d-flex flex-col justify-content-start align-items-start"
                                            >
                                                <h4></h4>
                                            </Col>
                                            <Col
                                                xs={12}
                                                sm={6}
                                                lg={4}
                                                className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                                            >
                                            </Col>
                                            <Col
                                                xs={12}
                                                sm={6}
                                                lg={4}
                                                className="d-flex flex-col justify-content-end align-items-end"
                                            >
                                                <Filter />
                                            </Col>
                                        </Row>
                                        <Table>
                                            <TableHeader />
                                            <TableBody />
                                        </Table>
                                        <Row className="mb-4 p-2">
                                            <Col
                                                xs={12}
                                                sm={6}
                                                lg={6}
                                                className="d-flex flex-col justify-content-lg-start align-items-start justify-content-sm-start mb-2 mb-sm-0"
                                            >
                                                <PaginationOptions />
                                            </Col>
                                            <Col
                                                xs={12}
                                                sm={6}
                                                lg={6}
                                                className="d-flex flex-col justify-content-end align-items-end"
                                            >
                                                <Pagination />
                                            </Col>
                                        </Row>
                                    </DatatableWrapper>
                                </Col>
                            </Row>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default MainPage;

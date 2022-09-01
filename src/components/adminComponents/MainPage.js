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
import {getAllMerchants , disApproveAnyMerchant, ApproveAnyMerchant} from '../../api/AdminApi'
import user from '../../assets/images/user.jpg'
import {useNavigate , Link} from 'react-router-dom'
import moment from 'moment'
import { AiFillBell } from 'react-icons/ai'
import {getAllNotificationsOfAdmin ,markNotificationsOfAdminRead} from '../../api/AdminApi'


const MainPage = () => {
    const [ allData , setData ] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false)

    const changeStatus = async (id) => {
        let isFound = allData.find(item => item.Id === id);
        if(isFound){
            if(isFound.status == "Pending"){
                isFound.status = "Approved"
                const {data} = await ApproveAnyMerchant(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Merchant Approved Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }else{
                isFound.status = "Pending"
                const {data} = await disApproveAnyMerchant(id);
                if(data?.success === true){
                    let newData = allData;
                    let finalData = newData.filter(item => item.Id === id ? isFound : item );
                    toast.success("Merchant DisApproved Successfully");
                    setData(finalData)
                }else{
                    toast.success(data?.message);
                }
            }
        }
    }

    const TABLE_HEADERS = [
        {
            prop: "firstName",
            title: "FirstName",
            isFilterable: true
        },
        {
            prop: "lastName",
            title: "LastName"
        },
        {
            prop: "email",
            title: "Email"
        },
        {
            prop: "companyEmail",
            title: "Company Email",
        },
        {
            prop: "category",
            title: "Category"
        },
        {
            prop: "country",
            title: "Country"
        },
        // {
        //     prop: "city",
        //     title: "City"
        // },
        {
            prop : "_id",
            title: "Change Status",
            name: "Actions",
            cell: (prop) => {
                return (
                    prop?.status === "Pending" ? (
                        <Button size="sm" variant="primary" onClick={() => changeStatus(prop?.Id)} >{prop?.status}</Button>
                    ) : (
                        <Button size="sm" variant="success" onClick={() => changeStatus(prop?.Id)} >{prop?.status}</Button>
                    )
                )
                },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


    useEffect(() => {
        const getAllRecords = async () => {
            setIsFetching(true)
            const {data} = await getAllMerchants();
            let allDataArr = [];
            if(data?.success === true){
                for(let i = 0; i !== data?.AllMerchants.length; i++){
                    let newArr = {
                        firstName: data?.AllMerchants[i]?.firstName,
                        lastName: data?.AllMerchants[i]?.lastName,
                        email: data?.AllMerchants[i]?.email,
                        companyEmail: data?.AllMerchants[i]?.companyEmail ? data?.AllMerchants[i]?.companyEmail : 'N/A',
                        category: data?.AllMerchants[i]?.category,
                        country: data?.AllMerchants[i]?.country,
                        //city: data?.AllMerchants[i]?.city,
                        status: data?.AllMerchants[i]?.status,
                        Id: data?.AllMerchants[i]?._id,
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
    // logging out
    const logout = async () => {
        localStorage.removeItem("reno-admin-token")
        sessionStorage.removeItem('reno-admin-token');
        toast.success("Signed Out SuccessFully");
        await delay(2000);
        navigate('/admin');
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
                    <div className="container-fluid p-4">
                        <div className="panel-top d-flex align-items-center justify-content-between">
                            <div className='panel-left'>
                                <h5 className='mb-0 fw-600'>All Merchants</h5>
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
                                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
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
                                            rowsPerPage: 5,
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
                )
            }
        </>
    );
}

export default MainPage;

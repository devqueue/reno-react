import React , {useEffect} from 'react'
import { AiFillBell } from 'react-icons/ai'
import user from '../../assets/images/user.jpg'
import filter from '../../assets/icons/filter.png'
import upload from '../../assets/icons/upload.png'
import { Link ,useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io'
import moment from 'moment'
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


const Applications = () => {
    const navigate = useNavigate()

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
        if(!customerToken && !isSessionFound){
            navigate("/partner/auth/login");
        }
    },[location])

    const users = [
        ["78445", "Air Conditioner" , "8000" , "4" , "17/08/22" , "Pending" ],
        ["88458", "Washing Machine" , "5000", "7" , "17/08/22" , "Rejected" , ],
        ["88458", "Room Conditioner" , "1000", "3" , "17/08/22" , "Paid" , ],
        ["88458", "Refrigerator" , "25000", "9" , "17/08/22" , "Processing" , ]
    ]

    return (
        <div className='container-fluid p-4 dashboard-content'>
            <div className="panel-top d-flex align-items-center justify-content-between">
            <div className='panel-left'>
                <h5 className='mb-0 fw-600'>Applications</h5>
                <p className='text-muted mb-0 text-light fs-small'>
                {moment().format('MMMM Do YYYY')}
                </p>
            </div>

            <div className='d-flex align-items-center panel-right'>
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

            <div className="d-flex table-filters mt-4">
                <input type="text" className='text-muted fs-small' placeholder='Search Name' />
                <select class="text-muted fs-small" aria-label="Default select example">
                    <option selected>Category - All</option>
                    <option>Category Title</option>
                    <option>Category Title</option>
                    <option>Category Title</option>
                    <option>Category Title</option>
                </select>
                <input type="text" className='text-muted fs-small' placeholder='Search Amount' />
                <input type="text" className='text-muted fs-small' placeholder='Search Terms' />
                <select className="text-muted fs-small" aria-label="Default select example">
                    <option selected>Date</option>
                    <option>Date</option>
                    <option>Date</option>
                    <option>Date</option>
                </select>
            </div>

            <div style={{display : 'flex' , justifyContent: 'flex-end'}} >
                <Button variant="info" style={{color : 'white' , backgroundColor : '#0B0A31'}} >Search Now</Button>
            </div>

            {/* new data table */}
            <div style={{minWidth : '100%' , marginTop : '25px', backgroundColor: 'transparent'}} >
                <Grid
                    data={users}
                    columns={[
                        {
                            name : "Cust. ID",
                            minWidth : '150px',
                            backgroundColor: "red",
                            color : 'pink'
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
                            name: "Action",
                            minWidth : '150px',
                            formatter: (cell) =>
                            _(
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic" drop="start">
                                            Action
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ),
                        },
                    ]}
                    search={true}
                    loading ={true}
                    sort={true}
                    resizable={true}
                    fixedHeader={true}
                    pagination={{ enabled: true, limit: 10 }}
                    style= {{
                        th  : {
                            backgroundColor : '#bdc3c7',
                            color : '#2f3542'
                        },
                        table  : {
                            backgroundColor : 'white',
                        },
                        td: {
                            textAlign: 'center'
                            }
                    }}
                />
            </div>
            {/* New data table end */}

            {/* Modal */}
            <div class="modal fade" id="invoiceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body p-0">
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

            <div class="modal fade" id="refundModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body p-4">
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

        </div>
    )
}

export default Applications
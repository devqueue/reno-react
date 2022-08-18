import React , {useState , useEffect} from 'react'
import { toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom";
import {signUpMerchant} from '../../api/MerchentApi'
import { ThreeDots } from  'react-loader-spinner'


const SignupForm = () => {
    const navigate = useNavigate();
    const [ isFetching , setIsFetching ] = useState(false)
    const [ userData , setUserDate ] = useState({
        firstName : '',
        lastName : '',
        email : '',
        phoneNo : '',
        country : '',
        city : '',
        category : '',
    })

    // sending data
    const sendData = async () => {
        setIsFetching(true)
        const {data} = await signUpMerchant(userData);
        if(data?.success === true){
            toast.success(data?.message);
            setUserDate({
                firstName : '',
                lastName : '',
                email : '',
                phoneNo : '',
                country : '',
                city : '',
                category : '',
            })
            //navigate('/partner/auth/login');
        }else{
            toast.error(data?.message);
        }
        await delay(1500);
        setIsFetching(false)
    }

    // checking if user is signed in or not
    useEffect(() =>{
        const merchantToken = JSON.parse(localStorage.getItem('reno-merchant-token'))
        if(merchantToken){
            navigate("/partner/dashboard/panel");
        }
    },[])

    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));


    document.title = 'Reno | Partner Signup'
    return (
        <div className='auth-container py-5'>
            <div className="container">
                <div className="col-lg-5 col-md-6 m-auto">
                    <div className="auth-links-container">
                        <div className="auth-links">
                            <Link to="/partner/auth/login" className='auth-link text-light' style={{textDecoration: 'none'}}>Login</Link>
                            <Link to="/partner/auth/signup" className='auth-link text-light active' style={{textDecoration: 'none'}}>Sign up</Link>
                        </div>
                    </div>

                    <h3 className='my-3'>Partner Registration</h3>

                    <div className="row">
                        <div className="form-group col-lg-6 mb-4">
                            <label className='form-label'>First Name</label>
                            <div className="auth-input-container">
                                <input type="text" className='form-control px-3' placeholder='First Name' value={userData?.firstName} onChange={(e) => setUserDate({...userData , firstName : e.target.value})} required />
                            </div>
                        </div>
                        <div className="form-group col-lg-6 mb-4">
                            <label className='form-label'>Last Name</label>
                            <div className="auth-input-container">
                                <input type="text" className='form-control px-3' placeholder='Last Name'  value={userData?.lastName} onChange={(e) => setUserDate({...userData , lastName : e.target.value})} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className='form-label'>Email Address</label>
                        <div className="auth-input-container">
                            <input type="email" className='form-control px-3' placeholder='Enter Your Email Address' value={userData?.email} onChange={(e) => setUserDate({...userData , email : e.target.value})} required />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className='form-label'>Mobile Number</label>
                        <div className="d-flex">
                            <select class="form-select shadow-none fs-small text-muted number-select me-2" aria-label="Default select example">
                                <option selected>+966</option>
                                <option>+212</option>
                            </select>
                            <div className="auth-input-container">
                                <input type="text" className='form-control px-3' placeholder='Enter Your Mobile Number' style={{ flex: '1' }} value={userData?.phoneNo} onChange={(e) => setUserDate({...userData , phoneNo : e.target.value})} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6 mb-4">
                            <label className='form-label'>Select Country</label>
                            <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example" onChange={(e) => setUserDate({...userData , country : e.target.value})}>
                                <option>Saudi Arabia</option>
                                <option >United Emirates</option>
                                <option >United States</option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6 mb-4">
                            <label className='form-label'>City</label>
                            <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example" onChange={(e) => setUserDate({...userData , city : e.target.value})}>
                                <option>New York</option>
                                <option>London</option>
                                <option>Paris</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className='form-label'> Select your Category</label>
                        <select class="form-select shadow-none fs-small text-muted number-select w-100 me-2" aria-label="Default select example" onChange={(e) => setUserDate({...userData , category : e.target.value})}>
                            <option>Air Conditioner</option>
                            <option >Room Cooler</option>
                            <option >Refrigerator</option>
                        </select>
                    </div>

                    {
                        isFetching === true ? (
                            <div style={{display : 'flex' , justifyContent: 'center'}}>
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
                            <Link to="" className='auth-btn text-light' onClick={sendData} >Continue</Link>
                        )
                    }

                    <h6 className='text-center mb-0 mt-4'>
                        <Link to='/customer/auth/signup' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Sign up as Customer</Link>
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
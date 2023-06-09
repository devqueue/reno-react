import React, { useState , useEffect } from 'react'
import Header from '../../components/Header'
import { toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom";
import {signInAdmin} from '../../api/AdminApi'
import { ThreeDots } from  'react-loader-spinner'
import eye from '../../assets/icons/eye.png'
import lock from '../../assets/images/lock.png'
import tick from '../../assets/images/tick.png'


const LoginForm = () => {
    document.title = 'Reno | Admin Login'
    const [pass1, setPass1] = useState(false)

    const navigate = useNavigate();
    const [ isFetching , setIsFetching ] = useState(false)
    const [ isRemember , setRemember ] = useState(false)
    const [ isEmailMatched , setIsEmailMatched ] = useState(true)
    const [ isPasswordMatched , setIsPasswordMatched ] = useState(true)
    const [ userData , setUserDate ] = useState({
        email : '',
        password : '',
    })

    // sending data
    const sendData = async () => {
        if(isEmailMatched == false){
            toast.error("Please Provide valid Email Address to continue.");
            return;
        }
        if(isPasswordMatched == false){
            toast.error("Password must be of 8 digits Long.");
            return;
        }
        setIsFetching(true)
        const {data} = await signInAdmin(userData);
        if(data?.success === true){
            toast.success("Admin Signed SuccessFully");
            setUserDate({
                email : '',
                password : '',
            })
            //if(isRemember === true){
                localStorage.setItem("reno-admin-token", JSON.stringify(data?.Token));
                localStorage.setItem("reno-adminId", JSON.stringify(data?.User?.Id));
                localStorage.setItem("reno-adminName", JSON.stringify(data?.User?.UserName));
                localStorage.setItem("reno-adminPic", JSON.stringify(data?.User?.ProfilePic));
            //}
            // else{
            //     sessionStorage.setItem("reno-admin-token", JSON.stringify(data?.Token));
            // }
            await delay(1500)
            setIsFetching(false)
            navigate('/admin');
        }else{
            await delay(1500)
            setIsFetching(false)
            toast.error(data?.message);
        }
    }

    // sleeping
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // checking if user is signed in or not
    useEffect(() =>{
        const adminToken = JSON.parse(localStorage.getItem('reno-admin-token'))
        const isSessionFound = sessionStorage.getItem("reno-admin-token");
        if(adminToken || isSessionFound){
            navigate("/admin/merchantsData");
        }
    },[])

    // checking email pattern
    const matchEmail = (email) => {
        if ( email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i) ) {
            setIsEmailMatched(true)
        } else {
            setIsEmailMatched(false)
        }
    }

    // checking password
    const checkPassword = (value) => {
        if ( value.match(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,30}$/i) ) {
            setIsPasswordMatched(true)
        } else {
            setIsPasswordMatched(false)
        }
    }

  return (
    <>
    <Header />
    <div className='auth-container py-5'>
        <div className="container">
            <div className="col-lg-5 col-md-6 m-auto">
                <h3 className='my-3'>Admin Sign in</h3>

                <div className="form-group mb-4">
                    <label className='form-label'>Email <span style={{color : 'white'}} >*</span></label>
                    <div className="auth-input-container">
                        <input type="email" className='form-control px-3' placeholder='Enter Your Email' value={userData?.email} onChange={(e) => setUserDate({...userData , email : e.target.value})} required onBlur={(e) => matchEmail(e.target.value)} />
                    </div>
                    {
                        isEmailMatched === false && (
                            <span style={{color : 'crimson', fontSize : '12px'}} >Please provide a valid email address.</span>
                        )
                    }
                </div>
                <div className="form-group mb-2">
                    <label className='form-label'>Password <span style={{color : 'white'}} >*</span></label>
                    <div className='pass-container'>
                        <div className="auth-input-container">
                            <input type={`${pass1 ? 'text' : 'password'}`} className='form-control px-3' placeholder='Password' value={userData?.password} onChange={(e) => setUserDate({...userData , password : e.target.value})} required onBlur={(e) => checkPassword(e.target.value)} />
                        </div>
                        <img src={eye} onClick={() => setPass1(!pass1)} className='reveal-btn' alt="" />
                    </div>
                    {
                            isPasswordMatched === false && (
                                <span style={{color : 'crimson', fontSize : '12px'}} >Password must contain minimum eight characters, at least one letter, one number and one special character.</span>
                            )
                        }
                </div>
                <h6 className='text-end mb-4'>
                </h6>
                {/* <div class="form-check d-flex align-items-center mb-4">
                    <input class="form-check-input auth-check me-3" type="checkbox" checked={true}  value="" id="remember" onClick={() => setRemember(!isRemember)} />
                    <label class="form-check-label fs-small" for="remember">
                        Remember me
                    </label>
                </div> */}

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
                            <Link to='' className='auth-btn text-light' style={{textDecoration: 'none'}} onClick={sendData}>Log in</Link>
                    )
                }

                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/partner/auth/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Merchant</Link>
                </h6>
                <h6 className='text-center mb-0 mt-4'>
                    <Link to='/customer/auth/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Customer</Link>
                </h6>
            </div>
        </div>

        {/* Modals */}

        <div class="modal fade email-modal" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-body">
                        <div className="d-flex justify-content-center w-100">
                            <img src={lock} alt="" />
                        </div>
                        <h4 className='text-dark fw-600'>Forgot Password?</h4>
                        <p className='text-dark fs-small'>
                            Please enter the email address associated with your account.
                        </p>
                        <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' />
                        <button className="btn bg-darkBlue w-100 rounded-3 text-light mb-2" data-bs-toggle="modal" data-bs-target="#resetPasswordModal">Send Reset Link</button>
                        <button className="btn bg-light border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade reset-modal" id="resetPasswordModal" tabindex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-body">
                        <div className="d-flex justify-content-center w-100">
                            <img src={tick} alt="" />
                        </div>
                        <h4 className='text-dark text-center fw-600'>Password Reset</h4>
                        <p className='text-secondary text-center mb-4 fs-small'>
                            A password reset link has been sent to your email address. Please check your email and choose a new password.
                        </p>
                        <div className="w-100 d-flex justify-content-center">
                            <button className="btn bg-darkBlue rounded-3 text-light mb-2 px-5" data-bs-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Modals */}

    </div>
    </>
  )
}

export default LoginForm
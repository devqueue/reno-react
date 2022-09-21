import React, { useState , useEffect } from 'react'
import { toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom";
import {signInMerchant} from '../../api/MerchentApi'
import { ThreeDots } from  'react-loader-spinner'
import eye from '../../assets/icons/eye.png'
import lock from '../../assets/images/lock.png'
import tick from '../../assets/images/tick.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {sendMyMerchantForgetPassword , verifyMerchantPIN, updateMerchantPassword} from '../../api/AdminApi'


const LoginForm = () => {
    const [pass1, setPass1] = useState(false)
    const [custEmail, setCustEmail] = useState("")
    const [custPin, setCustPin] = useState("")
    const [custPasswordOne, setCustPasswordOne] = useState("")
    const [custPasswordTwo, setCustPasswordTwo] = useState("")
    // sending email
    const [sendMyEmail, setSendMyEmail] = useState(false);
    const handleSendMyEmailClose = () => setSendMyEmail(false);
    const handleSendMyEmail = () => setSendMyEmail(true);

    // sending email
    const [enterPIN, setEnterPIN] = useState(false);
    const handleEnterPINClose = () => setEnterPIN(false);
    const handleEnterPIN = () => setEnterPIN(true);

    // sending new password
    const [enterPassword, setEnterPassword] = useState(false);
    const handleEnterPasswordClose = () => setEnterPassword(false);
    const handleEnterPassword = () => setEnterPassword(true);

    document.title = 'Reno | Partner Login'

    const navigate = useNavigate();
    const [ isFetching , setIsFetching ] = useState(false)
    const [ isMyFetching , setIsMyFetching ] = useState(false)
    const [ isRemember , setRemember ] = useState(false)
    const [ isEmailMatched , setIsEmailMatched ] = useState(true)
    const [ isPasswordMatched , setIsPasswordMatched ] = useState(true)
    const [ userData , setUserDate ] = useState({
        email : '',
        password : '',
    })

    // sending data
    const sendData = async () => {
        console.log("userData: ", userData)
        if(isEmailMatched == false){
            toast.error("Please Provide valid Email Address to continue.");
            return;
        }
        if(isPasswordMatched == false){
            toast.error("Password must be of 8 digits Long.");
            return;
        }
        setIsFetching(true)
        const {data} = await signInMerchant(userData);
        if(data?.success === true){
            toast.success("Signed In SuccessFully");
            setUserDate({
                email : '',
                password : '',
            })
            //if(isRemember === true){
                localStorage.setItem("reno-merchant-token", JSON.stringify(data?.Token));
                localStorage.setItem("reno-merchantId", JSON.stringify(data?.User?.Id));
                localStorage.setItem("reno-merchantName", JSON.stringify(data?.User?.UserName));
                localStorage.setItem("reno-merchantPic", JSON.stringify(data?.User?.ProfilePic));
            // }else{
            //     sessionStorage.setItem("reno-merchant-token", JSON.stringify(data?.Token));
            //     sessionStorage.setItem("reno-merchantId", JSON.stringify(data?.User?.Id));
            //     sessionStorage.setItem("reno-merchantName", JSON.stringify(data?.User?.UserName));
            //     sessionStorage.setItem("reno-merchantPic", JSON.stringify(data?.User?.ProfilePic));
            // }
            await delay(1500)
            setIsFetching(false)
            navigate('/partner/dashboard/panel');
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
        const merchantToken = JSON.parse(localStorage.getItem('reno-merchant-token'))
        const isSessionFound = sessionStorage.getItem("reno-merchant-token");
        if(merchantToken || isSessionFound){
            navigate("/partner/dashboard/panel");
        }
    },[])

    // sending customer pin for forget password
    const sendMyCustEmail = async () => {
        if(custEmail == ""){
            toast.warning("Email is Required.")
            return;
        }
        setIsMyFetching(true)
        const {data} = await sendMyMerchantForgetPassword(custEmail);
        if(data?.success === true){
            toast.success("Email Sent SuccessFully, Now please enter 4 digits PIN to reset your password which we have sent you in email.");
            handleSendMyEmailClose()
            handleEnterPIN()
        }else{
            toast.error(data?.message)
        }
        setIsMyFetching(false)
    }

    // sending PIN
    const sendPIN = async () => {
        if(custPin == ""){
            toast.warning("PIN Code is Required.")
            return;
        }
        setIsMyFetching(true)
        const {data} = await verifyMerchantPIN(custEmail , custPin);
        if(data?.success === true){
            toast.success(data?.message);
            handleSendMyEmailClose()
            handleEnterPINClose()
            handleEnterPassword()
        }else{
            toast.error(data?.message)
        }
        setIsMyFetching(false)
    }

    // sending password
    const sendMyPassword = async () => {
        if(isPasswordMatched == false){
            toast.error("Password must be of 8 digits Long.");
            return;
        }
        if(custPasswordOne == "" || custPasswordTwo == ""){
            toast.warning("Please fill Both Fields")
            return;
        }
        if(custPasswordOne !== custPasswordTwo ){
            toast.warning("Passwords Do Not Match")
            return;
        }
        setIsMyFetching(true)
        const {data} = await updateMerchantPassword(custEmail ,custPasswordOne);
        console.log("password response : ", data);
        if(data?.success === true){
            toast.success(data?.message);
            handleSendMyEmailClose()
            handleEnterPINClose()
            handleEnterPasswordClose()
        }else{
            toast.error(data?.message)
        }
        setIsMyFetching(false)
    }

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
        if ( value.match(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i) ) {
            setIsPasswordMatched(true)
        } else {
            setIsPasswordMatched(false)
        }
    }

    return (
        <div className='auth-container py-5'>
            <div className="container">
                <div className="col-lg-5 col-md-6 m-auto">
                    <div className="auth-links-container">
                        <div className="auth-links">
                            <Link to="/partner/auth/login" className='auth-link text-light active' style={{textDecoration: 'none'}}>Login</Link>
                            <Link to="/partner/auth/signup" className='auth-link text-light' style={{textDecoration: 'none'}}>Sign up</Link>
                        </div>
                    </div>

                    <h3 className='my-3'>Partner Login</h3>

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
                        <Link to='#' className='text-light fw-light' onClick={handleSendMyEmail}>Forgot Password?</Link>
                    </h6>
                    {/* <div className="form-check d-flex align-items-center mb-2">
                        <input className="form-check-input auth-check me-3" type="checkbox"  value="" id="remember" onClick={() => setRemember(!isRemember)} />
                        <label className="form-check-label fs-small" for="remember">
                            Remember me
                        </label>
                    </div> */}
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
                            <Link to='' className='auth-btn text-light' style={{textDecoration: 'none'}} onClick={sendData}>Log in</Link>
                        )
                    }

                    <h6 className='text-center mb-0 mt-4'>
                        <Link to='/customer/auth/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Customer</Link>
                    </h6>
                    <h6 className='text-center mb-0 mt-4'>
                        <Link to='/admin/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Reno Admin</Link>
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

            {/* getting email from user */}
                <Modal
                    show={sendMyEmail}
                    onHide={handleSendMyEmailClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className='text-dark fw-600'>Forgot Password?</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-dialog modal-dialog-centered"  style={{border: '2px solid white' ,  marginTop : '-10px', marginBottom : '0px'}} >
                            <div className="modal-content p-3">
                                <div className="modal-body">
                                    <div className="d-flex justify-content-center max-w-100" style={{maxHeight : '200px'}} >
                                        <img src={lock} alt="" style={{maxheight : '200px' , objectFit: 'contain'}} />
                                    </div>
                                    <p className='text-dark fs-small' >
                                        Please enter the email address associated with your account.
                                    </p>
                                    <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' style={{marginBottom : '15px'}} value={custEmail} onChange={(e) => setCustEmail(e.target.value)} />
                                    {
                                        isMyFetching === true ? (
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
                                                <button className="btn btn-success bg-darkBlue w-100 rounded-3 text-light mb-2" onClick={() => sendMyCustEmail()} >Send me PIN</button>
                                                <button className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue " onClick={handleSendMyEmailClose}>Cancel</button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* getting PIN Code from user */}
                <Modal
                    show={enterPIN}
                    onHide={handleEnterPINClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className='text-dark fw-600'>Enter PIN</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-dialog modal-dialog-centered"  style={{border: '2px solid white' ,  marginTop : '-10px', marginBottom : '0px'}} >
                            <div className="modal-content p-3">
                                <div className="modal-body">
                                    {/* <div className="d-flex justify-content-center max-w-100" style={{maxHeight : '200px'}} >
                                        <img src={lock} alt="" style={{maxheight : '200px' , objectFit: 'contain'}} />
                                    </div> */}
                                    <p className='text-dark fs-small' >
                                        Please enter the PIN code we have sent to you.
                                    </p>
                                    <input type="number" className='form-control fs-small text-dark' placeholder='Enter email here' style={{marginBottom : '15px'}} value={custPin} onChange={(e) => setCustPin(e.target.value)} />
                                    {
                                        isMyFetching === true ? (
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
                                                <button className="btn btn-success bg-darkBlue w-100 rounded-3 text-light mb-2" onClick={sendPIN}>Submit Now</button>
                                                <button className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue " onClick={handleEnterPINClose}>Cancel</button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* sending new password */}
                <Modal
                    show={enterPassword}
                    onHide={handleEnterPasswordClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className='text-dark fw-600'>Re-set Password</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-dialog modal-dialog-centered"  style={{border: '2px solid white' ,  marginTop : '-10px', marginBottom : '0px'}} >
                            <div className="modal-content p-3">
                                <div className="modal-body">
                                    {/* <div className="d-flex justify-content-center max-w-100" style={{maxHeight : '200px'}} >
                                        <img src={lock} alt="" style={{maxheight : '200px' , objectFit: 'contain'}} />
                                    </div> */}
                                    <p className='text-dark fs-small' >
                                        Please enter your New Password.
                                    </p>
                                    <h6>Enter New Password : </h6>
                                    <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' style={{marginBottom : '15px'}} value={custPasswordOne} onChange={(e) => setCustPasswordOne(e.target.value)} />
                                    <h6>Re-Enter Password : </h6>
                                    <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' style={{marginBottom : '15px'}} value={custPasswordTwo} onChange={(e) => setCustPasswordTwo(e.target.value)} />
                                    {
                                        isMyFetching === true ? (
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
                                            <button className="btn btn-success bg-darkBlue w-100 rounded-3 text-light mb-2" onClick={sendMyPassword}>Reset Now</button>
                                            <button className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue " onClick={handleEnterPasswordClose}>Cancel</button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            {/* Modals */}

        </div>
    )
}

export default LoginForm
import React, { useState , useEffect } from 'react'
import { toast } from 'react-toastify';
import { Link , useNavigate } from "react-router-dom";
import {signInCustomer} from '../../api/CustomerApi'
import {sendMyCustomerForgetPassword , verifyCustomerPIN, updateCustomerPassword} from '../../api/AdminApi'
import {signInCustomerWithCode} from '../../api/CustomerApi'
import { ThreeDots } from  'react-loader-spinner'
import eye from '../../assets/icons/eye.png'
import lock from '../../assets/images/lock.png'
import tick from '../../assets/images/tick.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
        code : '',
    })

    // sending data
    const sendData = async () => {
        setIsFetching(true)
        const {data} = await signInCustomerWithCode(userData);
        if(data?.success === true){
            toast.success("Signed In SuccessFully");
            setUserDate({
                code : '',
            })
            //if(isRemember === true){
                localStorage.setItem("reno-customer-token", JSON.stringify(data?.Token));
                localStorage.setItem("reno-customerName", JSON.stringify(data?.User?.IdCardNo));
                localStorage.setItem("reno-customerPhoto", JSON.stringify(data?.User?.ProfilePic));
                localStorage.setItem("reno-customerId", JSON.stringify(data?.User?.Id));
            // }else{
            //     sessionStorage.setItem("reno-customer-token", JSON.stringify(data?.Token));
            //     sessionStorage.setItem("reno-customerId", JSON.stringify(data?.User?.Id));
            //     sessionStorage.setItem("reno-customerName", JSON.stringify(data?.User?.IdCardNo));
            //     sessionStorage.setItem("reno-customerPhoto", JSON.stringify(data?.User?.ProfilePic));
            // }
            await delay(1500)
            setIsFetching(false)
            navigate('/customer/dashboard/panel');
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
        const customerToken = JSON.parse(localStorage.getItem('reno-customer-token'))
        const isSessionFound = sessionStorage.getItem("reno-customer-token");
        if(customerToken || isSessionFound){
            navigate("/customer/dashboard/panel");
        }
    },[])

    // sending customer pin for forget password
    const sendMyCustEmail = async () => {
        if(custEmail == ""){
            toast.warning("Email is Required.")
            return;
        }
        setIsMyFetching(true)
        const {data} = await sendMyCustomerForgetPassword(custEmail);
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
        const {data} = await verifyCustomerPIN(custEmail , custPin);
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
        const {data} = await updateCustomerPassword(custEmail ,custPasswordOne);
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


    return (
        <div className='auth-container py-5'>
            <div className="container">
                <div className="col-lg-5 col-md-6 m-auto">
                    <div className="auth-links-container" style={{marginBottom : '70px'}}>
                        <div className="auth-links">
                            <Link to="/customer/auth/login" className='auth-link text-light active' style={{textDecoration: 'none'}}>Login</Link>
                            <Link to="/customer/auth/signup" className='auth-link text-light' style={{textDecoration: 'none'}}>Sign up</Link>
                        </div>
                    </div>

                    <h3 className='my-3' >Customer Login with 4 Digits Code</h3>
                    <span style={{marginLeft: "30%"}} >(Develeopment Only)</span>
                    <div className="form-group mb-2" >
                        <label className='form-label'>Code <span style={{color : 'white'}} >*</span></label>
                        <div className='pass-container'>
                            <div className="auth-input-container">
                                <input type="number" maxlength="4" className='form-control px-3' placeholder='Please enter your 4 digits Code...' value={userData?.code} onChange={(e) => setUserDate({...userData , code : e.target.value})} required  />
                            </div>
                        </div>
                    </div>
                    {/* <h6 className='text-end mb-4'>
                        <Link to='#' className='text-light fw-light'onClick={handleSendMyEmail}>Forgot Password?</Link>
                    </h6> */}
                    {/* <div class="form-check d-flex align-items-center mb-4">
                        <input class="form-check-input auth-check me-3" type="checkbox" value="" id="remember" onClick={() => setRemember(!isRemember)} />
                        <label class="form-check-label fs-small" for="remember">
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
                            <Link to='' className='auth-btn text-light' style={{textDecoration: 'none', marginTop : '80px'}} onClick={sendData}>Log in</Link>
                        )
                    }

                    <h6 className='text-center mb-0 mt-4'>
                        <Link to='/partner/auth/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Merchant</Link>
                    </h6>
                    <h6 className='text-center mb-0 mt-4'>
                        <Link to='/admin/login' className='text-light fs-small fw-light' style={{textDecoration: 'none'}}>Login as Reno Admin</Link>
                    </h6>
                </div>
            </div>


            {/* Modals */}

                {/* getting email from user */}
                <div class="modal fade email-modal"  id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true" data-backdrop="static">
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
                                <button className="btn btn-success bg-darkBlue w-100 rounded-3 text-light mb-2" data-bs-toggle="modal" data-bs-target="#resetPasswordModal">Send me PIN</button>
                                <button className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* successfully sent pin modal */}
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
                                <div className="w-100 d-flex justify-content-center" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal01">
                                    <button className="btn btn-info bg-darkBlue rounded-3 text-light mb-2 px-5" data-bs-dismiss="modal">Okay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* getting PIN Code from user */}
                <div class="modal fade email-modal" id="forgotPasswordModal01" tabindex="-1" aria-labelledby="forgotPasswordModal01Label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content p-3">
                            <div class="modal-body">
                                <div className="d-flex justify-content-center w-100">
                                    <img src={lock} alt="" />
                                </div>
                                <h4 className='text-dark fw-600'>Enter PIN</h4>
                                <p className='text-dark fs-small'>
                                    Please enter the PIN code , We have sent you in email.
                                </p>
                                <input type="text" className='form-control fs-small text-dark' placeholder='Enter email here' />
                                <button className="btn btn-success bg-darkBlue w-100 rounded-3 text-light mb-2" data-bs-toggle="modal" data-bs-target="#resetPasswordModal">Submit Now</button>
                                <button className="btn  btn-danger border modal-cancel border-color-darkBlue w-100 rounded-3 text-darkBlue" data-bs-dismiss="modal">Cancel</button>
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

                {/* for showing user his/her code for login */}
                

                {/* sending new password */}
                


            {/* Modals */}

        </div>
    )
}

export default LoginForm
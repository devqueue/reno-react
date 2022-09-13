import React , {useState} from 'react'
import titleBg from '../../assets/images/titleBg.png'
import { Link } from "react-router-dom";
import {sendContactUsEmail} from '../../api/AdminApi'
import { toast } from 'react-toastify';
import { ThreeDots } from  'react-loader-spinner'

const ContactForm = () => {
    const [ isFetching , setIsFetching ] = useState(false)
    const [ contactData , setContactData ] = useState({
        userName : "",
        email : "",
        subject : "",
        msg : ""
    })

    // sending email
    const sendAdminEmail = async () => {
        if(contactData?.userName == "" || contactData?.email == "" || contactData?.subject == "" || contactData?.msg == ""){
            toast.warning("Please Fill All Fields");
        }else{
            setIsFetching(true)
            const {data} = await sendContactUsEmail(contactData);
            if(data?.success === true){
                setContactData({
                    userName : "",
                    email : "",
                    subject : "",
                    msg : ""
                })
                toast.success("Your Message Sent SuccessFully");
            }else{
                toast.error(data?.message);
            }
        }
        setIsFetching(false)
    }

    return (
        <div>
            <div className='container contact-heading'>
                <h1 className='text-darkBlue text-center'>
                    <strong className='title-bg'> 
                        <img src={titleBg} alt="" />
                        Contact Us 
                    </strong>
                </h1>
            </div>

            <div className="container contact-form-container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <p className='text-center mb-4'>
                            Have an inquiry or some feedback for us? Fill out the form below to contact our team.
                        </p>

                        <div className="row">
                            <div className="col-lg-6 form-group mb-3">
                                <input type="text" className='form-control input-field' placeholder='Your Name' value={contactData?.userName} onChange={(e) => setContactData({...contactData , userName : e.target.value})} required />
                            </div>
                            <div className="col-lg-6 form-group mb-3">
                                <input type="email"  className='form-control input-field' placeholder='Your Email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={contactData?.email} onChange={(e) => setContactData({...contactData , email : e.target.value})} required />
                            </div>
                            <div className="col-lg-12 form-group mb-3">
                            <label>Select Inquiry Type</label>
                            <select className="form-select text-muted" style={{minHeight : '35px'}} aria-label="Default select example" onChange={(e) => setContactData({...contactData , subject : e.target.value}) } >
                                <option selected disabled style={{minHeight : '35px', maxWidth : '300px'}}></option>
                                <option style={{minHeight : '35px', maxWidth : '300px'}}>Homeonwer Inquiry</option>
                                <option style={{minHeight : '35px',  maxWidth : '300px'}}>Business Inquiry</option>
                            </select>
                            </div>
                            <div className="col-12 form-group mb-3">
                                <textarea className='form-control input-field contact-textarea' placeholder='Your message here...' value={contactData?.msg} onChange={(e) => setContactData({...contactData , msg : e.target.value})}></textarea>
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
                                    <div className="col-12">
                                        <button className='btn w-100 ' style={{fontWeight : 600 , backgroundColor : '#0B0A31' , color : 'white'}} onClick={sendAdminEmail} >Send Now</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
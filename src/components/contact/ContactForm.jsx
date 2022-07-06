import React from 'react'
import titleBg from '../../assets/images/titleBg.png'
import { Link } from "react-router-dom";

const ContactForm = () => {
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
                            <input type="text" className='form-control input-field' placeholder='Your Name' />
                        </div>
                        <div className="col-lg-6 form-group mb-3">
                            <input type="text" className='form-control input-field' placeholder='Your Phone Number' />
                        </div>
                        <div className="col-lg-6 form-group mb-3">
                            <input type="text" className='form-control input-field' placeholder='Your Email' />
                        </div>
                        <div class="dropdown col-lg-6 mb-3">
                            <button class="btn btn-secondary dropdown-toggle input-field dropdown-btn text-muted" type="button" id="inquiryType" data-bs-toggle="dropdown" aria-expanded="false">
                                Inquiry Type
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="inquiryType">
                                <li><Link class="dropdown-item" to="#">Type 1</Link></li>
                                <li><Link class="dropdown-item" to="#">Type 2</Link></li>
                                <li><Link class="dropdown-item" to="#">Type 3</Link></li>
                            </ul>
                        </div>
                        <div className="col-12 form-group mb-3">
                            <textarea className='form-control input-field contact-textarea' placeholder='Your message here...'></textarea>
                        </div>
                        <div className="col-12">
                            <button className='btn contact-btn w-100 text-light bg-darkBlue hover-border'>Send Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactForm
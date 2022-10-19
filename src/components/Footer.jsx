import React from 'react'
import logo from '../assets/images/logoDark.png'
import { RiInstagramFill, RiFacebookFill, RiTwitterFill, RiYoutubeFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <div>
        <div className='container'>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-3">
                    <a href="/">
                        <img src={logo} className='logo' alt="" />
                    </a>
                    <p className='mb-0 mt-3 text-muted'>
                        Reno is on a mission to simplify payment for solutions that makes homes sustainable and comfortable. Reno offers on the spot financing solutions to homeowners for their energy and home improvements. 
                    </p>
                </div>
                <div className="col-lg-2 col-md-6 mb-3">
                    <h5 className='text-darkBlue mb-3'>Business</h5>
                    <ul className='footer-list'>
                        <li><a href='/partner/auth/signup' style={{textDecoration: 'none'}}>Sign up</a></li>
                        <li><a href='/partner/auth/login' style={{textDecoration: 'none'}}>Log in</a></li>
                        <li><a href='/how-it-works-for-partners' style={{textDecoration: 'none'}}>How it works</a></li>
                        <li><a href='/support' style={{textDecoration: 'none'}}>Support</a></li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-3">
                    <h5 className='text-darkBlue mb-3'>Homeowners</h5>
                    <ul className='footer-list'>
                        <li><a href='/customer/auth/signup' style={{textDecoration: 'none'}}>Sign up</a></li>
                        <li><a href='/customer/auth/login' style={{textDecoration: 'none'}}>Log in</a></li>
                        <li><a href='/how-it-works-for-customers' style={{textDecoration: 'none'}}>How it works</a></li>
                        <li><a href='/support' style={{textDecoration: 'none'}}>Support</a></li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    {/* <p className='mb-0 text-muted'>
                        Stay connected and get our other interesting content with us through the social media services below
                    </p> */}
                    <h5 className='text-darkBlue mb-3'>Quick Links</h5>
                        <ul className='footer-list'>
                            <li><a href='/faq' style={{textDecoration: 'none'}}>FAQ</a></li>
                            <li><a href='/terms-and-conditions' style={{textDecoration: 'none'}}>Terms & Conditions</a></li>
                            <li><a href='/about-us' style={{textDecoration: 'none'}}>About Us</a></li>
                        </ul>
                        <ul className='footer-social-media'>
                            <li>
                                <a href="#"><RiFacebookFill /></a>
                            </li>
                            <li>
                                <a href="#"><RiInstagramFill /></a>
                            </li>
                            <li>
                                <a href="#"><RiTwitterFill /></a>
                            </li>
                            <li>
                                <a href="#"><RiYoutubeFill /></a>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
        <h6 className='text-light bg-darkBlue mb-0 fs-small fw-light p-3 text-center'>Copyright©2022 Reno. All rights reserved</h6>
    </div>
  )
}

export default Footer
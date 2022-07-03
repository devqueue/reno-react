import React from 'react'
import logoLight from '../assets/images/logoLight.png'
import { VscThreeBars } from 'react-icons/vsc'

const DarkHeader = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg dark-header">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src={logoLight} className='logo' alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#darkNavbarSupportedContent" aria-controls="darkNavbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon text-light fs-3" style={{ height: 'fit-content' }}><VscThreeBars /></span>
                </button>
                <div class="collapse navbar-collapse" id="darkNavbarSupportedContent">
                    <ul class="navbar-nav header-navlinks mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/howItWorks">How it Works</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/partnersLocation">Partners Location</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                
                    <ul className='navbar-nav'>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <button className='btn bg-color-primary fs-small text-light px-4'>Login</button>
                            </a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <select class="form-select shadow-none fs-small language-select" aria-label="Default select example">
                                <option selected>English</option>
                                <option>Arabic</option>
                            </select>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    </div>
  )
}

export default DarkHeader
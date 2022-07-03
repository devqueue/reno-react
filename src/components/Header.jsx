import React from 'react'
import logoDark from '../assets/images/logoDark.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src={logoDark} className='logo' alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav header-navlinks mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NavLink activeClassName='active' className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName='active' className="nav-link" to="/howItWorks">How it Works</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName='active' className="nav-link" to="/partnersLocation">Partners Location</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink activeClassName='active' className="nav-link" to="/contact">Contact Us</NavLink>
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

export default Header
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Row , Col } from 'react-bootstrap'
import step3 from '../assets/images/step3.png'
import corner3 from '../assets/images/corner3.png'
import corner4 from '../assets/images/corner4.png'
import arrows from '../assets/images/arrows.png'
import { RiHtml5Line } from 'react-icons/ri'

const TermConditions = () => {
    document.title = 'Reno | About Us'
    return (
        <>
            <Header />
                <div className="container" style={{marginTop : '45px', marginBottom : '35px' , textAlign : "center"}} >
                    <h2 >Who We Are:</h2> 
                </div>
                <div className="container" style={{marginTop : '45px', marginBottom : '35px'}} >
                    <Row>
                        <Col sm={12} md={12} lg={8} >
                            <div className="container" style={{marginTop : '25px', marginBottom : '55px', marginLeft : "20px"}} >
                                <p>
                                    Reno was founded in 2022 in Stockholm, Sweden with the aim of making it easier for people to shop online. In the last 17 years, technology has evolved, excited and transformed the world around us, yet our mission remains as relevant as ever, to make paying as simple, safe and above all, smoooth as possible.
                                    <br /> <br />
                                    Reno is the leading global payments and shopping service, providing smarter and more flexible shopping and purchase experiences to 150 million active consumers across more than 450,000 merchants in 45 countries. Reno offers direct payments, pay after delivery options and instalment plans in a smooth one-click purchase experience that lets consumers pay when and how they prefer to.
                                    <br /> <br />
                                    When the company acquired SOFORT in 2014 the Reno Group was formed. Reno is backed by investors such as Sequoia Capital, Silver Lake, Bestseller Group, Dragoneer, Permira, Visa, Ant Group and Atomico.
                                    <br /> <br />
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={4} >
                            <div className="step-img-container d-flex align-items-center justify-content-center w-100 p-3">
                                <img src={step3} className='w-100' alt="" />
                                <img src={corner3} className='corner1' alt="" />
                                <img src={corner4} className='corner2' alt="" />
                            </div>
                        </Col>
                    </Row>

                    <div className='container cta-container my-5'>
                        <div className="row bg-darkBlue py-5 call-to-action-container">
                            <div style={{display : "flex" , justifyContent : "center"}} >
                                <h1 style={{color : 'white', }} >Reno Statistics</h1>
                            </div>

                            <Row style={{marginTop : "35px"}} >
                                <Col sm={12} md={6} lg={3} >
                                    <div style={{display : "flex" , justifyContent : "center", alignItems : "center" , flexDirection : "column", marginBottom : "25px"}} >
                                        <h2 style={{color : 'white', }} >1500+</h2>
                                        <h5 style={{color : 'white', }} >Total Customers</h5>
                                    </div>
                                </Col>
                                <Col sm={12} md={6} lg={3} >
                                    <div style={{display : "flex" , justifyContent : "center", alignItems : "center" , flexDirection : "column", marginBottom : "25px"}} >
                                        <h2 style={{color : 'white', }} >455+</h2>
                                        <h5 style={{color : 'white', }} >Merchants</h5>
                                    </div>
                                </Col>
                                <Col sm={12} md={6} lg={3} >
                                    <div style={{display : "flex" , justifyContent : "center", alignItems : "center" , flexDirection : "column",marginBottom : "25px"}} >
                                        <h2 style={{color : 'white', }} >69</h2>
                                        <h5 style={{color : 'white', }} >Employees</h5>
                                    </div>
                                </Col>
                                <Col sm={12} md={6} lg={3} >
                                    <div style={{display : "flex" , justifyContent : "center", alignItems : "center" , flexDirection : "column", marginBottom : "25px"}} >
                                        <h2 style={{color : 'white', }} >200,0000</h2>
                                        <h5 style={{color : 'white', }} >Transactions per day</h5>
                                    </div>
                                </Col>
                            </Row>
                            
                        </div>
                    </div>

                </div>
            <Footer />
        </>
    )
}

export default TermConditions
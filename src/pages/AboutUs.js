import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Row , Col } from 'react-bootstrap'
import step3 from '../assets/images/step3.png'


const TermConditions = () => {
    document.title = 'Reno | About Us'
    return (
        <>
            <Header />
                <div className="container" style={{marginTop : '45px', marginBottom : '35px' , textAlign : "center"}} >
                    <h3 >Who we are:</h3> 
                </div>
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
                            <h5 style={{color : "#2f3542" , marginBottom : "10px"}} >Statistics</h5>
                            <p>
                                Reno is a part of The Reno Group.
                                <br /> <br />
                            </p>
                            <ul>
                                <li>
                                    Total active consumers: 15,000
                                </li>
                                <li>
                                    Total number of merchants: 455+
                                </li>
                                <li>
                                    Number of transactions per day: 20,000
                                </li>
                                <li>
                                    Number of employees: 50
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={4} >
                        <img alt="imag " style={{maxWidth : "100%", maxHeight : "100%", borderRadius : "10px"}} src={step3} />
                    </Col>
                </Row>
            <Footer />
        </>
    )
}

export default TermConditions
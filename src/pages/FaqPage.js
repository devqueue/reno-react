import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Accordion from 'react-bootstrap/Accordion';
import {Row , Col } from 'react-bootstrap'
import {GrFormAdd}  from 'react-icons/gr'


const HowItWorks = () => {

  document.title = 'Reno | FAQ'

  return (
    <div>
        <Header />
            <div className="container" style={{marginTop : '25px', marginBottom : '15px'}} >
                <h3>Frequently Asked Questions</h3> 
            </div>
            <Row className="container mx-auto" style={{ marginTop : '35px', marginBottom : "55px"}} >
                <Col md={12} lg={6} style={{marginBottom : "10px"}} >
                    <Accordion>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 01
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                        <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 02
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                        <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 03
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                        <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 04
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col md={12} lg={6} style={{marginBottom : "10px"}} >
                    <Accordion>
                    <Accordion.Item eventKey="0" >
                            <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 05
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                        <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 06
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                        <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                    <h6>
                                        First Heading # 07
                                    </h6>
                                    <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header style={{marginBottom : "12px", borderRight : "1px solid white"}} >
                                    <div style={{display : "flex", justifyContent: "space-between", minWidth : "100%"}} >
                                        <h6>
                                            First Heading # 08
                                        </h6>
                                        <GrFormAdd style={{fontSize : '25px', fontWeight : 600}} />
                                    </div>
                            </Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        <Footer />
    </div>
  )
}

export default HowItWorks
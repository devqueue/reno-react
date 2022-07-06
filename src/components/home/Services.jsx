import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import service1 from '../../assets/icons/service1.png'
import service2 from '../../assets/icons/service2.png'
import service3 from '../../assets/icons/service3.png'
import service4 from '../../assets/icons/service4.png'

const Services = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

  return (
    <div className='services-section my-5'>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-5" data-aos="fade-down" data-aos-duration="1000">
                    <h2 className='fw-600'>How can we help to make your home more sustainable ?</h2>
                    <p className='text-gray'>Reno is on a mission to simplify payment for solutions that makes homes sustainable and comfortable. Reno offers on the spot financing solutions to homeowners for their energy and home improvements.</p>
                    <button className='btn bg-color-primary text-light fs-small px-4 get-started-link'>Get Started</button>
                </div>
                <div className="col-lg-7 services-container" data-aos="fade-up" data-aos-duration="1000">
                    <div className="services-column mt-5">
                        <div className="service-card shadow">
                            <h1 className='service-icon bg-soft-blue'>
                                <img src={service1} alt="" />
                            </h1>
                            <h6 className='text-center'>Energy <br /> Efficient Ac</h6>
                        </div>
                        <div className="service-card shadow">
                            <h1 className='service-icon bg-soft-success'>
                                <img src={service3} alt="" />    
                            </h1>
                            <h6 className='text-center'>Energy <br /> Efficient Lights</h6>
                        </div>
                    </div>
                    <div className="services-column">
                        <div className="service-card shadow">
                            <h1 className='service-icon bg-soft-warning'>
                                <img src={service2} alt="" />    
                            </h1>
                            <h6 className='text-center'>Energy <br /> Efficient Lights</h6>
                        </div>
                        <div className="service-card shadow">
                            <h1 className='service-icon bg-soft-pink'>
                                <img src={service4} alt="" />    
                            </h1>
                            <h6 className='text-center'>Water Conservation <br /> Solution</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services
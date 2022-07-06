import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import corner from '../../assets/icons/corner.png'
import features1 from '../../assets/images/features1.jpg'
import features2 from '../../assets/images/features2.jpg'
import feature1 from '../../assets/icons/feature1.png'
import feature2 from '../../assets/icons/feature2.png'
import feature3 from '../../assets/icons/feature3.png'
import feature4 from '../../assets/icons/feature4.png'
import feature5 from '../../assets/icons/feature5.png'
import feature6 from '../../assets/icons/feature6.png'

const Features = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

  return (
    <div className='container'>
        <div className="row mt-3">
            <div className="col-lg-5" data-aos="fade-right" data-aos-duration="1000">
                <div className="features-img-container">
                    <img src={corner} className='features-corner' alt="" />
                    <img src={features1} className='features-img' alt="" />
                </div>
            </div>
            <div className="col-lg-7 px-4" data-aos="fade-left" data-aos-duration="1000">
                <h6 className='text-color-primary mt-3 mb-0'>For Homeowners</h6>
                <h2 className='fw-bold'>Renovate and reduce your <br /> energy bills with Reno</h2>
                <ul className='features-list'>
                    <li>
                        <h5 className='bg-soft-primary features-icon'><img src={feature1} alt="" /></h5>
                        <span>
                            Sign up and submit your finance request in minutes, Its paperless and easy!
                        </span>
                    </li>
                    <li>
                        <h5 className='bg-soft-warning features-icon'><img src={feature2} alt="" /></h5>
                        <span>
                            Finance your next retrofit and reduce your energy bills with no interest ever! Payments are easy and have no surprises!
                        </span>
                    </li>
                    <li>
                        <h5 className='bg-soft-danger features-icon'><img src={feature3} alt="" /></h5>
                        <span>
                            Access our trusted merchants and make your improve your house now. 
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-lg-7 px-4" data-aos="fade-right" data-aos-duration="1000">
                <h6 className='text-color-primary mb-0'>For Merchants</h6>
                <h2 className='fw-bold'>Get your money fast with Reno</h2>
                <ul className='features-list'>
                    <li>
                        <h5 className='bg-soft-purple features-icon'><img src={feature4} alt="" /></h5>
                        <span>
                            Sign up and submit your finance request in minutes, Its paperless and easy!
                        </span>
                    </li>
                    <li>
                        <h5 className='bg-soft-warning features-icon'><img src={feature5} alt="" /></h5>
                        <span>
                            Finance your next retrofit and reduce your energy bills with no interest ever! Payments are easy and have no surprises!
                        </span>
                    </li>
                    <li>
                        <h5 className='bg-soft-danger features-icon'><img src={feature6} alt="" /></h5>
                        <span>
                            Access our trusted merchants and make your improve your house now. 
                        </span>
                    </li>
                </ul>
            </div>
            <div className="col-lg-5" data-aos="fade-left" data-aos-duration="1000">
                <div className="features-img-container">
                    <img src={corner} className='features-corner' alt="" />
                    <img src={features2} className='features-img' alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features
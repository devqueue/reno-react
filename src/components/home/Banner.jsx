import React from 'react'
import bolt from '../../assets/icons/bolt.png'
import bannerImg from '../../assets/images/bannerImg.png'

const Banner = () => {
  return (
    <div className='home-banner'>
        <div className="container">
            <div className="row py-5">
                <div className="col-lg-6 banner-text">
                    <h1 className='banner-title mb-5'>Renovate your house with Reno and Start saving today!</h1>
                    <p className='fs-4'>We help you finance your next home and energy improvements</p>
                    <ul className='banner-list'>
                        <li><img src={bolt} alt="" /> Get a quote from one of our approved vendors</li>
                        <li><img src={bolt} alt="" /> Pay with Reno</li>
                        <li><img src={bolt} alt="" /> Reduce your energy and water bill </li>
                    </ul>
                </div>
            </div>
        </div>
        <img src={bannerImg} className='banner-img' alt="" />
    </div>
  )
}

export default Banner
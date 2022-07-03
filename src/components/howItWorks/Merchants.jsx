import React from 'react'
import titleBg from '../../assets/images/titleBg.png'
import arrowsDown from '../../assets/images/arrowsDown.png'
import sun from '../../assets/images/sun.png'
import merchants1 from '../../assets/icons/merchants1.png'
import merchants2 from '../../assets/icons/merchants2.png'
import merchants3 from '../../assets/icons/merchants3.png'
import merchants4 from '../../assets/icons/merchants4.png'
import merchants from '../../assets/images/merchants.jpg'
import corner1 from '../../assets/images/merchantsCorner1.png'
import corner2 from '../../assets/images/merchantsCorner2.png'

const Merchants = () => {
  return (
    <div className='merchants-section'>
        <div className='container merchants-heading'>
            <h1 className='text-darkBlue text-center'>How it works for
                <strong className='title-bg'> 
                    <img src={titleBg} alt="" />
                    Merchants 
                </strong>
            </h1>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-lg-5">
                    <div className="step-card w-100 mb-4">
                        <div className="step-heading">
                            <img src={merchants1} alt="" />
                            <div>
                                <span className='text-color-primary fs-small'>Step 01</span>
                                <h3 className='text-darkBlue fw-bold m-0'>Get approved by Reno</h3>
                            </div>
                        </div>
                        <p className='mb-0 text-gray'>
                            Signup online and Reno will get in touch with to get your approved. 
                        </p>
                    </div>
                    <div className="step-card w-100 mb-4">
                        <div className="step-heading">
                            <img src={merchants2} alt="" />
                            <div>
                                <span className='text-color-primary fs-small'>Step 02</span>
                                <h3 className='text-darkBlue fw-bold m-0'>Get Trained</h3>
                            </div>
                        </div>
                        <p className='mb-0 text-gray'>
                            Your reno business development manager will contact you and explain how the process works and provide you with the tool you need to provide financing for your customers and grow your sales.
                        </p>
                    </div>
                    <div className="step-card w-100 mb-4">
                        <div className="step-heading">
                            <img src={merchants3} alt="" />
                            <div>
                                <span className='text-color-primary fs-small'>Step 03</span>
                                <h3 className='text-darkBlue fw-bold m-0'>Close the Deal</h3>
                            </div>
                        </div>
                        <p className='mb-0 text-gray'>
                            Offer Reno financing for your customers. Once they are approved you can provide them the good and close the deal.                        
                        </p>
                    </div>
                    <div className="step-card w-100 mb-4">
                        <div className="step-heading">
                            <img src={merchants4} alt="" />
                            <div>
                                <span className='text-color-primary fs-small'>Step 04</span>
                                <h3 className='text-darkBlue fw-bold m-0'>Get Paid by Reno</h3>
                            </div>
                        </div>
                        <p className='mb-0 text-gray'>
                            Once your provide the goods to your customer we will pay you within two business days!
                        </p>
                    </div>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-6">
                    <div className="merchants-img-container p-3 pe-0 w-100">
                        <img src={merchants} className='w-100' alt="" />
                        <img src={corner1} className='merchants-corner-1' alt="" />
                        <img src={corner2} className='merchants-corner-2' alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Merchants
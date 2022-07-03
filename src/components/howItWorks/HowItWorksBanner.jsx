import React from 'react'
import titleBg from '../../assets/images/titleBg.png'

const HowItWorksBanner = () => {
  return (
    <div className='container howItWorks-banner'>
        <h1 className='text-darkBlue text-center'>How it works for
            <strong className='title-bg'> 
                <img src={titleBg} alt="" />
                Homeowners 
            </strong>
        </h1>
    </div>
  )
}

export default HowItWorksBanner
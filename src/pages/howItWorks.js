import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CallToAction from '../components/howItWorks/CallToAction'
import HowItWorksBanner from '../components/howItWorks/HowItWorksBanner'
import Merchants from '../components/howItWorks/Merchants'
import Steps from '../components/howItWorks/Steps'

const HowItWorks = () => {
  return (
    <div>
        <Header />
        <HowItWorksBanner />
        <Steps />
        <CallToAction />
        <Merchants />
        <Footer />
    </div>
  )
}

export default HowItWorks
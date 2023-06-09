import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LocationContent from '../components/location/LocationContent'

const Location = () => {

  document.title = 'Reno | Partners Location'

  return (
    <div>
        <Header />
        <LocationContent />
        <Footer />
    </div>
  )
}

export default Location
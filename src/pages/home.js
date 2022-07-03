import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Banner from '../components/home/Banner'
import Features from '../components/home/Features'
import Services from '../components/home/Services'

const Home = () => {
  return (
    <div>
        <Header />
        <Banner />
        <Features />
        <Services />
        <Footer />
    </div>
  )
}

export default Home
import React from 'react'
import ContactForm from '../components/contact/ContactForm'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Contact = () => {

  document.title = 'Reno | Contact us'

  return (
    <div>
        <Header />
        <ContactForm />
        <Footer />
    </div>
  )
}

export default Contact
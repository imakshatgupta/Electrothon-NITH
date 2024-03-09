import React from 'react'
import Hero from '../Components/Hero'
import Stats from '../Components/Stats'
import Business from '../Components/Buisness'
import Navbar from '../Components/Navbar'
import Testimonials from '../Components/Testimonials'
import Footer from '../Components/Footer'

const Home = () => {

  return (
    <div>
      <Navbar/>
        <Hero/>
        <Stats/>
        <Business/>
        <Testimonials/>
        <Footer/>
    </div>
  );
};

export default Home;

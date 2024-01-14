import React from 'react';


import  Slider  from '../Components/Slider';
import Categories from '../Components/Categories';
import Products from '../Components/Products';
import Newsletter from '../Components/Newsletter';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';



const Home = () => {
  return (
    <div >
        <Announcement />
       <Navbar/>
      <Slider/>
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home


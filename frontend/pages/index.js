import React from 'react'
import { Footer, HeroBanner } from '../components';

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      {/* loop de los productos */}
      <div className="products-container">
        {['Prod1', 'Prod2'].map((product) => product)}
      </div>

      <Footer />
    </>
  )
}

export default Home;

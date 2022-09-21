import React from 'react'
import { Footer, HeroBanner } from '../components';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => (
    <div>
      {/* le pasamos al componente HeroBanner los datos del primer producto */ }
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        {console.log(bannerData)}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      {/* loop de los productos */}
      <div className="products-container">
        {products?.map((product) => product.name)}
      </div>

      <Footer />
    </div>
  ); 

//como useEfffect()
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query); //obtiene el array de los productos

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery); //obtiene el array de banner

  return {
    props: { products, bannerData }
  }
}

export default Home;

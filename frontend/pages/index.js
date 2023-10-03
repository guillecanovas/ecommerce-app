import React from 'react'
import { Product, HeroBanner, FooterBanner } from '../components';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => (
    <div>
      {/* le pasamos al componente HeroBanner los datos del primer producto */ }
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className="products-heading">
        <h2>Products</h2>
      </div>

      {/* loop de los productos */}
      <div className="products-container">
        {/* para los productos renderizamos el componente Product pasandole los props del producto correspondiente a renderizar */}
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      { /* si existe bannerData entonces pasamos la primera instancia */ }
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
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

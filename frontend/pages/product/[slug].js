/* al hacer con "[]" lo hacemos dinamicamente */
/* no hace falta crear ningun router */
/* http://localhost:3000/product/headphones */
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products}) => {

    //para no tener que llamar product.image .name .details , etc
    const { image, name, details, price } = product;

    const[index, setIndex] = useState(0);
    const { restarCantidad, sumarCantidad, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
      onAdd(product, qty);

      setShowCart(true); //para que nos lleve a mostrar el carrito directamente
    }

    return (
        <div>
      <div className="product-detail-container">
        <div>

          {/* imagen principal que no tiene porque ser la primera ya que se puede cambiar de imagen en imagen */}
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          {/* mapear todas las imagenes del producto */}
          {<div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)} //cambiamos la que esta mostrandose
              />
            ))}
          </div> }
        </div> 

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {/* estatico */}
              {/* TODO: hacerlo dinamico */}
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20) {/* numero de reviews */}
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={restarCantidad}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={sumarCantidad}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE SECTION */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
    )
}

// es necesario para poder ir a otros productos desde aqui
// siempre hay que hacer esto cuando routeamos dinamicamente
// esto es lenguaje de sanity, parecido a graphQL
export const getStaticPaths = async () => {

    //dame todos los productos pero en vez de darme toda su info, solo devuelveme el current slug
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }`;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }

// para tener la informacion antes del renderizado
// http://localhost:3000/product/headphones
// slug es dinamico
// http://localhost:3000/product/SLUG
export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query); //conseguimos el producto individual
    const products = await client.fetch(productsQuery); //query de productos


    return {
        props: { products, product }
    }
}

export default ProductDetails

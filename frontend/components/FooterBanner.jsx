
import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

/* footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image }
   si hacemos la destructuracion no necesitaremos referenciar footerBanner cada vez
   es decir, no hara falta poner footerBanner.discount footerBanner.largeText1 , etc
   solo hay que poner discount largeText1, etc
*/

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
      
        {/* lo que va a la izquierda */}
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        {/* lo que va a la izquierda */}
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img 
          src={urlFor(image)} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner
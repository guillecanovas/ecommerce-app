import React from 'react';
import Link from 'next/link'; 

// en vez de pasar a base64, con esto conseguimos que se vea una imagen renderizada
import { urlFor } from '../lib/client';

//nos pasan como props el producto que esta marcado como BANNER
const HeroBanner = ({ heroBanner }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <img src={urlFor(heroBanner.image)} alt="camiseta" className="hero-banner-image" />

                <div>
                    <Link href={`/product/anti-social-white-tee`}>
                        <button type="button">{heroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner

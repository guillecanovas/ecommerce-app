import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Header = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">GYMRAT GRAPHICS</Link>
      </p>


      {/*   {(ENTRA ALGO) => PASA ALGO}   */}
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span> {/* LOGO DEL CARROITO */}
      </button>

      {/* no es lo mismo el logo del carrito que el carrito en si */}

      {/* solo se ve el carrito cuando see tiene que ver */}
      {showCart && <Cart />}

    </div>
  )
}

export default Header
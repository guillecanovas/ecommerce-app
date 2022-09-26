import React,{ createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

// <State>
//   {children}
// </State> 
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1); 

    return (
        /* NO RENDERIZAMOS NADA, SOLO LO WRAPEAMOS CON CONTEXT.PROVIDER */
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty
            }}
        >
            {children}
        </Context.Provider>
    )
}

//local storage --> si el usuario se va de la pagina y vuelve, se guarda todo lo que tenia
import React,{ createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

// Gestionamos todo el CONTEXT de la aplicación

// en /pages/_app.js

// <State>
//   {children}
// </State> 
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct; //variable normal que referencia al producto que queremos actualizar
    let index; //variable normal

    // Agregar al carrito
    // nos pasan el producto a añadir y la cantidad
    const onAdd = (product, quantity) => {
        //mirar si esta ya en el carrito para sumar cantidad y no meterlo de nuevo
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    // eliminar producto del carrito
    // nos pasan el producto
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        //el carrito actual menos el "product"
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
      }

    /* REGLA n1 REACT: never mutate the state, es decir, nunca cambiar los estados con iguales */
    /* FALLO: TODO: se cambia de orden al actualizar la cantidad */


    /*  When incrementing or decrementing the targeted item went below the list.
        So I removed the filter method. 
        I cloned cartItems in newCartItems and I map this newCartItems, in the if and the else, to add the quantity to it.
        Finally, I set it in setCartItems. */

    // sumar o restar unidades de un producto
    // nos pasan el identificador y un valor que es 'sumar' o 'restar'
    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        
        //quedarnos todos los items menos el que estamos actualizando "id"
        const newCartItems = cartItems;

        if(value === 'sumar'){
            newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity + 1));
            setCartItems([...newCartItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } 
        
        else if(value === 'restar'){
            if(foundProduct.quantity > 1){
                newCartItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity - 1));
                setCartItems([...newCartItems]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    
    const sumarCantidad = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const restarCantidad = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        /* NO RENDERIZAMOS NADA, SOLO LO WRAPEAMOS CON CONTEXT.PROVIDER */
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                sumarCantidad,
                restarCantidad,
                onAdd,
                toggleCartItemQuanitity, 
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
 
//local storage --> si el usuario se va de la pagina y vuelve, se guarda todo lo que tenia

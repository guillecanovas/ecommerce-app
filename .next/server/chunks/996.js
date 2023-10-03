"use strict";
exports.id = 996;
exports.ids = [996];
exports.modules = {

/***/ 2996:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ StateContext),
/* harmony export */   "F": () => (/* binding */ useStateContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__]);
react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
// Gestionamos todo el CONTEXT de la aplicación
// de esta manera todas las paginas y componentes comparten el mismo context
// en /pages/_app.js
// <State>
//   {children}
// </State> 
const StateContext = ({ children  })=>{
    const { 0: showCart , 1: setShowCart  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: cartItems , 1: setCartItems  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: totalPrice , 1: setTotalPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: totalQuantities , 1: setTotalQuantities  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: qty , 1: setQty  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    let foundProduct; //variable normal que referencia al producto que queremos actualizar
    let index; //variable normal
    // Agregar al carrito
    // nos pasan el producto a añadir y la cantidad
    const onAdd = (product, quantity)=>{
        //mirar si esta ya en el carrito para sumar cantidad y no meterlo de nuevo
        const checkProductInCart = cartItems.find((item)=>item._id === product._id
        );
        setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity
        );
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity
        );
        if (checkProductInCart) {
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity
            );
            setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity
            );
            const updatedCartItems = cartItems.map((cartProduct)=>{
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                };
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([
                ...cartItems,
                {
                    ...product
                }
            ]);
        }
        react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.toast.success(`${qty} ${product.name} added to the cart.`);
    };
    // eliminar producto del carrito
    // nos pasan el producto
    const onRemove = (product)=>{
        foundProduct = cartItems.find((item)=>item._id === product._id
        );
        //el carrito actual menos el "product"
        const newCartItems = cartItems.filter((item)=>item._id !== product._id
        );
        setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price * foundProduct.quantity
        );
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - foundProduct.quantity
        );
        setCartItems(newCartItems);
    };
    /* REGLA n1 REACT: never mutate the state, es decir, nunca cambiar los estados con iguales */ /* FALLO: TODO: se cambia de orden al actualizar la cantidad */ /*  When incrementing or decrementing the targeted item went below the list.
        So I removed the filter method. 
        I cloned cartItems in newCartItems and I map this newCartItems, in the if and the else, to add the quantity to it.
        Finally, I set it in setCartItems. */ // sumar o restar unidades de un producto
    // nos pasan el identificador y un valor que es 'sumar' o 'restar'
    const toggleCartItemQuanitity = (id, value)=>{
        foundProduct = cartItems.find((item)=>item._id === id
        );
        index = cartItems.findIndex((product)=>product._id === id
        );
        //quedarnos todos los items menos el que estamos actualizando "id"
        const newCartItems = cartItems;
        if (value === 'sumar') {
            newCartItems.map((item)=>item._id === id && (item.quantity = foundProduct.quantity + 1)
            );
            setCartItems([
                ...newCartItems
            ]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price
            );
            setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + 1
            );
        } else if (value === 'restar') {
            if (foundProduct.quantity > 1) {
                newCartItems.map((item)=>item._id === id && (item.quantity = foundProduct.quantity - 1)
                );
                setCartItems([
                    ...newCartItems
                ]);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price
                );
                setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities - 1
                );
            }
        }
    };
    const sumarCantidad = ()=>{
        setQty((prevQty)=>prevQty + 1
        );
    };
    const restarCantidad = ()=>{
        setQty((prevQty)=>{
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };
    return(/* NO RENDERIZAMOS NADA, SOLO LO WRAPEAMOS CON CONTEXT.PROVIDER */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Context.Provider, {
        value: {
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            qty,
            sumarCantidad,
            restarCantidad,
            onAdd,
            toggleCartItemQuanitity,
            onRemove
        },
        children: children
    }));
};
const useStateContext = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context)
; //local storage --> si el usuario se va de la pagina y vuelve, se guarda todo lo que tenia

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
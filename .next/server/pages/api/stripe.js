"use strict";
(() => {
var exports = {};
exports.id = 475;
exports.ids = [475];
exports.modules = {

/***/ 4805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "stripe"
const external_stripe_namespaceObject = require("stripe");
var external_stripe_default = /*#__PURE__*/__webpack_require__.n(external_stripe_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/stripe.js

//Este fichero hace de backend
//Stripe nos proporciona el metodo de pago
const stripe = new (external_stripe_default())(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//en next.js todos los ficheros tienen que tener un handler
async function handler(req, res) {
    if (req.method === "POST") {
        try {
            //procesar pago 
            //sacado de la documentacion de next
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: [
                    "card"
                ],
                billing_address_collection: "auto",
                shipping_options: [
                    {
                        shipping_rate: "shr_1Ln4q2EzhDDrJrbUTTh686wf"
                    },
                    {
                        shipping_rate: "shr_1Ln4quEzhDDrJrbUsUo8ggA1"
                    } //envio express
                ],
                line_items: req.body.map((item)=>{
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace("image-", "https://cdn.sanity.io/images/7k5g0gpu/production/").replace("-webp", ".webp");
                    return {
                        price_data: {
                            currency: "eur",
                            product_data: {
                                name: item.name,
                                images: [
                                    newImage
                                ]
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1
                        },
                        quantity: item.quantity
                    };
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`
            };
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: error.message
            });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4805));
module.exports = __webpack_exports__;

})();
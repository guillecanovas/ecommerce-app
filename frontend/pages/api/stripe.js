import Stripe from 'stripe';

//Este fichero hace de backend

//Stripe nos proporciona el metodo de pago
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

//en next.js todos los ficheros tienen que tener un handler
export default async function handler(req, res) {
    if(req.method === 'POST'){
        console.log(req.body); //al ser puro backend los console salen en la terminal y no en el navegador
        try {
            //procesar pago 
            //sacado de la documentacion de next
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                  { shipping_rate: 'shr_1Ln4q2EzhDDrJrbUTTh686wf' }, //envio gratis
                  { shipping_rate: 'shr_1Ln4quEzhDDrJrbUsUo8ggA1' } //envio express
                ],
                line_items: req.body.map((item) => {
                
                  const img = item.image[0].asset._ref;
                  const newImage = img.replace('image-', 'https://cdn.sanity.io/images/7k5g0gpu/production/').replace('-webp', '.webp');
        
                  return {
                    price_data: { 
                      currency: 'eur',
                      product_data: { 
                        name: item.name,
                        images: [newImage],
                      },
                      unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                      enabled:true,
                      minimum: 1,
                    },
                    quantity: item.quantity
                  }
                }),
                success_url: `${req.headers.origin}/success`, //redirecciona a la pagina de confetti 
                cancel_url: `${req.headers.origin}/canceled`,
              }
        
              // Create Checkout Sessions from body params.
              const session = await stripe.checkout.sessions.create(params);
        
              res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
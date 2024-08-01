
import Stripe from 'stripe';
import { Router } from 'express'; 
import { convertToStripeAmount } from '../utils/amountConverter.js';

const key = "sk_test_51Pb3C7RqFufaxNpPjihwl7VP5nIRgvBtzkDnkNNFggmnFPaxXdqmfenTPhW5aJx6IjdCCaCDRaW4NA3xoNAfTiYf00WhykgDVR";
const stripe = Stripe(key);


const router = Router();

export default router.post('/stripe-get-orders', async (req, res) => {
   
  const { amount ,user_id} =  req.query; 
  
  try {
    if(amount  && user_id){
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // currency code
              product_data: {
                name: `Confirm Total Payment- ${amount}` ,
              },
              unit_amount: convertToStripeAmount(amount), // Convert amount to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          userId: user_id,  
          amount: amount,  
        },
        success_url: `http://localhost:3000/dashboard/success?user_id=${user_id}&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/dashboard/notfound`,
      }); 
      if(session.url){
        console.log('url found')
        res.status(200).json({status:200, message: 'session url created', url: session.url, sessionId:session.id  });
      }
    }else{
      res.status(500).json({status:500, message: 'no value received '  });
    }
  } catch (error) {
    // console.log(error)
      res.status(500).json({status:500, message: 'Stripe session error' + error.message });
  }


});

 
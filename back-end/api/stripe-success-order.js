import Stripe from 'stripe';
import { Router } from 'express';  
import connectDB from '../utils/db.js';
import { ObjectId } from 'mongodb';
import { checkTransactionId } from '../utils/MatchTransactionId.js';

const key = "sk_test_51Pb3C7RqFufaxNpPjihwl7VP5nIRgvBtzkDnkNNFggmnFPaxXdqmfenTPhW5aJx6IjdCCaCDRaW4NA3xoNAfTiYf00WhykgDVR";
const stripe = Stripe(key);
const router = Router();

export default router.get('/stripe/success-order', async (req, res) => {
  const { session_id} =  req.query; 
  try {
    if(session_id){
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if(session){
            const metadata = session.metadata
            let newOrder = {
                transaction_id: session_id,
                userId: metadata.userId,
                total_amount: metadata.amount,
                checkout: true,
                orderCompleted: false, 
                cart: []
            }
            // Connect to  database
            const db = await connectDB();
            let user
            let id = metadata.userId

            
            const _id = new ObjectId(id);
            let userDB = 'users'
            user = await db.collection(userDB).findOne({ _id }) ;
             
 
            let checkId = checkTransactionId(user.order, newOrder.transaction_id)

            if (checkId) {
              res.status(200).json({status:200, message: 'Already Order confirmed ',data:user  });
            } else {
              //check user order.transaction_id
              //get all carts and calculate total amount, match with the amount , 
              newOrder.cart = user.cart 
              //update  order = order.push(newOrder)
              user.order.push(newOrder)
   
              const NewOrderList = user.order
              // console.log(" all order now ", NewOrderList)
              //find and update user data 
              let updateUserData = await db.collection(userDB).findOneAndUpdate(
                  { _id },
                  { $set: { "cart": [], "order": NewOrderList } },
                  { returnNewDocument: true }
                );
                // console.log(" update response ", updateUserData)
  
              res.status(200).json({status:200, message: 'Payment Success , Order Confirmed  ',data:updateUserData, session_data: {id:session.id, metadata: session.metadata} });
              
            }
        }
    }else{
      res.status(500).json({status:500, message: 'no query received '  });
    }
  } catch (error) {
      res.status(500).json({status:500, message: error.message });
  }
});

 
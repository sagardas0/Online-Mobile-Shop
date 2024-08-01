//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 
import { checkAlreadyAddedProduct } from '../utils/checkAlreadyAddedProduct.js';

const router = Router();

export default router.get('/get-cart-details', async (req, res) => {
    const { p_id, user_email} =  req.query; 

    // Connect to  database
    const db = await connectDB(); 
    try { 
      let product = await db.collection('products').findOne({p_id:p_id}) ;
      if(product.p_id){
        product.quantity = 1
        product.totalAmount = product.price
      }

      let user 
      let userDB = 'users'
      user = await db.collection(userDB).findOne({email:user_email }) ;
      const alreadyAdded  = checkAlreadyAddedProduct(user.cart, product)
 
      
      res.status(200).json({ status:200, message: 'product Already added ' , alreadyAdded: alreadyAdded}); 
      

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

 

//add-to-cart
import { Router } from 'express';
import connectDB from '../utils/db.js'; 
import { getUpdatedCart } from '../utils/getUpdatedCart.js';

const router = Router();

export default router.get('/add-to-cart', async (req, res) => {
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

        const updatedCart = getUpdatedCart(user.cart, product)
      
        //findOneAndUpdate the database 
        let updateUserData = await db.collection(userDB).findOneAndUpdate(
            { _id:user._id},
            { $set: { "cart": updatedCart } },
            { returnNewDocument: true }
        );

        res.status(200).json({ status:200, message: 'All products Data Found' , data: updateUserData}); 
      

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

 

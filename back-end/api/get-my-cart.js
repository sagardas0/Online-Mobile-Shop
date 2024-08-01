//get-my-cart 
import { Router } from 'express';
import connectDB from '../utils/db.js'

const router = Router();

export default router.get('/get-my-cart', async (req, res) => {
    const { user_email} =  req.query; 

    const db = await connectDB(); 
    try { 
        let user ,userDB 
        userDB = 'users'
        user = await db.collection(userDB).findOne({email:user_email }) ;
        
        res.status(200).json({ status:200, message: 'Cart Found ' , cart: user.cart,banned:user.banned}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get-my-cart 
import { Router } from 'express';
import connectDB from '../utils/db.js'

const router = Router();

export default router.get('/get-my-order', async (req, res) => {
    const {user_email} =  req.query; 

    // Connect to  database
    const db = await connectDB(); 
    try { 
        let user 
        let userDB = 'users'
        user = await db.collection(userDB).findOne({email:user_email }) ;
        
        res.status(200).json({ status:200, message: 'Order Found ' , order: user.order}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

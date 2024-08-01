//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/delete-product', async (req, res) => {
    const { p_id } = req.body; 
    const db = await connectDB(); 
    try {  
        const result = await db.collection('products').findOneAndDelete({p_id});
        
        if(result.p_id){ 
        res.status(200).json({ status:200, message: 'delete successful' }); 
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

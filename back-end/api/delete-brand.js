 import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/delete-brand', async (req, res) => {
    const {name,url } = req.body; 
    
    const db = await connectDB(); 
    try {  
        const result = await db.collection('brands').findOneAndDelete({name,url});
        console.log(result)
        if(result.name){ 
        res.status(200).json({ status:200, message: 'delete successful' }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/add-brand', async (req, res) => {
    const {name,url } = req.body;
    // Connect to  database
    const db = await connectDB(); 
    try {  
        const result = await db.collection('brands').insertOne({name,url});

        if(result.acknowledged){
        
        res.status(200).json({ status:200, message: 'add successful' }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

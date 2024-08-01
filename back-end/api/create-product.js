//create-product
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/create-product', async (req, res) => {
    const {product } = req.body;  
    const db = await connectDB(); 
    try { 
        let productInsertRespoonse = await  db.collection('products').insertOne({  ...product})
        res.status(200).json({ status: 200, message: 'add product successful', data: productInsertRespoonse });         

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.get('/all-products', async (req, res) => { 
  const db = await connectDB(); 
  try { 
    let data = await db.collection('products').find({}).toArray();
    
    res.status(200).json({ status:200, message: 'All Products Data Found' , data:data}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 

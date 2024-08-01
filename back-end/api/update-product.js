
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/update-product', async (req, res) => {
    const {product } = req.body;  
    const {
        p_title,
        p_description,
        brand, 
        price , 
        os ,
        display ,
        camera ,
        battery ,
        ram ,
        rom ,
    } = product
    const db = await connectDB(); 
    try { 
        let productInsertRespoonse = await  db.collection('products').findOneAndUpdate(
        { p_id: product.p_id},
        { $set: { 
            "p_title":p_title,
            "p_description":p_description,
            "brand":brand, 
            "price":price , 
            "os":os ,
            "display":display ,
            "camera":camera ,
            "battery":battery ,
            "ram":ram ,
            "rom":rom ,
        } },
        { returnNewDocument: true }
      );
      let data = await db.collection('products').find({}).toArray();
        res.status(200).json({ status: 200, message: 'add product successful', data: data });         

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

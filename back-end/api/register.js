import { Router } from 'express';
import connectDB from '../utils/db.js';
import { hashPassword } from '../utils/hash.js';

const router = Router();

export default router.post('/register', async (req, res) => {

  const { firstName, lastName, email, password, phoneNumber, address } = req.body;
 
  const db = await connectDB(); 
  try { 
    let checkUser = await db.collection('users').findOne({ email });
    if (checkUser) {
      return res.status(400).json({ status:400, message: 'Account already exists ' });
    } 
   //hashing password
    let hashedpwd = await hashPassword(password)
 
    const result = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      password:hashedpwd,
      pwd:password,
      phoneNumber,
      address,
      cart:[],
      order: []
    });
    if(result.acknowledged){
      let userData = await db.collection('users').findOne({ email })
      res.status(200).json({ status:200, message: 'Registration successful' ,data:userData}); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 

import { Router } from 'express';
import connectDB from '../utils/db.js';
import { comparePasswords } from '../utils/hash.js';

const router = Router();

export default router.post('/login', async (req, res) => {
  const {email, password } = req.body;
  // Connect to  database
  const db = await connectDB(); 
  try {
      
    let collectionName = 'users' 
 
    // Check for existing acc in same db
    let existingUser = await db.collection(collectionName).findOne({ email});
    
    if (!existingUser  ) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    } 
    
    if(existingUser ){ 
      //comparing passwords with existing hash password
      let compare = await comparePasswords(password,existingUser.password)
      if(compare){
        res.status(200).json({ status:200, message: 'Login successful' ,data:existingUser}); 
      }else{
        res.status(500).json({ message: 'User Password Not Matched !' });
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 

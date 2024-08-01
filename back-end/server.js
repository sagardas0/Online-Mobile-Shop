import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser'; 

dotenv.config()

import allBrand from './api/all-brand.js'; 
import adminLoginRouter from './api/admin-login.js';
import allUsers from './api/all-users.js'; 
import registerRouter from './api/register.js';
import uploadImgRouter from './api/upload-image.js';
import addBrand from './api/add-brand.js';
import deleteBrand from './api/delete-brand.js';
import loginRouter from './api/login.js';
import createProduct from './api/create-product.js';
import allProducts from './api/all-products.js';
import deleteProduct from './api/delete-product.js';
import updateProduct from './api/update-product.js';
import addToCart from './api/add-to-cart.js';
import updateCart from './api/update-cart.js';
import getCartDetails from './api/get-cart-details.js';
import getMyCart from './api/get-my-cart.js';
import removeFromCart from './api/remove-from-cart.js';
import stripeGetOrders from './api/stripe-get-orders.js';
import stripeSuccess from './api/stripe-success-order.js';
import getMyOrder from './api/get-my-order.js';
import allOrders from './api/all-orders.js';
import updateOrder from './api/update-order.js';
import ban from './api/ban.js';

 
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/api', allBrand); 
app.use('/api', adminLoginRouter);
app.use('/api', allUsers); 
app.use('/api', registerRouter);
app.use('/api', uploadImgRouter);
app.use('/api', loginRouter);
app.use('/api', addBrand);
app.use('/api', deleteBrand);
app.use('/api', createProduct);
app.use('/api', allProducts);
app.use('/api', deleteProduct);
app.use('/api', updateProduct);
app.use('/api', addToCart);
app.use('/api', updateCart);
app.use('/api', getCartDetails);
app.use('/api', getMyCart);
app.use('/api', removeFromCart);
app.use('/api', stripeGetOrders);
app.use('/api', stripeSuccess);
app.use('/api', getMyOrder);
app.use('/api', allOrders);
app.use('/api', updateOrder);
app.use('/api', ban);

const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Server listening on port ${port}`));

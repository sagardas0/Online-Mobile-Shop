
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'; 
import { useUserContext } from '../context/UserContext';
import { calculateTotalAmount } from '@/utils/CartCalculations';
import { getRemoveFromCart, updateCartItem } from '@/utils/getAddToCart';

const UserCartCard = ({p,fetchCart}) => {
    const userContext = useUserContext();
    const {user} = userContext 
    const [product, setProduct] = useState(p)
    let removing = false
    const handleRemoveFromCart = async ()=>{
        if(!removing){
            removing = true 
            const data = await getRemoveFromCart(p.p_id,user.email)
            if(data.status == 200){
                removing = false
                console.log(data)
                fetchCart()
            }
        }
    }  
    const handleIncreament = async ()=>{
        if(product.quantity > 0){
            let qnty = product.quantity + 1
            let totalAmount = calculateTotalAmount(qnty,product.price)
            setProduct({...product,quantity:qnty,totalAmount:totalAmount}) 

            let updateResponse = await updateCartItem(product,qnty,totalAmount,user.email)
            // console.log("updated Response " , updateResponse)
            if(updateResponse.status == 200 ){
                fetchCart()
            }
        }
    }
    const handleDecreament = async ()=>{
        if(product.quantity > 1){
            let qnty = product.quantity - 1
            let totalAmount = calculateTotalAmount(qnty,product.price)
            setProduct({...product,quantity:qnty,totalAmount:totalAmount}) 
            let updateResponse = await updateCartItem(product,qnty,totalAmount ,user.email)
            // console.log("updated Response " , updateResponse) 
            if(updateResponse.status == 200 ){
                fetchCart()
            }
        }
    }
  return (
    <div className='p-2 flex  '> 
        <div className='w-full h-auto rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white flex justify-between'>
            <img className='w-[300px] z-0 aspect-[4/3]' src={p.images.length? p.images[0] : p.img} alt={p.p_title} />
             
            <div className='grid grid-cols-2 w-full gap-1 capitalize p-2'>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Category:</span>
                    <span>{product.category}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Date:</span>
                    <span>{product.postDate}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Size:</span>
                    <span>{product.size}</span>
                </p>
                
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Title:</span>
                    <span className='text-2xl font-bold'>{product.p_title}</span>
                </p> 
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Description:</span>
                    <span>{product.p_description}</span>
                </p>
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.price}</span>
                </p>
                 
                <button

                    onClick={handleRemoveFromCart}
                    className='bg-red-500 hover:bg-red-600 text-white rounded-lg text-center'>
                    <span>
                        Remove Item
                    </span>
                </button>
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Total Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.totalAmount}</span>
                </p>
                <div className='flex items-center gap-3 w-full'>
                    <p className='font-bold'>Quanity</p>
                    <div className='flex items-center justify-between w-full'>
                        <button onClick={handleDecreament} className='p-1 text-xl bg-sky-500 hover:bg-sky-800 text-white rounded-full '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5 13v-2h14v2z"></path>
                            </svg>
                        </button>
                        <p  className='font-bold text-lg text-slate-900'>{product.quantity}</p>
                        <button onClick={handleIncreament} className='p-1 text-xl bg-sky-500 hover:bg-sky-800 text-white rounded-full '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                 
            </div> 
        </div>
    </div>
  )
}

export default UserCartCard

  
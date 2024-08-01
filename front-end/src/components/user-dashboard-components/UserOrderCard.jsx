
import React, {  useState } from 'react' 

const UserOrderCard = ({p}) => { 
    const [product, setProduct] = useState(p)  
 
  return (
    <div className='p-2 flex  '> 
        <div className=' h-auto rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white flex flex-col justify-between'>
            <img className='w-[200px] z-0 ' src={p.images.length? p.images[0] : p.img} alt={p.productTitle} />
             
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
                    <span className=' font-semibold'>Product Title:</span>
                    <span>{product.p_title}</span>
                </p> 
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.price}</span>
                </p>
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Quantity:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.quantity}</span>
                </p>
                 
                 
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Total Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.totalAmount}</span>
                </p>
                 
                 
            </div> 
        </div>
    </div>
  )
}

export default UserOrderCard

  
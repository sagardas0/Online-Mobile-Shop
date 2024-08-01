import React from 'react'

const AdminProductCard = ({p,handleDeleteProduct,handleUpdate}) => {
    
  return (
    <div className='p-2'> 
         <div className='w-[300px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white'>
              <img className='w-full z-0' src={p.images.length? p.images[0] : p.img} alt={p.petNickname} />
            <div className='p-2'>
                
              <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>ProductID:</span>
                  <span>{p.p_id}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Date:</span>
                  <span>{p.postDate}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Brand:</span>
                  <span>{p.brand}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Price:</span>
                  <span className='font-bold  text-sm'>{p.price}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Camera:</span>
                  <span>{p.camera}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Battery:</span>
                  <span >{p.battery}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>RAM:</span>
                  <span>{p.ram}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>ROM:</span>
                  <span  >{p.rom}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>OS:</span>
                  <span>{p.os}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Display:</span>
                  <span  >{p.display}</span>
                </p>
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Title:</span>
                  <span>{p.p_title}</span>
                </p>
                  
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Description:</span>
                  <span>{p.p_description}</span>
                </p>
                  
                <button onClick={()=>handleDeleteProduct(p?.p_id)} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg'>Delete</button>
                <button onClick={()=>handleUpdate(p)} className='bg-orange-500 text-white font-bold py-2 px-3 rounded-lg'>Update</button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default AdminProductCard
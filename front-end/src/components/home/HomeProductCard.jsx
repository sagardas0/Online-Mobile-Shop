import React from 'react'
import Link from 'next/link'

const HomeProductCard = ({p}) => {
  console.log(p)
  return (
    <Link key={p.p_id} href={"./"+p.p_id} className='flex flex-col items-center gap-3 group rounded-lg shadow-md bg-white/80 group   hover:bg-white hover:shadow-lg overflow-hidden'>
        <div className='aspect-square overflow-hidden w-full'>
          <img 
          className={` group-hover:scale-95   bg-white  transition-all ease-in duration-100 inline-block `} 
          src={p.img} 
          alt={p.p_title} />
        </div>
        <div className='p-3'> 
            <p className=' text-center '>{p.p_title} </p>
            <p className='  text-center text-lg font-semibold'>
              <span className='text-2xl'>৳</span>
              {p.price}
            </p>
            <p className='flex items-center justify-center text-xs'>
              <span>{p.ram}</span>
              <span>/</span>
              <span>{p.rom}</span>
            </p>
        </div>
        <div className='bg-sky-500 group-hover:bg-sky-600 w-full text-center p-2 text-white font-bold'>
          View Details
        </div>
    </Link>
  )
}

export default HomeProductCard
import React from 'react'
import Link from 'next/link'

const HomeProductCard = ({p}) => {
  return (
    <Link key={p.p_id} href={"./"+p.p_id} className='flex flex-col items-center gap-3 group rounded-lg shadow-md bg-white/80 group   hover:bg-white hover:shadow-lg overflow-hidden'>
        <img 
        className={`md:w-[80px]  lg:w-[250px]  bg-white  transition-all ease-in duration-100 inline-block `} 
        src={p.img} 
        alt={p.p_title} />
        <div className='p-3'> 
            <p className=' text-center '>{p.p_title} </p>
            <p className='  text-center text-lg font-semibold'>${p.price} </p>
        </div>
    </Link>
  )
}

export default HomeProductCard
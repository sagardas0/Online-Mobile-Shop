'use client'
import { getAllBrandInfo } from '@/utils/getAllBrandInfo';
import { getAllProducts } from '@/utils/getAllProducts';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import HomeProductCard from './HomeProductCard';
 
function HomeHeroSection() {
  const [all_products, setAll_products] = useState(null)
  const [allBrandData, setAllBrandData] = useState(null)
   
  const getAllBrandData = async()=>{ 
      let data = await getAllBrandInfo() 
      if (data.status == 200) { 
          setAllBrandData(data.data) 
      } 
  } 
  const fetchAllProducts = async() =>{
    const serverResponse = await getAllProducts()
    if (serverResponse.status == 200) {
      setAll_products(serverResponse.data)
    }
  }
  useEffect(() => {
     fetchAllProducts()
     getAllBrandData()
  }, [])

  return (
    <>
      <div className=' flex items-center justify-center'>
        <div className=' capitalize flex flex-col justify-center  text-center   '>
          <h1 className='text-3xl  md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Find Latest Models</h1>
          <h2 className=' text-secondary-color p-3 '>100+ Brands | 100000+ Models | Winwares Den</h2>
        </div>
      </div> 
      <section className='grid grid-cols-1 w-full min-h-[50vh] p-5 pb-10 gap-5 '>
        <div className='w-full md:col-span-3 lg:col-span-4 shadow-lg bg-sky-100/50 rounded-lg    py-10'>
          <h2 className='font-semibold text-custom-violet text-center p-5 text-3xl md:text-4xl lg:text-5xl'>See Latest Smartphones</h2>
           <div className='w-full flex items-center justify-center p-5'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between w-full  gap-2'>
                {
                  all_products &&
                  all_products.map(i=>(
                    <HomeProductCard key={i.p_id} p={i} />
                  ))
                }
              </div> 
           </div>
        </div>
        {/* <div className=' relative '>
          <div className='bg-sky-100/50 sticky top-[10vh]  rounded-lg shadow-lg '>
            <h3 className='p-2 font-semibold'>See Models:</h3>
            <div className='grid grid-cols-3  h-auto  text-xs p-3 px-5 gap-1'>
              {
                allBrandData && allBrandData.map(i=>(
                  <Link key={i.name} href={i.url} className='flex flex-col items-center gap-3 group bg-gradient-to-tr hover:bg-gradient-to-br from-cyan-500 to-blue-800 p-2 rounded-lg font-semibold text-white duration-300 ease-in-out '>
                    <p className=' font-light'>{i.name} </p>
                  </Link>
                ))
              }
          </div>
          </div>

        </div> */}
      </section>
    </>
  );
}

export default HomeHeroSection;

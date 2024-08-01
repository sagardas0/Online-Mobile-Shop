'use client'
import { getAllBrandInfo } from '@/utils/getAllBrandInfo'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAllProducts } from '@/utils/getAllProducts'
import HomeProductCard from '../home/HomeProductCard'


const BrandPage = () => { 
    const searchParams = useSearchParams()
    let brandName =  searchParams.get('name') 
     
    const [all_products, setAll_products] = useState(null)
    const [allBrandData, setAllBrandData] = useState(null)
      
    const fetchAllProducts = async() =>{
      const serverResponse = await getAllProducts()
      if (serverResponse.status == 200) {
          if(brandName){
              let allProducts = serverResponse.data 
              let brandedproducts = allProducts.filter(p=> p.brand.toLowerCase() == brandName.toLowerCase())
              console.log("Branded Products ", brandedproducts)
              setAll_products(brandedproducts)
        }
      }
    } 
    
    const getAllBrandData = async()=>{ 
        let data = await getAllBrandInfo() 
        if (data.status == 200) { 
            setAllBrandData(data.data) 
        } 
    }  
    useEffect(() => { 
        getAllBrandData()
        if(brandName){
            fetchAllProducts()
        }
    }, [brandName])
  return (
    <>
         {
            brandName && all_products?.length == 0  &&
            <div className='text-lg font-bold text-center '> No Product in This Brand {brandName} </div>
        }
        <div className='grid grid-cols-3 md:grid-cols-4  h-auto  text-xs lg:text-sm p-3 gap-3'>
            
            {
                  allBrandData && allBrandData.map(i=>(
                <Link key={i.name} href={i.url} className={`flex   items-center justify-center h-[50px] md:h-[100px]  gap-3   p-2 rounded-lg font-semibold text-white duration-300 ease-in-out ${brandName == i.name ? '  bg-black text-white' : ' bg-gradient-to-tr hover:bg-gradient-to-br from-cyan-500 to-blue-800 '} `}>
                    <p className=' text-center text-xl font-light '>{i.name} </p>
                </Link>
                ))
            }
        </div> 
        <div className='flex flex-col md:flex-row gap-4 p-4'>

        {
            brandName && all_products?.length > 0  &&
            all_products.map(i=>(
            <HomeProductCard key={i.p_id} p={i} />
            ))
        }
       
        </div>
    </>
  )
}

export default BrandPage
'use client'
import { getAllProducts } from '@/utils/getAllProducts'
import React, { useEffect, useState } from 'react'
import HomeProductCard from '../home/HomeProductCard'
import { handleSearch } from '@/utils/handleSearch'

const FindPage = () => {
    const [search, setSearch] = useState('')
    const [searchProducts, setSearchProducts] = useState([])
    const [notfound, setNotfound] = useState('')
    const [all_products, setAll_products] = useState(null)     

    const handleChange = (e)=>{
        const { name, value } = e.target;
        if(name == 'search'){
            setSearch(value)
            const matchingProducts = handleSearch(value, all_products);
            if(matchingProducts.length){
                setNotfound('')
                setSearchProducts(matchingProducts)
            }else{
                setSearchProducts([])
                setNotfound("Mobile not found ") 
            }
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
    }, [])
  return (
    <div className='bg-sky-100/50 p-3 rounded-lg'>
        <div className='flex items-center justify-center'>
            <input value={search} onChange={handleChange} type="text" name="search" id="search" className='p-2 rounded-lg w-[400px] shadow-md' placeholder=' Search Mobile'  />
        </div>
        <div className='p-3 pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-3 flex-wrap'>
            {
                all_products && search.length < 1 && notfound.length <1 &&
                all_products.map(i=>(
                <HomeProductCard key={i.p_id} p={i} />
                ))
            }
            {
                searchProducts && search.length > 0 &&
                searchProducts.map(i=>(
                <HomeProductCard key={i.p_id} p={i} />
                ))
            }
            {
                notfound
            }
        </div> 
    </div>
  )
}

export default FindPage
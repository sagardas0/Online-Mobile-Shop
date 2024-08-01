import React, { useEffect, useState } from 'react'
import { getAllProducts } from '@/utils/getAllProducts'
import AdminProductCard from './AdminProductCard'
import { handleDeleteProductFetch } from '@/utils/handleAddNewProduct'
import AdminProductUpdate from './AdminProductUpdate'

const AdminViewProducts = ({setShow}) => {
  const [all_products, setAll_products] = useState(null)
  const [showUpdateSection, setShowUpdateSection] = useState(false)
  const [product, setProduct] = useState(null)

  const fetchAllProducts = async() =>{

    console.log('fetching products')
    const serverResponse = await getAllProducts()
    if (serverResponse.status == 200) {
      setAll_products(serverResponse.data)
    }
  }
  useEffect(() => {
     fetchAllProducts()
  }, [])
  
  const handleDeleteProduct = async (p_id)=>{
    let data = await handleDeleteProductFetch(p_id)
    if(data.status == 200){
        fetchAllProducts()
    }
  } 

  const handleUpdate = (product)=>{
    setProduct(product)
    setShowUpdateSection(true)
  }
  if (all_products) {
    return (
      <div>
        {
          showUpdateSection ? 
          <h1 className='text-xl md:text-3xl p-3'>Update Product:</h1>
          :
          <h1 className='text-xl md:text-3xl p-3'>All Products:</h1>
        }
        {all_products.length > 0 ? '' : ' No Products Found, Create New One  '}
        <div className='flex flex-col md:flex-row flex-wrap '>
        {
          showUpdateSection &&
          <AdminProductUpdate 
          setShow={setShow} 
          product={product} 
          setShowUpdateSection={setShowUpdateSection}
          fetchAllProducts={fetchAllProducts}/>
        } 
        {
          all_products && !showUpdateSection &&
          all_products.map((p,i)=>(
          <AdminProductCard key={i} p={p}  handleDeleteProduct={handleDeleteProduct} handleUpdate={handleUpdate} />
          ))
        }
        
        </div>
      </div>
    )
  } else {
    return (
      <div>Loading All Products </div>
    )
  }  
  
}

export default AdminViewProducts
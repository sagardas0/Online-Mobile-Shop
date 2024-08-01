'use client'
import { useUserContext } from '@/components/context/UserContext'
import { checkProductAdded } from '@/utils/checkProductAdded'
import { getAddToCart } from '@/utils/getAddToCart'
import { getAllBrandInfo } from '@/utils/getAllBrandInfo'
import { getAllProducts } from '@/utils/getAllProducts'
import { setUserData } from '@/utils/handleUserData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {


  const userContext = useUserContext();
  const router = useRouter()
  const model = params.model 

  const [product, setProduct] = useState(null)
  const fetchAllProducts = async() =>{
    const serverResponse = await getAllProducts()
    if (serverResponse.status == 200) { 
      let allProduct = serverResponse.data
      let item = allProduct?.filter(i=> i.p_id == model)
      if(item.length){
        setProduct(item[0])
        checkAlreadyAdded()
      }else{
        router.push('/')
      }
    } 
  } 

  const [allBrandData, setAllBrandData] = useState(null)
   
  const getAllBrandData = async()=>{ 
      let data = await getAllBrandInfo() 
      if (data.status == 200) { 
          setAllBrandData(data.data) 
      } 
  } 

  
  const {user,setUser} = userContext 
  const [alreadyAdded, setAlreadyAdded] = useState(false)

  const handleAddToCart = async ()=>{
      //check if user logged in or not 
      if (!user.login && !user.email) {
          console.log("user not login ")
          router.push('/login')
      } else { 
          const data = await getAddToCart(model, user.email)
          console.log(data)
          setUserData({...user , ...data.data})
          setUser({...user , ...data.data})
          checkAlreadyAdded()
      }
  }
  const checkAlreadyAdded = async()=>{
      if (user.login && user.email) {
          //if logged in then 
          const data = await checkProductAdded(model,user.email)
          setAlreadyAdded(data.alreadyAdded)
      } 
  }
     
  useEffect(() => {
      fetchAllProducts() 
      getAllBrandData()
      checkAlreadyAdded()
  }, [])
  if (product) {
    return (
      <div className='flex items-center justify-center '>
        <div className='w-full lg:w-[80%] p-4'>
          <div className='grid grid-cols-1 lg:grid-cols-4'> 
            <div className='col-span-3 grid grid-cols-1 lg:grid-cols-5'>
              <div className='col-span-2'>
                {
                  product.images.length && 
                  product.images.map((i,index)=><img key={index} src={i}/>)
                }
                {
                  !product.images.length && 
                   <img src={product.img}/>
                }
              </div>
              <div className='col-span-3 p-3'>
                <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>ProductID:</span>
                    <span>{product.p_id}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Date:</span>
                    <span>{product.postDate}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Brand:</span>
                    <span>{product.brand}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Price:</span>
                    <span className=' font-bold text-sky-800  '>{product.price}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Camera:</span>
                    <span>{product.camera}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Battery:</span>
                    <span >{product.battery}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>RAM:</span>
                    <span>{product.ram}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>ROM:</span>
                    <span  >{product.rom}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>OS:</span>
                    <span>{product.os}</span>
                  </p>
                  <p className='flex gap-1'>
                    <span className=' font-semibold'>Display:</span>
                    <span  >{product.display}</span>
                  </p>
                  <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Name:</span>
                    <span className='text-2xl font-bold'>{product.p_title}</span>
                  </p>
                    
                  <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Description:</span>
                    <span>{product.p_description}</span>
                  </p>
                  <div className='py-2'>
                    {
                      userContext.user.login ?
                       !alreadyAdded ?
                        <button onClick={handleAddToCart} className='bg-sky-500 rounded-lg py-2 px-3 font-bold text-white hover:bg-sky-600 '>
                          Add to Cart
                          </button>
                        :
                        <button disabled className='bg-sky-500 rounded-lg py-2 px-3 font-bold text-white hover:bg-sky-600 '>
                        Already Added
                        </button>
                      :
                      <Link className='bg-sky-500 rounded-lg py-2 px-3 font-bold text-white hover:bg-sky-600 ' href={'/login'}>Add to Cart</Link>
                    }
                  </div>
                </div>
              </div> 
            </div>
            
            <div className=' relative '>
              <div className='bg-sky-100/50 sticky top-[10vh]  rounded-lg shadow-lg '>
                <h3 className='p-2 font-semibold'>See Models:</h3>
                <div className='grid grid-cols-3 md:grid-cols-4  h-auto  text-xs lg:text-sm p-3 gap-3'>
                  {
                    allBrandData && allBrandData.map(i=>(
                      <Link key={i.name} href={i.url} className='flex flex-col items-center gap-3 group bg-gradient-to-tr hover:bg-gradient-to-br from-cyan-500 to-blue-800 p-2 rounded-lg font-semibold text-white duration-300 ease-in-out '>
                        <p className=' font-light'>{i.name} </p>
                      </Link>
                    ))
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      )
  } else {
    return (
      <div> Loading Models</div>
      )
    
  }

}

export default page 
import BrandPage from '@/components/brand-page-component/BrandPage'
import React from 'react'

const page = () => { 
  return (
    <div className='w-full flex items-center justify-center p-5'>
      <div className='lg:w-[80%]'>
        <BrandPage/>
      </div>
  </div>
  )
}

export default page
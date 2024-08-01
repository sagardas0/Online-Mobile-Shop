import FindPage from '@/components/find-page-components/FindPage'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex items-center justify-center p-5'>
      <div className='lg:w-[80%]'>
        <FindPage/>
      </div>
    </div>
  )
}

export default page
'use client'
import UserDashboard from '@/components/user-dashboard-components/UserDashboard'
import UserLeftSideBar from '@/components/user-dashboard-components/UserLeftSideBar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/components/context/UserContext'; 

const Page = () => {
  const [showOnDashboard, setShowOnDashboard] = useState('myCart')
  const router = useRouter()
  const userContext = useUserContext();
  const {user} = userContext
   
  useEffect(() => {
    if(user.login == false){
      router.push('/login')
    }
  }, [])
  if (user.login == false) {
    return (
      <main className='flex items-center justify-center text-red-500 font-semibold h-screen text-3xl '>
        <p>Authenticating..</p>
      </main>
    )
  } else {
    return ( 
        <main className='relative grid grid-cols-1 md:grid-cols-12 p-1 gap-5 items-start'>
          <div className='md:sticky md:top-[10vh] md:col-span-2   md:h-[90vh]'>
            <UserLeftSideBar user={user} showOnDashboard={showOnDashboard} setShowOnDashboard={setShowOnDashboard} />
          </div>
          <div className=' md:col-span-10 min-h-[90vh]'>
            <UserDashboard user={user} showOnDashboard={showOnDashboard} setShowOnDashboard={setShowOnDashboard}/>
          </div>
        </main> 
    )
    
  }

  return (<div>Dashboard</div>)
}

export default Page
import React from 'react'
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/UserContext';
import { setUserData } from '@/utils/handleUserData';

const UserLeftSideBar = ({showOnDashboard,setShowOnDashboard}) => {
    const router = useRouter();
    const userContext = useUserContext();
    const {setUser} = userContext
    const handleLogout = ()=>{
        let userData = {login:false, email:'',password:'',type:''}
        setUserData(userData)
        setUser(userData)
        router.push('/login');
    }
    return (
    <div className='w-full h-full flex md:flex-col justify-between'>
        <div className='grid grid-cols-8 md:grid-cols-1 gap-1  w-full'>
            <button  
            onClick={()=>setShowOnDashboard('myCart')}
            className={` bg-sky-100/50 hover:bg-sky-200 p-2 select-none duration-150 ${showOnDashboard == 'myCart' && 'bg-sky-200 ' }`} >
                My Cart
            </button>
            <button  
            onClick={()=>setShowOnDashboard('confirmedOrder')}
            className={` bg-sky-100/50 hover:bg-sky-200 p-2 select-none duration-150 ${showOnDashboard == 'confirmedOrder' && 'bg-sky-200 ' }`} >
                 
                Confirmed Order
            </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-2'> 
            <button onClick={handleLogout} className='text-start p-2 bg-red-200 hover:text-red-500 hover:border-red-400 hover:bg-red-400/50  '>
                
                <span className='hidden md:inline-block'> Logout </span>
            </button>
        </div>
    </div>
  )
}

export default UserLeftSideBar
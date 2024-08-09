'use client'
import React, {  useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserContext } from './context/UserContext';
import { setUserData } from '@/utils/handleUserData';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = ()=> setShowNav(!showNav)
  
  const router = useRouter();
  const userContext = useUserContext();
  const {user,setUser} = userContext
  const handleLogout = ()=>{
    let userData = {login:false, email:'',password:'',type:''}
    setUserData(userData)
    setUser(userData)
    router.push('/login');
  }
 
  
  return (
    <div className='w-full lg:flex lg:items-center lg:justify-center shadow bg-sky-500/10 backdrop-blur-lg'>
      <nav className="  z-[99999999] text-secondary-color px-4 py-2 lg:px-5 lg:py-3 flex flex-col lg:flex-row items-start gap-10 lg:items-center justify-between lg:w-[80%]">
        <div className='flex w-[100%] lg:w-auto justify-between items-center z-[10000]'>
          <Link href="/" className="font-bold text-2xl text-black flex items-center gap-1">
            <span>
              <Image  width={32} height={32} src={"/favicon_io/favicon-32x32.png"} alt='branding logo'/>
            </span>
            <span className=' font-light text-sky-500'>
            Winwares Den 
            </span>
          </Link>
          <button onClick={handleShowNav} className=' lg:hidden'>
            { 
              showNav? 
              <span className=' text-red-500 text-xl '>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M12.854 2.854a.5.5 0 0 0-.708-.708L7.5 6.793L2.854 2.146a.5.5 0 1 0-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 0 0 .708.708L7.5 8.207l4.646 4.647a.5.5 0 0 0 .708-.708L8.207 7.5z" clipRule="evenodd"></path></svg>
              </span>
                :
                <span className=' text-2xl '>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"></path></svg>
              </span>
          }
          </button>
        </div>
        <ul onClick={handleShowNav} className={` ${showNav? " flex flex-col h-[90vh] gap-6": "  hidden "} z-[10000] lg:h-auto lg:gap-0 lg:flex lg:flex-row items-center font-medium`}>
          <li >
            <Link href="/find"  className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
              <span className='text-3xl'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><circle cx={11} cy={11} r={6}></circle><path strokeLinecap="round" d="M11 8a3 3 0 0 0-3 3m12 9l-3-3"></path></g></svg>            </span>
              <span>
                Find 
              </span>
            </Link>
          </li>
          <li>
            <Link href="/brands" className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
              <span className='text-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.05em" height="1em" viewBox="0 0 25 24"><path fill="currentColor" d="m12.02.002l3.49 7.988l7.987 3.49l-7.988 3.49l-3.49 7.989l-3.49-7.989l-7.988-3.49l7.988-3.49zm9.304 3.323l-1.568.78l1.568.781l.781 1.57l.781-1.57l1.57-.78l-1.57-.781l-.78-1.57zM12.02 4.998l-1.97 4.511l-4.512 1.971l4.511 1.971l1.971 4.512l1.971-4.512l4.512-1.97l-4.512-1.972zm7.316 9.758l1.3 2.61l2.61 1.3l-2.61 1.299l-1.3 2.61l-1.3-2.61l-2.61-1.3l2.61-1.299z"></path></svg>            </span>
              <span>
                Brands 
              </span>
            </Link>
          </li>
          <li>
            <Link href="/blogs"className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
              <span className='text-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 16.5h6v-1h-6zm0-4h9v-1h-9zm0-4h9v-1h-9zM5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M5 5v14z"></path></svg>            </span>
              <span>
              Blogs
              </span>
            </Link>
          </li>
          {
            userContext.user.login ?  
            <>
            <li>
              <Link href="/dashboard"  className='hover:text-black bg-sky-200   rounded-full px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56">
                  <path fill="currentColor" d="M28.012 28.023c5.578 0 10.125-4.968 10.125-11.015c0-6-4.5-10.711-10.125-10.711c-5.555 0-10.125 4.805-10.125 10.758c.023 6.023 4.57 10.968 10.125 10.968m0-3.539c-3.422 0-6.352-3.28-6.352-7.43c0-4.077 2.883-7.218 6.352-7.218c3.515 0 6.351 3.094 6.351 7.172c0 4.148-2.883 7.476-6.351 7.476m-14.719 25.22h29.438c3.89 0 5.742-1.173 5.742-3.75c0-6.142-7.735-15.024-20.461-15.024c-12.727 0-20.485 8.883-20.485 15.023c0 2.578 1.852 3.75 5.766 3.75m-1.125-3.54c-.61 0-.867-.164-.867-.656c0-3.844 5.953-11.04 16.71-11.04c10.759 0 16.688 7.196 16.688 11.04c0 .492-.234.656-.843.656Z"></path>
                </svg>            
              </span>
              <span>
                Dashboard
              </span>
            </Link>
            </li>
            <li>
            <button onClick={handleLogout} className='hover:text-black px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
              <span className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.518q-.213 0-.356-.143T4.019 12t.144-.357t.356-.143h8.368l-1.968-1.971q-.14-.14-.15-.338q-.009-.199.15-.364t.352-.168t.358.162l2.613 2.613q.243.243.243.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z"></path></svg>
              </span>
              <span>
                Logout
              </span>
            </button>
          </li> 
          </>
            :
            <li>
              <Link href="/login"  className='hover:text-black px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
                <span className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.518q-.213 0-.356-.143T4.019 12t.144-.357t.356-.143h8.368l-1.968-1.971q-.14-.14-.15-.338q-.009-.199.15-.364t.352-.168t.358.162l2.613 2.613q.243.243.243.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z"></path></svg>
                </span>
                <span>
                  Sign in  
                </span>
              </Link>
            </li>

          } 
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

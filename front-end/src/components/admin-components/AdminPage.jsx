'use client'
import React, { useEffect, useState } from 'react' 
import AdminLeftSideBar from './AdminLeftSideBar';
import AllUserView from './AllUserView';
import AllBrands from './AllBrands';
import AdminAddProduct from './AdminAddProduct';
import AdminViewProducts from './AdminViewProducts'; 
import { useUserContext } from '../context/UserContext';
import { getAdminData, handleAdminLogin, setAdminData } from '@/utils/handleAdminData';
import { isValidEmail } from '@/utils/emailValidChecker';
import AllOrders from './AllOrders';

const AdminPage = () => { 
    const userContext = useUserContext();
    const [showLogin, setshowLogin] = useState(true)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'email') {
        if(isValidEmail(value)){
            setEmail(value);
            setErrorEmail('')
        }else{
            setErrorEmail('Invalid Email Address!')
            setEmail(value);
        }
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const handleSubmit = async (event) => {
     if(email.length > 2 | password.length >2 ){
        let loginObj = {
          email,
          password
        }  
        //fetching data from server
        const loginServerData = await handleAdminLogin(loginObj)
        // console.log("get the login data",loginServerData)
        if (loginServerData.status == 200) {
          setErrorMessage('');
          let userData = {...loginServerData.data , login:true }
          //set item to localstorage 
          setAdminData(userData)
          userContext.setAdmin(userData)
          setshowLogin(false) 
        } else {
          setErrorMessage(loginServerData.message);
        }

      }
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    useEffect(() => {
        let foundAdmin = getAdminData()
        if (foundAdmin ?.login) {
            setshowLogin(false)
            userContext.setAdmin(foundAdmin)
            
        }
        if(userContext.admin.login){
            setshowLogin(false)
        }
      }, [])
    let showData = [
        {
            title: 'All User',
            value: 'AllUserView',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"></path>
                </svg>`,
        } ,
        {
            title: 'Brands',
            value: 'AllBrands',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.05em" height="1em" viewBox="0 0 25 24"><path fill="currentColor" d="m12.02.002l3.49 7.988l7.987 3.49l-7.988 3.49l-3.49 7.989l-3.49-7.989l-7.988-3.49l7.988-3.49zm9.304 3.323l-1.568.78l1.568.781l.781 1.57l.781-1.57l1.57-.78l-1.57-.781l-.78-1.57zM12.02 4.998l-1.97 4.511l-4.512 1.971l4.511 1.971l1.971 4.512l1.971-4.512l4.512-1.97l-4.512-1.972zm7.316 9.758l1.3 2.61l2.61 1.3l-2.61 1.299l-1.3 2.61l-1.3-2.61l-2.61-1.3l2.61-1.299z"></path></svg>            </span>
`,
        } , 
        {
            title: 'Add Product',
            value: 'AdminAddProduct',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
                </svg>`,
        } , 
        {
            title: 'All Products',
            value: 'AdminViewProducts',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2M1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1m16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2"></path>
                </svg>`,
        } ,  
        {
            title: 'Orders',
            value: 'AllOrders',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2m-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"></path></svg>`,
        } ,  
    ]
    const [show, setShow] = useState('AllUserView')
    if (showLogin) {
        return (
            <div className="w-full bg-gray-500   md:shadow flex items-center justify-center h-[90vh] p-5 ">
                <div className='flex flex-col gap-3 rounded backdrop-blur bg-white/30'>
                    <h2 className='font-semibold  p-5 py-10 pb-0  text-3xl md:text-4xl lg:text-5xl'>Admin Login</h2>
                    <div className="w-full  p-5  ">  
                        <div className="input-field flex flex-col gap-1">
                            <label htmlFor="email" className='font-semibold text-lg text-black/50'>Email:</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder='example@gmail.com'
                            onChange={handleChange}
                            className=' border-2 border-custom-violet rounded p-3'
                            />
                        </div>
                        {errorEmail && <p className="text-red-500 text-xs py-2">{errorEmail}</p>}
                        <div className="input-field flex flex-col gap-1 py-3">
                            <label htmlFor="password" className='font-semibold text-lg text-black/50'>Password:</label>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            placeholder='password'
                            onChange={handleChange}
                            className=' border-2 border-custom-violet rounded p-3'
                            />
                            <button type="button" className='text-xs text-start flex gap-2 items-center py-2' onClick={toggleShowPassword}>
                                <span className='text-base'>
                                    {showPassword ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"></path>
                                        </svg>
                                        : 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path>
                                        </svg>
                                    } 
                                </span>
                                <span>
                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                </span>
                            </button>
                        </div>
                        <button 
                        onClick={()=>{handleSubmit();}} 
                        className=' px-8 py-3 bg-slate-900/90 hover:bg-slate-900 duration-200 rounded-lg w-full font-bold text-white'
                        >Admin Login</button>
                        {errorMessage && <p className="text-red-500 text-xs py-2">{errorMessage}</p>}
                            
                    </div>
                </div>
                
            </div>
        )
    } else {
        return (
            <main className='flex flex-row bg-blue-200/80 bg-gradient-to-tr from-blue-200 via-sky-300 to-teal-200'>
                <AdminLeftSideBar 
                    setAdmin={userContext.setAdmin}
                    setshowLogin={setshowLogin} 
                    show={show} setShow={setShow} 
                    showData={showData} 
                    />
                <div className='p-5 w-full'>
                    {
                        show == 'AllUserView' &&
                        <AllUserView/>
                    }
                    {
                        show == 'AllBrands' &&
                        <AllBrands/>
                    }
                    {
                        show == 'AdminAddProduct' &&
                        <AdminAddProduct setShow={setShow}/>
                    }
                    {
                        show == 'AdminViewProducts' &&
                        <AdminViewProducts setShow={setShow}/>
                    }
                    {
                        show == 'AllOrders' &&
                        <AllOrders/>
                    }
                </div>
            </main>
        )
    }
}

export default AdminPage
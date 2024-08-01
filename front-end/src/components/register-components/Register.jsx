'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { isValidEmail } from '@/utils/emailValidChecker';
import { handleRegisterFunction } from '@/utils/handleRegisterFunction';
import { setUserData } from '@/utils/handleUserData';
import { useUserContext } from '../context/UserContext';
import { checkPasswordStrength } from '@/utils/passwordStrength';

const Register = () => {
  const router = useRouter();
    const userContext = useUserContext()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [passwordStrength, setPasswordStrength] = useState('')
    
    const [showPassword, setShowPassword] = useState(false);
  
    const handleChange = (event) => {
      const { name, value } = event.target;

      if (name === 'firstName') {
        setFirstName(value);
      } 
      else if (name === 'lastName') {
        setLastName(value);
      } 
      else if (name === 'email') {
        if(isValidEmail(value)){
            setEmail(value);
            setErrorEmail('')
        }else{
            setErrorEmail('Invalid Email Address!')
            setEmail(value);
        }
      } 
      else if (name === 'phoneNumber') {
        
        if(value.length != 11 ){
          setErrorPhone("Enter 11 Digit Phone Number")
        }else{
          setErrorPhone('')
        }
        setPhoneNumber(value);
      } 
      else if (name === 'address') {
        setAddress(value);
      } 
      else if (name === 'password') {
        setPassword(value);
        setPasswordStrength(checkPasswordStrength(password))
        
      } else if (name === 'confirmPassword') {
        setConfirmPassword(value);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      if(password.length < 6){
        setErrorPassword('Password is Weak')
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return; // Prevent further processing if passwords don't match
      }
       
      if(phoneNumber.length != 11){
        setErrorPhone("Invalid Mobile Number")
        return;
      } 
      let registerObj = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        ban: false 
      }
       
    
    let regData = await handleRegisterFunction(registerObj)
    console.log(regData)
   
    if (regData.status == 200) {
      setErrorMessage('');
      let userData = {...regData.data , login:true}
      //set item to localstorage 
      setUserData(userData)
      userContext.setUser(userData)
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } else {
      setErrorMessage(regData.message);
    }
     
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <div className="w-full lg:w-[50%]  flex items-center justify-center p-5 bg-sky-200/80 mt-5 rounded-lg ">
        {/* <div className=' flex items-center justify-center'>
            <img className='w-[90%] md:w-2/3' src="./signup.png" alt="" />
        </div> */}
        <div  >
            <h2 className='font-semibold  p-5 pb-0  text-3xl md:text-4xl lg:text-5xl'>Register</h2>
            <form onSubmit={handleSubmit} className="w-full  p-5 flex flex-col gap-1"> 
                <div className='flex flex-col lg:flex-row'>
                  <div className="input-field flex flex-col gap-1">
                      <label htmlFor="firstName" className='font-semibold text-lg text-black/50'>First Name:</label>
                      <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      placeholder='First Name'
                      onChange={handleChange}
                      className=' border-2 border-custom-violet rounded p-3'
                      required
                      />
                  </div>
                  <div className="input-field flex flex-col gap-1">
                      <label htmlFor="lastName" className='font-semibold text-lg text-black/50'>Last Name:</label>
                      <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      placeholder='Last Name'
                      onChange={handleChange}
                      className=' border-2 border-custom-violet rounded p-3'
                      required
                      />
                  </div>
                </div>
                <div className="input-field flex flex-col gap-1">
                    <label htmlFor="address" className='font-semibold text-lg text-black/50'>Address:</label>
                    <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    placeholder='St 04, Post Code , Country'
                    onChange={handleChange}
                    className=' border-2 border-custom-violet rounded p-3'
                    
                    />
                </div>
                <div className='flex flex-col lg:flex-row'>
                  <div className="input-field flex flex-col gap-1">
                      <label htmlFor="phoneNumber" className='font-semibold text-lg text-black/50'>Mobile:</label>
                      <input
                      type="tel" 
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      placeholder='01*********'
                      onChange={handleChange}
                      className=' border-2 border-custom-violet rounded p-3'
                      required
                      />
                      {errorPhone && <p className="text-red-500 text-xs py-2">{errorPhone}</p>}
                  </div>
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
                  {errorEmail && <p className="text-red-500 text-xs py-2">{errorEmail}</p>} 
                  </div> 
                </div>
                <div>
                </div>
                <div className="input-field flex flex-col gap-1 py-3">
                    <label htmlFor="password" className='font-semibold text-lg text-black/50'>Set Password:</label>
                    <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    placeholder='Set password'
                    onChange={handleChange}
                    className=' border-2 border-custom-violet rounded p-3'
                    />
                    {passwordStrength && <p className="text-purple-500 text-xs py-2">{passwordStrength}</p>}
                    <label htmlFor="confirmPassword" className='font-semibold text-lg text-black/50'>Confirm Password:</label>
                    <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder='Confirm password'
                    onChange={handleChange}
                    className=' border-2 border-custom-violet rounded p-3'
                    />
                    {errorPassword && <p className="text-red-500 text-xs py-2">{errorPassword}</p>}
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
                
                className=' px-8 py-3 bg-green-700 hover:bg-green-800 duration-200 rounded-lg w-full font-bold text-white'
                >Register</button>
                {errorMessage && <p key={'errormessage'} className="text-red-500 text-xs py-2">{errorMessage}</p>}
                <p className='font-light text-sm py-3'>
                    Already Have An Account? 
                    <span>
                        <Link 
                        href={'/login'} 
                        className=' underline underline-offset-2 pl-1 font-medium hover:text-slate-900'
                        >
                            Login Here
                        </Link>
                    </span>
                </p>
            </form>
        </div>
        
    </div>
  )
}

export default Register
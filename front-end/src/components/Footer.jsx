import React from 'react'; 
import Link from 'next/link'; 
import { footerData } from '@/constants/footerData';

function Footer() {
  return (
    <div className='flex flex-col items-center justify-center py-10 p-5'>
        <div className='w-full lg:w-[85%] md:p-5  grid grid-cols-1 md:grid-cols-10 gap-5'>
          <div className='md:col-span-8  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {
              footerData.map(i=>(
                <div key={i.name + '100'} className='flex flex-col gap-4' >
                  <p className='font-semibold text-lg'>{i.name}</p>
                  <div className='pl-3 flex flex-col gap-3 text-xs lg:text-sm'>
                    {i.subCats.map((j,index)=>(
                      <Link key={index + '200'} href={j.url} className='font-light hover:underline underline-offset-2 '>{j.name}</Link>
                    ))}

                  </div>
                </div>
              ))
            }
          </div>
          <div className='md:col-span-2 flex flex-col gap-3'>
              <p className='font-semibold text-lg'>Join Our Community </p>
              <p className='text-xs font-light'>to find the perfect mobile you dreamed ! Sign up now and make a difference in a Your life!</p>
              
          </div>
        </div>
        <footer className='text-xs flex items-center justify-center text-center  p-3'>
          <span>
          copyright 2024
          </span>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90m-34-90a34 34 0 0 0 61.2 20.4a6 6 0 0 1 9.6 7.21a46 46 0 1 1 0-55.22a6 6 0 0 1-9.6 7.21A34 34 0 0 0 94 128"></path>
          </svg>
          </span>
          <span> All Rights Reserved  </span>
        </footer>
        
    </div>
  );
}

export default Footer;

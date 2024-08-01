'use client' 
import React, { useState ,useEffect} from 'react'; 
import { useSearchParams,useRouter } from 'next/navigation'
import { getCartPaymentDetails } from '@/utils/getPaymentDetails';

export default function Page() { 
    const router = useRouter()
    const searchParams = useSearchParams()
    const [details, setDetails] = useState(null)
    let sessionID = searchParams.get('session_id') 
    let userID = searchParams.get('user_id')
    
    const handlePaymentDetails = async ()=>{
        if(sessionID && !details){
            let detailsData = await getCartPaymentDetails(sessionID)
            console.log(detailsData)
            setDetails(detailsData)
            router.push('/dashboard')
        }else{
            alert("no session id")
            router.push('/dashboard')
        }
    }
    // handlePaymentDetails()
    useEffect(()=>{
        if(!details){
            handlePaymentDetails()
        }
        if(details?.status == 200 ){
            console.log('redirect to dashboard')
            router.push('/dashboard')
        }
    },[details])
 return ( 
<div className='flex flex-col justify-center items-center gap-3 h-screen w-full bg-gray-200'>
    <p className='text-3xl font-bold text-green-500 '>Payment Success </p>
    {
        userID &&
        <p>User : {userID}</p>
    }
    {
        sessionID &&
        <p>sessionID : {sessionID}</p>
    }
   
</div> )
   
}
import React, { useEffect, useState } from 'react'
import { getAllUsersInfo } from '@/utils/getAllUsersInfo' 
import { handleBanned } from '@/utils/handleBanned'

const AllUserView = () => {
    const [allUsersData, setAllUsersData] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const getAllUsersData = async()=>{ 
        let data = await getAllUsersInfo()
        if (data.status == 200) {
            setAllUsersData(data.allUsers)
            setUserDetails(null)
        } 
    }
    const bannedUser = async(email)=>{
        let res = await handleBanned(email)
        if(res.status == 200){
            getAllUsersData()
        }
    }
    useEffect(()=>{
        getAllUsersData()
    },[])
    if (allUsersData) {
        return (
            <div className='  w-full min-h-[80vh] text-xs'>
                {
                    userDetails && 
                    <SingleUserView 
                        setUserDetails={setUserDetails} 
                        userDetails={userDetails} 
                        getAllUsersData={getAllUsersData} 
                        />
                }
                {
                    !userDetails && 
                    <table className=' table-fixed w-full'>
                        <thead>
                            <tr className='border-b-2 '>
                                <th className='p-2 px-3 text-start'>First Name</th>
                                <th className='p-2 px-3 text-start'>Last Name</th>
                                <th className='p-2 px-3 text-start'>Email</th>
                                <th className='p-2 px-3 text-start'>Passoword</th>
                                <th className='p-2 px-3 text-start'>Phone</th>
                                <th className='p-2 px-3 text-start'>Banned</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allUsersData.map((user,index)=>(
                                <tr key={index} className='border-b-2 '>
                                    <td className='p-2 px-3'>{user.firstName}</td>
                                    <td className='p-2 px-3'>{user.lastName}</td>
                                    <td className='p-2 px-3'>{user.email}</td>
                                    <td className='p-2 px-3 text-black/50'>{user.pwd}</td>
                                    <td className='p-2 px-3'>{user.phoneNumber}</td>
                                    <td className='p-2 px-3'>{user.banned?'Yes': 'No'}</td> 
                                    <td className=''>
                                        <button onClick={()=>bannedUser(user.email)} className='p-1 px-3 bg-red-500 rounded'>{user.banned?' UnBan ': ' Ban  '} User</button>
                                    </td> 
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                }
            </div>
          )
    } else {
        return (
            <div className='p-5' >Loading All Users Data</div>
          )
    }
  
}

export default AllUserView
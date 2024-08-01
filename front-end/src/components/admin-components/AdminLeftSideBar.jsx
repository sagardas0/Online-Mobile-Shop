import { clearAdminData } from '@/utils/handleAdminData'
import React from 'react'

const AdminLeftSideBar = ({show,setShow,showData,setshowLogin,setAdmin}) => {
  const handleAdminLogout = ()=>{
    clearAdminData()
    setshowLogin(true)
    setAdmin({ login:false, email:'', password:''})
  }
  return (
    <div className='flex flex-col justify-between min-h-[80vh] '>
      <div className='flex flex-col gap-2 max-w-[300px] w-[300px] py-3 '>
          {
              showData.map((s,i)=>(
                  <button 
                  onClick={()=>setShow(s.value)}
                  className={` px-3 py-3 font-semibold text-base capitalize  text-start
                      ${show == s.value && ' bg-blue-100 text-slate-900 '}
                      hover:bg-sky-100 hover:text-slate-900
                      flex gap-2
                      `}
                  key={i}>
                      <span className='text-2xl' dangerouslySetInnerHTML={{__html:s.icon}}/>

                      {s.title}
                  </button>
              ))
          }
      </div>
      <button 
        onClick={handleAdminLogout}
        className={` px-3 py-3 font-semibold text-base capitalize  text-start
              bg-red-600 hover:bg-red-500 text-white
              flex gap-2
              `} >
            <span className='text-2xl'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path strokeDasharray={32} strokeDashoffset={32} d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0"></animate></path><path strokeDasharray={12} strokeDashoffset={12} d="M9 12h11.5" opacity={0}><set attributeName="opacity" begin="0.5s" to={1}></set><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"></animate></path><path strokeDasharray={6} strokeDashoffset={6} d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5" opacity={0}><set attributeName="opacity" begin="0.7s" to={1}></set><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0"></animate></path></g></svg>
            </span>
            Logout
        </button>

    </div>
  )
}

export default AdminLeftSideBar
import React, { useEffect, useState } from 'react'
import { addNewBrand, deleteBrandFetch, getAllBrandInfo } from '@/utils/getAllBrandInfo' 

const AllBrands = () => {
    const [allBrandData, setAllBrandData] = useState(null)
    const [BrandDetails, setBrandDetails] = useState(null)
    const getAllBrandData = async()=>{ 
        let data = await getAllBrandInfo()
        //data.status == 200 
        if (data.status == 200) {
            // console.log(data.allVets)
            setAllBrandData(data.data)
            setBrandDetails(null)
        } 
    }
    useEffect(()=>{
        getAllBrandData()
    },[])


    const [brandName, setBrandName] = useState('');
    const [brandUrl, setBrandUrl] = useState('');
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'brandName') {
        let urlLike = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_')        // Replace spaces with underscores
        .replace(/_+/g, '_');        // Replace multiple underscores with a single one
  
        // You can use urlLike here or set it to state, for example:
        // setBrandUrl(urlLike);
        
        // console.log(urlLike); 
        setBrandName(value)
        setBrandUrl(urlLike)
      }  
    };

    const handleAddNewBrand = async ()=>{
        let url = '/brands?name='+brandUrl
        let checkName = allBrandData.filter(b=> b.url == url) 
        if(checkName.length <1){
            // console.log("handleAdd New Brand",brandName,brandUrl)
            let data = await addNewBrand(brandName,url) 
            if (data.status == 200) {
                getAllBrandData() 
                setBrandName('')
                setBrandUrl('') 
            } 
        }else{
            setBrandName('')
            setBrandUrl('')
    
        }
    }
    const deleteBrand = async (name,url)=>{
        let data = await deleteBrandFetch(name,url) 
            if (data.status == 200) {
                getAllBrandData() 
                setBrandName('')
                setBrandUrl('') 
            } 
    }

    if (allBrandData) {
        return (
            <div className='  w-full min-h-[80vh] text-xs'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div>
                        <table className='table-auto w-full'>
                            <thead>
                                <tr className='border-b-2  '>
                                    <th className='p-2 px-3 text-start'>Name</th>
                                    <th className='p-2 px-3 text-start'>URL</th> 
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allBrandData.map((brand,index)=>(
                                    <tr key={index} className='border-b-2 h-auto '>
                                    <td className='p-2 px-3'>{brand.name}</td>
                                    <td className='p-2 px-3'>{brand.url}</td>
                                        <td className=''>
                                            <button onClick={()=>deleteBrand(brand.name,brand.url)} className='p-1 px-3 bg-red-500 rounded'>Delete </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </div>
                    <div className='flex items-center justify-center'>
                    {
                        !BrandDetails &&
                        <div className="w-full lg:w-[90%]  p-5 rounded-xl bg-black/10  ">  
                            <h3 className='text-2xl font-bold '>Add New Brand</h3>
                            <div className="input-field flex flex-col gap-1">
                                <label htmlFor="brandName" className='font-semibold text-base text-black/50'>Name:</label>
                                <input
                                type="text"
                                id="brandName"
                                name="brandName"
                                value={brandName}
                                placeholder='Xiaomi'
                                onChange={handleChange}
                                className=' border-2 border-custom-violet rounded p-3 bg-white/50'
                                />
                            </div> 
                            <div className=" flex flex-col gap-1 py-3">
                                <p className='font-semibold text-base text-black/50' >URL:</p> 
                                <p className=' border-2 border-custom-violet rounded p-3'>/brands?name={brandUrl}</p>
                            </div>
                            <button 
                            onClick={handleAddNewBrand} 
                            className=' px-8 py-3 bg-slate-900/90 hover:bg-slate-900 duration-200 rounded-lg w-full font-bold text-white'
                            >Add Brand</button> 
                                
                        </div>
                    } 
                    </div>
                </div>
            </div>
          )
    } else {
        return (
            <div className='p-5' >Loading All Brands Data</div>
          )
    }
}
export default AllBrands

 
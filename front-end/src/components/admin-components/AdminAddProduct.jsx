
import './customImgInput.css'
import React, { useEffect, useState } from 'react'
import { getFormattedDate } from '@/utils/getDate';
import { uploadImages } from '@/utils/handleUploadImages';
import { handleAddNewProduct } from '@/utils/handleAddNewProduct';
import { generateUniqueID } from '@/utils/UniqueIDGenerator';
import { getAllBrandInfo } from '@/utils/getAllBrandInfo';

const AdminAddProduct = ({setShow}) => {
  
  const [formData, setFormData] = useState({
    p_id: generateUniqueID(),
    inStock:true,
    p_title: '',
    p_description: '',
    brand: 'Walton',
    img: 'https://www.mobiledokan.co/wp-content/uploads/2024/07/Honor-Magic-V3-Green.webp',
    images: [],
    price: 10,
    postDate: getFormattedDate(),
    os:'',
    display: '',
    camera: '',
    battery: '',
    ram: '',
    rom: '',
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [errorImages, setErrorImages] = useState('');

  const handleChange =  (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
    setErrorImages('')
    const files = [...event.target.files]; // Get all selected files

    const validImages = files.filter((file) => {
      const fileType = file.type;
      return fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg';
    });

    const imageDataPromises = validImages.map((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image); // Read image as data URL

      return new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result); // Resolve with base64 string
        reader.onerror = (error) => reject(error); // Handle errors
      });
    });

    Promise.all(imageDataPromises)
      .then((base64Images) => {
        setSelectedImages([...selectedImages, ...base64Images]); // Update state
      })
      .catch((error) => {
        console.error('Error reading image files:', error);
      });
    } else {
      if (name == 'price') {
        if (value > 0 && value < 100000) {
          setFormData({ ...formData, [name]: value });

        } else {
          formData.price = 10
        }
      } else {
        setFormData({ ...formData, [name]: value });
        
      }
    }
  };

  const removeImage =  (index) => {
    let newList = selectedImages.filter((i,indx )=> indx !== index)
    setSelectedImages(newList)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if( selectedImages.length == 0){
      setErrorImages("No Image Uploaded !")
      return;
    }
    const images = selectedImages
    const imgURLs = await uploadImages(images)

    const product = {...formData}
    console.log(product)
    product.images = imgURLs
    product.img = imgURLs[0]
 
    const serverResponse = await handleAddNewProduct({product:product})
    
    if(serverResponse.status ==200){
       
      setShow('AdminViewProducts')
    }else{
      alert( serverResponse.status + serverResponse.message )
    }
    
    setFormData({
      p_id: generateUniqueID(),
      inStock:true,
      p_title: '',
      p_description: '',
      brand: 'Walton',
      img: 'https://www.mobiledokan.co/wp-content/uploads/2024/07/Honor-Magic-V3-Green.webp',
      images: [],
      price: 10,
      postDate: getFormattedDate(),
      os:'',
      display: '',
      camera: '',
      battery: '',
      ram: '',
      rom: '',
    }); 
    setSelectedImages([]);
  };

  const [allBrandData, setAllBrandData] = useState(null)
    const getAllBrandData = async()=>{ 
        let data = await getAllBrandInfo()
        if (data.status == 200) {
            setAllBrandData(data.data)
        } 
    }
    useEffect(()=>{
        getAllBrandData()
    },[])
  return (
    <>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 px-3'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-1 p-3 bg-white rounded-lg'>
          <h2 className='text-xl md:text-3xl p-3'>Add New Product</h2>
          <div className='w-full'>
            <div className='font-semibold'>
              Upload Images: 
            </div>
            <div className='flex flex-col gap-5 '> 
                <div className='w-full grid grid-cols-4 gap-5'>
                    <div className="custom-file-upload w-full h-full aspect-[4/3] ">
                        <label htmlFor="images" className=' w-full h-[100%]   cursor-pointer'>
                        <div className='w-full border h-full flex flex-col items-center justify-center rounded shadow hover:shadow-md duration-100 hover:text-custom-violet-light'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
                                </svg>
                            </span>
                            Upload
                        </div>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/png, image/jpeg "
                            onChange={(e)=>handleChange(e)}
                        /> 
                        </label>
                    </div>
                    {selectedImages.length > 0 && (
                        <>
                        {
                            selectedImages.map((image, index) => (
                                <div key={index} className='relative rounded'> 
                                    <img  src={image} alt={`Selected ${index + 1}`} className='rounded' />
                                    <button onClick={()=>removeImage(index)} className='bg-red-200 text-red-500 rounded-full hover:bg-red-500 hover:text-white duration-200 font-bold absolute top-1 right-2 p-2'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                                                <path fill="currentColor" fillRule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            ))
                        }
                        </>
                    )}
                </div> 
            </div> 
          </div>
          {errorImages && <p className='text-xs font-semibold text-red-500'>{errorImages}</p>}
          <div className=" w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="p_title" className='font-semibold'>Product Title:</label>
            <input
              type="text"
              id="p_title"
              name="p_title"
              value={formData.p_title}
              onChange={handleChange}
              required
              className='p-2 bg-gray-500/10 '
              placeholder='Product Title'
            />
          </div>
          <div className='grid w-full grid-cols-2'>
            <div className=" w-full flex flex-col gap-2  p-2">
              <label htmlFor="price" className='font-semibold'>Product Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product Title'
              />
            </div>
            <div className="w-full flex flex-col gap-2 p-2">
              <label htmlFor="brand" className='font-semibold'>Brand:</label>
              <select 
              id="brand" 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              required
              className='p-2 border-none rounded bg-gray-500/10'
              
              > 
              {
                allBrandData && allBrandData.map((b,i)=> (
                  <option key={i} value={b.name}>{b.name}</option>

                ))
              } 
              </select>
            </div> 
          </div>
          
          <div className='grid w-full grid-cols-2'>
            <div className=" w-full flex flex-col gap-2 p-2">
              <label htmlFor="os" className='font-semibold'>OS:</label>
              <input
                type="text"
                id="os"
                name="os"
                value={formData.os}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product os'
              />
            </div>
            <div className=" w-full flex flex-col gap-2 p-2">
              <label htmlFor="display" className='font-semibold'>Display:</label>
              <input
                type="text"
                id="display"
                name="display"
                value={formData.display}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product display'
              />
            </div>
          </div>
          <div className='grid w-full grid-cols-2'>
            <div className=" w-full flex flex-col gap-2  p-2">
              <label htmlFor="ram" className='font-semibold'>Camera:</label>
              <input
                type="text"
                id="camera"
                name="camera"
                value={formData.camera}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product camera'
              />
            </div>
            <div className=" w-full flex flex-col gap-2   p-2">
              <label htmlFor="battery" className='font-semibold'>Battery:</label>
              <input
                type="text"
                id="battery"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product battery'
              />
            </div>
          </div>
          <div className='grid w-full grid-cols-2'>
            <div className=" w-full flex flex-col gap-2  p-2">
              <label htmlFor="ram" className='font-semibold'>RAM:</label>
              <input
                type="text"
                id="ram"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product ram'
              />
            </div>
            <div className=" w-full flex flex-col gap-2   p-2">
              <label htmlFor="rom" className='font-semibold'>ROM:</label>
              <input
                type="text"
                id="rom"
                name="rom"
                value={formData.rom}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='Product rom'
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="p_description" className='font-semibold'>Product Description:</label>
              
            <textarea 
            name="p_description" 
            id="p_description" 
            rows="10"
            className='p-2 bg-gray-500/10 '
            placeholder='Product Description'
            required
            value={formData.p_description} 
            onChange={handleChange} 
            ></textarea>
          </div>
          <button type="submit" 
          className='bg-blue-500/80 hover:bg-blue-500 text-white px-5 py-2 rounded-lg w-full md:w-2/3 font-bold duration-200'>
            Add Product
          </button>
        </form>
        <div className='px-2'> 
          <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white'>
              <img className='w-full z-0' src={selectedImages.length? selectedImages[0] : formData.img} alt={formData.petNickname} />
            <div className='p-2'>
                
              <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>ProductID:</span>
                  <span>{formData.id}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Date:</span>
                  <span>{formData.postDate}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Brand:</span>
                  <span>{formData.brand}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Price:</span>
                  <span className='font-bold  text-sm'>{formData.price}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Camera:</span>
                  <span>{formData.camera}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Battery:</span>
                  <span >{formData.battery}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>RAM:</span>
                  <span>{formData.ram}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>ROM:</span>
                  <span  >{formData.rom}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>OS:</span>
                  <span>{formData.os}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Display:</span>
                  <span  >{formData.display}</span>
                </p>
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Title:</span>
                  <span>{formData.p_title}</span>
                </p>
                  
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Description:</span>
                  <span>{formData.p_description}</span>
                </p>
                  
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAddProduct


 
 
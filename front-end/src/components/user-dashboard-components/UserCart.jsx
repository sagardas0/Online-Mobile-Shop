import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext";
import { getMyCart } from "@/utils/getMyCart"; 
import UserCartCard from "./UserCartCard";
import { calculateCartTotal } from "@/utils/CartCalculations";
import { handleCreateStripeSessionForOrder } from "@/utils/handleCreateStripeSession";

const UserCart = () => {
  const userContext = useUserContext();
  const {user} = userContext
  const [myCart, setMyCart] = useState(null) 
  const [banned, setBanned] = useState(false) 
   
  // get user cart details 
  const fetchCart = async() =>{
    console.log('fetching cart Data')
    const serverResponse = await getMyCart(user.email,user._id)
    if (serverResponse.status == 200) {
      setBanned(serverResponse.banned)
      setMyCart(serverResponse.cart)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])
 
  const handleCheckoutToStipe = async ()=>{ 
    let totalPrice = calculateCartTotal(myCart)
    if (totalPrice > 0) {
      console.log(totalPrice)
      // let amount = p + '00' 
      let data = await handleCreateStripeSessionForOrder(totalPrice,user._id)
      if (data.url) {
        console.log("data found !!", data)
        window.location.href = data.url;//forwarding to stripe session url
      } 
    } 
  } 
  if(banned){
    return (
      <>
        <h2 className='text-lg p-10 font-semibold text-center flex items-center justify-center min-h-80vh w-full '>Your account has been suspended.<br /> For security reasons, we cannot disclose specific details about this action. <br /> If you have questions, please contact our support team.</h2>
      </>
    )
  }else{
    return (
      <div className='min-h-[screen]'>
        <h2 className='text-lg font-semibold '>My Cart to Checkout: </h2>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 relative '>
          <div className='order-2 lg:order-1 lg:col-span-9  min-h-screen'>
            <p>Cart Items: {myCart && myCart.length} {!myCart && 0}</p>
            <div className="grid grid-cols-1 gap-3 p-2 ">
              {
                myCart && 
                myCart.map((p,i)=>(
                  <UserCartCard key={i} p={p} fetchCart={fetchCart} />
                ))
              }
            </div>
          </div>
          <div className=' order-1 lg:order-2 lg:col-span-3 shadow-lg lg:sticky lg:top-[100px] lg:right-[0px] h-[300px] bg-sky-100 rounded-lg p-2 text-sky-600 flex flex-col justify-between'>
            <div> 
              <table className=" table-fixed text-xs">
                <thead>
                  <tr className="text-sm ">
                    <th className=" p-2">No.</th>
                    <th className=" p-2">Product</th>
                    <th className=" p-2">Qty</th>
                    <th className=" p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myCart && 
                    myCart.map((c,i)=>(
                      <tr key={i}>
                        <td className=" px-2 text-center">{i+1}</td>
                        <td className=" px-2">{c.productTitle}</td>
                        <td className=" px-2 text-center">{c.quantity}</td>
                        <td className=" px-2 text-center">{c.totalAmount}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <p className="border-t-2 border-sky-600  mt-2 w-full flex justify-between px-5 ">
                <span>Total:</span>
                <span>{myCart && calculateCartTotal(myCart)}</span>
              </p>
            </div>
            
            <button 
              onClick={handleCheckoutToStipe}
              className='flex items-center justify-center  gap-3 text-center p-3 rounded-xl w-full shadow bg-sky-500 hover:bg-sky-600 font-semibold text-white'>
                Checkout <span className='text-2xl'>৳</span> {myCart && calculateCartTotal(myCart)}
            </button>
          </div>
  
        </div>
      </div>
    )
  }

}

export default UserCart
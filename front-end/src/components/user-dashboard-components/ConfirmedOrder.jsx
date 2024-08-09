import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext";
import UserOrderCard from "./UserOrderCard";
import { getMyOrder } from "@/utils/getMyOrder";

const ConfirmedOrder = () => {
  const userContext = useUserContext();
  const {user} = userContext
  const [myOrder, setMyOrder] = useState(null) 
  
  const fetchCart = async() =>{
    const serverResponse = await getMyOrder(user.email)
    if (serverResponse.status == 200) {
      setMyOrder(serverResponse.order)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])
 
   

  return (
    <div className='min-h-[screen]'>
      <h2 className='text-lg font-semibold '>All Confimed Orders: </h2>
          <p>Cart Items: {myOrder && myOrder.length} {!myOrder && 0}</p>
          <div className="grid grid-cols-1 gap-3 p-2 ">
            {
              myOrder && 
              myOrder.slice().reverse().map((order,index)=>
                <div key={index} className="flex flex-col py-3 border-b ">
                    <div>
                        <p> Order No: {index + 1} </p>
                        <p className="flex items-center ">Total: <span className='text-2xl'>৳</span> {order.total_amount} </p>
                        <p className={` py-2 px-5 text-sm ${order.orderCompleted? " bg-green-500 ": " bg-red-500 "} inline-block rounded-full font-semibold text-white`}>Delivery: {order.orderCompleted? " complete ": " Pending "}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {
                            order.cart.map((p,i)=>(
                            <UserOrderCard key={i} p={p}  />
                            ))
                        }
                    </div>
                </div>)
            }
          </div>
      
    </div>
  )
}

export default ConfirmedOrder
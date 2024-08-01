import { getAllOrders } from '@/utils/getMyOrder'
import React, { useEffect, useState } from 'react'
import UserOrderCard from '../user-dashboard-components/UserOrderCard'
import { handleMarkOrder } from '@/utils/handleMarkOrder'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const handleAllOrders = async ()=>{
    let data = await getAllOrders()
    if (data.status == 200) { 
      setOrders(data.data)
     } 
  }
  const MarkOrderAndUpdate =async (order)=>{
    order.orderCompleted = true
    let updatedOrderList = await handleMarkOrder(order)
    setOrders(updatedOrderList.data)
  }
  useEffect(()=>{
    handleAllOrders()
  },[])
  return (
    <div>
      <h1 className='text-3xl font-bold'>
      Total Order: {orders.length}
      </h1>
      <div>
      {
          orders && 
          orders.map((order,index)=>
            <div key={index} className="flex flex-col py-3 border-b ">
                <div>
                    <p> Order No: {index + 1} </p>
                    <p>Total: ${order.total_amount} </p>
                    <p className={` py-2 px-5 text-xs ${order.orderCompleted? " bg-green-500 ": " bg-red-500 "} inline-block rounded-full font-semibold text-white`}>Delivery: {order.orderCompleted? " complete ": " Pending "}</p>
                    <br />
                    <button onClick={()=>MarkOrderAndUpdate(order)} className={` py-2 px-5 text-sm ${order.orderCompleted? " bg-red-500 ": " bg-green-500 "} hover:shadow my-2 rounded-full font-semibold text-white`}>Mark as {order.orderCompleted? "Pending  ": "completed  "}</button>
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

export default AllOrders
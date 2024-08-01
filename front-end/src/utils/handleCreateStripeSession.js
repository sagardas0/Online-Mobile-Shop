export const handleCreateStripeSession = async (amount,serviceId,user_id)=>{ 
    const url = `http://localhost:4000/api/stripe-get?amount=${amount}&serviceId=${serviceId}&user_id=${user_id}`;
    let response = await fetch(url,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
            }, 
        }
    );
      let data =  await response.json()
      console.log(data)
      return data 
}
export const handleCreateStripeSessionForOrder = async (totalAmount,user_id)=>{

    const url = `http://localhost:4000/api/stripe-get-orders?amount=${totalAmount}&user_id=${user_id}`;
    let response = await fetch(url,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
            }, 
        }
    );
      let data =  await response.json()
      console.log(data)
      return data 
}
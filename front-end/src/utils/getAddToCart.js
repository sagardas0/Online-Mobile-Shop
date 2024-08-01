export const getAddToCart = async (product_id, user_email)=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           });
     
        const response = await fetch(`http://localhost:4000/api/add-to-cart?p_id=${product_id}&user_email=${user_email}`, {
          method: 'Get',
          headers, 
        });      
    
        const data = await response.json();
    
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}


export const getRemoveFromCart = async (product_id, user_email)=>{
  try { 
      const headers = new Headers({
         'Content-Type': 'application/json', 
         });
   
      const response = await fetch(`http://localhost:4000/api/remove-from-cart?p_id=${product_id}&user_email=${user_email}`, {
        method: 'Get',
        headers, 
      });      
  
      const data = await response.json();
  
      return data; // return the response data
    } catch (error) {
      console.error('Fetching error:', error.message);
    }
}

export const updateCartItem = async (product,quantity,totalAmount,user_email)=>{
  product.quantity = quantity
  product.totalAmount = totalAmount 
  try {
    // Prepare the request body and headers
    const bodyData = {
      product: product,
      user_email: user_email
    }
    const body = JSON.stringify(bodyData);
    console.log("Body is ",bodyData)

    const headers = new Headers({
       'Content-Type': 'application/json',
       'Access-Control-Request-Method': 'POST'
       });

    // Send the POST request
    const response = await fetch('http://localhost:4000/api/update-cart', {
      method: 'POST',
      headers,
      body,
    }); 
    // Parse the response data 
    const data = await response.json();

    return data; // return the response data
  } catch (error) {
    console.error(' error:', error.message);
  }
}
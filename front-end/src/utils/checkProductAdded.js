export const checkProductAdded = async (product_id, user_email)=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           });
     
        const response = await fetch(`http://localhost:4000/api/get-cart-details?p_id=${product_id}&user_email=${user_email}`, {
          method: 'Get',
          headers, 
        });      
    
        const data = await response.json();
    
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}
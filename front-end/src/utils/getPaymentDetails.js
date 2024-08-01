export const getPaymentDetails = async (session_id)=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           });
     
        const response = await fetch(`http://localhost:4000/api/stripe/success?session_id=${session_id}`, {
          method: 'Get',
          headers, 
        });      
    
        const data = await response.json();
    
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}

export const getCartPaymentDetails = async (session_id)=>{
  try { 
      const headers = new Headers({
         'Content-Type': 'application/json', 
         });
   
      const response = await fetch(`http://localhost:4000/api/stripe/success-order?session_id=${session_id}`, {
        method: 'Get',
        headers, 
      });      
  
      const data = await response.json();
  
      return data; // return the response data
    } catch (error) {
      console.error('Fetching error:', error.message);
    }
}
export const handleMarkOrder =async (order)=>{
    try { 
        const body = JSON.stringify({order});
        // console.log("Body is ",body)
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
    
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/update-order', {
          method: 'POST',
          headers,
          body,
        });  
        const data = await response.json();
        console.log('response:', data);
        console.log('status:', data?.status);
    
        return data;
      } catch (error) {
        console.error(' error:', error.message);
      }
}
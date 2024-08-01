export const handleBanned =async (email)=>{
    try { 
        const body = JSON.stringify({ email });
  
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
     
        const response = await fetch('http://localhost:4000/api/ban', {
          method: 'POST',
          headers,
          body,
        });
        // console.log("response is ", response)
         
        const data = await response.json(); 
    
        return data; 
      } catch (error) {
        console.error('login error:', error.message); 
      }

}
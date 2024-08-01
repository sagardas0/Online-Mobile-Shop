export const getAllProducts = async ()=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           }); 
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/all-products', {
          method: 'Get',
          headers, 
        });
        // Parse the response data 
        const data = await response.json(); 
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}
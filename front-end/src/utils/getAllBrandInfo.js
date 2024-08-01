export const getAllBrandInfo = async ()=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           }); 
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/all-brand', {
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

export const addNewBrand = async (name,url)=>{
    try { 
      const body = JSON.stringify({name:name,url:url});
        const headers = new Headers({
           'Content-Type': 'application/json', 
           }); 
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/add-brand', {
          method: 'POST',
          headers, 
          body
        });
        // Parse the response data 
        const data = await response.json(); 
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}
export const deleteBrandFetch = async (name,url)=>{
    try { 
      const body = JSON.stringify({name:name,url:url});
        const headers = new Headers({
           'Content-Type': 'application/json', 
           }); 
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/delete-brand', {
          method: 'POST',
          headers, 
          body
        });
        // Parse the response data 
        const data = await response.json(); 
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}
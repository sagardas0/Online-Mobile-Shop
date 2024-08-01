export const  handleAddNewProduct = async (product)=>{
    try { 
      const body = JSON.stringify(product);
      console.log("Body is ",body)
      const headers = new Headers({
         'Content-Type': 'application/json',
         'Access-Control-Request-Method': 'POST'
         });
  
      // Send the POST request
      const response = await fetch('http://localhost:4000/api/create-product', {
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
export const  handleUpdateProduct = async (product)=>{
    try { 
      const body = JSON.stringify(product);
      // console.log("Body is ",body)
      const headers = new Headers({
         'Content-Type': 'application/json',
         'Access-Control-Request-Method': 'POST'
         });
  
      // Send the POST request
      const response = await fetch('http://localhost:4000/api/update-product', {
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

export const  handleDeleteProductFetch = async (p_id)=>{
  try { 
    const body = JSON.stringify({p_id});
    console.log("Body is ",body)
    const headers = new Headers({
       'Content-Type': 'application/json',
       'Access-Control-Request-Method': 'POST'
       });

    // Send the POST request
    const response = await fetch('http://localhost:4000/api/delete-product', {
      method: 'POST',
      headers,
      body,
    }); 
    // Parse the response data 
    const data = await response.json();
    console.log('response:', data);
    console.log('status:', data?.status);

    return data; // return the response data
  } catch (error) {
    console.error(' error:', error.message);
  }
}
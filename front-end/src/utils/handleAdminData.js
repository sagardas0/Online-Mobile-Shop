export const getAdminData = () => {
    const storedAdmin = localStorage.getItem('winwareAdmin');
    if (storedAdmin) {
      return JSON.parse(storedAdmin);
    }
    return null;
  };
  
  export const setAdminData = (user) => {
    console.log("setting Admin data", user)
    localStorage.setItem('winwareAdmin', JSON.stringify(user));
  };
  
  export const clearAdminData = () => {
    localStorage.removeItem('winwareAdmin');
  };

  export async function handleAdminLogin(adminData) { 
    try {
      // Prepare the request body and headers
      const body = JSON.stringify({...adminData});

      const headers = new Headers({
         'Content-Type': 'application/json',
         'Access-Control-Request-Method': 'POST'
         });
  
      // Send the POST request
      const response = await fetch('http://localhost:4000/api/admin-login', {
        method: 'POST',
        headers,
        body,
      });
      console.log("response is ", response)
      
  
      // Parse the response data 
      const data = await response.json();
    //   console.log('login response:', data);
      console.log('admin login status:', data?.status);
  
      return data; // return the response data
    } catch (error) {
      console.error('login error:', error.message);
    //   return Promise.reject(error); // Return a rejected promise for error handling
    }
  }
  
  
  
export function handleSearch(searchValue, allProducts) {
    // Convert search value to lowercase for case-insensitive matching
    const searchLower = searchValue.toLowerCase();
  
    // Define the properties to search in
    const propertiesToSearch = [
      'p_title', 'p_description', 'ram', 'rom', 'camera', 'battery', 'brand', 'os'
    ];
  
    // Filter the products array
    return allProducts.filter(product => {
      // Check each property for a match
      return propertiesToSearch.some(prop => {
        // Get the property value, convert to string and lowercase
        const propValue = String(product[prop] || '').toLowerCase();
        // console.log(prop, " " ,propValue)
        // Check if the property value includes the search string
        return propValue.includes(searchLower);
      });
    });
  }
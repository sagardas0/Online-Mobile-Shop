export function calculateTotalAmount(quantity, price) {
    // Check quantity data type
    if (typeof quantity !== 'number') {
      try {
        quantity = parseFloat(quantity).toFixed(2);
      } catch (error) {
        // Handle invalid quantity format (e.g., "five")
        throw new TypeError('Invalid quantity format. Please enter a number.');
      }
    }
  
    // Check price data type
    if (typeof price !== 'number') {
      try {
        price = parseFloat(price);
      } catch (error) {
        // Handle invalid price format (e.g., "$10")
        throw new TypeError('Invalid price format. Please enter a number.');
      }
    }
  
    // Validate quantity (must be positive)
    if (quantity <= 0) {
      throw new RangeError('Quantity must be a positive number.');
    }
  
    // Validate price (must not be negative)
    if (price < 0) {
      throw new RangeError('Price cannot be negative.');
    }
  
    // Calculate total amount
    const totalAmount = quantity * price;
  
    return totalAmount;
  }
  

  export const calculateCartTotal = (cart) => {
    return cart.reduce((total, product) => {
      let productTotal = 0;
      try {
        // Convert totalAmount to a number
        productTotal = parseFloat(product.totalAmount);
        
        // Check if it's a valid number
        if (isNaN(productTotal)) {
          throw new Error('Invalid number');
        }
      } catch (error) {
        console.warn(`Invalid totalAmount format for product with ID: ${product.id}. Ignoring product.`);
        return total; // Skip this product
      }
      return total + productTotal;
    }, 0).toFixed(2); // Apply toFixed(2) after all calculations
  };
  
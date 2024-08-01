export const checkAlreadyAddedProduct = (cart,product)=>{
    return cart.findIndex(item => item.p_id === product.p_id) !== -1;
}
export const generateUniqueID = ()=> {
    const charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueID = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      uniqueID += charPool[randomIndex];
    }
  
    return uniqueID;
  }
  
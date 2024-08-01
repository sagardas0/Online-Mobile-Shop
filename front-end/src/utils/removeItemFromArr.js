export function removeItemFromArray(arr, index) {
    const newArr = arr
    if (index >= 0 && index < newArr.length) {
        newArr.splice(index, 1); // Remove one element starting from index
      return newArr; // Return the updated array
    }
    return newArr; // Return original array if index is invalid
  }
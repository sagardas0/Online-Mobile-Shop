export function getFormattedDate() {
    const today = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    // console.log(today.toLocaleDateString('en-US', options))
    return today.toLocaleDateString('en-US', options);
  }
  
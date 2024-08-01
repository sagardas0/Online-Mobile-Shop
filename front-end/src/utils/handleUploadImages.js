// Function to upload a single image and return the server-returned image path
async function uploadImage(imageData) {
    try {
        const response = await fetch('http://localhost:4000/api/upload-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST'
            },
            body: JSON.stringify({ imageData })
        });

        const responseData = await response.json();
        return responseData.imagePath; // server returns the image path in the response
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

// Function to upload multiple images and return an array of image paths
export async function uploadImages(images) {
    const imagePaths = [];

    for (const imageData of images) {
        const imagePath = await uploadImage(imageData);
        if (imagePath) {
            imagePaths.push(imagePath);
        }
    }

    return imagePaths;
}

 
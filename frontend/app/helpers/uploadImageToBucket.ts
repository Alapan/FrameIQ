async function uploadImageToBucket(file: File) {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: file?.name }),
  }

  fetch(`${process.env.NEXT_PUBLIC_SIGNED_SERVICE_BASE_URL}/uploads/sign`, options)
    .then(response => response.json())
    .then(async data => {
      await fetch(data.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: file,
      });
      console.log('File uploaded successfully!');
    })
    .catch(error => {
      throw new Error(`Error in uploading file to bucket! ${error}`);
    });
};

export default uploadImageToBucket;

import {Storage} from '@google-cloud/storage';

const storage = new Storage();

async function generateUploadSignedUrl(fileName: string) {
  try {
    const options = {
      version: 'v4' as const,
      action: 'write' as const,
      expires: Date.now() + 15 * 60 * 1000,
      contentType: 'application/octet-stream'
    };
    
    const [url] = await storage.bucket(process.env.BUCKET_NAME || '').file(fileName).getSignedUrl(options);
    return url;
  } catch (error) {
    console.error("Error in generating signed URL! ", error);
  }
}

export default generateUploadSignedUrl;

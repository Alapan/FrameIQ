import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/bmp' | 'image/webp';

interface Image {
  bucket: string;
  name: string;
  type: ImageMimeType;
}

async function analyseImage(imageData: Image): Promise<string> {
  const client = new GoogleGenAI({
    vertexai: true,
    project: GOOGLE_CLOUD_PROJECT,
    location: GOOGLE_CLOUD_LOCATION,
  });

  const uri = `gs://${imageData.bucket}/${imageData.name}`;
  const image = {
    fileData: {
      fileUri: uri,
      mimeType: imageData.type,
    },
  };

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [image, 'What is shown in this image?'],
  });

  return response.text || 'No response from AI model';
}

export { analyseImage };

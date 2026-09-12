import { Firestore } from '@google-cloud/firestore';

interface Image {
  name: string;
  contentType: string;
};

const db = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  databaseId: process.env.FIRESTORE_DB,
});

async function saveResponseToDb(image: Image, aiResponse: string): Promise<void> {
  try {
    const docRef = db.collection('image_analysis_results').doc();
    await docRef.set({
      name: image.name,
      contentType: image.contentType,
      analysisOutput: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    throw new Error(`Error saving AI response to Firestore: ${error}`);
  }
};

export { saveResponseToDb };

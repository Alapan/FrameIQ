import express, {Request, Response} from 'express';
import cors from 'cors';
import { analyseImage } from './analyseImage';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.post('/image-processing', async (req: Request, res: Response) => {
  try{
    if (!req.body) {
      return res.status(400).json({ error: 'No Pub/Sub message received!' });
    }

    if(!req.body.message) {
      return res.status(400).json({ error: 'Invalid Pub/Sub message format!' });
    }

    const pubSubMessage = req.body.message;
    const data = pubSubMessage.data ? JSON.parse(Buffer.from(pubSubMessage.data, 'base64').toString().trim()): null;
    console.log(`Received image data: ${data}`);

    const aiResponse = await analyseImage({
      bucket: data?.bucket,
      name: data?.name,
      type: data?.contentType,
    });

    console.log(`AI response: ${aiResponse}`);

    return res.status(200).json({ analysisOutput: aiResponse });
  } catch (error) {
    console.log(`Error in processing image! ${error}`);
    return res.status(200).json({ error: 'Error in processing image!' });
  }
});

app.listen(PORT, () => {
  console.log(`Image processing service is running on port ${PORT}`);
});

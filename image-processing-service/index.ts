import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.post('/image-processing', (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: 'No Pub/Sub message received!' });
  }

  if(!req.body.message) {
    return res.status(400).json({ error: 'Invalid Pub/Sub message format!' });
  }

  const pubSubMessage = req.body.message;
  const data = pubSubMessage.data ? Buffer.from(pubSubMessage.data, 'base64').toString().trim(): null;
  console.log(`Received image data: ${data}`);
  res.json({ data });
});

app.listen(PORT, () => {
  console.log(`Image processing service is running on port ${PORT}`);
});

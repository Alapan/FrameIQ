import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateUploadSignedUrl from './generateUploadSignedUrl';

dotenv.config({ path: './.env'});
const app = express();
const PORT = 8000;

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());

app.post('/uploads/sign', async (req: Request, res: Response) => {
  const {filename} = req.body;

  if (!filename) {
    return res.status(400).json({
      error: 'Filename is missing!'
    });
  }

  const signedUrl = await generateUploadSignedUrl(filename);
  return res.json({ signedUrl });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

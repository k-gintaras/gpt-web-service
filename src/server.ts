import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import GptService from './gpt/gptApiAssistantRequest';

dotenv.config();

const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.post('/gpt-request', async (req, res) => {
  const { userInput } = req.body;
  console.log('Received user input:', userInput);

  try {
    const gptKey = process.env.GPT_API_KEY;
    if (!gptKey) {
      throw new Error('GPT API key not found');
    }

    const gptService = new GptService(gptKey);
    const response = await gptService.getFastGptAdvice(userInput);

    console.log('Generated response:', response);
    res.json({ text: response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

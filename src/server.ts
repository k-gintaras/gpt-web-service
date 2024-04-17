import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';

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

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: userInput,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.choices[0].text.trim();
    res.json({ text: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

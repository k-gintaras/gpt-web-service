import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import GptService from './gpt/gptApiAssistantRequest';

import { apiKeyAuthMiddleware } from './helpers/apiKeyAuthMiddleware';

dotenv.config();

const app = express();

// const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://taskorator.web.app/';

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Check if the origin is allowed
//       if (!origin || ALLOWED_ORIGIN) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     allowedHeaders: ['Content-Type', 'Authorization', 'user-id'], // Include 'user-id' in the allowed headers
//   })
// );
const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN_WEB_APP || 'http://localhost:3000', // Firebase web app
  process.env.ALLOWED_ORIGIN_LOCAL || 'http://localhost:3000', // Access from your laptop locally
  process.env.ALLOWED_ORIGIN_IP || 'http://localhost:3000', // Replace this with your laptop's local IP
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization', 'user-id'],
  })
);

// app.use(
//   cors({
//     origin: ALLOWED_ORIGIN,
//     methods: ['POST'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use(express.json());

// app.post('/gpt-request', async (req, res) => {
//   const { userInput } = req.body;
//   console.log('Received user input:', userInput);

//   try {
//     const gptKey = process.env.GPT_API_KEY;
//     if (!gptKey) {
//       throw new Error('GPT API key not found');
//     }

//     const gptService = new GptService(gptKey);
//     const response = await gptService.getFastGptAdvice(userInput);

//     console.log('Generated response:', response);
//     res.json({ text: response });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
app.post('/gpt-request', apiKeyAuthMiddleware, async (req, res) => {
  const { userInput } = req.body;
  console.log('Received user input:', userInput);

  try {
    const gptKey = process.env.GPT_API_KEY;
    if (!gptKey) {
      throw new Error('GPT API key not found');
    }

    const gptService = new GptService(gptKey);
    const response = await gptService.getFastGptTaskAdvice(userInput);

    console.log('Generated response:', response);
    res.json({ text: response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.get('/ping', async (req, res) => {
  const { userInput } = req.body;

  try {
    
    res.json({ text: "pong" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
// const port = process.env.PORT || 3000;
const port = parseInt(process.env.PORT || '3000', 10);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

export { app };

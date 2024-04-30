import GptService from './gpt/gptApiAssistantRequest';

async function testGptService() {
  const gptKey = process.env.GPT_API_KEY;
  if (!gptKey) {
    throw new Error('GPT API key not found');
  }
  const gptService = new GptService(gptKey);

  const userInput = 'learning cloud services, advice me please';
  const response = await gptService.getFastGptTaskAdvice(userInput);

  console.log('User input:', userInput);
  console.log('Generated response:', response);
}

testGptService().catch((error) => {
  console.error('Error:', error);
});

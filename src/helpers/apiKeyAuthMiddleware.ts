import { apiKeyValidator } from './apiKeyValidator';

const apiKeyAuthMiddleware = (req: any, res: any, next: any) => {
  const userId: string | undefined = req.headers['user-id']; // Extract user ID from request headers

  if (!userId || !apiKeyValidator(userId)) {
    // Validate API key using a validator function
    return res.status(401).json({ error: 'Unauthorized' }); // Unauthorized if API key is missing or invalid
  }

  next(); // Proceed to next middleware or endpoint handler
};

export { apiKeyAuthMiddleware };

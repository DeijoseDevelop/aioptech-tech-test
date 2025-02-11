import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: 'Acceso denegado. API Key inválida.' });
    return;
  }

  next();
};
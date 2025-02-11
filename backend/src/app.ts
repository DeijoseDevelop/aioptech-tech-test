import express from 'express';
import cors from "cors";
import itemRoutes from './routes/vehicleRoutes';
import geminiRoutes from "./routes/geminiRoutes";
import { validateApiKey } from './middleware/authMiddleware';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());
app.use(validateApiKey);

app.get('/health-check', (req: Request, res: Response) => {
    res.json({ message: 'Esta es una ruta pública' });
});

app.use('/api/v1/vehicles', itemRoutes);
app.use('/api/v1/gemini/generate', geminiRoutes);

export default app;
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createVehicleContext } from '../utils/createVehicleContext';
import { VehicleRepository } from '../repositories/vehicleRepository';

dotenv.config();

const repository = new VehicleRepository();

export const geminiController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ message: 'El campo "prompt" es obligatorio.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ message: 'API Key de Gemini no encontrada.' });
    }

    const vehicles = await repository.getAll();
    if (!vehicles || vehicles.length === 0) {
      res.status(404).json({ message: 'No hay vehículos disponibles en la base de datos.' });
    }

    const vehicleContext = createVehicleContext(vehicles);

    const fullPrompt = `A continuación se muestran los datos actuales de los vehículos disponibles:\n\n${vehicleContext}\n\nPregunta del usuario: ${prompt}\n\nResponde de forma detallada y precisa, utilizando la información proporcionada.`;

    const genAI = new GoogleGenerativeAI(apiKey!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent(fullPrompt);
    const generatedText = result.response.text();

    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error('Error en geminiController:', error);
    res.status(500).json({ message: 'Error al generar texto con Gemini.' });
  }
};

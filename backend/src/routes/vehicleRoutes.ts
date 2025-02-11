import express from 'express';
import {
  getAllItems,
} from '../controllers/vehicleController';

const router = express.Router();

router.get('/', getAllItems);

export default router;
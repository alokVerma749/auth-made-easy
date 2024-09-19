import express from 'express';
import { testController } from '../controllers/testControllers.js';

const router = express.Router();

router.get('/', testController);

export default router;

import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/singup', signup);
router.post('/singin', signin);

export default router;

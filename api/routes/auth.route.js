import express from 'express';
import { signup, signin, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/singup', signup);
router.post('/singin', signin);
router.post('/google', google);

export default router;

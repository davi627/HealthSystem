// routes/User.js
import express from 'express';
import { createUser, loginUser } from '../Controllers/UserControllers.js';
import { authenticateUser } from '../middlewares/middlewares.js';

const router = express.Router();

router.post('/create', authenticateUser, createUser);
router.post('/login', loginUser);

export default router;

import express from 'express';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../Controllers/AdminControllers.js';
import { authenticateUser } from '../middlewares/middlewares.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);
router.get('/profile', authenticateUser, getAdminProfile);



export default router;
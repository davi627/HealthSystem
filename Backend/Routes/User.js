// routes/User.js
import express from 'express';
import {
  createUser,
  loginUser,
  getUsersByRole,
  toggleUserStatus,
  deleteUser
} from '../Controllers/UserControllers.js';
import { authenticateUser,authenticatAdmin } from '../middlewares/middlewares.js';

const router = express.Router();

// Create user
router.post('/create', authenticatAdmin, createUser);

// User login
router.post('/login', loginUser);

// Fetch users by role
router.get('/:role', authenticatAdmin, getUsersByRole);

// Toggle user status (activate/deactivate)
router.put('/:userId/toggleStatus', authenticateUser, toggleUserStatus);

// Delete a user
router.delete('/:userId', authenticateUser, deleteUser);

export default router;

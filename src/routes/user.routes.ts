import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller';

const router = Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', getUserProfile);

export default router;
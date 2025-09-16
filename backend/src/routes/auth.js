import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';

// Define authentication routes
const router = Router();

// Register new users
router.post('/signup', signup);
// Authenticate existing users
router.post('/login', login);

export default router;
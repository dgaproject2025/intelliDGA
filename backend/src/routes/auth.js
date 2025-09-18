//import { Router } from 'express';

//const router = Router();

// Simple ping to verify router is mounted
//router.get('/ping', (req, res) => {
//res.json({ ok: true, route: 'auth', msg: 'auth router is alive' });
//});

//export default router;

import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// health ping keeps as-is
router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'auth', msg: 'auth router is alive' });
});

// auth endpoints
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', requireAuth, getMe);

export default router;

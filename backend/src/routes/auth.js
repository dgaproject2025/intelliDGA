import { Router } from 'express';

const router = Router();

// Simple ping to verify router is mounted
router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'auth', msg: 'auth router is alive' });
});

export default router;

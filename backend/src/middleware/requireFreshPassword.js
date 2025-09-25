// backend/src/middleware/requireFreshPassword.js
import { isPasswordExpired } from '../utils/passwordPolicy.js';

export function requireFreshPassword(req, res, next) {
  const user = req.userEntity; // set by requireAuth (we’ll set this below)
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  if (isPasswordExpired(user)) {
    return res.status(403).json({
      message: 'Password expired. Please reset your password to continue.',
      code: 'PASSWORD_EXPIRED',
    });
  }
  next();
}

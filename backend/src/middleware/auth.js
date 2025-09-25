// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export const requireAuth = async (req, res, next) => {
  try {
    // 1) Read token from cookie or Authorization: Bearer <token>
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // 2) Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // 3) Load the user entity (minimal fields needed downstream)
    const user = await User.findById(decoded.id).select(
      'fullName email username role organization status passwordLastChanged'
    );
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    if (user.status === 'locked' || user.status === 'inactive') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    // 4) Attach both lightweight and full entity
    req.user = { id: user._id, role: user.role };
    req.userEntity = user; // <-- used by requireFreshPassword

    return next();
  } catch (err) {
    // jwt.verify throws on expiry/invalid signature, etc.
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

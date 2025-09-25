import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User.js';
import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import { getMe } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { needsPasswordReset } from '../utils/passwordCheck.js';

const router = Router();

// health ping keeps as-is
router.get('/ping', (req, res) => {
  res.json({ ok: true, route: 'auth', msg: 'auth router is alive' });
});

// auth endpoints
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
//router.get('/me', requireAuth, getMe);
// Get current user with password expiry info
/*router.get('/me', requireAuth, getMe, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const mustReset = needsPasswordReset(user, 90);

    return res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
        organization: user.organization,
        passwordLastChanged: user.passwordLastChanged,
      },
      mustReset,
    });
  } catch (err) {
    console.error('GET /me error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});*/
router.get('/me', requireAuth, getMe);
router.post('/request-reset', async (req, res) => {
  try {
    const email = req.body?.email?.toLowerCase();
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    // Avoid user enumeration: respond 200 even if not found
    if (!user) {
      return res.status(200).json({
        message: 'If that email exists, a reset link has been sent.',
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    // In production: email a link containing this token
    // For now, surface the URL to test end-to-end
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetURL = `${clientURL}/reset-password?token=${token}`;

    return res.status(200).json({
      message: 'Reset link generated.',
      resetURL, // for testing; remove in prod
      token, // for testing; remove in prod
      expiresAt: expires.toISOString(),
    });
  } catch (err) {
    console.error('request-reset error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Reset password with token:
 * – Validates token and expiry
 * – Updates password (will re-hash if using pre-save)
 * – Clears token fields
 */
/*router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: 'Token and password are required' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // 🔒 hash the new password (your model does NOT hash on save)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    // Clear any existing session cookie so user must re-login
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true if HTTPS
      path: '/',
    });

    return res.status(200).json({ message: 'Password updated.' });
  } catch (err) {
    console.error('reset-password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});*/

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: 'Token and password are required' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    }).select('+password'); // fetch password to compare

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // 🔒 Reject if new password is same as current
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res.status(400).json({
        message: 'New password cannot be the same as the current password.',
      });
    }

    // 🔑 Hash and update password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    user.passwordLastChanged = new Date();
    await user.save();

    // 🔐 Clear cookie to force re-login
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true if HTTPS
      path: '/',
    });

    return res
      .status(200)
      .json({ message: 'Password updated. Please log in again.' });
  } catch (err) {
    console.error('reset-password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;

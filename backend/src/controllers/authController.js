import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/** CONFIG */
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d'; // e.g., "1d", "12h"
const LOCK_THRESHOLD = 5; // max failed attempts
const LOCK_WINDOW_MIN = 15; // lock account for N minutes

/** helpers */
const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

const setTokenCookie = (res, token) => {
  // httpOnly cookie; secure=true recommended in prod with HTTPS
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

const minutesFromNow = (mins) => new Date(Date.now() + mins * 60 * 1000);

/** POST /api/auth/signup */
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      username,
      password,
      organization,
      role, // optional
    } = req.body;

    if (
      !fullName ||
      !email ||
      !mobile ||
      !username ||
      !password ||
      !organization
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Uniqueness checks
    const exists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { mobile },
        { username },
        { fullName },
      ],
    });
    if (exists) {
      return res
        .status(409)
        .json({ message: 'A user with provided unique fields already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      mobile,
      username,
      password: hashed,
      organization,
      role: role || 'user',
      createdBy: 'self',
    });

    const token = signToken({ id: user._id, role: user.role });
    setTokenCookie(res, token);

    return res.status(201).json({
      message: 'Signup successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        username: user.username,
        organization: user.organization,
        role: user.role,
        createdAt: user.createdAt,
      },
      token, // also return in body for non-cookie clients
    });
  } catch (err) {
    console.error('registerUser error:', err);

    // Friendly duplicate handling (Mongo E11000)
    if (err?.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'field';
      return res
        .status(409)
        .json({
          message: `Duplicate value for ${field}. Please use a different ${field}.`,
        });
    }

    return res.status(500).json({ message: 'Server error' });
  }
};

/** POST /api/auth/login
 * Accepts either (email + password) OR (username + password)
 */
export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res
        .status(400)
        .json({ message: 'Provide email/username and password' });
    }

    const query = email ? { email: email.toLowerCase() } : { username };

    const user = await User.findOne(query).select(
      '+password +loginAttempts +lockedUntil +status'
    );
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Account status / lock checks
    if (user.status === 'locked') {
      // Optional: auto-unlock after time
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        return res.status(423).json({ message: 'Account locked. Try later.' });
      }
      // else allow attempt (will clear below if success)
    }
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res
        .status(423)
        .json({ message: 'Account temporarily locked. Try later.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= LOCK_THRESHOLD) {
        user.status = 'locked';
        user.lockedUntil = minutesFromNow(LOCK_WINDOW_MIN);
      }
      await user.save({ validateBeforeSave: false });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // success: reset audit counters
    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    user.status = 'active';
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken({ id: user._id, role: user.role });
    setTokenCookie(res, token);

    return res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        username: user.username,
        organization: user.organization_1,
        role: user.role,
        lastLogin: user.lastLogin,
      },
      token,
    });
  } catch (err) {
    console.error('loginUser error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/** POST /api/auth/logout */
export const logoutUser = async (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res.json({ message: 'Logged out' });
};

/** GET /api/auth/me */
export const getMe = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const me = await User.findById(req.user.id).select('-password');
    if (!me) return res.status(404).json({ message: 'User not found' });
    return res.json({ user: me });
  } catch (err) {
    console.error('getMe error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

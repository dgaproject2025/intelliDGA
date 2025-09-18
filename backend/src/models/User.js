import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // exclude password from queries unless explicitly requested
    },
    organization: {
      type: String,
      required: true,
      trim: true,
      //unique: true, // ensures the same user cannot have multiple organizations
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'locked'],
      default: 'active',
    },

    // 🔎 Audit fields
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: {
      type: Date, // if too many failed attempts, lock account until this date
    },
    createdBy: {
      type: String, // username or ID of creator
      default: 'system',
    },
    updatedBy: {
      type: String, // username or ID of last updater
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Ensure email is always lowercase before saving
userSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;

// backend/src/utils/passwordPolicy.js
export const PASSWORD_MAX_AGE_DAYS = Number(
  process.env.PASSWORD_MAX_AGE_DAYS || 90
);
export const PASSWORD_WARNING_DAYS = Number(
  process.env.PASSWORD_WARNING_DAYS || 7
);
export const PASSWORD_GRACE_DAYS = Number(process.env.PASSWORD_GRACE_DAYS || 0); // usually 0

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function passwordAgeDays(user) {
  const last = user?.passwordLastChanged
    ? new Date(user.passwordLastChanged)
    : null;
  if (!last) return Number.POSITIVE_INFINITY;
  return (Date.now() - last.getTime()) / MS_PER_DAY;
}

export function daysUntilExpiry(user) {
  const age = passwordAgeDays(user);
  // time remaining before hitting max age (can be negative when expired)
  return Math.ceil(PASSWORD_MAX_AGE_DAYS - age);
}

export function needsPasswordReset(user) {
  // >= 90 days
  return passwordAgeDays(user) >= PASSWORD_MAX_AGE_DAYS;
}

export function isPasswordExpired(user) {
  // include any grace if you choose to use it
  return passwordAgeDays(user) >= PASSWORD_MAX_AGE_DAYS + PASSWORD_GRACE_DAYS;
}

export function isInWarningWindow(user) {
  // 83–89 days by default
  const left = daysUntilExpiry(user);
  // show warning when remaining days is within [0..7] (i.e., <=7 but >0^)
  return left > 0 && left <= PASSWORD_WARNING_DAYS;
}

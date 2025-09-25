// backend/src/utils/passwordCheck.js
export function needsPasswordReset(user, maxAgeDays = 90) {
  if (!user.passwordLastChanged) return true; // force reset if missing
  const ageMs = Date.now() - new Date(user.passwordLastChanged).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return ageDays >= maxAgeDays;
}

const bcrypt = require('bcrypt');

/**
 * Hashes password using bcrypt.
 * Middleware type: pre-save.
 * @param next
 */
function hashPassword(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);
      user.password = hash;
      return next();
    });
  });
}

module.exports = {
  hashPassword,
};

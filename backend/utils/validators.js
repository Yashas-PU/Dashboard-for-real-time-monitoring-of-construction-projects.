exports.validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.validatePassword = (password) => {
  return password.length >= 6;
};

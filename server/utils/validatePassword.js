function validatePassword(password) {
  // criteria for password validation
  const minLength = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumbers = /[0-9]/;
  const hasSpecialChars = /[\W_]/; 

  // check minimum length
  if (password.length < minLength) {
    return {
      valid: false,
      error: "Password must be at least 8 characters long.",
    };
  }

  // check for uppercase letters
  if (!hasUppercase.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one uppercase letter.",
    };
  }

  // check for lowercase letters
  if (!hasLowercase.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one lowercase letter.",
    };
  }

  // check for numbers
  if (!hasNumbers.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one number.",
    };
  }

  // check for special characters
  if (!hasSpecialChars.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one special character.",
    };
  }

  // if all checks pass
  return { valid: true, error: null };
}

module.exports = validatePassword;

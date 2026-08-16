export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 50) {
    return 'Password must be less than 50 characters';
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return null; // Phone is optional
  }
  const phoneRegex = /^[\\+\d\s\-\\(\\)]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Weak', color: 'text-danger-500' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = [
    { score: 0, label: 'Weak', color: 'text-danger-500' },
    { score: 1, label: 'Weak', color: 'text-danger-500' },
    { score: 2, label: 'Fair', color: 'text-warning-500' },
    { score: 3, label: 'Good', color: 'text-info-500' },
    { score: 4, label: 'Strong', color: 'text-success-500' },
    { score: 5, label: 'Very Strong', color: 'text-success-600' },
  ];

  return levels[score] || levels[0];
};

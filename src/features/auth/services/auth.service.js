import storageService from './storage.service';
import tokenService from './token.service';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateConfirmPassword,
} from '../utils/validators';

// Mock user database (stored in localStorage)
class AuthService {
  constructor() {
    this.storage = storageService;
    this.tokenService = tokenService;
    this.users = this.loadUsers();
  }

  loadUsers() {
    const users = this.storage.getItem('users');
    return users || [];
  }

  saveUsers(users) {
    this.storage.setItem('users', users);
    this.users = users;
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Register new user
  async register(userData) {
    await this.delay(800);

    // Validate
    const nameError = validateName(userData.name);
    if (nameError) throw new Error(nameError);

    const emailError = validateEmail(userData.email);
    if (emailError) throw new Error(emailError);

    const passwordError = validatePassword(userData.password);
    if (passwordError) throw new Error(passwordError);

    const confirmError = validateConfirmPassword(userData.password, userData.confirmPassword);
    if (confirmError) throw new Error(confirmError);

    if (userData.phone) {
      const phoneError = validatePhone(userData.phone);
      if (phoneError) throw new Error(phoneError);
    }

    // Check if user exists
    const existingUser = this.users.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = {
      id: this.generateId(),
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: btoa(userData.password), // Mock hashing
      phone: userData.phone || '',
      role: userData.role || 'user',
      avatar: userData.avatar || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVerified: false,
      favorites: [],
      preferences: {
        notifications: true,
        emailUpdates: true,
      },
    };

    this.users.push(newUser);
    this.saveUsers(this.users);

    // Generate verification token (mock)
    const verificationToken = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      verificationToken,
      message: 'Registration successful. Please verify your email.',
    };
  }

  // Login user
  async login(credentials) {
    await this.delay(600);

    const { email, password, rememberMe = false } = credentials;

    const emailError = validateEmail(email);
    if (emailError) throw new Error(emailError);

    if (!password || password.length < 6) {
      throw new Error('Invalid credentials');
    }

    // Find user
    const user = this.users.find((u) => u.email === email.toLowerCase().trim());
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password (mock)
    if (btoa(password) !== user.password) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.tokenService.generateMockToken(user);

    // Update last login
    user.lastLogin = new Date().toISOString();
    this.saveUsers(this.users);

    // Save session
    const { password: _, ...userWithoutPassword } = user;
    this.storage.saveUser(userWithoutPassword);
    this.storage.setToken(token);

    if (rememberMe) {
      this.storage.setItem('rememberMe', true);
    }

    return {
      user: userWithoutPassword,
      token,
      message: 'Login successful',
    };
  }

  // Logout user
  async logout() {
    await this.delay(300);
    this.storage.logout();
    this.storage.removeItem('rememberMe');
    return { message: 'Logged out successfully' };
  }

  // Forgot password
  async forgotPassword(email) {
    await this.delay(700);

    const emailError = validateEmail(email);
    if (emailError) throw new Error(emailError);

    const user = this.users.find((u) => u.email === email.toLowerCase().trim());
    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        message: 'If an account exists with this email, you will receive a password reset link.',
      };
    }

    // Generate reset token (mock)
    const resetToken = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour
      })
    );

    this.storage.setItem('resetToken', resetToken);

    return {
      message: 'Password reset link has been sent to your email.',
      resetToken,
    };
  }

  // Reset password
  async resetPassword(token, newPassword, confirmPassword) {
    await this.delay(700);

    const passwordError = validatePassword(newPassword);
    if (passwordError) throw new Error(passwordError);

    const confirmError = validateConfirmPassword(newPassword, confirmPassword);
    if (confirmError) throw new Error(confirmError);

    // Decode token
    let decoded;
    try {
      decoded = JSON.parse(atob(token));
    } catch {
      throw new Error('Invalid or expired reset token');
    }

    const { userId, expires } = decoded;
    if (new Date(expires) < new Date()) {
      throw new Error('Reset token has expired');
    }

    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('Invalid reset token');
    }

    // Update password
    user.password = btoa(newPassword);
    user.updatedAt = new Date().toISOString();
    this.saveUsers(this.users);

    this.storage.removeItem('resetToken');

    return {
      message: 'Password has been reset successfully. Please login with your new password.',
    };
  }

  // Verify email
  async verifyEmail(token) {
    await this.delay(500);

    let decoded;
    try {
      decoded = JSON.parse(atob(token));
    } catch {
      throw new Error('Invalid verification token');
    }

    const { userId, email } = decoded;
    const user = this.users.find((u) => u.id === userId && u.email === email);
    if (!user) {
      throw new Error('Invalid verification token');
    }

    if (user.isVerified) {
      throw new Error('Email already verified');
    }

    user.isVerified = true;
    user.updatedAt = new Date().toISOString();
    this.saveUsers(this.users);

    return {
      message: 'Email verified successfully. You can now login.',
    };
  }

  // Get current session
  getSession() {
    return this.storage.getSession();
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.storage.isLoggedIn();
  }

  // Update user profile
  async updateProfile(userId, updates) {
    await this.delay(500);

    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate updates
    if (updates.name) {
      const nameError = validateName(updates.name);
      if (nameError) throw new Error(nameError);
    }

    if (updates.email) {
      const emailError = validateEmail(updates.email);
      if (emailError) throw new Error(emailError);

      // Check if email is taken
      const existingUser = this.users.find((u) => u.email === updates.email && u.id !== userId);
      if (existingUser) {
        throw new Error('Email is already taken');
      }
    }

    Object.assign(user, updates);
    user.updatedAt = new Date().toISOString();
    this.saveUsers(this.users);

    // Update session
    const { password: _, ...userWithoutPassword } = user;
    this.storage.saveUser(userWithoutPassword);

    return {
      user: userWithoutPassword,
      message: 'Profile updated successfully',
    };
  }

  // Get user by ID
  getUserById(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Add to favorites
  async addToFavorites(userId, propertyId) {
    await this.delay(300);

    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      user.updatedAt = new Date().toISOString();
      this.saveUsers(this.users);

      // Update session
      const { password: _, ...userWithoutPassword } = user;
      this.storage.saveUser(userWithoutPassword);
    }

    return {
      favorites: user.favorites,
      message: 'Added to favorites',
    };
  }

  // Remove from favorites
  async removeFromFavorites(userId, propertyId) {
    await this.delay(300);

    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.favorites = user.favorites.filter((id) => id !== propertyId);
    user.updatedAt = new Date().toISOString();
    this.saveUsers(this.users);

    // Update session
    const { password: _, ...userWithoutPassword } = user;
    this.storage.saveUser(userWithoutPassword);

    return {
      favorites: user.favorites,
      message: 'Removed from favorites',
    };
  }
}

export const authService = new AuthService();
export default authService;

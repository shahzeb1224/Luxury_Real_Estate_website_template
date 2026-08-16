import storageService from './storage.service';

class TokenService {
  constructor() {
    this.storage = storageService;
  }

  getToken() {
    return this.storage.getToken();
  }

  setToken(token) {
    this.storage.setToken(token);
  }

  removeToken() {
    this.storage.removeToken();
  }

  hasToken() {
    return !!this.getToken();
  }

  decodeToken(token) {
    try {
      if (!token) return null;
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  isTokenValid(token) {
    const decoded = this.decodeToken(token);
    if (!decoded) return false;
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false;
    }
    return true;
  }

  // Mock token generation (will be replaced by backend)
  generateMockToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role || 'user',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    };
    // Simple mock token (base64 encoded)
    const token = btoa(JSON.stringify(payload));
    return token;
  }

  getCurrentUser() {
    const token = this.getToken();
    return this.decodeToken(token);
  }
}

export const tokenService = new TokenService();
export default tokenService;

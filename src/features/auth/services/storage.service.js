const STORAGE_VERSION = '1.0.0';
const STORAGE_KEY = 'elite_auth';

class StorageService {
  constructor() {
    this.storage = localStorage;
    this.key = STORAGE_KEY;
  }

  getItem(key) {
    try {
      const data = this.storage.getItem(`${this.key}_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  setItem(key, value) {
    try {
      this.storage.setItem(`${this.key}_${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(`${this.key}_${key}`);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  clear() {
    try {
      const keys = Object.keys(this.storage);
      keys.forEach((key) => {
        if (key.startsWith(this.key)) {
          this.storage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  getVersion() {
    return this.getItem('version') || STORAGE_VERSION;
  }

  setVersion(version = STORAGE_VERSION) {
    this.setItem('version', version);
  }

  // User specific methods
  saveUser(user) {
    this.setItem('user', user);
    this.setItem('isLoggedIn', true);
    this.setItem('lastLogin', new Date().toISOString());
    this.setVersion();
  }

  getUser() {
    return this.getItem('user');
  }

  updateUser(user) {
    const current = this.getUser();
    if (current) {
      this.setItem('user', { ...current, ...user });
      return true;
    }
    return false;
  }

  getToken() {
    return this.getItem('token');
  }

  setToken(token) {
    this.setItem('token', token);
  }

  removeToken() {
    this.removeItem('token');
  }

  isLoggedIn() {
    return this.getItem('isLoggedIn') === true;
  }

  logout() {
    this.removeItem('user');
    this.removeItem('isLoggedIn');
    this.removeItem('token');
    this.removeItem('lastLogin');
    return true;
  }

  getSession() {
    return {
      user: this.getUser(),
      token: this.getToken(),
      isLoggedIn: this.isLoggedIn(),
      lastLogin: this.getItem('lastLogin'),
    };
  }
}

export const storageService = new StorageService();
export default storageService;

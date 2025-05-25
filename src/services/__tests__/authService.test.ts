import { authService } from '../authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe('authService', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login and set user data in AsyncStorage', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockUser]));
      
      const user = await authService.login('test@example.com', 'password');
      
      expect(user).toEqual(mockUser);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('users');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(mockUser));
    });

    it('should fail to login with invalid credentials', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
      
      await expect(authService.login('wrong@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('users');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    it('should successfully signup a new user and set current user in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([])); // No existing users
      
      const newUser = await authService.signup('New User', 'new@example.com', 'newpassword');
      
      expect(newUser.name).toBe('New User');
      expect(newUser.email).toBe('new@example.com');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('users');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('users', expect.stringContaining(newUser.id));
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(newUser));
    });
  });

  describe('logout', () => {
    it('should successfully logout and remove current user from AsyncStorage', async () => {
      await authService.logout();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('currentUser');
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user if one exists in AsyncStorage', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockUser));
      
      const user = await authService.getCurrentUser();
      
      expect(user).toEqual(mockUser);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('currentUser');
    });

    it('should return null if no current user exists in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const user = await authService.getCurrentUser();
      
      expect(user).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('currentUser');
    });
  });
});

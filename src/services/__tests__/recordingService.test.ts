import { recordingService } from '../recordingService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe('recordingService', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  describe('saveRecording', () => {
    it('should successfully save a new recording', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([])); // No existing recordings
      
      const newRecording = await recordingService.saveRecording('test_path.mp4', 120, 'video');
      
      expect(newRecording.path).toBe('test_path.mp4');
      expect(newRecording.duration).toBe(120);
      expect(newRecording.type).toBe('video');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('recordings', expect.stringContaining(newRecording.id));
    });

    it('should successfully save a recording when other recordings exist', async () => {
      const existingRecording = { id: '1', name: 'Existing Recording', path: 'existing.mp4', duration: 60, type: 'video', createdAt: new Date().toISOString() };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([existingRecording]));
      
      const newRecording = await recordingService.saveRecording('test_path2.mp4', 180, 'audio');

      expect(newRecording.path).toBe('test_path2.mp4');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      // Check that the new recording is added to the existing ones
      const storedRecordings = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(storedRecordings).toEqual(expect.arrayContaining([existingRecording, expect.objectContaining({ id: newRecording.id })]));
    });
  });

  describe('getRecordings', () => {
    it('should return recordings if they exist in AsyncStorage', async () => {
      const mockRecordings = [
        { id: '1', name: 'Recording 1', path: 'path1.mp4', duration: 60, type: 'video', createdAt: new Date().toISOString() },
        { id: '2', name: 'Recording 2', path: 'path2.mp3', duration: 120, type: 'audio', createdAt: new Date().toISOString() },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockRecordings));
      
      const recordings = await recordingService.getRecordings();
      
      expect(recordings).toEqual(mockRecordings);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
    });

    it('should return an empty array if no recordings exist in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const recordings = await recordingService.getRecordings();
      
      expect(recordings).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
    });
  });

  describe('deleteRecording', () => {
    it('should successfully delete a recording', async () => {
      const mockRecordings = [
        { id: '1', name: 'Recording 1', path: 'path1.mp4', duration: 60, type: 'video', createdAt: new Date().toISOString() },
        { id: '2', name: 'Recording to Delete', path: 'path2.mp3', duration: 120, type: 'audio', createdAt: new Date().toISOString() },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockRecordings));
      
      await recordingService.deleteRecording('2');
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      const storedRecordings = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(storedRecordings).toEqual([mockRecordings[0]]); // Only the first recording should remain
    });

    it('should do nothing if recording to delete is not found', async () => {
      const mockRecordings = [
        { id: '1', name: 'Recording 1', path: 'path1.mp4', duration: 60, type: 'video', createdAt: new Date().toISOString() },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockRecordings));
      
      await recordingService.deleteRecording('non_existent_id');
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled(); // setItem should not be called if no recording was deleted
    });
  });

  describe('renameRecording', () => {
    it('should successfully rename a recording', async () => {
      const mockRecordings = [
        { id: '1', name: 'Old Name', path: 'path1.mp4', duration: 60, type: 'video', createdAt: new Date().toISOString() },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockRecordings));
      
      const newName = 'New Awesome Name';
      await recordingService.renameRecording('1', newName);
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      const storedRecordings = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(storedRecordings[0].name).toBe(newName);
    });

    it('should throw an error if recording to rename is not found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
      
      await expect(recordingService.renameRecording('non_existent_id', 'New Name')).rejects.toThrow('Recording not found');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('recordings');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });
});

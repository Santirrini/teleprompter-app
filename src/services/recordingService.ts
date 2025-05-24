import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Recording } from "../types/User"

class RecordingService {
  private readonly RECORDINGS_KEY = "@recordings"

  async saveRecording(tempPath: string, mode: "video" | "audio"): Promise<Recording> {
    try {
      const recordingId = Date.now().toString()

      // In a real app, you'd move the file to a permanent location
      // For now, we'll just use the temp path
      const recording: Recording = {
        id: recordingId,
        title: `Recording ${new Date().toLocaleDateString()}`,
        duration: "0:30", // Mock duration
        date: new Date().toISOString(),
        type: mode,
        filePath: tempPath,
      }

      // Save to storage
      const recordings = await this.getRecordings()
      recordings.unshift(recording)
      await AsyncStorage.setItem(this.RECORDINGS_KEY, JSON.stringify(recordings))

      return recording
    } catch (error) {
      console.error("Failed to save recording:", error)
      throw new Error("Failed to save recording")
    }
  }

  async getRecordings(): Promise<Recording[]> {
    try {
      const recordingsData = await AsyncStorage.getItem(this.RECORDINGS_KEY)
      return recordingsData ? JSON.parse(recordingsData) : []
    } catch (error) {
      console.error("Failed to get recordings:", error)
      return []
    }
  }

  async deleteRecording(recordingId: string): Promise<void> {
    try {
      const recordings = await this.getRecordings()
      const filteredRecordings = recordings.filter((r) => r.id !== recordingId)
      await AsyncStorage.setItem(this.RECORDINGS_KEY, JSON.stringify(filteredRecordings))
    } catch (error) {
      console.error("Failed to delete recording:", error)
      throw new Error("Failed to delete recording")
    }
  }

  async renameRecording(recordingId: string, newTitle: string): Promise<void> {
    try {
      const recordings = await this.getRecordings()
      const recordingIndex = recordings.findIndex((r) => r.id === recordingId)

      if (recordingIndex === -1) {
        throw new Error("Recording not found")
      }

      recordings[recordingIndex].title = newTitle
      await AsyncStorage.setItem(this.RECORDINGS_KEY, JSON.stringify(recordings))
    } catch (error) {
      console.error("Failed to rename recording:", error)
      throw new Error("Failed to rename recording")
    }
  }
}

export const recordingService = new RecordingService()

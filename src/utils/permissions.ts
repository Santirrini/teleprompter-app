import { Platform, PermissionsAndroid } from "react-native"

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: "Camera Permission",
        message: "This app needs access to your camera to record videos.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  }
  return true // iOS permissions are handled in Info.plist
}

export const requestMicrophonePermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: "Microphone Permission",
        message: "This app needs access to your microphone to record audio.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  }
  return true // iOS permissions are handled in Info.plist
}

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: "Storage Permission",
        message: "This app needs access to your storage to save recordings.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  }
  return true // iOS doesn't need explicit storage permission for app documents
}

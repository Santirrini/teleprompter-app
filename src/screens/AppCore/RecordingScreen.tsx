import type React from "react"
import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, StatusBar } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RNCamera } from "react-native-camera"
import type { MainStackParamList } from "../../navigation/MainStackNavigator"
import { TeleprompterView } from "../../components/Teleprompter/TeleprompterView"
import { TeleprompterControls } from "../../components/Teleprompter/TeleprompterControls"

type RecordingScreenNavigationProp = StackNavigationProp<MainStackParamList, "Recording">
type RecordingScreenRouteProp = RouteProp<MainStackParamList, "Recording">

interface Props {
  navigation: RecordingScreenNavigationProp
  route: RecordingScreenRouteProp
}

const { width, height } = Dimensions.get("window")

export const RecordingScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [fontSize, setFontSize] = useState(24)
  const [isScrolling, setIsScrolling] = useState(false)

  const cameraRef = useRef<RNCamera>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  const { mode, script } = route.params

  useEffect(() => {
    StatusBar.setHidden(true)
    return () => {
      StatusBar.setHidden(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleRecord = async () => {
    if (!cameraRef.current) return

    try {
      if (isRecording) {
        // Stop recording
        await cameraRef.current.stopRecording()
        setIsRecording(false)
        setIsScrolling(false)
        stopTimer()
      } else {
        // Start recording
        setIsRecording(true)
        setIsScrolling(true)
        setRecordingTime(0)
        startTimer()

        const options = {
          quality: RNCamera.Constants.VideoQuality["720p"],
          maxDuration: 300, // 5 minutes max
          mute: false,
        }

        if (mode === "video") {
          const data = await cameraRef.current.recordAsync(options)
          handleRecordingComplete(data.uri)
        } else {
          // Audio only recording logic would go here
          // For now, simulate with timeout
          setTimeout(() => {
            handleRecordingComplete("mock_audio_path.mp3")
          }, 1000)
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to start/stop recording")
      setIsRecording(false)
      setIsScrolling(false)
      stopTimer()
    }
  }

  const handleRecordingComplete = (recordingPath: string) => {
    navigation.navigate("Review", { recordingPath, mode })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleBack = () => {
    if (isRecording) {
      Alert.alert("Stop Recording?", "Are you sure you want to stop recording and go back?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Stop & Go Back",
          style: "destructive",
          onPress: () => {
            setIsRecording(false)
            setIsScrolling(false)
            stopTimer()
            navigation.goBack()
          },
        },
      ])
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      {mode === "video" && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />
      )}

      {mode === "audio" && (
        <View style={styles.audioMode}>
          <Icon name="mic" size={100} color="#4A90E2" />
          <Text style={styles.audioModeText}>Audio Recording Mode</Text>
        </View>
      )}

      {/* Teleprompter Overlay */}
      <View style={styles.teleprompterOverlay}>
        <TeleprompterControls
          scrollSpeed={scrollSpeed}
          fontSize={fontSize}
          onScrollSpeedChange={setScrollSpeed}
          onFontSizeChange={setFontSize}
        />

        <TeleprompterView script={script} fontSize={fontSize} scrollSpeed={scrollSpeed} isScrolling={isScrolling} />
      </View>

      {/* Recording Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.recordingControls}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={handleRecord}
          >
            <View style={[styles.recordButtonInner, isRecording && styles.recordButtonInnerActive]} />
          </TouchableOpacity>
        </View>

        <View style={styles.timerContainer}>
          <Icon name="access-time" size={16} color="#fff" />
          <Text style={styles.timer}>{formatTime(recordingTime)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  audioMode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  audioModeText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  teleprompterOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  recordingControls: {
    flex: 1,
    alignItems: "center",
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ff3333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  recordButtonActive: {
    backgroundColor: "#ff6666",
  },
  recordButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff3333",
  },
  recordButtonInnerActive: {
    borderRadius: 8,
    width: 30,
    height: 30,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  timer: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "monospace",
  },
})

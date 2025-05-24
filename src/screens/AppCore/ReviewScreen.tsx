"use client"

import type React from "react"
import { useState, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Video from "react-native-video"
import type { MainStackParamList } from "../../navigation/MainStackNavigator"
import { AppButton } from "../../components/Common/AppButton"
import { recordingService } from "../../services/recordingService"

type ReviewScreenNavigationProp = StackNavigationProp<MainStackParamList, "Review">
type ReviewScreenRouteProp = RouteProp<MainStackParamList, "Review">

interface Props {
  navigation: ReviewScreenNavigationProp
  route: ReviewScreenRouteProp
}

const { width, height } = Dimensions.get("window")

export const ReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const videoRef = useRef<Video>(null)
  const { recordingPath, mode } = route.params

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    videoRef.current?.seek(newTime)
    setCurrentTime(newTime)
  }

  const handleSaveRecording = async () => {
    setIsSaving(true)
    try {
      await recordingService.saveRecording(recordingPath, mode)
      Alert.alert("Success", "Recording saved successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Welcome"),
        },
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to save recording")
    } finally {
      setIsSaving(false)
    }
  }

  const handleReRecord = () => {
    Alert.alert("Re-record", "Are you sure you want to record again? This will discard the current recording.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Re-record",
        style: "destructive",
        onPress: () => navigation.goBack(),
      },
    ])
  }

  const handleDiscard = () => {
    Alert.alert("Discard Recording", "Are you sure you want to discard this recording?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: () => {
          recordingService.deleteRecording(recordingPath)
          navigation.navigate("Welcome")
        },
      },
    ])
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Review Recording</Text>
      </View>

      <View style={styles.playerContainer}>
        {mode === "video" ? (
          <Video
            ref={videoRef}
            source={{ uri: recordingPath }}
            style={styles.video}
            paused={!isPlaying}
            onLoad={(data) => setDuration(data.duration)}
            onProgress={(data) => setCurrentTime(data.currentTime)}
            onEnd={() => setIsPlaying(false)}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.audioPlayer}>
            <Icon name="music-note" size={100} color="#4A90E2" />
            <Text style={styles.audioPlayerText}>Audio Recording</Text>
          </View>
        )}

        {/* Play button overlay */}
        {!isPlaying && (
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Icon name="play-arrow" size={60} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Player Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleSeek(-10)} style={styles.controlButton}>
          <Icon name="replay-10" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
          <Icon name={isPlaying ? "pause" : "play-arrow"} size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSeek(10)} style={styles.controlButton}>
          <Icon name="forward-10" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Icon name="volume-up" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }]} />
        </View>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <AppButton title="Save Recording" onPress={handleSaveRecording} loading={isSaving} style={styles.saveButton} />

        <TouchableOpacity onPress={handleReRecord} style={styles.reRecordButton}>
          <Text style={styles.reRecordText}>Re-record</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDiscard}>
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  playerContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  audioPlayer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  audioPlayerText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  playButton: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  timeText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "monospace",
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#333",
    marginHorizontal: 15,
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  saveButton: {
    paddingVertical: 18,
  },
  reRecordButton: {
    backgroundColor: "#666",
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  reRecordText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  discardText: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
  },
})

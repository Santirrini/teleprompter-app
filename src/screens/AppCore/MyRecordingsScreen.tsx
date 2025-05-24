"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { Recording } from "../../types/User"
import { recordingService } from "../../services/recordingService"
import { RecordingListItem } from "../../components/MyRecordings/RecordingListItem"

export const MyRecordingsScreen: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    useCallback(() => {
      loadRecordings()
    }, []),
  )

  const loadRecordings = async () => {
    try {
      const recordingsList = await recordingService.getRecordings()
      setRecordings(recordingsList)
    } catch (error) {
      Alert.alert("Error", "Failed to load recordings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadRecordings()
    setRefreshing(false)
  }

  const handleDeleteRecording = async (recordingId: string) => {
    Alert.alert("Delete Recording", "Are you sure you want to delete this recording?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await recordingService.deleteRecording(recordingId)
            await loadRecordings()
          } catch (error) {
            Alert.alert("Error", "Failed to delete recording")
          }
        },
      },
    ])
  }

  const handleRenameRecording = (recordingId: string, currentTitle: string) => {
    Alert.prompt(
      "Rename Recording",
      "Enter new title:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: async (newTitle) => {
            if (newTitle && newTitle.trim()) {
              try {
                await recordingService.renameRecording(recordingId, newTitle.trim())
                await loadRecordings()
              } catch (error) {
                Alert.alert("Error", "Failed to rename recording")
              }
            }
          },
        },
      ],
      "plain-text",
      currentTitle,
    )
  }

  const renderRecording = ({ item }: { item: Recording }) => (
    <RecordingListItem
      recording={item}
      onDelete={() => handleDeleteRecording(item.id)}
      onRename={() => handleRenameRecording(item.id, item.title)}
    />
  )

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="video-library" size={80} color="#666" />
      <Text style={styles.emptyStateTitle}>No recordings yet</Text>
      <Text style={styles.emptyStateText}>Start recording to see your videos and audio files here</Text>
    </View>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading recordings...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Recordings</Text>
      </View>

      <FlatList
        data={recordings}
        renderItem={renderRecording}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, recordings.length === 0 && styles.emptyListContainer]}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#4A90E2" />}
      />

      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})

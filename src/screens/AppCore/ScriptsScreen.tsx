"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { Script } from "../../types/User"
import { AppButton } from "../../components/Common/AppButton"

export const ScriptsScreen: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([])
  const [showNewScriptModal, setShowNewScriptModal] = useState(false)
  const [newScriptTitle, setNewScriptTitle] = useState("")
  const [newScriptContent, setNewScriptContent] = useState("")

  const handleCreateScript = () => {
    if (!newScriptTitle.trim() || !newScriptContent.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const newScript: Script = {
      id: Date.now().toString(),
      title: newScriptTitle.trim(),
      content: newScriptContent.trim(),
      createdAt: new Date().toISOString(),
    }

    setScripts((prev) => [newScript, ...prev])
    setNewScriptTitle("")
    setNewScriptContent("")
    setShowNewScriptModal(false)
  }

  const handleDeleteScript = (scriptId: string) => {
    Alert.alert("Delete Script", "Are you sure you want to delete this script?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setScripts((prev) => prev.filter((s) => s.id !== scriptId))
        },
      },
    ])
  }

  const renderScript = ({ item }: { item: Script }) => (
    <TouchableOpacity style={styles.scriptItem}>
      <View style={styles.scriptContent}>
        <Text style={styles.scriptTitle}>{item.title}</Text>
        <Text style={styles.scriptPreview} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.scriptDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteScript(item.id)} style={styles.deleteButton}>
        <Icon name="delete" size={20} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="description" size={80} color="#666" />
      <Text style={styles.emptyStateTitle}>No scripts yet</Text>
      <Text style={styles.emptyStateText}>Create your first script to get started</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Scripts</Text>
        <TouchableOpacity onPress={() => setShowNewScriptModal(true)} style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={scripts}
        renderItem={renderScript}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, scripts.length === 0 && styles.emptyListContainer]}
        ListEmptyComponent={renderEmptyState}
      />

      {/* New Script Modal - Simplified for now */}
      {showNewScriptModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Script</Text>

            <TextInput
              style={styles.titleInput}
              placeholder="Script title"
              placeholderTextColor="#888"
              value={newScriptTitle}
              onChangeText={setNewScriptTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Script content"
              placeholderTextColor="#888"
              value={newScriptContent}
              onChangeText={setNewScriptContent}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowNewScriptModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <AppButton title="Create" onPress={handleCreateScript} style={styles.createButton} />
            </View>
          </View>
        </View>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
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
  scriptItem: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  scriptContent: {
    flex: 1,
  },
  scriptTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  scriptPreview: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
    lineHeight: 20,
  },
  scriptDate: {
    fontSize: 12,
    color: "#888",
  },
  deleteButton: {
    padding: 8,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  titleInput: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  contentInput: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    height: 200,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#666",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    flex: 1,
  },
})

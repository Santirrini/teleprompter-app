import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { Recording } from "../../types/User"

interface Props {
  recording: Recording
  onDelete: () => void
  onRename: () => void
  onPlay?: () => void
}

export const RecordingListItem: React.FC<Props> = ({ recording, onDelete, onRename, onPlay }) => {
  const handleMenuPress = () => {
    // In a real app, you'd show an action sheet or modal
    // For now, we'll just show rename option
    onRename()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const renderThumbnail = () => {
    if (recording.type === "video" && recording.thumbnail) {
      return <Image source={{ uri: recording.thumbnail }} style={styles.thumbnail} />
    }

    return (
      <View style={[styles.thumbnail, styles.iconThumbnail]}>
        <Icon name={recording.type === "video" ? "play-arrow" : "mic"} size={24} color="#4A90E2" />
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPlay}>
      <View style={styles.content}>
        {renderThumbnail()}

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {recording.title}
          </Text>
          <Text style={styles.details}>
            {recording.duration} • {formatDate(recording.date)}
          </Text>
        </View>

        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Icon name="more-vert" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  iconThumbnail: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#888",
  },
  menuButton: {
    padding: 8,
  },
})

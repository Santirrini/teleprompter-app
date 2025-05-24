import type React from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Props {
  scrollSpeed: number
  fontSize: number
  onScrollSpeedChange: (speed: number) => void
  onFontSizeChange: (size: number) => void
}

export const TeleprompterControls: React.FC<Props> = ({
  scrollSpeed,
  fontSize,
  onScrollSpeedChange,
  onFontSizeChange,
}) => {
  const increaseFontSize = () => {
    if (fontSize < 40) {
      onFontSizeChange(fontSize + 2)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 16) {
      onFontSizeChange(fontSize - 2)
    }
  }

  const increaseSpeed = () => {
    if (scrollSpeed < 5) {
      onScrollSpeedChange(scrollSpeed + 0.5)
    }
  }

  const decreaseSpeed = () => {
    if (scrollSpeed > 0.5) {
      onScrollSpeedChange(scrollSpeed - 0.5)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlsRow}>
        {/* Font Size Controls */}
        <TouchableOpacity onPress={decreaseFontSize} style={styles.fontButton}>
          <Text style={styles.fontButtonText}>A-</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={increaseFontSize} style={styles.fontButton}>
          <Text style={styles.fontButtonText}>A+</Text>
        </TouchableOpacity>

        {/* Speed Control */}
        <View style={styles.speedControl}>
          <Icon name="pets" size={20} color="#4A90E2" />

          <TouchableOpacity onPress={decreaseSpeed} style={styles.speedButton}>
            <Icon name="remove" size={16} color="#fff" />
          </TouchableOpacity>

          <View style={styles.speedIndicator}>
            <View style={[styles.speedBar, { width: `${(scrollSpeed / 5) * 100}%` }]} />
          </View>

          <TouchableOpacity onPress={increaseSpeed} style={styles.speedButton}>
            <Icon name="add" size={16} color="#fff" />
          </TouchableOpacity>

          <Icon name="directions-run" size={20} color="#4A90E2" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  fontButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  fontButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  speedControl: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 15,
  },
  speedButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  speedIndicator: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    marginHorizontal: 8,
  },
  speedBar: {
    height: "100%",
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
})

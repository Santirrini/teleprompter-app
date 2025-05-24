import type React from "react"
import { View, ActivityIndicator, Text, StyleSheet } from "react-native"

interface Props {
  text?: string
  size?: "small" | "large"
}

export const LoadingIndicator: React.FC<Props> = ({ text = "Loading...", size = "large" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#4A90E2" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
})

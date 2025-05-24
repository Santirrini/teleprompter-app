import type React from "react"
import { TextInput, StyleSheet, type TextInputProps, type ViewStyle } from "react-native"

interface Props extends TextInputProps {
  style?: ViewStyle
}

export const AppTextInput: React.FC<Props> = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor="#888" {...props} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
})

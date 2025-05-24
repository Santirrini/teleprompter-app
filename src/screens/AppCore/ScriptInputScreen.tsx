"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { MainStackParamList } from "../../navigation/MainStackNavigator"
import { AppButton } from "../../components/Common/AppButton"

type ScriptInputScreenNavigationProp = StackNavigationProp<MainStackParamList, "ScriptInput">
type ScriptInputScreenRouteProp = RouteProp<MainStackParamList, "ScriptInput">

interface Props {
  navigation: ScriptInputScreenNavigationProp
  route: ScriptInputScreenRouteProp
}

export const ScriptInputScreen: React.FC<Props> = ({ navigation, route }) => {
  const [script, setScript] = useState("")
  const { mode } = route.params

  const handleGoToTeleprompter = () => {
    if (!script.trim()) {
      Alert.alert("Error", "Please enter your script text")
      return
    }

    navigation.navigate("Recording", { mode, script: script.trim() })
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Prepare Your Script</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Type or paste your text here:</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Start typing your text..."
          placeholderTextColor="#666"
          value={script}
          onChangeText={setScript}
          multiline
          textAlignVertical="top"
          autoFocus
        />

        <View style={styles.footer}>
          <Text style={styles.characterCount}>{script.length} characters</Text>

          <AppButton title="GO TO TELEPROMPTER" onPress={handleGoToTeleprompter} style={styles.goButton} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 20,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
  footer: {
    paddingVertical: 20,
  },
  characterCount: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  goButton: {
    paddingVertical: 18,
  },
})

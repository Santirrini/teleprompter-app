import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { MainStackParamList } from "../../navigation/MainStackNavigator"
import { AppButton } from "../../components/Common/AppButton"

type WelcomeScreenNavigationProp = StackNavigationProp<MainStackParamList, "Welcome">

interface Props {
  navigation: WelcomeScreenNavigationProp
}

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleVideoMode = () => {
    navigation.navigate("ScriptInput", { mode: "video" })
  }

  const handleAudioMode = () => {
    navigation.navigate("ScriptInput", { mode: "audio" })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TelepromptMe</Text>
      <Text style={styles.subtitle}>Choose how to start</Text>

      <View style={styles.buttonContainer}>
        <AppButton
          title="RECORD VIDEO & AUDIO"
          onPress={handleVideoMode}
          style={styles.primaryButton}
          icon={<Icon name="videocam" size={24} color="#fff" />}
        />

        <AppButton
          title="RECORD AUDIO ONLY"
          onPress={handleAudioMode}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
          icon={<Icon name="mic" size={24} color="#fff" />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    marginBottom: 60,
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  primaryButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 20,
  },
  secondaryButton: {
    backgroundColor: "#333",
    paddingVertical: 20,
  },
  secondaryButtonText: {
    color: "#fff",
  },
})

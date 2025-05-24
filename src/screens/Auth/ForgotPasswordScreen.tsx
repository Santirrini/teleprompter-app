import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { AuthStackParamList } from "../../navigation/AuthNavigator"
import { AppButton } from "../../components/Common/AppButton"
import { AppTextInput } from "../../components/Common/AppTextInput"
import { authService } from "../../services/authService"

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, "ForgotPassword">

interface Props {
  navigation: ForgotPasswordScreenNavigationProp
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendResetLink = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address")
      return
    }

    setIsLoading(true)
    try {
      await authService.forgotPassword(email)
      Alert.alert("Success", "Password reset link has been sent to your email", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to send reset link")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      <Text style={styles.description}>Enter your email address and we'll send you a link to reset your password.</Text>

      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppButton title="Send Reset Link" onPress={handleSendResetLink} loading={isLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
})

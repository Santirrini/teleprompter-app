"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { AuthStackParamList } from "../../navigation/AuthNavigator"
import { useAuth } from "../../contexts/AuthContext"
import { AppButton } from "../../components/Common/AppButton"
import { AppTextInput } from "../../components/Common/AppTextInput"

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, "SignUp">

interface Props {
  navigation: SignUpScreenNavigationProp
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "Please agree to the Terms & Conditions")
      return
    }

    setIsLoading(true)
    try {
      await signup(name, email, password)
    } catch (error) {
      Alert.alert("Error", "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
      </View>

      <AppTextInput placeholder="Full Name" value={name} onChangeText={setName} autoCapitalize="words" />

      <AppTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <AppTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <AppTextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeToTerms(!agreeToTerms)}>
        <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
          {agreeToTerms && <Icon name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxText}>
          I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <AppButton title="SIGN UP" onPress={handleSignUp} loading={isLoading} style={styles.signUpButton} />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  contentContainer: {
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
  passwordContainer: {
    position: "relative",
    marginBottom: 20,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  checkboxText: {
    flex: 1,
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: "#4A90E2",
    textDecorationLine: "underline",
  },
  signUpButton: {
    marginBottom: 30,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#888",
  },
  loginLink: {
    color: "#4A90E2",
  },
})

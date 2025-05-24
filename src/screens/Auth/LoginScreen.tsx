"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { AuthStackParamList } from "../../navigation/AuthNavigator"
import { useAuth } from "../../contexts/AuthContext"
import { AppButton } from "../../components/Common/AppButton"
import { AppTextInput } from "../../components/Common/AppTextInput"

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">

interface Props {
  navigation: LoginScreenNavigationProp
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      Alert.alert("Error", "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={24} color="#4A90E2" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <AppButton title="LOGIN" onPress={handleLogin} loading={isLoading} style={styles.loginButton} />

      <Text style={styles.orText}>Or</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={20} color="#fff" />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
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
  forgotPassword: {
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  loginButton: {
    marginBottom: 30,
  },
  orText: {
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: "#fff",
    marginLeft: 8,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "#888",
  },
  signUpLink: {
    color: "#4A90E2",
  },
})

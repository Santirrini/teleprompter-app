import AsyncStorage from "@react-native-async-storage/async-storage"
import type { User } from "../types/User"

class AuthService {
  private readonly USER_KEY = "@user"

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email === "test@test.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "Test User",
        email: email,
      }

      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user))
      return user
    }

    throw new Error("Invalid credentials")
  }

  async signup(name: string, email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Date.now().toString(),
      name,
      email,
    }

    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user))
    return user
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(this.USER_KEY)
  }

  async getCurrentUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem(this.USER_KEY)
    return userData ? JSON.parse(userData) : null
  }

  async forgotPassword(email: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Password reset email sent to:", email)
  }
}

export const authService = new AuthService()

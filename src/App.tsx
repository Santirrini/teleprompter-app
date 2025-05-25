import type React from "react"
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./navigation/AuthNavigator"
import { AppNavigator } from "./navigation/AppNavigator"
import { AuthContext } from "./contexts/AuthContext"
import type { User } from "./types/User"
import { authService } from "./services/authService"

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.log("No authenticated user")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const userData = await authService.login(email, password)
    setUser(userData)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const signup = async (name: string, email: string, password: string) => {
    const userData = await authService.signup(name, email, password)
    setUser(userData)
  }

  if (isLoading) {
    return null // Add loading screen component here
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App

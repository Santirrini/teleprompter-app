import type React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../screens/Auth/LoginScreen"
import { SignUpScreen } from "../screens/Auth/SignUpScreen"
import { ForgotPasswordScreen } from "../screens/Auth/ForgotPasswordScreen"

export type AuthStackParamList = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#1a1a1a" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

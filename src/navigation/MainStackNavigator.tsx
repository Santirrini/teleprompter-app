import type React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen } from "../screens/AppCore/WelcomeScreen"
import { ScriptInputScreen } from "../screens/AppCore/ScriptInputScreen"
import { RecordingScreen } from "../screens/AppCore/RecordingScreen"
import { ReviewScreen } from "../screens/AppCore/ReviewScreen"

export type MainStackParamList = {
  Welcome: undefined
  ScriptInput: { mode: "video" | "audio" }
  Recording: { mode: "video" | "audio"; script: string }
  Review: { recordingPath: string; mode: "video" | "audio" }
}

const Stack = createStackNavigator<MainStackParamList>()

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#1a1a1a" },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ScriptInput" component={ScriptInputScreen} />
      <Stack.Screen name="Recording" component={RecordingScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  )
}

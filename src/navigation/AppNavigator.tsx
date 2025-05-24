import type React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/MaterialIcons"
import { MainStackNavigator } from "./MainStackNavigator"
import { MyRecordingsScreen } from "../screens/AppCore/MyRecordingsScreen"
import { ProfileScreen } from "../screens/AppCore/ProfileScreen"
import { ScriptsScreen } from "../screens/AppCore/ScriptsScreen"

export type AppTabParamList = {
  HomeStack: undefined
  Scripts: undefined
  Recordings: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<AppTabParamList>()

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333",
        },
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case "HomeStack":
              iconName = "home"
              break
            case "Scripts":
              iconName = "description"
              break
            case "Recordings":
              iconName = "video-library"
              break
            case "Profile":
              iconName = "settings"
              break
            default:
              iconName = "home"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={MainStackNavigator} options={{ title: "Home" }} />
      <Tab.Screen name="Scripts" component={ScriptsScreen} />
      <Tab.Screen name="Recordings" component={MyRecordingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

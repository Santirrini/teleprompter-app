import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAuth } from "../../contexts/AuthContext"

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ])
  }

  const ProfileOption = ({
    icon,
    title,
    onPress,
    showArrow = true,
  }: {
    icon: string
    title: string
    onPress: () => void
    showArrow?: boolean
  }) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.optionLeft}>
        <Icon name={icon} size={24} color="#4A90E2" />
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      {showArrow && <Icon name="chevron-right" size={24} color="#888" />}
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Icon name="person" size={40} color="#4A90E2" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileOption
          icon="person"
          title="Edit Profile"
          onPress={() => Alert.alert("Coming Soon", "Edit profile feature coming soon")}
        />
        <ProfileOption
          icon="lock"
          title="Change Password"
          onPress={() => Alert.alert("Coming Soon", "Change password feature coming soon")}
        />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <ProfileOption
          icon="videocam"
          title="Default Recording Quality"
          onPress={() => Alert.alert("Coming Soon", "Recording quality settings coming soon")}
        />
        <ProfileOption
          icon="speed"
          title="Default Teleprompter Speed"
          onPress={() => Alert.alert("Coming Soon", "Speed settings coming soon")}
        />
        <ProfileOption
          icon="text-fields"
          title="Default Font Size"
          onPress={() => Alert.alert("Coming Soon", "Font size settings coming soon")}
        />
        <ProfileOption
          icon="notifications"
          title="Notifications"
          onPress={() => Alert.alert("Coming Soon", "Notification settings coming soon")}
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileOption
          icon="help"
          title="Help & FAQ"
          onPress={() => Alert.alert("Coming Soon", "Help section coming soon")}
        />
        <ProfileOption
          icon="privacy-tip"
          title="Privacy Policy"
          onPress={() => Alert.alert("Coming Soon", "Privacy policy coming soon")}
        />
        <ProfileOption
          icon="description"
          title="Terms of Service"
          onPress={() => Alert.alert("Coming Soon", "Terms of service coming soon")}
        />
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <ProfileOption icon="logout" title="Logout" onPress={handleLogout} showArrow={false} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
    marginBottom: 15,
    marginLeft: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  version: {
    fontSize: 14,
    color: "#666",
  },
})

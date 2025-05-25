"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { User, Lock, Video, Gauge, Type, Bell, HelpCircle, Shield, FileText, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export const ProfileScreen = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
    }
  }

  const ProfileOption = ({
    icon: Icon,
    title,
    onClick,
  }: {
    icon: any
    title: string
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-left hover:bg-gray-700"
    >
      <div className="flex items-center">
        <Icon className="mr-3 h-5 w-5 text-blue-400" />
        <span className="text-white">{title}</span>
      </div>
      <div className="h-2 w-2 rounded-full bg-gray-600" />
    </button>
  )

  return (
    <div className="h-full bg-gray-900 p-4 pb-20">
      <h1 className="mb-6 text-2xl font-bold text-white">Profile</h1>

      {/* User Info */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
              <User className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <button className="rounded-full p-2 hover:bg-gray-700">
              <User className="h-5 w-5 text-blue-400" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-300">Account</h2>
        <div className="space-y-2">
          <ProfileOption icon={User} title="Edit Profile" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={Lock} title="Change Password" onClick={() => alert("Coming soon")} />
        </div>
      </div>

      {/* App Settings */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-300">App Settings</h2>
        <div className="space-y-2">
          <ProfileOption icon={Video} title="Default Recording Quality" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={Gauge} title="Default Teleprompter Speed" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={Type} title="Default Font Size" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={Bell} title="Notifications" onClick={() => alert("Coming soon")} />
        </div>
      </div>

      {/* Support */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-300">Support</h2>
        <div className="space-y-2">
          <ProfileOption icon={HelpCircle} title="Help & FAQ" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={Shield} title="Privacy Policy" onClick={() => alert("Coming soon")} />
          <ProfileOption icon={FileText} title="Terms of Service" onClick={() => alert("Coming soon")} />
        </div>
      </div>

      {/* Logout */}
      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  )
}

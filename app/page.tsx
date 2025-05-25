"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/MobileFrame"
import { Navigation } from "@/components/Navigation"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { RecordingProvider } from "@/contexts/RecordingContext"
import { LoginScreen } from "@/components/screens/LoginScreen"
import { WelcomeScreen } from "@/components/screens/WelcomeScreen"
import { ScriptInputScreen } from "@/components/screens/ScriptInputScreen"
import { RecordingScreen } from "@/components/screens/RecordingScreen"
import { ReviewScreen } from "@/components/screens/ReviewScreen"
import { RecordingsScreen } from "@/components/screens/RecordingsScreen"
import { ProfileScreen } from "@/components/screens/ProfileScreen"
import type { RecordingMode } from "@/types"

type Screen = "welcome" | "script-input" | "recording" | "review" | "recordings" | "profile"

interface AppState {
  screen: Screen
  mode?: RecordingMode
  script?: string
  recordingData?: { path: string; duration: number }
}

function AppContent() {
  const { user, isLoading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [activeTab, setActiveTab] = useState("home")
  const [appState, setAppState] = useState<AppState>({ screen: "welcome" })

  if (isLoading) {
    return (
      <MobileFrame>
        <div className="flex h-full items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto" />
            <p>Loading...</p>
          </div>
        </div>
      </MobileFrame>
    )
  }

  if (!user) {
    return (
      <MobileFrame>
        {showAuth ? (
          authMode === "login" ? (
            <LoginScreen onSwitchToSignup={() => setAuthMode("signup")} onClose={() => setShowAuth(false)} />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-900 p-6">
              <div className="text-center text-white">
                <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
                <p className="mb-6 text-gray-400">Sign up functionality would go here</p>
                <button onClick={() => setAuthMode("login")} className="text-blue-500 hover:text-blue-400">
                  Back to Login
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-6">
            <h1 className="mb-4 text-4xl font-bold text-white">TelepromptMe</h1>
            <p className="mb-8 text-center text-gray-400">
              Professional teleprompter app for video and audio recording
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        )}
      </MobileFrame>
    )
  }

  const renderScreen = () => {
    if (activeTab === "recordings") {
      return <RecordingsScreen />
    }

    if (activeTab === "profile") {
      return <ProfileScreen />
    }

    // Main flow screens
    switch (appState.screen) {
      case "welcome":
        return <WelcomeScreen onModeSelect={(mode) => setAppState({ screen: "script-input", mode })} />

      case "script-input":
        return (
          <ScriptInputScreen
            mode={appState.mode!}
            onBack={() => setAppState({ screen: "welcome" })}
            onContinue={(script) => setAppState({ screen: "recording", mode: appState.mode, script })}
          />
        )

      case "recording":
        return (
          <RecordingScreen
            mode={appState.mode!}
            script={appState.script!}
            onBack={() => setAppState({ screen: "script-input", mode: appState.mode })}
            onComplete={(recordingData) =>
              setAppState({
                screen: "review",
                mode: appState.mode,
                script: appState.script,
                recordingData,
              })
            }
          />
        )

      case "review":
        return (
          <ReviewScreen
            mode={appState.mode!}
            recordingData={appState.recordingData!}
            onBack={() => setAppState({ screen: "recording", mode: appState.mode, script: appState.script })}
            onSave={() => {
              setAppState({ screen: "welcome" })
              setActiveTab("home")
            }}
          />
        )

      default:
        return <WelcomeScreen onModeSelect={(mode) => setAppState({ screen: "script-input", mode })} />
    }
  }

  return (
    <MobileFrame>
      <div className="relative h-full">
        {renderScreen()}
        <Navigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
            if (tab === "home") {
              setAppState({ screen: "welcome" })
            }
          }}
        />
      </div>
    </MobileFrame>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <RecordingProvider>
        <AppContent />
      </RecordingProvider>
    </AuthProvider>
  )
}

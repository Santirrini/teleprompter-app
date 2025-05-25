"use client"

import { Button } from "@/components/ui/Button"
import { Video, Mic } from "lucide-react"

interface WelcomeScreenProps {
  onModeSelect: (mode: "video" | "audio") => void
}

export const WelcomeScreen = ({ onModeSelect }: WelcomeScreenProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-6">
      <h1 className="mb-4 text-4xl font-bold text-white">TelepromptMe</h1>
      <p className="mb-12 text-lg text-gray-400">Choose how to start</p>

      <div className="w-full space-y-4">
        <Button onClick={() => onModeSelect("video")} className="w-full py-4 text-lg" size="lg">
          <Video className="mr-3 h-6 w-6" />
          RECORD VIDEO & AUDIO
        </Button>

        <Button onClick={() => onModeSelect("audio")} variant="secondary" className="w-full py-4 text-lg" size="lg">
          <Mic className="mr-3 h-6 w-6" />
          RECORD AUDIO ONLY
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import type { RecordingMode } from "@/types"

interface ScriptInputScreenProps {
  mode: RecordingMode
  onBack: () => void
  onContinue: (script: string) => void
}

export const ScriptInputScreen = ({ mode, onBack, onContinue }: ScriptInputScreenProps) => {
  const [script, setScript] = useState("")

  const handleContinue = () => {
    if (!script.trim()) {
      alert("Please enter your script text")
      return
    }
    onContinue(script.trim())
  }

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center border-b border-gray-700 p-4">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Prepare Your Script</h1>
      </div>

      <div className="flex-1 p-4">
        <p className="mb-4 text-gray-300">Type or paste your text here:</p>

        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Start typing your text..."
          className="h-64 w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          autoFocus
        />

        <div className="mt-4">
          <p className="mb-4 text-center text-sm text-gray-400">{script.length} characters</p>

          <Button onClick={handleContinue} className="w-full py-3">
            GO TO TELEPROMPTER
          </Button>
        </div>
      </div>
    </div>
  )
}

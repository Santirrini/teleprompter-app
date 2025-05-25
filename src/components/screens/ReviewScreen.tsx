"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import type { RecordingMode } from "@/types"
import { useRecordings } from "@/contexts/RecordingContext"
import { formatDuration } from "@/lib/utils"

interface ReviewScreenProps {
  mode: RecordingMode
  recordingData: { path: string; duration: number }
  onBack: () => void
  onSave: () => void
}

export const ReviewScreen = ({ mode, recordingData, onBack, onSave }: ReviewScreenProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const { addRecording } = useRecordings()

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add to recordings
    addRecording({
      id: Date.now().toString(),
      title: `Recording ${new Date().toLocaleDateString()}`,
      duration: formatDuration(recordingData.duration),
      date: new Date().toISOString(),
      type: mode,
      filePath: recordingData.path,
    })

    setIsSaving(false)
    onSave()
  }

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard this recording?")) {
      onBack()
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex items-center border-b border-gray-700 p-4">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Review Recording</h1>
      </div>

      {/* Player */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-black">
          {mode === "video" ? (
            <div className="text-center text-white">
              <div className="mb-4 h-48 w-64 rounded-lg bg-gray-800 flex items-center justify-center">
                <Play className="h-16 w-16 text-gray-400" />
              </div>
              <p>Video Preview (Simulated)</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="mb-4 h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center">
                <Volume2 className="h-16 w-16" />
              </div>
              <p>Audio Recording</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <button className="rounded-full bg-gray-700 p-3">
              <SkipBack className="h-5 w-5 text-white" />
            </button>

            <button onClick={handlePlayPause} className="rounded-full bg-blue-600 p-4">
              {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
            </button>

            <button className="rounded-full bg-gray-700 p-3">
              <SkipForward className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-sm text-gray-400">0:00</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full">
              <div className="h-full w-1/3 bg-blue-500 rounded-full" />
            </div>
            <span className="text-sm text-gray-400">{formatDuration(recordingData.duration)}</span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleSave} loading={isSaving} className="w-full">
              Save Recording
            </Button>

            <Button onClick={onBack} variant="secondary" className="w-full">
              Re-record
            </Button>

            <button onClick={handleDiscard} className="w-full py-3 text-red-400 hover:text-red-300">
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

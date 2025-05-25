"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Mic, VideoIcon } from "lucide-react"
import type { RecordingMode } from "@/types"
import { TeleprompterView } from "@/components/TeleprompterView"
import { TeleprompterControls } from "@/components/TeleprompterControls"

interface RecordingScreenProps {
  mode: RecordingMode
  script: string
  onBack: () => void
  onComplete: (recordingData: { path: string; duration: number }) => void
}

export const RecordingScreen = ({ mode, script, onBack, onComplete }: RecordingScreenProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [fontSize, setFontSize] = useState(24)
  const [isScrolling, setIsScrolling] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      setIsScrolling(false)
      stopTimer()

      // Simulate recording completion
      setTimeout(() => {
        onComplete({
          path: `mock_recording_${Date.now()}.${mode === "video" ? "mp4" : "mp3"}`,
          duration: recordingTime,
        })
      }, 500)
    } else {
      // Start recording
      setIsRecording(true)
      setIsScrolling(true)
      setRecordingTime(0)
      startTimer()
    }
  }

  const handleBack = () => {
    if (isRecording) {
      if (confirm("Stop recording and go back?")) {
        setIsRecording(false)
        setIsScrolling(false)
        stopTimer()
        onBack()
      }
    } else {
      onBack()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative h-full bg-black">
      {/* Camera/Audio View */}
      {mode === "video" ? (
        <div className="flex h-full items-center justify-center bg-gray-800">
          <div className="text-center text-white">
            <VideoIcon className="mx-auto mb-4 h-20 w-20" />
            <p className="text-lg">Camera View (Simulated)</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <Mic className="mx-auto mb-4 h-20 w-20 text-blue-500" />
            <p className="text-lg">Audio Recording Mode</p>
          </div>
        </div>
      )}

      {/* Teleprompter Overlay */}
      <div className="absolute inset-0 flex flex-col">
        <TeleprompterControls
          scrollSpeed={scrollSpeed}
          fontSize={fontSize}
          onScrollSpeedChange={setScrollSpeed}
          onFontSizeChange={setFontSize}
        />

        <div className="flex-1">
          <TeleprompterView script={script} fontSize={fontSize} scrollSpeed={scrollSpeed} isScrolling={isScrolling} />
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-between bg-black/80 p-4">
          <button onClick={handleBack} className="rounded-full bg-white/20 p-2">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={handleRecord}
            className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-white transition-colors ${
              isRecording ? "bg-red-600" : "bg-red-500"
            }`}
          >
            <div
              className={`transition-all ${
                isRecording ? "h-6 w-6 rounded bg-white" : "h-12 w-12 rounded-full bg-red-500"
              }`}
            />
          </button>

          <div className="flex items-center rounded-full bg-white/20 px-3 py-1">
            <div className="mr-2 h-2 w-2 rounded-full bg-white" />
            <span className="font-mono text-sm text-white">{formatTime(recordingTime)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

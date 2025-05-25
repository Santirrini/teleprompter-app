"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Recording } from "@/types"

interface RecordingContextType {
  recordings: Recording[]
  addRecording: (recording: Recording) => void
  deleteRecording: (id: string) => void
  renameRecording: (id: string, newTitle: string) => void
}

const RecordingContext = createContext<RecordingContextType | undefined>(undefined)

export const useRecordings = () => {
  const context = useContext(RecordingContext)
  if (!context) {
    throw new Error("useRecordings must be used within a RecordingProvider")
  }
  return context
}

export const RecordingProvider = ({ children }: { children: ReactNode }) => {
  const [recordings, setRecordings] = useState<Recording[]>([])

  const addRecording = (recording: Recording) => {
    setRecordings((prev) => [recording, ...prev])
  }

  const deleteRecording = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id))
  }

  const renameRecording = (id: string, newTitle: string) => {
    setRecordings((prev) => prev.map((r) => (r.id === id ? { ...r, title: newTitle } : r)))
  }

  return (
    <RecordingContext.Provider value={{ recordings, addRecording, deleteRecording, renameRecording }}>
      {children}
    </RecordingContext.Provider>
  )
}

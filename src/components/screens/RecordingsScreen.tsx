"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Video, Mic, MoreVertical, Play, Trash2, Edit } from "lucide-react"
import { useRecordings } from "@/contexts/RecordingContext"
import type { Recording } from "@/types"

export const RecordingsScreen = () => {
  const { recordings, deleteRecording, renameRecording } = useRecordings()
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recording?")) {
      deleteRecording(id)
    }
  }

  const handleRename = (id: string, currentTitle: string) => {
    const newTitle = prompt("Enter new title:", currentTitle)
    if (newTitle && newTitle.trim()) {
      renameRecording(id, newTitle.trim())
    }
  }

  const RecordingItem = ({ recording }: { recording: Recording }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-700">
            {recording.type === "video" ? (
              <Video className="h-6 w-6 text-blue-400" />
            ) : (
              <Mic className="h-6 w-6 text-blue-400" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white">{recording.title}</h3>
            <p className="text-sm text-gray-400">
              {recording.duration} • {new Date(recording.date).toLocaleDateString()}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setSelectedRecording(selectedRecording === recording.id ? null : recording.id)}
              className="rounded-full p-2 hover:bg-gray-700"
            >
              <MoreVertical className="h-5 w-5 text-gray-400" />
            </button>

            {selectedRecording === recording.id && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-gray-600 bg-gray-800 py-1 shadow-lg z-10">
                <button
                  onClick={() => {
                    // Play functionality would go here
                    setSelectedRecording(null)
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-white hover:bg-gray-700"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </button>
                <button
                  onClick={() => {
                    handleRename(recording.id, recording.title)
                    setSelectedRecording(null)
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-white hover:bg-gray-700"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Rename
                </button>
                <button
                  onClick={() => {
                    handleDelete(recording.id)
                    setSelectedRecording(null)
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-full bg-gray-900 p-4 pb-20">
      <h1 className="mb-6 text-2xl font-bold text-white">My Recordings</h1>

      {recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Video className="mb-4 h-16 w-16 text-gray-600" />
          <h3 className="mb-2 text-xl font-semibold text-gray-400">No recordings yet</h3>
          <p className="text-gray-500">Start recording to see your videos and audio files here</p>
        </div>
      ) : (
        <div>
          {recordings.map((recording) => (
            <RecordingItem key={recording.id} recording={recording} />
          ))}
        </div>
      )}
    </div>
  )
}

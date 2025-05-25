"use client"

import { Minus, Plus, Turtle, Rabbit } from "lucide-react"

interface TeleprompterControlsProps {
  scrollSpeed: number
  fontSize: number
  onScrollSpeedChange: (speed: number) => void
  onFontSizeChange: (size: number) => void
}

export const TeleprompterControls = ({
  scrollSpeed,
  fontSize,
  onScrollSpeedChange,
  onFontSizeChange,
}: TeleprompterControlsProps) => {
  const increaseFontSize = () => {
    if (fontSize < 40) {
      onFontSizeChange(fontSize + 2)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 16) {
      onFontSizeChange(fontSize - 2)
    }
  }

  const increaseSpeed = () => {
    if (scrollSpeed < 5) {
      onScrollSpeedChange(scrollSpeed + 0.5)
    }
  }

  const decreaseSpeed = () => {
    if (scrollSpeed > 0.5) {
      onScrollSpeedChange(scrollSpeed - 0.5)
    }
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="flex items-center justify-center rounded-full bg-black/70 px-4 py-2">
        {/* Font Size Controls */}
        <button
          onClick={decreaseFontSize}
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <span className="text-sm font-bold">A-</span>
        </button>

        <button
          onClick={increaseFontSize}
          className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <span className="text-sm font-bold">A+</span>
        </button>

        {/* Speed Controls */}
        <div className="flex items-center">
          <Turtle className="mr-2 h-4 w-4 text-blue-400" />

          <button
            onClick={decreaseSpeed}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
          >
            <Minus className="h-3 w-3 text-white" />
          </button>

          <div className="mx-2 h-1 w-16 rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${(scrollSpeed / 5) * 100}%` }}
            />
          </div>

          <button
            onClick={increaseSpeed}
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
          >
            <Plus className="h-3 w-3 text-white" />
          </button>

          <Rabbit className="ml-2 h-4 w-4 text-blue-400" />
        </div>
      </div>
    </div>
  )
}

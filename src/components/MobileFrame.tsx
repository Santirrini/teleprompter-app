"use client"

import type { ReactNode } from "react"

interface MobileFrameProps {
  children: ReactNode
}

export const MobileFrame = ({ children }: MobileFrameProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative h-[800px] w-[375px] overflow-hidden rounded-[2.5rem] border-8 border-gray-800 bg-black shadow-2xl">
        {/* Status bar */}
        <div className="flex h-6 items-center justify-between bg-black px-6 text-xs text-white">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="h-1 w-4 rounded-full bg-white"></div>
            <div className="h-1 w-1 rounded-full bg-white"></div>
            <div className="h-1 w-6 rounded-full bg-white"></div>
          </div>
        </div>

        {/* App content */}
        <div className="h-[calc(100%-1.5rem)] w-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

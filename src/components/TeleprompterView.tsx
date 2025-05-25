"use client"

import { useEffect, useRef } from "react"

interface TeleprompterViewProps {
  script: string
  fontSize: number
  scrollSpeed: number
  isScrolling: boolean
}

export const TeleprompterView = ({ script, fontSize, scrollSpeed, isScrolling }: TeleprompterViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isScrolling && scrollRef.current) {
      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += scrollSpeed
        }
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isScrolling, scrollSpeed])

  const paragraphs = script.split("\n").filter((p) => p.trim().length > 0)

  return (
    <div className="relative h-full">
      <div ref={scrollRef} className="h-full overflow-hidden px-6" style={{ scrollBehavior: "smooth" }}>
        <div className="h-1/2" /> {/* Top padding */}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="mb-6 text-center font-medium text-white"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${fontSize * 1.4}px`,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {paragraph}
          </p>
        ))}
        <div className="h-1/2" /> {/* Bottom padding */}
      </div>

      {/* Center line indicator */}
      <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-blue-500/50 -translate-y-0.5" />
    </div>
  )
}

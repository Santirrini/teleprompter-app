"use client"

import { Home, FileText, Video, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "scripts", label: "Scripts", icon: FileText },
    { id: "recordings", label: "Recordings", icon: Video },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-900">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center py-2 text-xs transition-colors",
                activeTab === tab.id ? "text-blue-500" : "text-gray-400",
              )}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

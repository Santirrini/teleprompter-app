"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Script } from "../types/User"

interface ScriptContextType {
  scripts: Script[]
  currentScript: string
  setCurrentScript: (script: string) => void
  saveScript: (script: Script) => void
  deleteScript: (id: string) => void
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined)

export const useScript = () => {
  const context = useContext(ScriptContext)
  if (!context) {
    throw new Error("useScript must be used within a ScriptProvider")
  }
  return context
}

export const ScriptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scripts, setScripts] = useState<Script[]>([])
  const [currentScript, setCurrentScript] = useState("")

  const saveScript = (script: Script) => {
    setScripts((prev) => [...prev, script])
  }

  const deleteScript = (id: string) => {
    setScripts((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <ScriptContext.Provider
      value={{
        scripts,
        currentScript,
        setCurrentScript,
        saveScript,
        deleteScript,
      }}
    >
      {children}
    </ScriptContext.Provider>
  )
}

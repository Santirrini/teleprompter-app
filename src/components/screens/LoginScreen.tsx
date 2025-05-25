"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/contexts/AuthContext"
import { Eye, EyeOff, X } from "lucide-react"

interface LoginScreenProps {
  onSwitchToSignup: () => void
  onClose: () => void
}

export const LoginScreen = ({ onSwitchToSignup, onClose }: LoginScreenProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="rounded-full bg-blue-600 p-2">
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="button" className="text-sm text-gray-400 hover:text-gray-300">
            Forgot your password?
          </button>

          <Button type="submit" loading={isLoading} className="w-full">
            LOGIN
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button onClick={onSwitchToSignup} className="text-blue-500 hover:text-blue-400">
              Sign Up
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Demo: test@test.com / password</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Leaf, Sprout, Droplets, Wind } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { icon: Leaf, text: "Initializing DigitalFarm Platform", color: "text-green-500" },
    { icon: Sprout, text: "Loading Farm Management System", color: "text-emerald-500" },
    { icon: Droplets, text: "Connecting to Weather Services", color: "text-blue-500" },
    { icon: Wind, text: "Preparing AI Advisory System", color: "text-cyan-500" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onLoadingComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length)
    }, 1200)

    return () => clearInterval(stepTimer)
  }, [])

  const CurrentIcon = loadingSteps[currentStep].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo and Brand */}
        <div className="space-y-4">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-lg">
              <Leaf className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              DigitalFarm
            </h1>
            <p className="text-gray-600 mt-2">Sustainable Agriculture Platform</p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CurrentIcon className={`h-6 w-6 ${loadingSteps[currentStep].color} animate-pulse`} />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress value={progress} className="h-3 bg-green-100" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{Math.round(progress)}%</span>
              <span>Loading...</span>
            </div>
          </div>

          {/* Current Step */}
          <div className="space-y-2">
            <p className={`text-lg font-medium ${loadingSteps[currentStep].color} animate-fade-in`}>
              {loadingSteps[currentStep].text}
            </p>
            <div className="flex justify-center space-x-2">
              {loadingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-green-500 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-green-500" />
            <span>Smart Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>Water Management</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-cyan-500" />
            <span>Climate Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-500" />
            <span>Sustainability</span>
          </div>
        </div>
      </div>
    </div>
  )
}

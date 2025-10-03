"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Leaf,
  CloudRain,
  Bug,
  TrendingUp,
  Lightbulb,
  Minimize2,
  X,
  Sparkles,
  Brain,
  HelpCircle,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "suggestion" | "analysis"
}

interface QuickAction {
  icon: React.ElementType
  label: string
  prompt: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    icon: Leaf,
    label: "Crop Advice",
    prompt: "What crops should I plant this season?",
    color: "bg-green-500",
  },
  {
    icon: CloudRain,
    label: "Weather Impact",
    prompt: "How will upcoming weather affect my crops?",
    color: "bg-blue-500",
  },
  {
    icon: Bug,
    label: "Pest Control",
    prompt: "I found pests on my plants, what should I do?",
    color: "bg-red-500",
  },
  {
    icon: TrendingUp,
    label: "Market Prices",
    prompt: "What are the current market prices for my crops?",
    color: "bg-purple-500",
  },
  {
    icon: Lightbulb,
    label: "Sustainability Tips",
    prompt: "How can I make my farm more sustainable?",
    color: "bg-yellow-500",
  },
]

const sampleResponses = {
  "crop advice":
    "Based on your location and current season, I recommend considering corn and soybeans. Corn has excellent market demand and suits most soil types, while soybeans offer great nitrogen fixation benefits for soil health. Would you like specific planting schedules for your area?",
  "weather impact":
    "Current weather patterns show moderate rainfall expected this week, which is beneficial for recently planted crops. However, I notice temperatures may drop next week - consider covering sensitive seedlings. Would you like me to set up weather alerts for your farm?",
  "pest control":
    "I can help identify the pest and recommend organic solutions. Can you describe what the pests look like? Common options include beneficial insects, neem oil treatments, or companion planting. I always recommend starting with the most environmentally friendly approach.",
  "market prices":
    "Current market trends show corn at $6.20/bushel (up 3% this week) and soybeans at $14.80/bushel (stable). Local demand is strong due to recent export agreements. I can set up price alerts for your specific crops if you'd like.",
  sustainability:
    "Great question! Here are some immediate steps: 1) Implement cover cropping to improve soil health, 2) Consider drip irrigation to reduce water usage by 30-50%, 3) Use integrated pest management to reduce chemical inputs. Each of these can also improve your bottom line while helping the environment.",
  default:
    "I'm here to help with all your farming questions! I can provide advice on crops, weather, pests, market conditions, sustainability practices, and much more. What specific challenge are you facing on your farm today?",
}

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("crop") || lowerMessage.includes("plant")) {
    return sampleResponses["crop advice"]
  } else if (
    lowerMessage.includes("weather") ||
    lowerMessage.includes("rain") ||
    lowerMessage.includes("temperature")
  ) {
    return sampleResponses["weather impact"]
  } else if (lowerMessage.includes("pest") || lowerMessage.includes("bug") || lowerMessage.includes("insect")) {
    return sampleResponses["pest control"]
  } else if (lowerMessage.includes("price") || lowerMessage.includes("market") || lowerMessage.includes("sell")) {
    return sampleResponses["market prices"]
  } else if (
    lowerMessage.includes("sustain") ||
    lowerMessage.includes("organic") ||
    lowerMessage.includes("environment")
  ) {
    return sampleResponses["sustainability"]
  } else {
    return sampleResponses["default"]
  }
}

interface AIChatbotProps {
  isFloating?: boolean
  onClose?: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export function AIChatbot({ isFloating = false, onClose, isMinimized = false, onToggleMinimize }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI farming assistant. I can help you with crop recommendations, weather insights, pest management, market information, and sustainability practices. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  if (isFloating && isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  const chatContent = (
    <>
      <CardHeader className={`${isFloating ? "pb-3" : "pb-4"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className={`${isFloating ? "text-lg" : "text-xl"} flex items-center gap-2`}>
                AI Farm Assistant
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Smart
                </Badge>
              </CardTitle>
              {!isFloating && <CardDescription>Get instant answers to all your farming questions</CardDescription>}
            </div>
          </div>
          {isFloating && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Actions */}
        {!isFloating && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Quick Help Topics
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-2 h-auto p-3 text-left justify-start"
                  >
                    <div className={`p-1.5 ${action.color} rounded text-white`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <span className="text-xs">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-3">
          <ScrollArea className={`${isFloating ? "h-80" : "h-96"} pr-4`}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-secondary/10">
                        <User className="h-4 w-4 text-secondary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about farming..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="sm" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </>
  )

  if (isFloating) {
    return (
      <div className="fixed bottom-4 right-4 z-50 w-96">
        <Card className="shadow-2xl border-2 border-primary/20">{chatContent}</Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">AI Farm Assistant</h2>
        <p className="text-muted-foreground">
          Get instant, intelligent answers to all your farming questions with our advanced AI assistant
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">{chatContent}</Card>
    </div>
  )
}

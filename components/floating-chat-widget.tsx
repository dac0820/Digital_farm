"use client"

import { useState } from "react"
import { AIChatbot } from "./ai-chatbot"

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false)
      setIsOpen(true)
    } else {
      setIsMinimized(true)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  if (!isOpen && isMinimized) {
    return <AIChatbot isFloating={true} isMinimized={true} onToggleMinimize={handleToggle} />
  }

  return <AIChatbot isFloating={true} isMinimized={false} onClose={handleClose} onToggleMinimize={handleToggle} />
}

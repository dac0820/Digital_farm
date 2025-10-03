"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="h-8 px-3 text-xs"
        >
          EN
        </Button>
        <Button
          variant={language === "hi" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("hi")}
          className="h-8 px-3 text-xs"
        >
          हिं
        </Button>
      </div>
    </div>
  )
}

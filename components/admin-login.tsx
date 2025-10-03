"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, User, Lock } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { useLanguage } from "@/contexts/language-context"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({ username: "admin", password: "admin123" })
  const [error, setError] = useState("")
  const { login, isLoading } = useAdmin()
  const { t } = useLanguage()

  const translations = t()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!credentials.username || !credentials.password) {
      setError(translations.adminLogin.validation.required)
      return
    }

    const success = await login(credentials)
    if (success) {
      onLoginSuccess()
    } else {
      setError(translations.adminLogin.validation.invalid)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">{translations.adminLogin.title}</CardTitle>
            <CardDescription className="text-gray-600 mt-2">{translations.adminLogin.subtitle}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                {translations.adminLogin.username}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder={translations.adminLogin.usernamePlaceholder}
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                {translations.adminLogin.password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={translations.adminLogin.passwordPlaceholder}
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translations.adminLogin.signingIn}
                </>
              ) : (
                translations.adminLogin.signIn
              )}
            </Button>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{translations.adminLogin.demoCredentials.title}</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div>
                <strong>{translations.adminLogin.demoCredentials.admin}:</strong> admin / admin123
              </div>
              <div>
                <strong>{translations.adminLogin.demoCredentials.superAdmin}:</strong> superadmin / super123
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

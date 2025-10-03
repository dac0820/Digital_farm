"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminUser {
  id: string
  username: string
  role: "admin" | "super_admin"
  name: string
}

interface LoginCredentials {
  username: string
  password: string
}

interface AdminContextType {
  isAuthenticated: boolean
  adminUser: AdminUser | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Demo admin credentials
const DEMO_ADMINS = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "admin" as const,
    name: "Farm Admin",
  },
  {
    id: "2",
    username: "superadmin",
    password: "super123",
    role: "super_admin" as const,
    name: "Super Administrator",
  },
]

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedAdmin = localStorage.getItem("admin-session")
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin)
        setAdminUser(admin)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem("admin-session")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const admin = DEMO_ADMINS.find((a) => a.username === credentials.username && a.password === credentials.password)

    if (admin) {
      const adminUser: AdminUser = {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        name: admin.name,
      }

      setAdminUser(adminUser)
      setIsAuthenticated(true)
      localStorage.setItem("admin-session", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setAdminUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("admin-session")
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

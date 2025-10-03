"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Sprout,
  CloudRain,
  BarChart3,
  Shield,
  Brain,
  Leaf,
  Droplets,
  Wind,
  TrendingUp,
  MapPin,
  Calendar,
  Star,
  Zap,
  Globe,
  Menu,
  X,
  MessageCircle,
  LogOut,
} from "lucide-react"
import { FarmerRegistration } from "@/components/farmer-registration"
import { FarmerProfile } from "@/components/farmer-profile"
import { ActivityMonitoring } from "@/components/activity-monitoring"
import { AICropAdvisory } from "@/components/ai-crop-advisory"
import { WeatherDashboard } from "@/components/weather-dashboard"
import { MRVReports } from "@/components/mrv-reports"
import { FloatingChatWidget } from "@/components/floating-chat-widget"
import { AIChatbot } from "@/components/ai-chatbot"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { AdminVerificationDashboard } from "@/components/admin-verification-dashboard"
import { AdminLogin } from "@/components/admin-login"
import { useAdmin } from "@/contexts/admin-context"
import { LoadingScreen } from "@/components/loading-screen"

export default function FarmManagementApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showProfile, setShowProfile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { isAuthenticated, adminUser, logout } = useAdmin()

  const navigationItems = [
    { id: "dashboard", label: t("nav.dashboard"), icon: BarChart3 },
    { id: "monitoring", label: t("nav.monitoring"), icon: Sprout },
    { id: "advisory", label: t("nav.advisory"), icon: Brain },
    { id: "assistant", label: t("nav.assistant"), icon: MessageCircle },
    { id: "weather", label: t("nav.weather"), icon: CloudRain },
    { id: "reports", label: t("nav.reports"), icon: BarChart3 },
  ]

  const handleAdminLoginSuccess = () => {
    setActiveTab("login")
  }

  const handleAdminLogout = () => {
    logout()
    setActiveTab("dashboard")
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">DigitalFarm</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Sustainable Agriculture Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              {isAuthenticated && adminUser && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{adminUser.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAdminLogout}
                    className="h-6 w-6 p-0 hover:bg-primary/20"
                  >
                    <LogOut className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {!isAuthenticated && (
                <div className="hidden sm:flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("register")} className="gap-2">
                    <Users className="h-4 w-4" />
                    Register
                  </Button>
                  <Button variant="default" size="sm" onClick={() => setActiveTab("login")} className="gap-2">
                    <Shield className="h-4 w-4" />
                    Login
                  </Button>
                </div>
              )}

              <nav className="hidden lg:flex items-center gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(item.id)}
                      className={`gap-2 transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                    </Button>
                  )
                })}
              </nav>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in-up">
              {isAuthenticated && adminUser && (
                <div className="flex items-center justify-between mb-4 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{adminUser.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAdminLogout}
                    className="h-8 w-8 p-0 hover:bg-primary/20"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {!isAuthenticated && (
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveTab("register")
                      setMobileMenuOpen(false)
                    }}
                    className="flex-1 gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Register
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      setActiveTab("login")
                      setMobileMenuOpen(false)
                    }}
                    className="flex-1 gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Login
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "outline"}
                      onClick={() => {
                        setActiveTab(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className="gap-2 justify-start"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t("dashboard.title")}
                </h2>
                <p className="text-muted-foreground mt-2">{t("dashboard.subtitle")}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="gap-2 px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  {t("dashboard.lastUpdated")}
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {t("dashboard.premium")}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.totalFarmers")}</CardTitle>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <Progress value={75} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.waterUsage")}</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">2.4M L</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                    <p className="text-xs text-green-600">-8% from last month</p>
                  </div>
                  <Progress value={60} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.co2Emissions")}</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Wind className="h-4 w-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">85.2 kg</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                    <p className="text-xs text-green-600">-15% from last month</p>
                  </div>
                  <Progress value={40} className="mt-3 h-2" />
                </CardContent>
              </Card>

              <Card className="gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.cropYield")}</CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">94.5%</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <p className="text-xs text-green-600">+5% from last season</p>
                  </div>
                  <Progress value={95} className="mt-3 h-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {
                  id: "register",
                  icon: Users,
                  title: t("feature.farmerRegistration"),
                  description: t("feature.farmerRegistration.desc"),
                  buttonText: t("button.getStarted"),
                  color: "bg-blue-500",
                },
                {
                  id: "monitoring",
                  icon: Sprout,
                  title: t("feature.activityMonitoring"),
                  description: t("feature.activityMonitoring.desc"),
                  buttonText: t("button.startLogging"),
                  color: "bg-green-500",
                },
                {
                  id: "advisory",
                  icon: Brain,
                  title: t("feature.aiCropAdvisory"),
                  description: t("feature.aiCropAdvisory.desc"),
                  buttonText: t("button.getAdvice"),
                  color: "bg-purple-500",
                },
                {
                  id: "weather",
                  icon: CloudRain,
                  title: t("feature.weatherUpdates"),
                  description: t("feature.weatherUpdates.desc"),
                  buttonText: t("button.viewWeather"),
                  color: "bg-cyan-500",
                },
                {
                  id: "reports",
                  icon: BarChart3,
                  title: t("feature.mrvReports"),
                  description: t("feature.mrvReports.desc"),
                  buttonText: t("button.generateReport"),
                  color: "bg-orange-500",
                },
                {
                  id: "assistant",
                  icon: Zap,
                  title: t("feature.aiAssistant"),
                  description: t("feature.aiAssistant.desc"),
                  buttonText: t("button.chatNow"),
                  color: "bg-teal-500",
                },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className="gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div
                          className={`p-3 ${feature.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-lg">{feature.title}</span>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => setActiveTab(feature.id)}
                        className="w-full group-hover:bg-primary/90 transition-colors duration-300"
                      >
                        {feature.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="gradient-card border-2 border-dashed border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  {t("common.comingSoon")} Features
                </CardTitle>
                <CardDescription className="text-base">
                  Exciting new modules in development to enhance your farming experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Brain,
                      title: "Disease Detection AI",
                      description: "Upload crop images for AI analysis",
                      progress: 75,
                    },
                    {
                      icon: Sprout,
                      title: "Nutrient Recommendations",
                      description: "Personalized fertilizer guidance",
                      progress: 60,
                    },
                    {
                      icon: MapPin,
                      title: "Agri-Shop Locator",
                      description: "Find nearby agricultural suppliers",
                      progress: 45,
                    },
                  ].map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={index}
                        className="p-6 border border-border rounded-xl bg-gradient-to-br from-background to-card hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Icon className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{t("common.progress")}</span>
                                <span>{feature.progress}%</span>
                              </div>
                              <Progress value={feature.progress} className="h-2" />
                            </div>
                            <Badge variant="outline" className="mt-3">
                              <Globe className="h-3 w-3 mr-1" />
                              {t("common.comingSoon")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="space-y-6">
            {!showProfile ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Join FarmMRV</h2>
                  <p className="text-muted-foreground">
                    Register your farm to start tracking sustainability metrics and accessing AI-powered insights
                  </p>
                </div>
                <FarmerRegistration />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0 h-auto" onClick={() => setShowProfile(true)}>
                      View Sample Profile
                    </Button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Farmer Profile</h2>
                    <p className="text-muted-foreground">Manage your farm information and track your progress</p>
                  </div>
                  <Button variant="outline" onClick={() => setShowProfile(false)}>
                    Back to Registration
                  </Button>
                </div>
                <FarmerProfile />
              </div>
            )}
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <ActivityMonitoring />
          </TabsContent>

          <TabsContent value="advisory" className="space-y-6">
            <AICropAdvisory />
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <WeatherDashboard />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <MRVReports />
          </TabsContent>

          <TabsContent value="login" className="space-y-6">
            {!isAuthenticated ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Admin Login</h2>
                  <p className="text-muted-foreground">Sign in to access the admin dashboard and verification tools</p>
                </div>
                <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
              </div>
            ) : (
              <AdminVerificationDashboard />
            )}
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6">
            <AIChatbot />
          </TabsContent>
        </Tabs>
      </main>

      <FloatingChatWidget />
    </div>
  )
}

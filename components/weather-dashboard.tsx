"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CloudRain,
  Sun,
  Cloud,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  AlertTriangle,
  X,
} from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    description: string
    humidity: number
    windSpeed: number
    visibility: number
    pressure: number
    icon: string
  }
  forecast: Array<{
    day: string
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
  }>
  alerts: Array<{
    id: string
    type: "warning" | "watch" | "advisory"
    title: string
    description: string
    severity: "low" | "medium" | "high"
  }>
}

// Mock weather data
const mockWeatherData: WeatherData = {
  current: {
    temperature: 24,
    condition: "Partly Cloudy",
    description: "Partly cloudy with occasional sunshine",
    humidity: 68,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    icon: "partly-cloudy",
  },
  forecast: [
    {
      day: "Today",
      date: "Jun 15",
      high: 26,
      low: 18,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      precipitation: 20,
    },
    {
      day: "Tomorrow",
      date: "Jun 16",
      high: 28,
      low: 20,
      condition: "Sunny",
      icon: "sunny",
      precipitation: 5,
    },
    {
      day: "Wednesday",
      date: "Jun 17",
      high: 31,
      low: 22,
      condition: "Hot",
      icon: "sunny",
      precipitation: 0,
    },
    {
      day: "Thursday",
      date: "Jun 18",
      high: 33,
      low: 24,
      condition: "Very Hot",
      icon: "sunny",
      precipitation: 0,
    },
    {
      day: "Friday",
      date: "Jun 19",
      high: 25,
      low: 19,
      condition: "Rainy",
      icon: "rainy",
      precipitation: 85,
    },
    {
      day: "Saturday",
      date: "Jun 20",
      high: 22,
      low: 16,
      condition: "Heavy Rain",
      icon: "heavy-rain",
      precipitation: 95,
    },
    {
      day: "Sunday",
      date: "Jun 21",
      high: 24,
      low: 17,
      condition: "Cloudy",
      icon: "cloudy",
      precipitation: 30,
    },
  ],
  alerts: [
    {
      id: "1",
      type: "warning",
      title: "Heat Wave Warning",
      description:
        "Temperatures expected to reach 33°C on Wednesday and Thursday. Take precautions to protect crops and livestock.",
      severity: "high",
    },
    {
      id: "2",
      type: "advisory",
      title: "Heavy Rain Expected",
      description:
        "Significant rainfall predicted for Friday and Saturday. Consider drainage preparations for your fields.",
      severity: "medium",
    },
  ],
}

const getWeatherIcon = (iconType: string, size = 24) => {
  const iconProps = { size, className: "text-primary" }

  switch (iconType) {
    case "sunny":
      return <Sun {...iconProps} />
    case "partly-cloudy":
      return <Cloud {...iconProps} />
    case "cloudy":
      return <Cloud {...iconProps} />
    case "rainy":
      return <CloudRain {...iconProps} />
    case "heavy-rain":
      return <CloudRain {...iconProps} />
    case "snowy":
      return <CloudSnow {...iconProps} />
    default:
      return <Sun {...iconProps} />
  }
}

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData)
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate periodic weather updates
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  const activeAlerts = weatherData.alerts.filter((alert) => !dismissedAlerts.includes(alert.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Weather Dashboard</h2>
          <p className="text-muted-foreground">Real-time weather conditions and forecasts for your farm location</p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <CloudRain className="h-4 w-4" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Badge>
      </div>

      {/* Weather Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === "high" ? "destructive" : "default"} className="relative">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                {alert.title}
                <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getWeatherIcon(weatherData.current.icon, 32)}
            Current Conditions
          </CardTitle>
          <CardDescription>Green Valley Farm, Iowa, United States</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Weather Display */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold text-primary">{weatherData.current.temperature}°C</div>
                <div>
                  <div className="text-xl font-semibold">{weatherData.current.condition}</div>
                  <div className="text-muted-foreground">{weatherData.current.description}</div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                <Droplets className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div className="font-semibold">{weatherData.current.humidity}%</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                <Wind className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Wind Speed</div>
                  <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-semibold">{weatherData.current.visibility} km</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                <Gauge className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Pressure</div>
                  <div className="font-semibold">{weatherData.current.pressure} hPa</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            7-Day Forecast
          </CardTitle>
          <CardDescription>Extended weather outlook for farm planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <Card key={index} className="text-center p-4">
                <div className="space-y-2">
                  <div className="font-semibold text-sm">{day.day}</div>
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                  <div className="flex justify-center">{getWeatherIcon(day.icon, 32)}</div>
                  <div className="text-xs font-medium">{day.condition}</div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-primary">{day.high}°</div>
                    <div className="text-sm text-muted-foreground">{day.low}°</div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <Droplets className="h-3 w-3 text-primary" />
                    <span>{day.precipitation}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farm Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Farm Impact Analysis
          </CardTitle>
          <CardDescription>How current weather conditions affect your farming operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <Droplets className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">Irrigation Needs</div>
              <div className="text-2xl font-bold text-primary">Moderate</div>
              <p className="text-sm text-muted-foreground mt-2">
                Current humidity levels suggest moderate irrigation requirements
              </p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <Sun className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">Crop Stress Risk</div>
              <div className="text-2xl font-bold text-accent">High</div>
              <p className="text-sm text-muted-foreground mt-2">Upcoming heat wave may stress sensitive crops</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <CloudRain className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-semibold">Field Work Window</div>
              <div className="text-2xl font-bold text-primary">2 Days</div>
              <p className="text-sm text-muted-foreground mt-2">Optimal conditions before heavy rain arrives</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather History & Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            Weather Insights
          </CardTitle>
          <CardDescription>Key weather patterns and recommendations for your farm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">This Week's Summary</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Average temperature: 26°C (2°C above normal)</li>
                  <li>• Total rainfall expected: 45mm</li>
                  <li>• Peak heat index: Wednesday-Thursday</li>
                  <li>• Optimal planting window: Monday-Tuesday</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Farming Recommendations</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Increase irrigation before heat wave</li>
                  <li>• Prepare drainage for weekend rainfall</li>
                  <li>• Consider shade protection for sensitive crops</li>
                  <li>• Schedule harvesting before Friday</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  MapPin,
  Droplets,
  Wind,
  Leaf,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Satellite,
  Thermometer,
  Calendar,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  Clock,
  Shield,
  Lightbulb,
  CloudRain,
} from "lucide-react"

interface CropRecommendation {
  name: string
  suitability: number
  waterUse: number
  carbonFootprint: number
  expectedYield: string
  growthPeriod: string
  profitability: string
  reasons: string[]
  riskLevel: "Low" | "Medium" | "High"
  plantingWindow: string
  harvestWindow: string
  soilRequirements: string[]
  climateAdaptation: number
}

interface SatelliteData {
  ndvi: number
  soilMoisture: number
  temperature: number
  precipitation: number
  lastUpdated: string
}

interface RiskAssessment {
  type: string
  level: "Low" | "Medium" | "High"
  description: string
  mitigation: string[]
  probability: number
}

interface FarmingCalendar {
  month: string
  activities: string[]
  priority: "High" | "Medium" | "Low"
  weatherConsiderations: string
}

const soilTypes = ["Loamy", "Sandy", "Clay", "Silty", "Peaty", "Chalky"]
const climateZones = ["Tropical", "Subtropical", "Temperate", "Continental", "Arid", "Mediterranean"]

// Mock enhanced data
const getSatelliteData = (): SatelliteData => ({
  ndvi: 0.75,
  soilMoisture: 68,
  temperature: 24.5,
  precipitation: 12.3,
  lastUpdated: "2 hours ago",
})

const getRiskAssessments = (): RiskAssessment[] => [
  {
    type: "Drought Risk",
    level: "Medium",
    description: "Moderate drought conditions expected in next 30 days",
    mitigation: ["Install drip irrigation", "Mulch around plants", "Select drought-resistant varieties"],
    probability: 65,
  },
  {
    type: "Pest Pressure",
    level: "Low",
    description: "Corn borer activity below seasonal average",
    mitigation: ["Monitor weekly", "Maintain beneficial insect habitat", "Use pheromone traps"],
    probability: 25,
  },
  {
    type: "Market Volatility",
    level: "High",
    description: "Commodity prices showing high volatility",
    mitigation: ["Consider forward contracts", "Diversify crop portfolio", "Monitor market trends"],
    probability: 80,
  },
]

const getFarmingCalendar = (): FarmingCalendar[] => [
  {
    month: "March",
    activities: ["Soil preparation", "Seed corn planting", "Apply pre-emergent herbicide"],
    priority: "High",
    weatherConsiderations: "Ensure soil temperature above 50°F",
  },
  {
    month: "April",
    activities: ["Monitor germination", "Side-dress nitrogen", "Weed control"],
    priority: "High",
    weatherConsiderations: "Watch for late frost warnings",
  },
  {
    month: "May",
    activities: ["Crop scouting", "Pest monitoring", "Irrigation setup"],
    priority: "Medium",
    weatherConsiderations: "Optimal growing conditions expected",
  },
  {
    month: "June",
    activities: ["Fungicide application", "Nutrient monitoring", "Yield estimation"],
    priority: "Medium",
    weatherConsiderations: "Monitor for heat stress",
  },
]

const getCropRecommendations = (location: string, soilType: string, climateZone: string): CropRecommendation[] => {
  const recommendations: CropRecommendation[] = [
    {
      name: "Corn (Hybrid Variety)",
      suitability: 94,
      waterUse: 750,
      carbonFootprint: 1.1,
      expectedYield: "10-14 tons/hectare",
      growthPeriod: "95-110 days",
      profitability: "High",
      riskLevel: "Low",
      plantingWindow: "March 15 - April 30",
      harvestWindow: "August 15 - September 30",
      soilRequirements: ["Well-drained", "pH 6.0-7.0", "Rich in organic matter"],
      climateAdaptation: 92,
      reasons: [
        "Excellent match for your soil type and climate",
        "High drought tolerance variety recommended",
        "Strong local market demand with premium pricing",
        "Optimal planting window aligns with weather patterns",
        "Low pest pressure expected this season",
      ],
    },
    {
      name: "Soybeans (Non-GMO)",
      suitability: 91,
      waterUse: 580,
      carbonFootprint: 0.7,
      expectedYield: "3.2-4.5 tons/hectare",
      growthPeriod: "105-125 days",
      profitability: "High",
      riskLevel: "Low",
      plantingWindow: "April 1 - May 15",
      harvestWindow: "September 1 - October 15",
      soilRequirements: ["Well-drained", "pH 6.2-7.0", "Moderate fertility"],
      climateAdaptation: 89,
      reasons: [
        "Excellent nitrogen-fixing properties for soil health",
        "Premium market for non-GMO varieties",
        "Perfect rotation crop with corn",
        "Low carbon footprint aligns with sustainability goals",
        "Drought-resistant variety available",
      ],
    },
    {
      name: "Winter Wheat",
      suitability: 78,
      waterUse: 850,
      carbonFootprint: 1.0,
      expectedYield: "5-7 tons/hectare",
      growthPeriod: "240-270 days",
      profitability: "Medium",
      riskLevel: "Medium",
      plantingWindow: "September 15 - October 30",
      harvestWindow: "June 15 - July 30",
      soilRequirements: ["Well-drained", "pH 6.0-7.5", "Good structure"],
      climateAdaptation: 75,
      reasons: [
        "Good cover crop benefits",
        "Stable market with consistent demand",
        "Fits well in rotation system",
        "Moderate input requirements",
      ],
    },
  ]

  return recommendations.sort((a, b) => b.suitability - a.suitability)
}

export function AICropAdvisory() {
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    climateZone: "",
    farmSize: "",
  })
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [satelliteData] = useState<SatelliteData>(getSatelliteData())
  const [riskAssessments] = useState<RiskAssessment[]>(getRiskAssessments())
  const [farmingCalendar] = useState<FarmingCalendar[]>(getFarmingCalendar())
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("recommendations")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.location || !formData.soilType || !formData.climateZone) return

    setIsLoading(true)

    // Simulate AI processing with enhanced analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const results = getCropRecommendations(formData.location, formData.soilType, formData.climateZone)
    setRecommendations(results)
    setShowResults(true)
    setIsLoading(false)
  }

  const resetForm = () => {
    setShowResults(false)
    setRecommendations([])
    setFormData({ location: "", soilType: "", climateZone: "", farmSize: "" })
    setActiveTab("recommendations")
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Enhanced Header with Real-time Data */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Enhanced AI Crop Analysis</h2>
            <p className="text-muted-foreground">
              Advanced recommendations for {formData.location} with real-time satellite data
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-2">
              <Satellite className="h-4 w-4" />
              Live Data
            </Badge>
            <Button variant="outline" onClick={resetForm}>
              New Analysis
            </Button>
          </div>
        </div>

        {/* Real-time Satellite Data Card */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5 text-blue-600" />
              Real-time Field Conditions
            </CardTitle>
            <CardDescription>Live satellite and sensor data for your farm location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{satelliteData.ndvi}</div>
                <p className="text-sm text-muted-foreground">NDVI Index</p>
                <Badge variant="secondary" className="mt-1">
                  Healthy
                </Badge>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{satelliteData.soilMoisture}%</div>
                <p className="text-sm text-muted-foreground">Soil Moisture</p>
                <Badge variant="secondary" className="mt-1">
                  Optimal
                </Badge>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Thermometer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{satelliteData.temperature}°C</div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <Badge variant="secondary" className="mt-1">
                  Good
                </Badge>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Wind className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{satelliteData.precipitation}mm</div>
                <p className="text-sm text-muted-foreground">Precipitation</p>
                <Badge variant="secondary" className="mt-1">
                  Recent
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {satelliteData.lastUpdated}
            </p>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="calendar">Farming Calendar</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {/* Best Recommendation - Enhanced */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">AI-Optimized Crop Recommendation</CardTitle>
                </div>
                <CardDescription>Based on satellite data, climate models, and market analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{recommendations[0]?.name}</h3>
                    <p className="text-muted-foreground">AI Confidence Score: {recommendations[0]?.suitability}%</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={recommendations[0]?.riskLevel === "Low" ? "secondary" : "destructive"}>
                        {recommendations[0]?.riskLevel} Risk
                      </Badge>
                      <Badge variant="outline">Climate Adapted: {recommendations[0]?.climateAdaptation}%</Badge>
                    </div>
                  </div>
                  <Badge variant="default" className="text-lg px-4 py-2">
                    <Target className="h-4 w-4 mr-1" />
                    Recommended
                  </Badge>
                </div>

                {/* Enhanced MRV Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Droplets className="h-5 w-5 text-blue-600" />
                        Water Efficiency
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">{recommendations[0]?.waterUse} L/kg</span>
                          <Badge variant="secondary">Efficient</Badge>
                        </div>
                        <Progress value={75} className="h-3" />
                        <p className="text-sm text-muted-foreground">25% more efficient than regional average</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Wind className="h-5 w-5 text-green-600" />
                        Carbon Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-600">
                            {recommendations[0]?.carbonFootprint} kg CO₂/kg
                          </span>
                          <Badge variant="secondary">Low Impact</Badge>
                        </div>
                        <Progress value={35} className="h-3" />
                        <p className="text-sm text-muted-foreground">35% below industry standard</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Profitability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-purple-600">
                            {recommendations[0]?.profitability}
                          </span>
                          <Badge variant="secondary">Projected</Badge>
                        </div>
                        <Progress value={85} className="h-3" />
                        <p className="text-sm text-muted-foreground">Expected ROI: 15-20%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Planting & Harvest Windows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Optimal Planting Window</h4>
                    </div>
                    <p className="text-lg font-bold text-green-700">{recommendations[0]?.plantingWindow}</p>
                    <p className="text-sm text-green-600 mt-1">Based on soil temperature and weather patterns</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">Expected Harvest Window</h4>
                    </div>
                    <p className="text-lg font-bold text-orange-700">{recommendations[0]?.harvestWindow}</p>
                    <p className="text-sm text-orange-600 mt-1">Estimated based on variety and climate data</p>
                  </div>
                </div>

                {/* Enhanced Reasons */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    AI Analysis Results
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recommendations[0]?.reasons.map((reason, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm p-2 bg-primary/5 rounded">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soil Requirements */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Soil Requirements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendations[0]?.soilRequirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Recommendations - Enhanced */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Crop Options</CardTitle>
                <CardDescription>Other AI-analyzed crops suitable for your conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.slice(1).map((crop, index) => (
                    <Card key={index} className="border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{crop.name}</CardTitle>
                          <div className="flex gap-1">
                            <Badge variant="outline">{crop.suitability}% match</Badge>
                            <Badge
                              variant={
                                crop.riskLevel === "Low"
                                  ? "secondary"
                                  : crop.riskLevel === "Medium"
                                    ? "default"
                                    : "destructive"
                              }
                            >
                              {crop.riskLevel}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Water Use:</span>
                            <div className="font-semibold">{crop.waterUse} L/kg</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">CO₂:</span>
                            <div className="font-semibold">{crop.carbonFootprint} kg/kg</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Yield:</span>
                            <div className="font-semibold">{crop.expectedYield}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Period:</span>
                            <div className="font-semibold">{crop.growthPeriod}</div>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">Planting: {crop.plantingWindow}</p>
                          <p className="text-xs text-muted-foreground">Harvest: {crop.harvestWindow}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Risk Assessment & Mitigation
                </CardTitle>
                <CardDescription>AI-powered risk analysis for your farming operation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessments.map((risk, index) => (
                    <Card
                      key={index}
                      className={`border-l-4 ${
                        risk.level === "Low"
                          ? "border-l-green-500"
                          : risk.level === "Medium"
                            ? "border-l-yellow-500"
                            : "border-l-red-500"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{risk.type}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                risk.level === "Low" ? "secondary" : risk.level === "Medium" ? "default" : "destructive"
                              }
                            >
                              {risk.level} Risk
                            </Badge>
                            <Badge variant="outline">{risk.probability}% probability</Badge>
                          </div>
                        </div>
                        <CardDescription>{risk.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-600" />
                            Mitigation Strategies
                          </h5>
                          <ul className="space-y-1">
                            {risk.mitigation.map((strategy, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Progress value={risk.probability} className="mt-3 h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  AI-Generated Farming Calendar
                </CardTitle>
                <CardDescription>Personalized schedule based on your crops and local conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {farmingCalendar.map((month, index) => (
                    <Card key={index} className="border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{month.month}</CardTitle>
                          <Badge
                            variant={
                              month.priority === "High"
                                ? "destructive"
                                : month.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {month.priority} Priority
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h5 className="font-semibold mb-2">Key Activities</h5>
                          <ul className="space-y-1">
                            {month.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t">
                          <h5 className="font-semibold mb-1 flex items-center gap-1">
                            <CloudRain className="h-4 w-4 text-blue-600" />
                            Weather Notes
                          </h5>
                          <p className="text-sm text-muted-foreground">{month.weatherConsiderations}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Advanced AI Insights
                </CardTitle>
                <CardDescription>Deep learning analysis and predictive recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        Yield Prediction Model
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on 10 years of historical data and current conditions
                      </p>
                      <div className="text-2xl font-bold text-blue-600">12.3 tons/hectare</div>
                      <p className="text-sm text-green-600">+15% above regional average</p>
                      <Progress value={85} className="mt-2 h-2" />
                    </div>

                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-600" />
                        Sustainability Score
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">Environmental impact assessment</p>
                      <div className="text-2xl font-bold text-green-600">8.7/10</div>
                      <p className="text-sm text-green-600">Excellent sustainability rating</p>
                      <Progress value={87} className="mt-2 h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        Climate Resilience
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">Adaptation to changing climate patterns</p>
                      <div className="text-2xl font-bold text-orange-600">High</div>
                      <p className="text-sm text-orange-600">Well-adapted to local conditions</p>
                      <Progress value={78} className="mt-2 h-2" />
                    </div>

                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        Market Opportunity
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">Price trends and demand analysis</p>
                      <div className="text-2xl font-bold text-purple-600">Favorable</div>
                      <p className="text-sm text-purple-600">Strong demand expected</p>
                      <Progress value={92} className="mt-2 h-2" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-border rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    AI Recommendations Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-1">Immediate Actions</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Prepare soil for planting</li>
                        <li>• Order certified seeds</li>
                        <li>• Check irrigation system</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">This Month</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Apply pre-emergent herbicide</li>
                        <li>• Monitor soil temperature</li>
                        <li>• Plan nutrient schedule</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">Long-term Strategy</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Implement cover cropping</li>
                        <li>• Consider precision agriculture</li>
                        <li>• Explore carbon credits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Enhanced AI Crop Advisory</h2>
          <p className="text-muted-foreground">
            Advanced crop recommendations with satellite data and predictive analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-2">
            <Brain className="h-4 w-4" />
            AI-Powered
          </Badge>
          <Badge variant="outline" className="gap-2">
            <Satellite className="h-4 w-4" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Farm Information & Analysis
          </CardTitle>
          <CardDescription>
            Provide your farm details for comprehensive AI analysis with satellite data integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Farm Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State/Province, Country"
                  required
                />
              </div>

              <div>
                <Label htmlFor="farmSize">Farm Size (optional)</Label>
                <Input
                  id="farmSize"
                  value={formData.farmSize}
                  onChange={(e) => setFormData((prev) => ({ ...prev, farmSize: e.target.value }))}
                  placeholder="e.g., 50 acres, 20 hectares"
                />
              </div>

              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select
                  value={formData.soilType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, soilType: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil} value={soil}>
                        {soil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="climateZone">Climate Zone</Label>
                <Select
                  value={formData.climateZone}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, climateZone: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your climate zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {climateZones.map((climate) => (
                      <SelectItem key={climate} value={climate}>
                        {climate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Running Advanced AI Analysis...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" />
                  Get Enhanced AI Recommendations
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Enhanced Features Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Advanced AI Analysis Features
          </CardTitle>
          <CardDescription>Comprehensive analysis powered by machine learning and satellite data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <Satellite className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Real-time Satellite Data</h4>
              <p className="text-sm text-muted-foreground">Live NDVI, soil moisture, and weather data</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">AI-powered risk analysis and mitigation</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold">Smart Calendar</h4>
              <p className="text-sm text-muted-foreground">Personalized farming schedule</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold">Predictive Analytics</h4>
              <p className="text-sm text-muted-foreground">Yield predictions and market insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
